"use client";

import Image from "next/image";
import { poppinsFont } from "@/app/fonts/fonts";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const LeftNavbar = ({ userId }: { userId: string }) => {

  const router = useRouter();
  const currentPath = usePathname();
  const path = currentPath.includes("projects") ? "projects" : "settings";
  const [ currentTab, setCurrentTab ] = useState(path);

  const handleTabChange = async (tab: string) => {
    setCurrentTab(tab);
    router.push(`/dashboard/${tab}`);
  }

  return (
    <div className="hidden md:flex flex-col min-h-screen bg-[#252424] md:rounded-br-2xl md:rounded-tr-2xl mr-1.5 text-white px-2 py-6">
      <div className="flex justify-between items-center mb-16 px-4">
        <div
          className={
            poppinsFont.className + " text-[#F5F5DC] text-[22px] font-bold"
          }
        >
          Nexus
        </div>
        <div>
          <Image
            src="/images/menu-close.svg"
            alt="menu-close"
            width={25}
            height={25}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex-1">
        <div 
        className={ currentTab === "projects"  ? 
        "flex justify-between items-center bg-[#FBBB3F] rounded-full py-3 px-4 mb-3 cursor-pointer text-black gap-10" : 
        "flex justify-between items-center rounded-full py-3 px-4 mb-3 cursor-pointer text-white gap-10" 
        }
        onClick={() => handleTabChange("projects")}
        >
          <div className="text-[14px] xl:text-[16px] font-semibold">
            Your Projects
          </div>
          <Image src={`/images/${ currentTab === "projects" ? "projects.svg": "projects-white.svg" }`} alt="Pr" width={25} height={25} />
        </div>
        <div 
        className={ currentTab === "settings"  ? 
          "flex justify-between items-center bg-[#FBBB3F] rounded-full py-3 px-4 mb-3 cursor-pointer text-black" : 
          "flex justify-between items-center rounded-full py-3 px-4 mb-3 cursor-pointer text-white" 
        }
        onClick={() => handleTabChange("settings")}
        >
          <div className="text-[14px] xl:text-[16px] font-semibold">
            Settings
          </div>
          <Image src={`/images/${ currentTab === "settings" ? "setting-icon-black.svg" : "setting-icon-white.svg" }`} alt="Pr" width={25} height={25} />
        </div>
      </div>
      <div className="text-[11px]">anuraag51@gmail.com</div>
    </div>
  );
};

export default LeftNavbar;
