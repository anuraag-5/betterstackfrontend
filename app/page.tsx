"use client";

import Hero from "@/components/Hero";
import gsap from "gsap";
import { LenisRef, ReactLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import InfiniteTech from "@/components/InfiniteTech";
import Features from "@/components/Features";

gsap.registerPlugin(useGSAP);
const LandingPage = () => {
  const lenisRef = useRef<LenisRef | null>(null);
  useEffect(() => {
    function update(time: number) {
      lenisRef!.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);
  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <section className="p-3 bg-[#D9D9D9] flex flex-col items-center overflow-x-hidden">
        <Hero />
        <InfiniteTech />
      </section>
      <section>
        <Features />
      </section>
      <section className="min-h-screen w-full bg-black -mt-px">Hi</section>
    </ReactLenis>
  );
};

export default LandingPage;
