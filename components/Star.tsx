"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Star = () => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        circleRef.current,
        {
          opacity: 0.6,
          scale: 0.7,
        },
        {
          opacity: 0.4,
          scale: 2.5,
          repeat: -1,
          yoyo: true,
        }
      );
    },
    { dependencies: [] }
  );
  return (
    <div className="relative w-2 h-2">
      <div className="bg-[#a05cff] w-full h-full rounded-full"></div>
      <div
        className="absolute rounded-full bg-[#C499FF] top-0 bottom-0 left-0 right-0"
        ref={circleRef}
      ></div>
    </div>
  );
};

export default Star;
