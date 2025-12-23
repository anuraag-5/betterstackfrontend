"use client";

import * as motion from "motion/react-client";
import gsap from "gsap";
import Star from "./Star";
import Image from "next/image";
import { useWidth } from "@/hooks/useWidth";
import { kapakanaFont } from "@/app/fonts/fonts";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const UseCases = () => {
  const width = useWidth();
  const mainRef = useRef<HTMLDivElement | null>(null);
  const firstRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);
  const thirdRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!width || width < 768) return;
    gsap.set(firstRef.current, {
      xPercent: 100,
    });
    gsap.set(thirdRef.current, {
      xPercent: -100,
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom -100%",
        pin: true,
        scrub: 2,
        anticipatePin: 1,
      },
    });

    tl.to(
      firstRef.current,
      {
        x: width > 1279 ? -400 : width > 1023 ? -300 : -250,
        y: width > 1279 ? -120 : -80,
      },
      0
    );
    tl.to(
      thirdRef.current,
      {
        x: width > 1279 ? 400 : width > 1023 ? 300 : 250,
        y: width > 1279 ? -120 : -80,
      },
      0
    );
  }, [width]);
  return (
    <div
      className="min-h-screen w-full -mt-px bg-linear-to-b from-[#513D6A] to-[#D9D9D9] flex flex-col items-center justify-evenly gap-12 pt-5"
      ref={mainRef}
    >
      <motion.div 
      className="flex flex-col items-center gap-10"
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
          Use Cases
        </div>
        <div className="flex flex-col items-center text-2xl md:text-4xl lg:text-[40px] text-black gap-2 lg:gap-5">
          <div>Designed for Every</div>
          <div className="flex gap-4 items-center relative">
            Type of{" "}
            <div
              className={kapakanaFont.className + " relative top-1 lg:top-2"}
            >
              Team
            </div>
          </div>
        </div>
      </motion.div>
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row w-full rounded-3xl md:justify-center items-center">
        <div
          className="bg-[#C499FF] shadow-[0_0_50px_5px_#63438D] rounded-3xl p-5 h-[320px] w-[250px] md:w-[220px] lg:w-[250px] xl:h-[350px] xl:w-[300px] "
          ref={firstRef}
        >
          <div className="flex flex-col items-center text-black gap-3 text-xl font-bold mt-2">
            <Image src="images/developer.svg" alt="" width={65} height={65} />
            <div>Developers</div>
          </div>
          <div className="h-[150px] xl:h-[200px] pt-5 flex flex-col justify-evenly gap-2 text-[#301751] font-bold">
            <div className="text-lg">Track</div>
            <div>
              <ul className="pl-4 text-sm list-disc list-inside marker:text-xl">
                <li>Uptime</li>
                <li>Response times</li>
                <li>Errors</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="bg-[#C499FF] shadow-[0_0_50px_5px_#63438D] rounded-3xl p-5 h-[320px] w-[250px] md:w-[220px] lg:w-[250px] xl:h-[350px] xl:w-[300px] "
          ref={secondRef}
        >
          <div className="flex flex-col items-center text-black gap-3 text-xl font-bold mt-2">
            <Image src="/images/monitor.svg" alt="" width={55} height={55} />
            <div>Businesses</div>
          </div>
          <div className="h-[150px] xl:h-[200px] pt-5 flex flex-col justify-evenly gap-2 text-[#301751] font-bold">
            <div className="text-lg">Monitor</div>
            <div>
              <ul className="pl-4 text-sm list-disc list-inside marker:text-xl">
                <li>Visitor Trends</li>
                <li>Performance</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="bg-[#C499FF] shadow-[0_0_50px_5px_#63438D] rounded-3xl p-5 h-[320px] w-[250px] md:w-[220px] lg:w-[250px] xl:h-[350px] xl:w-[300px] "
          ref={thirdRef}
        >
          <div className="flex flex-col items-center text-black gap-3 text-xl font-bold mt-2">
            <Image src="images/start-ups.svg" alt="" width={65} height={65} />
            <div>Start-Ups</div>
          </div>
          <div className="h-[150px] xl:h-[200px] pt-5 flex flex-col justify-evenly gap-2 text-[#301751] font-bold">
            <div className="text-lg">Get</div>
            <div>
              <ul className="pl-4 text-sm list-disc list-inside marker:text-xl">
                <li>Insights</li>
                <li>No expensive tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;
