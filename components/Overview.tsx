"use client";

import { getTotalUniqueUsers, getTotalViews } from "@/lib/websiteFunctions";
import Image from "next/image";
import { useEffect, useState } from "react";

const Overview = ({ domain }: { domain: string }) => {
  const [ totalViews, setTotalViews ] = useState(0);
  const [ uniqueUsers, setUniqueUsers ] = useState(0);
  useEffect(() => {
    const getAllData = async () => {
        const uniqueUsers = await getTotalUniqueUsers(domain);
        const totalViews = await getTotalViews(domain);

        setUniqueUsers(uniqueUsers.data!.unique_users);
        setTotalViews(totalViews.data!.total_views);
    }
    getAllData()
  }, [ domain ])
  return (
    <div className="w-fit">
      <div>
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] inline-block text-xl">Popularity :</div>
        <div className="flex my-5 gap-8">
          <div className="min-w-[300px] flex flex-col items-center border-2 border-[#767676] rounded-2xl py-5">
            <Image 
            src="/images/total-views.svg"
            alt=""
            width={50}
            height={50}
            />
            <div className="text-lg">Total Views</div>
            <div className="text-3xl text-[#C499FF] mt-2">{totalViews}</div>
          </div>
          <div className="min-w-[300px] flex flex-col items-center border-2 border-[#767676] rounded-2xl py-5">
            <Image 
            src="/images/unique-views.svg"
            alt=""
            width={46}
            height={46}
            />
            <div className="text-lg mt-2">Unique Users</div>
            <div className="text-3xl text-[#C499FF] mt-2">{uniqueUsers}</div>
          </div>
        </div>
      </div>
      {/* <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] inline-block text-xl">Analytics :</div>
        <div className="flex my-5 gap-8">
          <div className="min-w-[300px] flex flex-col items-center border-2 border-[#767676] rounded-2xl py-5">
            <Image 
            src="/images/total-views.svg"
            alt=""
            width={50}
            height={50}
            />
            <div className="text-lg">Total Views</div>
            <div className="text-3xl text-[#C499FF] mt-2">{totalViews}</div>
          </div>
          <div className="min-w-[300px] flex flex-col items-center border-2 border-[#767676] rounded-2xl py-5">
            <Image 
            src="/images/total-views.svg"
            alt=""
            width={50}
            height={50}
            />
            <div className="text-lg">Total Views</div>
            <div className="text-3xl text-[#C499FF] mt-2">{totalViews}</div>
          </div>
        </div> */}
    </div>
  )
}

export default Overview