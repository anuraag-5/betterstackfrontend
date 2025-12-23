"use client";

import * as motion from "motion/react-client";
import Star from "./Star";
import { useRouter } from "next/navigation";
import { kapakanaFont } from "@/app/fonts/fonts";

const CallToSection = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full -mt-px bg-linear-to-b from-[#513D6A] to-[#D9D9D9] flex flex-col items-center justify-between gap-12 pt-5">
      <motion.div 
      className="flex flex-col items-center gap-10 pt-15"
      initial={{
        y: 40,
      }}
      whileInView={{
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      viewport={{ once: true }}
      >
        <div className="flex items-center font-bold gap-3 py-[4px] px-4 bg-[#301751] text-[#C499FF] text-[11px] w-fit rounded-full">
          <Star />
          Join Us
        </div>
        <div className="flex flex-col items-center text-2xl md:text-4xl lg:text-[40px] text-black gap-2 lg:gap-5">
          <div>Experience Real-Time</div>
          <div className="flex gap-4 items-center relative">
            Analytics with
            <div
              className={kapakanaFont.className + " relative top-1 lg:top-2"}
            >
              Nexus.
            </div>
          </div>
          <div className="flex flex-col items-center text-[12px] md:text-sm text-[#2c2c2c]">
            <div>
              Enjoy lightning-fast insights backed by Rust technology
            </div>
            <div>— from live traffic tracking monitor data.</div>
          </div>
        </div>
        <div 
        className="bg-[#301751] py-2 px-5 rounded-full w-fit text-white font-semibold mt-4 cursor-pointer"
        onClick={() => router.push("/signin")}
        >Get Started</div>
      </motion.div>
      <div className="text-[#301751] p-3 text-[12px] md:text-[14px]">&copy;2025 Nexus. All rights Reserved.</div>
    </div>
  );
};

export default CallToSection;
