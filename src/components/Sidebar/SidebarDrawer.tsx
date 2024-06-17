import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { assets } from "../../assets/index.js";
import { cn } from "@/lib/utils.js";

import { Context } from "@/context/global-context.js";

const SidebarDrawer = () => {
  const [open, setOpen] = useState(true);
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
    <div className='flex bg-[#f0f4f9]'>
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-4 relative z-10 duration-300`}
      >
        <div className='flex gap-x-4 items-center'>
          <Button
            onClick={() => setOpen(!open)}
            className='bg-0 hover:bg-0 flex px-2 py-2 w-[50px] h-[50px] items-center justify-center rounded-full  cursor-pointer'
          >
            <img
              src={assets.menu_icon}
              className={`cursor-pointer duration-500`}
            />
          </Button>
        </div>
        <ul className='pt-6'>
          <li
            className={cn(
              "flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-[#444746] bg-[#dde3ea] text-sm items-center font-semibold  gap-x-4",
              open ? "rounded-[20px] w-[150px]" : "rounded-full"
            )}
            onClick={newChatScreen}
          >
            <img src={assets.plus_icon} alt='plus_icon' />
            <span
              className={`leading-[20px] text-[14px] ${
                !open && "hidden"
              } origin-left duration-200`}
            >
              New chat
            </span>
          </li>

          <div className=''>
            {open && (
              <>
                <li className='text-[14px] font-semibold leading-[20px] text-[#1f1f1f] mt-6'>
                  Recent
                </li>
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
              </>
            )}
          </div>

          <div className='mt-[15.5em]'>
            <li
              className={cn(
                "flex rounded-[20px] p-2 cursor-pointer hover:bg-light-white text-[#444746]  text-sm items-center font-semibold  gap-x-4 hover:bg-slate-200"
              )}
            >
              <img src={assets.help} alt='plus_icon' />
              <span
                className={`leading-[20px] text-[14px] ${
                  !open && "hidden"
                } origin-left duration-200`}
              >
                Help
              </span>
            </li>
            <li
              className={cn(
                "flex rounded-[20px] p-2 cursor-pointer hover:bg-light-white text-[#444746]  text-sm items-center font-semibold  gap-x-4 hover:bg-slate-200"
              )}
            >
              <img src={assets.history_icon} alt='plus_icon' />
              <span
                className={`leading-[20px] text-[14px] ${
                  !open && "hidden"
                } origin-left duration-200`}
              >
                Activity
              </span>
            </li>
            <li
              className={cn(
                "flex p-2 cursor-pointer hover:bg-light-white text-[#444746]  text-sm items-center font-semibold  gap-x-4 hover:bg-slate-200 rounded-[20px]"
              )}
            >
              <img src={assets.settings_icon} alt='plus_icon' />
              <span
                className={`leading-[20px] text-[14px] ${
                  !open && "hidden"
                } origin-left duration-200`}
              >
                Settings
              </span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};
export default SidebarDrawer;
