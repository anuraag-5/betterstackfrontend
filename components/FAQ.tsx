"use client";

import FAQsCards from "./FAQsCards";
import Star from "./Star";
import { kapakanaFont } from "@/app/fonts/fonts";

const FAQ = () => {

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#D9D9D9] to-[#513D6A] flex flex-col items-center justify-evenly gap-12 pt-5">
      <div className="flex flex-col items-center gap-10">
        <div className="flex items-center font-bold gap-3 py-[4px] px-4 bg-[#301751] text-[#C499FF] text-[11px] w-fit rounded-full">
          <Star />
          FAQ
        </div>
        <div className="flex flex-col items-center text-2xl md:text-4xl lg:text-[40px] text-black gap-2 lg:gap-3">
          <div>QUESTIONS ?</div>
          <div className="flex gap-4 items-center relative">
            We’ve got
            <div
              className={kapakanaFont.className + " relative top-1 lg:top-2"}
            >
              answers.
            </div>
          </div>
          <div className="flex flex-col items-center text-[12px] md:text-sm text-[#2c2c2c]">
            <div>
              Find answers to common questions about how our
            </div>
            <div>platform helps you monitor data.</div>
          </div>
        </div>
      </div>
      <FAQsCards />
    </div>
  );
};

export default FAQ;
