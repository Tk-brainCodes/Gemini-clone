import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { assets } from "./../../assets/index";
import { static_data } from "../../data";

const Main = () => {
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

        <div className='flex gap-x-2'>
          <Button variant='outline'>Try Gemini Advanced</Button>
          <img
            src={assets.user_icon}
            alt='user-profile-icon'
            className='w-[50px] h-[50px] rounded-full'
          />
        </div>
      </div>

      <div className='w-full max-w-[950px] m-auto h-auto flex flex-col items-start justify-center'>
        <span className='text-[56px] leading-[3.5rem] text-[#c4c7c5] font-medium p-[20px] mt-5 mb-0'>
          <p className='gradient-text'>Hello, Eboreime</p>
          <p>How can i help you today?</p>
        </span>

        <div className='grid-card-template'>
          {static_data.map(
            ({ prompt, icon }: { prompt: string; icon: string }) => (
              <div className='h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer hover:bg-[#dfe4ed]'>
                <p className='text-[#585858] text-[17px]'>{prompt}</p>
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

        <div className=''></div>
      </div>
    </div>
  );
};

export default Main;
