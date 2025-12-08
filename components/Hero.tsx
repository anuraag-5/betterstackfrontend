"use client";

import { delaFont } from "@/app/fonts/fonts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
const Hero = () => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(circleRef.current, {
        opacity: 0.6,
        scale: 0.7
    }, {
        opacity: 0.4,
        scale: 1.8,
        repeat: -1,
        yoyo: true
    })
  }, { dependencies: []})
  return (
    <div className='text-black flex flex-col min-h-screen bg-linear-to-b from-[#C499FF] to-[#745A97] rounded-[36px] px-24'>
        <div className='flex justify-between mt-8'>
            <div className={'px-5 py-1 border-3 border-white rounded-full text-white ' + delaFont.className }>Nexus</div>
            <div className="px-5 py-1 bg-white rounded-full flex justify-center items-center text-[14px]">⭐ Star us on Github</div>
        </div>
        <div className='flex'>
            <div>
                <div className="bg-white px-4 py-1 flex gap-2 rounded-full items-center">
                    <div className="relative w-3 h-3">
                        <div className="bg-[#a05cff] w-full h-full rounded-full"></div>
                        <div className="absolute rounded-full bg-[#C499FF] top-0 bottom-0 left-0 right-0" ref={circleRef}></div>
                    </div>
                    <div className="text-[10px] font-bold">Built with Next.js & Rust</div>
                </div>
                <div></div>
                <div></div>
            </div>
            <div></div>
        </div>
    </div>
  )
}

export default Hero;