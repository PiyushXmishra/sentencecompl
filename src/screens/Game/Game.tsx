import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Button } from "../../components/ui/button";
import { Draggable } from "../../components/Draggable";
import { Droppable } from "../../components/Droppable";
import { ArrowRight } from 'lucide-react';

interface Word {
  id: string;
  text: string;
}

interface GameProps {
  onBack: () => void;
}

const CORRECT_ORDER = ['different', 'turned', 'quick', 'outcome'];
const TOTAL_TIME = 15; // 15 seconds
const TOTAL_SEGMENTS = 10;

export const Game = ({ onBack }: GameProps) => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [availableWords, setAvailableWords] = useState<Word[]>([
    { id: 'different', text: 'Different' },
    { id: 'turned', text: 'Turned' },
    { id: 'quick', text: 'Quick' },
    { id: 'outcome', text: 'Outcome' }
  ]);
  const [blanks, setBlanks] = useState<(Word | null)[]>([null, null, null, null]);
  const [score, setScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmit();
    }
  }, [timeLeft, showResults]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over) return;

    const wordId = active.id as string;
    const blankIndex = parseInt(over.id as string);
    
    const word = availableWords.find(w => w.id === wordId) || 
                blanks.find(b => b?.id === wordId);
    if (!word) return;

    setBlanks(prev => {
      const newBlanks = [...prev];
      newBlanks[blankIndex] = word;
      return newBlanks;
    });

    // Remove word from available words if it came from there
    if (availableWords.find(w => w.id === wordId)) {
      setAvailableWords(prev => prev.filter(w => w.id !== wordId));
    }
  };

  const handleSubmit = () => {
    const currentOrder = blanks.map(blank => blank?.id);
    let correctCount = 0;

    currentOrder.forEach((id, index) => {
      if (id === CORRECT_ORDER[index]) correctCount++;
    });

    setScore((correctCount / CORRECT_ORDER.length) * 100);
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto mt-8">
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <svg className="w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="#22C55E"
                strokeWidth="8"
                strokeDasharray={`${(score! / 100) * 377} 377`}
                transform="rotate(-90 64 64)"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-4xl font-bold text-[#22C55E]">{score}</span>
            </div>
          </div>
          
          <div className="text-center max-w-md">
            <p className="text-neutral-700 text-lg mb-6">
              While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness.
            </p>
            
            <Button
              onClick={onBack}
              className="bg-[#6366F1] text-white px-8 py-2 rounded-lg hover:bg-[#4F46E5] transition-colors"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const progressSegments = Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
    const segmentTime = TOTAL_TIME / TOTAL_SEGMENTS;
    const isActive = timeLeft > (TOTAL_TIME - (i + 1) * segmentTime);
    return isActive;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="text-lg">{timeLeft}</div>
        <Button variant="ghost" onClick={onBack}>Quit</Button>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-1 px-4 mt-4">
        {progressSegments.map((isActive, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded ${
              isActive ? 'bg-[#FFA500]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-center text-xl mb-12">Select the missing words in the correct order</h2>
        
        <DndContext 
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="text-lg leading-relaxed space-y-8">
            <div className="text-center">
              Yesterday, we had a{' '}
              <Droppable id="0">
                <div className={`inline-block min-w-[120px] border-b-2 border-gray-300 px-2 py-1 mx-1 text-center ${
                  blanks[0] ? 'bg-white' : ''
                }`}>
                  {blanks[0]?.text || ''}
                </div>
              </Droppable>
              {' '}discussion about the project, but it{' '}
            </div>
            
            <div className="text-center">
              <Droppable id="1">
                <div className={`inline-block min-w-[120px] border-b-2 border-gray-300 px-2 py-1 mx-1 text-center ${
                  blanks[1] ? 'bg-white' : ''
                }`}>
                  {blanks[1]?.text || ''}
                </div>
              </Droppable>
              {' '}into an argument because everyone had{' '}
              <Droppable id="2">
                <div className={`inline-block min-w-[120px] border-b-2 border-gray-300 px-2 py-1 mx-1 text-center ${
                  blanks[2] ? 'bg-white' : ''
                }`}>
                  {blanks[2]?.text || ''}
                </div>
              </Droppable>
            </div>
            
            <div className="text-center">
              opinions on the final{' '}
              <Droppable id="3">
                <div className={`inline-block min-w-[120px] border-b-2 border-gray-300 px-2 py-1 mx-1 text-center ${
                  blanks[3] ? 'bg-white' : ''
                }`}>
                  {blanks[3]?.text || ''}
                </div>
              </Droppable>
              {' '}.
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            {availableWords.map(word => (
              <Draggable key={word.id} id={word.id}>
                <div className="px-6 py-2 bg-white rounded-lg border border-gray-200 shadow-sm cursor-move">
                  {word.text}
                </div>
              </Draggable>
            ))}
          </div>
        </DndContext>

        <div className="flex justify-end mt-12">
          <Button 
            onClick={handleSubmit}
            className="bg-[#6366F1] text-white rounded-lg px-4 py-2"
            disabled={blanks.some(b => b === null)}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};