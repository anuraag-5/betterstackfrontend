"use client";

import { kapakanaFont } from "@/app/fonts/fonts";
import Signin from "@/components/SignIn";
import * as motion from "motion/react-client";

const SigninPage = () => {
  return (
    <section className="flex max-w-screen min-h-screen">
      <Signin />
      <div className="flex-1 bg-black -ml-1">
        <motion.div
          className={
            " hidden md:flex flex-col items-center justify-center w-full h-full bg-[#6A528B] text-[#6750A4] rounded-tl-[50px] rounded-bl-[50px]"
          }
        >
          <div className="flex flex-col gap-8 text-black">
            <motion.div
              className="text-3xl lg:text-5xl font-light"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1,
              }}
            >
              Monitoring
            </motion.div>
            <motion.div
              className="text-3xl lg:text-5xl font-light"
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.5,
              }}
            >
              Made
            </motion.div>
            <motion.div
              className={
                kapakanaFont.className + " text-5xl lg:text-7xl text-white"
              }
              initial={{
                opacity: 0,
                x: 80,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 1,
              }}
            >
              Simple.
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SigninPage;
