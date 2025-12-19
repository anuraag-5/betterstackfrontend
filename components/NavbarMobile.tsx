"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/userStore";
import { useWidth } from "@/hooks/useWidth";

const NavbarMobile = () => {
  const width = useWidth();
  const { user } = useUserStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    router.replace("/signup");
  };
  return (
    <div className="flex md:hidden justify-between items-center p-2 mb-2">
      <div className="z-60 py-1 px-3 border-2 border-white rounded-full text-[14px]">
        Nexus
      </div>
      {open ? (
        <motion.div
          className="h-fit z-60"
          onClick={() => setOpen(false)}
          layoutId="menu-mobile"
          transition={{
            duration: 1.5,
          }}
        >
          <Image src="/images/menu-close.svg" alt="" width={20} height={20} />
        </motion.div>
      ) : (
        <motion.div
          className="h-fit z-60"
          onClick={() => setOpen(true)}
          layoutId="menu-mobile"
          transition={{
            duration: 1,
          }}
        >
          <Image src="/images/menu-open.svg" alt="" width={25} height={25} />
        </motion.div>
      )}
      {open ? (
        <motion.div
          className="absolute top-0 bottom-0 left-0 right-0 bg-black z-30 flex flex-col justify-evenly items-center gap-5"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.8,
          }}
          transition={{
            duration: 1.1,
          }}
        >
          <motion.div className="h-[90%] flex flex-col justify-evenly">
            <motion.div className="flex flex-col gap-4">
              <motion.div
                className="text-3xl cursor-pointer font-bold"
                onClick={() => {
                  setOpen(false);
                  router.push("/projects");
                }}
              >
                Projects
              </motion.div>
              <motion.div
                className="text-3xl cursor-pointer font-bold"
                onClick={() => {
                  setOpen(false);
                  router.push("/settings");
                }}
              >
                Settings
              </motion.div>
            </motion.div>
            <motion.div className="flex flex-col gap-5">
              <div className="flex gap-3 items-center w-full">
                <div className="p-5 w-fit rounded-full bg-blue-800"></div>
                <div className="flex flex-col">
                  <div className="text-[10px]">{user?.name}</div>
                  <div className="text-[8px] text-[#A0A0A0]">{user?.email}</div>
                </div>
              </div>
              <div className="flex gap-3 cursor-pointer font-semibold" onClick={handleLogout}>
                <Image
                  src="/images/logout-icon.png"
                  alt=""
                  width={width > 1024 ? 25 : 20}
                  height={width > 1024 ? 25 : 20}
                />
                <div>Logout</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default NavbarMobile;
