"use client";

import { delaFont, poppinsFont } from "@/app/fonts/fonts";
import { useUserStore } from "@/lib/userStore";
import Image from "next/image";
import Link from "next/link";

const Projects = () => {
  const { websites } = useUserStore();
  return (
    <section className="w-full xl:px-20 md:px-12">
      <div
        className={
          delaFont.className + " text-[#FBBB3F] xl:text-[22px] text-[20px] mt-5"
        }
      >
        Your Projects
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 gap-y-8">
        {websites?.map((w) => (
          <Link
            key={w.domain}
            href={`/project/${w.domain}/dashboard`}
            className="cursor-pointer"
          >
            <div className="h-[160px] flex flex-col bg-[#25221D] justify-evenly px-9 rounded-2xl">
              <div className="flex justify-between items-center">
                <div
                  className={
                    delaFont.className +
                    " xl:text-[20px] lg:text-[18px] text-[17px] text-white"
                  }
                >
                  {w.domain}
                </div>
                <Image
                  src="/images/website.png"
                  alt=""
                  width={35}
                  height={35}
                />
              </div>
              <div
                className={
                  poppinsFont.className +
                  " font-medium text-[#FBBB3F] text-wrap lg:text-[16px] text-[14px]"
                }
              >
                {w.about}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Projects;
