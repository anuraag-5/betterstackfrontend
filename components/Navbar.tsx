"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(768);
  const [currentTab, setCurrentTab] = useState(usePathname());
  const handleMenuToggle = () => setOpen((initialValue) => !initialValue);
  useEffect(() => {
    const findWidth = () => setWidth(window.innerWidth);
    findWidth()
    window.addEventListener("resize", findWidth)

    return () => window.removeEventListener("resize", findWidth);
  }, [])
  return (
    <>
      {open ? (
        <motion.div
          className="hidden h-full max-w-[300px] border-r border-[#767676] md:flex flex-col px-6 pt-6 pb-3 justify-between"
          layoutId="menu"
          transition={{
            duration: 0.2,
          }}
        >
          <div className="flex flex-col h-[220px] justify-between">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Image
                  src="/images/brand-logo.png"
                  alt=""
                  width={ width > 1024 ? 27 : 22 }
                  height={ width > 1024 ? 27 : 18 }
                />
                <div className="text-lg lg:text-xl font-semibold">Nexus</div>
              </div>
              <div className="cursor-pointer" onClick={handleMenuToggle}>
                <Image src="/images/menu.png" alt="" width={ width > 1024 ? 25 : 20 } height={ width > 1024 ? 25 : 20 } />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div
                className={
                  (currentTab == "/projects"
                    ? "bg-[#333333] "
                    : "bg-transparent ") +
                  " rounded-lg flex items-center w-full flex-start gap-3 py-3 px-4"
                }
              >
                <Image
                  src="/images/overview-icon-black.png"
                  alt=""
                  width={ width > 1024 ? 25 : 20 }
                  height={ width > 1024 ? 25 : 20 }
                />
                <div className="text-[14px] lg:text-[16px]">Projects</div>
              </div>
              <div 
              className={
                (currentTab == "/settings"
                  ? "bg-[#333333] "
                  : "bg-transparent ") +
                " rounded-lg flex w-full flex-start gap-3 py-3 px-4"
              }
              >
                <Image
                  src="/images/settings-icon-white.svg"
                  alt=""
                  width={ width > 1024 ? 25 : 20 }
                  height={ width > 1024 ? 25 : 20 }
                />
                <div className="text-[14px] lg:text-[16px]">Settings</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            <div className="flex gap-3 items-center w-full pr-6 lg:pr-8">
                <div className="p-5 lg:p-6 w-fit rounded-full bg-blue-800"></div>
                <div className="flex flex-col">
                    <div className="text-[10px] lg:text-[12px]">Anurag Bhoite</div>
                    <div className="text-[8px] lg:text-[10px] text-[#A0A0A0]">anuraaag51@gmail.com</div>
                </div>
            </div>
            <div className="flex gap-3 py-3 px-4">
                <Image 
                src="/images/logout-icon.png"
                alt=""
                width={ width > 1024 ? 25 : 20 }
                height={ width > 1024 ? 25 : 20 }
                />
                <div>Logout</div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="hidden h-full max-w-[300px] border-r border-[#767676] md:flex flex-col px-4 pt-6 pb-3 justify-between"
          layoutId="menu"
          transition={{
            duration: 0.2,
          }}
        >
          <div className="flex flex-col h-[220px] justify-between items-center">
            <div className="cursor-pointer w-fit" onClick={handleMenuToggle}>
              <Image src="/images/menu.png" alt="" width={27} height={27} />
            </div>            
            <div className="flex flex-col gap-3">
              <div
                className={
                  (currentTab == "/projects"
                    ? "bg-[#333333] "
                    : "bg-transparent ") +
                  " rounded-md p-3"
                }
              >
                <Image
                  src="/images/overview-icon-black.png"
                  alt=""
                  width={25}
                  height={25}
                />
              </div>
              <div 
              className={
                (currentTab == "/settings"
                  ? "bg-[#333333] "
                  : "bg-transparent ") +
                " rounded-md p-3"
              }
              >
                <Image
                  src="/images/settings-icon-white.svg"
                  alt=""
                  width={25}
                  height={25}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="p-5 w-fit rounded-full bg-blue-800"></div>
              <Image 
              src="/images/logout-icon.png"
              alt=""
              width={25}
              height={25}
              />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
