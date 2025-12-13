"use client";

import gsap from "gsap";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import InfiniteTech from "@/components/InfiniteTech";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { LenisRef, ReactLenis } from "lenis/react";
import FAQ from "@/components/FAQ";
import CallToSection from "@/components/CallToSection";

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
      <section className="pt-3 pr-3 pl-3 bg-[#D9D9D9] flex flex-col items-center overflow-x-hidden">
        <Hero />
        <InfiniteTech />
      </section>
      <section>
        <Features />
      </section>
      <section>
        <UseCases />
      </section>
      <section>
        <FAQ />
      </section>
      <section>
        <CallToSection />
      </section>
    </ReactLenis>
  );
};

export default LandingPage;
