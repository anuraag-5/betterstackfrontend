"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NavbarMobile = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
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
          className="absolute top-0 bottom-0 left-0 right-0 bg-black z-30 flex flex-col justify-center items-center gap-5"
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
          <motion.div
            className="text-3xl cursor-pointer"
            onClick={() => {
              setOpen(false);
              router.push("/projects");
            }}
          >
            Projects
          </motion.div>
          <motion.div
            className="text-3xl cursor-pointer"
            onClick={() => {
              setOpen(false);
              router.push("/settings");
            }}
          >
            Settings
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default NavbarMobile;
