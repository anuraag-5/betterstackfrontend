"use client";

import { delaFont } from "@/app/fonts/fonts";
import { useWidth } from "@/hooks/useWidth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Star from "./Star";

const Hero = () => {
  const router = useRouter();
  const width = useWidth();
  return (
    <div className='text-black flex flex-col min-h-screen bg-linear-to-b from-[#C499FF] to-[#745A97] rounded-[12px] md:rounded-[36px] px-4 md:px-4 xl:px-8 2xl:px-24 overflow-x-hidden  max-w-[1600px] max-h-[800px] w-full'>
        <div className='flex justify-between mt-8'>
            <div className={'px-5 py-1 border-3 border-white rounded-full text-white text-[14px] md:text-[16px] ' + delaFont.className }>Nexus</div>
            <Link 
            className="px-5 py-1 bg-white rounded-full flex justify-center items-center text-[12px] md:text-[14px]"
            href="https://github.com/anuraag-5/betterstackrust.git"
            target="_blank"
            >
                ⭐ Star us on Github
            </Link>
        </div>
        <div className='flex flex-col lg:flex-row mt-20 justify-between lg:pl-12 xl:pl-20 relative max-w-[1300px] flex-1'>
            <div className="flex flex-col justify-evenly mb-13">
                <div className="bg-white px-4 py-[3px] flex gap-2 rounded-full items-center w-fit">
                    <Star /> 
                    <div className="text-[10px] font-bold">Built with Next.js & Rust</div>
                </div>
                <div className="flex flex-col justify-evenly min-h-[330px]">
                    <div className="my-4">
                        <div className="text-[30px] md:text-[40px] xl:text-[50px] text-transparent bg-clip-text bg-linear-to-r from-[#ffffff] to-[#c4c4c4]">Real-Time</div>
                        <div className="text-[30px] md:text-[40px] xl:text-[50px] text-transparent bg-clip-text bg-linear-to-r from-[#ffffff] to-[#c4c4c4]">Monitoring.</div>
                        <div className="text-[30px] md:text-[40px] xl:text-[50px] text-transparent bg-clip-text bg-linear-to-r from-[#ffffff] to-[#c4c4c4]">Zero Guesswork.</div>
                    </div>
                    <div className="text-black/60 md:mt-3 text-[14px] md:text-[16px]">
                        <div>Instant uptime checks, performance analytics,</div>
                        <div> and smart alerts powered by Rust-level speed for</div>
                        <div> absolute monitoring precision.</div>
                    </div>
                </div>
                <div 
                className="bg-[#301751] py-2 px-5 rounded-full w-fit text-white font-semibold mt-4 cursor-pointer"
                onClick={() => router.push("/signin")}
                >Get Started</div>
            </div>
            <div className="flex-1 min-h-[250px]"></div>
            {
                width > 1023 ? (
                    <Image
                    src="/images/hero-image-main.png" 
                    alt=""
                    fill
                    className="object-contain lg:translate-x-120 xl:translate-x-110"
                    priority
                    />
                ) : width > 0 ? (
                    (
                        <Image
                        src="/images/hero-image-main.png" 
                        alt=""
                        fill
                        className="object-contain translate-y-60"
                        priority
                        />
                    )
                ) : null
            }
        </div>
    </div>
  )
}

export default Hero;