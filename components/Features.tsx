"use client";

import Star from "./Star";
import Cards from "./Cards";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { kapakanaFont } from "@/app/fonts/fonts";
import { useWidth } from "@/hooks/useWidth";

gsap.registerPlugin(ScrollTrigger);
const Features = () => {
  const width = useWidth();
  const mainRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const secondCardRef = useRef<HTMLDivElement | null>(null);
  const thirdCardRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if(!width || width < 768) return;
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: mainRef.current,
            start: "top -20%",
            end: "end -120%",
            pin: true,
            scrub: 2
        }
    });

    tl.fromTo(firstCardRef.current, {
        rotate: -3,
        x:50
    }, {
        rotate: -8,
        x: 0
    }, 0)
    tl.fromTo(secondCardRef.current, {
        rotate: 3,
        y: 5
    }, {
        rotate: 6,
        y: 30
    }, 0)
    tl.fromTo(thirdCardRef.current, {
        rotate: 5,
        x: -50
    }, {
        rotate: 10,
        x: 0
    }, 0)

  }, { dependencies: [ width ] })
  return (
    <div className="w-full flex flex-col items-center gap-3 xl:gap-20 bg-linear-to-b from-[#D9D9D9] to-[#513D6A] pb-25" ref={mainRef}>
        <div className="flex flex-col my-14 items-center gap-13">
            <div className="flex items-center font-bold gap-3 py-[4px] px-4 bg-[#301751] text-[#C499FF] text-[11px] w-fit rounded-full">
                <Star />
                Features
            </div>
            <div className="flex flex-col items-center text-2xl md:text-4xl lg:text-5xl text-black gap-2 lg:gap-5">
                <div>Powerful Analytics And</div>
                <div className="flex gap-4 items-center relative">Real-Time <div className={kapakanaFont.className + " relative top-1 lg:top-2"}>Monitoring</div></div>
            </div>
        </div>
        <Cards refs={[ firstCardRef, secondCardRef, thirdCardRef ]} />
    </div>
  )
}

export default Features;