import { useState } from "react";
import { assets } from "../../assets/index.js";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className='min-h-100 flex flex-col justify-between bg-[#f0f4f9] px-[25px] py-[15px]'>
      <div className='block ml-[10px] cursor-pointer'>
        <img
          onClick={() => setExtended((prev) => !prev)}
          className='w-[20px]'
          src={assets.menu_icon}
          alt='menu-icon'
        />
        <div className='new-chat mt-[10px] flex items-center gap-[10px] px-[10px] py-[15px] bg-[#e6eaf1] rounded-[50px] tetx-[14px] text-gray-400 cursor-pointer'>
          <img className='w-[20px]' src={assets.plus_icon} alt='plus-icon' />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className='recent flex flex-col '>
            <p className='mt-[30px] mb-[20px] '>Recent</p>
            <div className='recent-entry flex text-start gap-[10px]  px-[10px] py-[10px] pr-[40px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb] transition-all ease-in-out'>
              <img
                className='w-[20px]'
                src={assets.message_icon}
                alt='message-cion'
              />
              <p>What is react...</p>
            </div>
          </div>
        )}
      </div>

      <div className='pr-[10px] flex flex-col'>
        <div className='flex text-start gap-[10px] px-[10px] py-[10px] pr-[40px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb] transition-all ease-in-out'>
          <img
            className='w-[20px]'
            src={assets.question_icon}
            alt='question-icon'
          />
          {extended && <p>Help</p>}
        </div>
        <div className='flex text-start gap-[10px] px-[10px] py-[10px] pr-[40px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb] transition-all ease-in-out'>
          <img
            className='w-[20px]'
            src={assets.history_icon}
            alt='question-icon'
          />
          {extended && <p>Activity</p>}
        </div>
        <div className='flex text-start gap-[10px]  px-[10px] py-[10px] pr-[40px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb] transition-all ease-in-out'>
          <img
            className='w-[20px]'
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
