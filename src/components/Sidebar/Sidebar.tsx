import { useState } from "react";
import { assets } from "../../assets/index.js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div
      className={cn(
        "min-h-100 flex flex-col items-start px-2 py-2 justify-between bg-[#f0f4f9] transition ease-in-out",
        !extended ? "w-[100px] flex items-center justify-between" : ""
      )}
    >
      <div className='block ml-[1px] mt-4 cursor-pointer'>
        <img
          onClick={() => setExtended((prev) => !prev)}
          className='w-[20px] mb-[4em] ml-2'
          src={assets.menu_icon}
          alt='menu-icon'
        />

        <Button
          className={cn(
            "flex items-center justify-between bg-gray-200 hover:bg-[#dadfe8] mt-[20px] gap-[10px] px-[10px] py-[15px] rounded-[50px] text-[14px] cursor-pointer",
            extended && "rounded-full"
          )}
        >
          <span className='font-normal text-[32px] text-[#1f1f1f] mb-[8px]'>
            +
          </span>
          {extended && (
            <p className='text-[#1f1f1f] font-semibold text-[.875rem]'>
              New Chat
            </p>
          )}
        </Button>
        {extended && (
          <div className='recent flex flex-col'>
            <p className='mt-[30px] mb-[20px] ml-[13px] text-black font-normal text-[15px]'>
              Recent
            </p>
            <div className='flex h-[34px] items-center justify-between gap-x-4 -mt-[15px] text-start gap-[10px] pr-[40px] rounded-[50px] text-black cursor-pointer leading-[1.5rem] font-medium text-[14px] hover:bg-[#e2e6eb] transition-all ease-in-out px-2 py-2 '>
              <img
                className='w-[20px]'
                src={assets.message_icon}
                alt='message-cion'
              />
              <p>What is react and next</p>
              <img
                className='w-[20px]'
                src={assets.message_icon}
                alt='message-cion'
              />
            </div>
          </div>
        )}
      </div>

      <div className={cn(" flex flex-col", extended === true && "w-[100%]")}>
        <div className='flex text-start w-[100%] items-center gap-[15px] h-[34px] rounded-[50px] text-black cursor-pointer leading-[1.5rem] font-medium text-[14px] hover:bg-[#e2e6eb] transition-all ease-in-out px-2 py-2'>
          <img
            className='w-[20px] h-[20px] mt-1'
            src={assets.question_icon}
            alt='question-icon'
          />
          {extended && <p>Help</p>}
        </div>
        <div className='flex  text-start h-[34px] items-center gap-[15px] rounded-[50px] text-black cursor-pointer leading-[1.5rem] font-medium text-[14px] hover:bg-[#e2e6eb] transition-all ease-in-out px-2 py-2'>
          <img
            className='w-[20px] h-[20px] mt-1'
            src={assets.history_icon}
            alt='question-icon'
          />
          {extended && <p>Activity</p>}
        </div>
        <div className='flex text-start h-[34px]items-center gap-[15px] rounded-[50px] text-black cursor-pointer leading-[1.5rem] font-medium text-[14px] hover:bg-[#e2e6eb] transition-all ease-in-out px-2 py-2 '>
          <img
            className='w-[20px] h-[20px] mt-1'
            src={assets.setting_icon}
            alt='question-icon'
          />
          {extended && <p>Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
