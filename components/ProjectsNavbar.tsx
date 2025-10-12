"use client";

import { delaFont } from "@/app/fonts/fonts"
import Image from "next/image";
import { useState } from "react";

const ProjectsNavbar = () => {
  const [ currentTab, setCurrentTab ] = useState("projects");
  const handleTabChange = (tab: string) => setCurrentTab(tab);
  return (
    <nav className='bg-[rgba(245,245,220,0.23)] w-[80vw] h-[55px] rounded-[28px] border-[1px] border-[rgba(233,245,220,0.30)]  my-10 flex justify-evenly gap-30 px-12'>
        <div className={ delaFont.className + " text-white text-2xl min-w-[150px] flex justify-center items-center" }>Nexus</div>
        <div className="flex">
            <div className={"min-w-[160px] rounded-xl flex justify-center items-center gap-3 cursor-pointer" + (currentTab == "projects" ? " bg-white text-black": " bg-transparent text-white")} onClick={() => handleTabChange("projects")}>
              <Image 
              src={ currentTab == "projects" ? "/images/project-icon-black.png": "/images/project-icon-white.png" }
              alt=""
              width={30}
              height={30}
              />
              <div>Projects</div>
            </div>
            <div className={"min-w-[160px] rounded-xl flex justify-center items-center gap-3 cursor-pointer" + (currentTab == "add" ? " bg-white text-black": " bg-transparent text-white")} onClick={() => handleTabChange("add")}>
              <Image 
              src={ currentTab == "add" ? "/images/add-icon-black.png": "/images/add-icon-white.png" }
              alt=""
              width={30}
              height={30}
              />
              <div>Add +</div>
            </div>
            <div className={"min-w-[160px] rounded-xl flex justify-center items-center gap-3 cursor-pointer" + (currentTab == "settings" ? " bg-white text-black": " bg-transparent text-white")} onClick={() => handleTabChange("settings")}>
              <Image 
              src={ currentTab == "settings" ? "/images/settings-icon-black.png": "/images/settings-icon-white.svg" }
              alt=""
              width={28}
              height={28}
              />
              <div>Settings</div>
            </div>
        </div>
        <div className="text-white min-w-[150px] rounded-xl flex justify-center items-center gap-3 cursor-pointer bg-[rgba(255,255,255,0.19)]">
            <Image 
            src="/images/logout-icon.png"
            alt=""
            width={30}
            height={30}
            />
            <div>Logout</div>
        </div>
    </nav>
  )
}

export default ProjectsNavbar;