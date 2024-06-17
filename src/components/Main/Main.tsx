import { ChangeEvent, useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { assets } from "@/assets/index";
import { static_data } from "../../data";
import { Context } from "@/context/global-context";
import { AnimatePresence, motion } from "framer-motion";
import DOMPurify from "dompurify";

const Main = () => {
  const context = useContext(Context);
  const [cardPrompt, setCardPrompt] = useState("");

  if (!context) {
    return <div>Error: Context not found</div>;
  }

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    setRecentPrompt,
  } = context;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const cursorPosition = e.currentTarget.selectionStart || 0;
      const newValue =
        input.slice(0, cursorPosition) + "\n" + input.slice(cursorPosition);

      setInput(newValue);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const setCardPromptToInput = (prompt: string) => {
    setCardPrompt(prompt);
    setRecentPrompt(prompt);
  };

  return (
    <AnimatePresence>
      <div className='flex-1 w-full bg-white max-h-40 min-h-[100vh] pb-[15vh] relative'>
        <div className='mt-3 flex items-center justify-between px-4 py-2'>
          <DropdownMenu>
            <DropdownMenuTrigger className='text-[20px] leading-[28px] text-[#5f6368] flex items-center justify-center gap-x-2 '>
              <span className=''>Gemini</span>{" "}
              <img src={assets.arrow_dropdown} alt='arrow_dropdown' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Gemini</DropdownMenuItem>
              <DropdownMenuItem>Gemini Advanced</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className='flex gap-x-4'>
            <Button
              variant='outline'
              className='bg-[#dde3ea] text-[#000000] font-normal'
            >
              Try Gemini Advanced
            </Button>
            <Button className='bg-0 hover:bg-0 px-2 py-2 flex items-center justify-center'>
              <img src={assets.google_apps} alt='google_apps' />
            </Button>
            <img
              src={assets.user_icon}
              alt='user-profile-icon'
              className='w-[40px] h-[40px] rounded-full'
            />
          </div>
        </div>

        <div className='w-full max-w-[950px] m-auto h-auto flex flex-col items-start justify-center'>
          {!showResult ? (
            <>
              <span className='text-[56px] leading-[64px] text-[#c4c7c5] font-semibold p-[20px] mt-5 mb-[40px]'>
                <p className='gradient-text'>Hello, Eboreime</p>
                <p className='text-[#c4c7c5]'>How can I help you today?</p>
              </span>
              <div className='grid-card-template'>
                {static_data.map(
                  ({ prompt, icon }: { prompt: string; icon: string }) => (
                    <div
                      key={prompt}
                      className='h-[200px] p-[15px] bg-[#f0f4f9] rounded-[13px] relative cursor-pointer hover:bg-[#dfe4ed]'
                      onClick={() => setCardPromptToInput(prompt)}
                    >
                      <p className='text-black text-[17px] flex flex-col items-start '>
                        {prompt}
                      </p>
                      <span className='w-[40px] h-[40px] p-[5px] bg-white rounded-full flex items-center justify-center right-[10px] bottom-[10px] absolute'>
                        <img src={icon} alt='' />
                      </span>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <div className='result'>
              <div className='my-10 flex items-center gap-[20px]'>
                <img
                  src={assets.user_icon}
                  alt='user-icon'
                  className='w-[40px] h-[40px] rounded-full'
                />
                <p>{recentPrompt}</p>
              </div>
              <div className='flex items-start gap-[20px]'>
                <img
                  src={assets.gemini_icon}
                  alt='gemini-icon'
                  className='w-[40px] h-[40px]'
                />
                {loading ? (
                  <div className='w-[700px] flex flex-col gap-[10px]'>
                    <hr className='skeleton-loader' />
                    <hr className='skeleton-loader' />
                    <hr className='skeleton-loader w-[70%]' />
                  </div>
                ) : (
                  <p
                    className='text-[17px] font-normal text-base leading-[1.7] text-[#1f1f1f]'
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(resultData),
                    }}
                  ></p>
                )}
              </div>
            </div>
          )}

          <motion.div className='search-container bg-white h-[100px] w-full bg-gradient-to-b from-transparent via-white to-white'>
            <motion.div className='search-box mt-4'>
              <input
                type='text'
                placeholder='Enter a text here'
                className='flex-1 bg-transparent border-1 border-blue-400 outline-none focus:outline-none focus:border-none focus:ring-0 p-[8px] text-[18px]'
                value={input}
                onKeyDown={handleKeyDown}
                style={{ whiteSpace: "pre-wrap" }}
                onChange={handleInputChange}
              />

              <motion.div className='flex gap-x-4'>
                <span className='rounded-full hover:bg-slate-200 px-2 py-2 flex items-center justify-center'>
                  <img
                    src={assets.add_photo}
                    alt='gallery-icon'
                    className='w-[24px] cursor-pointer'
                  />
                </span>

                <span className='rounded-full hover:bg-slate-200 px-2 py-2 flex items-center justify-center'>
                  <img
                    src={assets.mic_icon}
                    alt='mic-icon'
                    className='w-[24px] cursor-pointer'
                  />
                </span>
                {input && (
                  <motion.span
                    className='rounded-full hover:bg-slate-200 px-2 py-2 flex items-center justify-center'
                    onClick={() => onSent(input)}
                  >
                    <motion.img
                      src={assets.send_icon}
                      alt='send icon'
                      className='w-[24px] cursor-pointer '
                    />
                  </motion.span>
                )}
              </motion.div>
            </motion.div>

            <p className='mx-auto my-15px text-[13px] text-center text-black font-normal mb-1'>
              Gemini may display inaccurate info, including about people, so
              double-check its responses.{" "}
              <span className='underline cursor-pointer'>
                Your privacy & Gemini Apps
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Main;
