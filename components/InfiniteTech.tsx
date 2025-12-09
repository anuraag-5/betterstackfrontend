"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";
import { useWidth } from "@/hooks/useWidth";

gsap.registerPlugin(ScrollTrigger);
const InfiniteTech = () => {
  const width = useWidth();
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const firstRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "bottom top"
        }
    });

    tl.to(firstRef.current, {
        xPercent: -100,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      tl.to(
        secondRef.current,
        {
          xPercent: -100,
          duration: 18,
          repeat: -1,
          ease: "none",
        },
        0
      );
  }, { dependencies: []})
  return (
    <div className="flex w-full overflow-x-hidden my-15" ref={triggerRef}>
        <div className="flex justify-between min-w-full h-[80px]" ref={firstRef}>
            <Image src="/images/docker.svg" alt="" width={width > 767 ? 81 : 41 } height={width > 767 ? 81 : 41 }/>
            <Image src="/images/redis.svg" alt="" width={width > 767 ? 81 : 41 } height={width > 767 ? 81 : 41 }/>
            <Image src="/images/nextjs.svg" alt="" width={width > 767 ? 81 : 41 } height={width > 767 ? 81 : 41 }/>
            <Image src="/images/github.svg" alt="" width={width > 767 ? 81 : 41 } height={width > 767 ? 81 : 41 }/>
            <Image src="/images/rust.svg" alt="" width={width > 767 ? 81 : 41 } height={width > 767 ? 81 : 41 } className="mr-8 md:mr-18 lg:mr-30 xl:mr-46 2xl:mr-54"/>
        </div>
        <div className="flex justify-between min-w-full h-[80px]" ref={secondRef}>
            <Image src="/images/docker.svg" alt="" width={width > 767 ? 81 : 41 } height={width > 767 ? 81 : 41 }/>
            <Image src="/images/redis.svg" alt="" width={width > 767 ? 81 : 41 } height={width > 767 ? 81 : 41 }/>
            <Image src="/images/nextjs.svg" alt="" width={width > 767 ? 81 : 41 } height={width > 767 ? 81 : 41 }/>
            <Image src="/images/github.svg" alt="" width={width > 767 ? 81 : 41 } height={width > 767 ? 81 : 41 }/>
            <Image src="/images/rust.svg" alt="" width={width > 767 ? 81 : 41 } height={width > 767 ? 81 : 41 } className="mr-8 md:mr-18 lg:mr-30 xl:mr-46 2xl:mr-54"/>
        </div>
    </div>
  )
}

export default InfiniteTech;