"use client";

import * as motion from "motion/react-client";
import { delaFont } from "@/app/fonts/fonts";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const ProjectsNavbar = () => {
  const [ currentTab, setCurrentTab ] = useState(usePathname());
  const [ width, setWidth ] = useState(768);
  const router = useRouter();
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    router.push(`${tab}`);
  };
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <nav className='hidden md:flex bg-[rgba(245,245,220,0.23)] w-full max-w-[1600px] h-[55px] rounded-[28px] border-[1px] border-[rgba(233,245,220,0.30)]  my-10 justify-evenly 2xl:gap-30 xl:gap-13 gap-6 xl:px-12 lg:px-8 px-4'>
        <div className={ delaFont.className + " text-white xl:text-2xl lg:text-xl text-lg xl:min-w-[150px] lg:min-w-[130px] min-w-[110px] flex justify-center items-center" }>Nexus</div>
        <div className="flex">
            <div className={"relative xl:px-5 lg:px-4 px-4 rounded-xl flex justify-center items-center xl:gap-3 gap-2 cursor-pointer" + (currentTab == "/projects" ? " text-black": " text-white")} onClick={() => handleTabChange("/projects")}>
              { currentTab == "/projects" ? (
                <motion.div 
                className={"absolute top-0 bottom-0 left-0 right-0 bg-white m-[-1px] rounded-2xl"}
                layoutId="background-white"
                transition={{ duration: 0.5 }}
                >
                </motion.div>
              ) : null }
              <Image 
              src={ currentTab == "/projects" ? "/images/project-icon-black.png": "/images/project-icon-white.png" }
              alt=""
              width={ width > 1280 ? 30: width > 1024 ? 25: 22 }
              height={ width > 1280 ? 30: width > 1024 ? 25: 22 }
              className="z-10"
              />
              <div className="md:[15px] xl:text-[16px] z-10">Projects</div>
            </div>
            <div className={"relative xl:px-6 lg:px-5 px-5 rounded-xl flex justify-center items-center xl:gap-3 gap-2  cursor-pointer" + (currentTab == "/add" ? " text-black": " text-white")} onClick={() => handleTabChange("/add")}>
              { currentTab == "/add" ? (
                <motion.div 
                className={"absolute top-0 bottom-0 left-0 right-0 bg-white m-[-1px] rounded-2xl"}
                layoutId="background-white"
                transition={{ duration: 0.5 }}
                >
                </motion.div>
              ): null }
              <Image 
              src={ currentTab == "/add" ? "/images/add-icon-black.png": "/images/add-icon-white.png" }
              alt=""
              width={ width > 1280 ? 30: width > 1024 ? 25: 22 }
              height={ width > 1280 ? 30: width > 1024 ? 25: 22 }
              className="z-10"
              />
              <div className="md:[15px] xl:text-[16px] z-10">Add +</div>
            </div>
            <div className={"relative xl:px-5 lg:px-4 px-4 rounded-xl flex justify-center items-center xl:gap-3 gap-2  cursor-pointer" + (currentTab == "/settings" ? " text-black": " text-white")} onClick={() => handleTabChange("/settings")}>
              { currentTab == "/settings" ? (
                <motion.div 
                className={"absolute top-0 bottom-0 left-0 right-0 bg-white m-[-1px] rounded-2xl"}
                layoutId="background-white"
                transition={{ duration: 0.5 }}
                >
                </motion.div>
              ) : null }
              <Image 
              src={ currentTab == "/settings" ? "/images/settings-icon-black.png": "/images/settings-icon-white.svg" }
              alt=""
              width={ width > 1280 ? 30 : width > 1024 ? 25 : 22 }
              height={ width > 1280 ? 30 : width > 1024 ? 25 : 22 }
              className="z-10"
              />
              <div className="md:[15px] xl:text-[16px] z-10">Settings</div>
            </div>
        </div>
        <div className="text-white xl:px-5 lg:px-4 px-2 pr-3 rounded-xl flex justify-center items-center xl:gap-3 gap-2  cursor-pointer bg-[rgba(255,255,255,0.19)]">
            <Image 
            src="/images/logout-icon.png"
            alt=""
            width={ width > 1280 ? 30: width > 1024 ? 25: 22 }
            height={ width > 1280 ? 30: width > 1024 ? 25: 22 }
            />
            <div className="hidden lg:block lg:[15px] xl:text-[16px]">Logout</div>
        </div>
    </nav>
  )
}

export default ProjectsNavbar;