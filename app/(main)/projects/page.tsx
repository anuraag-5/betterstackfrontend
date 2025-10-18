"use client";

import { neueFont } from '@/app/fonts/fonts';
import { useUserStore } from '@/lib/userStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const YourProjects = () => {
  const { websites } = useUserStore();
  const router = useRouter();
  const linearGradients = ["bg-gradient-to-b from-[#1A1A1A] to-[#204954]", "bg-gradient-to-b from-[#1A1A1A] to-[#202754]", "bg-gradient-to-b from-[#1A1A1A] to-[#312054]"];
  const handleProjectClick = (website: string) => {
    router.push(`/projects/${website}`);
  }
  return (
    <div className='flex-1 flex flex-col justify-between pt-6 pl-4'>
      <div className='text-[#bfbfbf]'>Your Projects</div>
      <div className='flex-1 bg-[#262626] mt-6 rounded-tl-4xl rounded-bl-4xl p-6 grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-y-16 overflow-y-auto'>
        {
          websites?.map((w, i) => (
            <div key={w.domain} className='flex flex-col h-[380px] w-fit border border-[#767676] rounded-4xl cursor-pointer' onClick={() => handleProjectClick(w.domain)}>
              <div className={ linearGradients[ i % 3 ] + ' flex-1 rounded-tl-4xl rounded-tr-4xl'}></div>
              <div className='flex gap-4 items-center px-5 py-7 border-t border-[#767676]'>
                <Image 
                src="/images/violet-project-icon.svg"
                alt=''
                width={26}
                height={26}
                />
                <div>
                  <div>{w.domain}</div>
                  <div className={ neueFont.className + ' lg:text-sm text-[12px] text-[#A8A8A8] min-w-[295px]'}>{w.about}</div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default YourProjects;
