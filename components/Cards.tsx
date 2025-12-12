"use client";

import { cards } from "@/lib/types";
import Image from "next/image";
import { RefObject } from "react";

const Cards = ({ refs }: { refs: RefObject<HTMLDivElement | null>[]}) => {
  return (
    <div className="flex flex-col md:flex-row mb-7 md:mb-15 gap-5 md:gap-0">
        {
            cards.map((card, i) => (
                <div key={i} ref={refs[i]} className={"w-[230px] h-[300px] lg:w-[300px] lg:h-[370px] bg-[#301751] rounded-3xl flex flex-col items-center p-2 lg:p-4 gap-3" + (i === 0 ? " md:rotate-[-3deg] md:translate-x-[50px]" : i === 1 ? " md:rotate-[3deg] md:translate-y-[15px] z-30 shadow-[0_0_50px_6px_#B17BFC]" : " md:rotate-[5deg] md:translate-y-[24px] md:translate-x-[-50px]")}>
                    <Image 
                    src={card.iconUrl}
                    alt=""
                    width={100}
                    height={100}
                    className="p-8"
                    />
                    <div className="flex-1 flex flex-col justify-between w-full bg-linear-to-b from-[#D2B1FF] to-[#745A97] rounded-2xl px-3 py-7 lg:px-4">
                        <div>
                            {
                                card.title.map((t) => (
                                    <div key={t} className="text-md lg:text-xl text-[#301751] font-medium">{t}</div>
                                ))
                            }
                        </div>
                        <div>
                            { card.subTitle.map((st) => (
                                <div key={st} className="text-[10px] lg:text-[12px] bg-clip-text bg-linear-to-r from-[#ffffff] to-[#c4c4c4] text-transparent">{st}</div>
                            ))}
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Cards;