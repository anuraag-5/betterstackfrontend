"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import { useState } from "react";

const NavbarMobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex md:hidden justify-between p-2'>
        <div className="z-60">Nexus</div>
        {
            open ? (
                <>
                  <motion.div 
                  className="absolute right-3 top-5 h-fit z-60" 
                  onClick={() => setOpen(false)}
                  layoutId="menu-mobile"
                  transition={{
                    duration: 1.5
                  }}
                  >
                    <Image
                    src="/images/menu-close.svg"
                    alt=""
                    width={20}
                    height={20}
                    />
                    </motion.div>
                  <motion.div className="absolute top-0 bottom-0 left-0 right-0 bg-black z-30"
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: .8
                  }}
                  transition={{
                    duration: 1.1
                  }}
                  ></motion.div>
                </>
            ) : (
                <motion.div 
                className="absolute right-3 top-5 h-fit z-60" 
                onClick={() => setOpen(true)}
                layoutId="menu-mobile"
                transition={{
                    duration: 1
                }}
                >
                    <Image
                    src="/images/menu-open.svg"
                    alt=""
                    width={25}
                    height={25}
                    />
                </motion.div>
            )
        }
    </div>
  )
}

export default NavbarMobile;