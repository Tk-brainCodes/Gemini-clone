import { useState, useContext } from "react";
import { assets } from "../../assets/index.js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils.js";
import { Context } from "@/context/global-context.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const context = useContext(Context);

  if (!context) {
    return <div>Context not found.</div>;
  }

  const { onSent, prevPrompts, setRecentPrompt, newChatScreen } = context;

  const loadPromptToInput = async (prompt: string) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className={cn(
        "min-h-100 px-2 py-2 bg-[#f0f4f9] transition ease-in-out",
        extended ? "w-72 relative duration-300 flex items-center justify-between" : ""
      )}
    >
      <div className='flex flex-col items-start justify-center ml-[1px] mt-4 cursor-pointer'>
        <Button className='bg-0 hover:bg-0 flex px-2 py-2 w-[50px] h-[50px] items-center justify-center rounded-full '>
          <img
            onClick={() => setExtended((prev) => !prev)}
            src={assets.menu_icon}
            alt='menu-icon'
            className='w-[30px] h-[30px]'
          />
        </Button>

        <Button
          className={cn(
            " bg-gray-200 w-[50px] h-[50px]  hover:bg-[#dadfe8] mt-[20px] gap-[10px] px-[2em] py-[1.8em] rounded-[50px] text-[14px] cursor-pointer",
            extended && "rounded-full"
          )}
          onClick={newChatScreen}
        >
          <img src={assets.plus_icon} alt='plus_icon' />
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
            {prevPrompts.map((text: string, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => loadPromptToInput(text)}
                  className='flex h-[34px] items-center justify-between  mt-[5px] text-start gap-[10px] pr-[40px] rounded-[50px] text-black cursor-pointer leading-[1.5rem] font-medium text-[14px] hover:bg-[#e2e6eb] transition-all ease-in-out px-2 py-2 '
                >
                  <img
                    className='w-[20px]'
                    src={assets.message_icon}
                    alt='message-cion'
                  />
                  <p>{text.slice(0, 18)}...</p>
                  <img
                    className='w-[20px]'
                    src={assets.message_icon}
                    alt='message-cion'
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={cn(" flex flex-col", extended === true && "w-[100%]")}>
        <div className='flex text-start w-[100%] items-center gap-[15px] h-[34px] rounded-[50px] text-black cursor-pointer leading-[1.5rem] font-medium text-[14px] hover:bg-[#e2e6eb] transition-all ease-in-out px-2 py-2'>
          <img
            className='w-[20px] h-[20px] mt-1'
            src={assets.help}
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
        <Popover>
          <div className='flex text-start h-[34px]items-center gap-[15px] rounded-[50px] text-black cursor-pointer leading-[1.5rem] font-medium text-[14px] hover:bg-[#e2e6eb] transition-all ease-in-out px-2 py-2 '>
            <PopoverTrigger>
              <img
                className='w-[20px] h-[20px] mt-1'
                src={assets.settings_icon}
                alt='question-icon'
              />
              {extended && <p>Setting</p>}
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
