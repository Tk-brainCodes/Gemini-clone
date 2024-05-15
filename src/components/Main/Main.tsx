import { ChangeEvent, useContext } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { assets } from "@/assets/index";
import { Input } from "@/components/ui/input";

import { static_data } from "../../data";
import { Context } from "@/context/global-context";
import DOMPurify from "dompurify";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Main = () => {
  const {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  return (
    <div className='flex-1 min-h-[100vh] pb-[15vh] relative'>
      <div className='flex items-center justify-between px-4 py-2'>
        <DropdownMenu>
          <DropdownMenuTrigger>Gemini</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Gemini</DropdownMenuItem>
            <DropdownMenuItem>Gemini Advanced</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='flex gap-x-6'>
          <Button variant='outline'>Try Gemini Advanced</Button>
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
            <span className='text-[56px] leading-[3.5rem] text-[#c4c7c5] font-medium p-[20px] mt-5 mb-[40px]'>
              <p className='gradient-text'>Hello, Eboreime</p>
              <p>How can i help you today?</p>
            </span>
            <div className='grid-card-template'>
              {static_data.map(
                ({ prompt, icon }: { prompt: string; icon: string }) => (
                  <div
                    key={prompt}
                    className='h-[200px] p-[15px] bg-[#f0f4f9] rounded-[13px] relative cursor-pointer hover:bg-[#dfe4ed]'
                  >
                    <p className='text-black text-[17px] flex flex-col items-start '>
                      {prompt}
                    </p>
                    <span>
                      <img
                        src={icon}
                        alt=''
                        className='w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]'
                      />
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
                  <hr className='skeleton-loader' />
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

        <div className='search-container  bg-white h-[100px] w-full bg-gradient-to-b from-transparent via-white to-white'>
          <div className='search-box mt-4'>
            <Input
              type='text'
              placeholder='Enter a text here'
              className='flex-1 bg-transparent border-0 outline-0 focus:outline-0 p-[8px] text-[18px]'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              value={input}
            />
            <div className='flex gap-x-4'>
              <img
                src={assets.gallery_icon}
                alt='gallery-icon'
                className='w-[24px]'
              />
              <img src={assets.mic_icon} alt='mic-icon' className='w-[24px]' />
              <img
                src={assets.send_icon}
                alt='send icon'
                className='w-[24px]'
                onClick={() => onSent()}
              />
            </div>
          </div>

          <p className='mx-auto my-15px text-[13px] text-center text-black font-normal mb-1'>
            Gemini may display inaccurate info, including about people, so
            double-check its responses.{" "}
            <span className='underline cursor-pointer'>
              Your privacy & Gemini Apps
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
