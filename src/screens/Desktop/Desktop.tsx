import { EditIcon, MoreVerticalIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Game } from "../Game/Game";

export const Desktop = (): JSX.Element => {
  const [gameStarted, setGameStarted] = useState(false);

  // Data for the info sections
  const infoSections = [
    { title: "Time Per Question", value: "30 sec" },
    { title: "Total Questions", value: "10" },
    { title: "Coins", value: "0", hasIcon: true },
  ];

  if (gameStarted) {
    return <Game onBack={() => setGameStarted(false)} />;
  }

  return (
    <div className="bg-[#f8f8f8] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-back-ground w-full max-w-[1366px] relative min-h-[875px]">
        {/* Header */}
        <header className="flex w-full items-center justify-between px-20 py-0 fixed top-0 left-0 right-0 max-w-[1366px] mx-auto bg-transparent-bg shadow-drop-shdaow-BB backdrop-blur-[25px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(25px)_brightness(100%)] z-10">
          <div className="flex w-[136px] gap-2 items-center">
            <div className="inline-flex gap-2 items-center" />
          </div>

          <div className="flex h-16 justify-center gap-4 px-6 py-0 rounded-lg items-center">
            <h1 className="font-web-medium-text-medium font-[number:var(--web-medium-text-medium-font-weight)] text-neutral-700 text-[length:var(--web-medium-text-medium-font-size)] tracking-[var(--web-medium-text-medium-letter-spacing)] leading-[var(--web-medium-text-medium-line-height)] whitespace-nowrap [font-style:var(--web-medium-text-medium-font-style)]">
              Sentence Construction
            </h1>
          </div>

          <div className="flex w-[136px] justify-end gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="w-16 h-16 rounded-lg"
            >
              <MoreVerticalIcon className="w-6 h-6" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center pt-[202px]">
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="flex flex-col items-center gap-16 p-0">
              {/* Info Section */}
              <div className="flex flex-col h-[366px] gap-24 items-center">
                <div className="flex flex-col h-[198px] gap-8 w-full items-center">
                  <div className="w-[72px] h-[72px] flex items-center justify-center text-gray-600">
                    <EditIcon className="w-[72px] h-[72px]" />
                  </div>

                  <div className="flex flex-col gap-3 w-full items-center mb-[-20px]">
                    <h2 className="font-web-heading-3 font-[number:var(--web-heading-3-font-weight)] text-neutral-900 text-[length:var(--web-heading-3-font-size)] text-center tracking-[var(--web-heading-3-letter-spacing)] leading-[var(--web-heading-3-line-height)] [font-style:var(--web-heading-3-font-style)]">
                      Sentence Construction
                    </h2>

                    <p className="font-web-large-text-regular font-[number:var(--web-large-text-regular-font-weight)] text-neutral-500 text-[length:var(--web-large-text-regular-font-size)] text-center tracking-[var(--web-large-text-regular-letter-spacing)] leading-[var(--web-large-text-regular-line-height)] [font-style:var(--web-large-text-regular-font-style)]">
                      Select the correct words to complete the sentence by
                      arranging the provided options in the right order.
                    </p>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="inline-flex gap-8 items-center">
                  {infoSections.map((section, index) => (
                    <React.Fragment key={section.title}>
                      <div className="inline-flex flex-col gap-4 items-center">
                        <h3 className="font-web-large-text-medium font-[number:var(--web-large-text-medium-font-weight)] text-neutral-800 text-[length:var(--web-large-text-medium-font-size)] text-center tracking-[var(--web-large-text-medium-letter-spacing)] leading-[var(--web-large-text-medium-line-height)] [font-style:var(--web-large-text-medium-font-style)]">
                          {section.title}
                        </h3>

                        {section.hasIcon ? (
                          <div className="inline-flex justify-center gap-1 items-center">
                            <div className="w-4 h-4 bg-[#ffd700] rounded-lg border-2 border-solid border-[#f4ce00]" />
                            <span className="font-web-normal-text-medium font-[number:var(--web-normal-text-medium-font-weight)] text-[#404242] text-[length:var(--web-normal-text-medium-font-size)] tracking-[var(--web-normal-text-medium-letter-spacing)] leading-[var(--web-normal-text-medium-line-height)] whitespace-nowrap [font-style:var(--web-normal-text-medium-font-style)]">
                              {section.value}
                            </span>
                          </div>
                        ) : (
                          <span className="font-web-medium-text-medium font-[number:var(--web-medium-text-medium-font-weight)] text-neutral-500 text-[length:var(--web-medium-text-medium-font-size)] text-center tracking-[var(--web-medium-text-medium-letter-spacing)] leading-[var(--web-medium-text-medium-line-height)] [font-style:var(--web-medium-text-medium-font-style)]">
                            {section.value}
                          </span>
                        )}
                      </div>

                      {index < infoSections.length - 1 && (
                        <Separator
                          orientation="vertical"
                          className="h-[54px]"
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="inline-flex gap-4 items-center">
                <Button
                  variant="outline"
                  className="w-[140px] h-[42px] border-[#453fe1] text-primary-600 font-web-normal-text-medium"
                >
                  Back
                </Button>
                <Button 
                  className="w-[140px] h-[42px] bg-primary-600 text-neutralwhite font-web-normal-text-medium"
                  onClick={() => setGameStarted(true)}
                >
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};