"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getAvgRespTime, getTotalUniqueUsers, getTotalViews, getUptimePercentage } from "@/lib/websiteFunctions";

const Overview = ({ domain }: { domain: string }) => {
  const [ totalViews, setTotalViews ] = useState(0);
  const [ uniqueUsers, setUniqueUsers ] = useState(0);
  const [ avgRespTime, setAvgRespTime ] = useState(0);
  const [ uptimePercent, setUptimePercent ] = useState(0);
  useEffect(() => {
    const getAllData = async () => {
        const uniqueUsers = await getTotalUniqueUsers(domain);
        const totalViews = await getTotalViews(domain);
        const avgRespTime = await getAvgRespTime(domain);
        const uptimePercent = await getUptimePercentage(domain);

        setUniqueUsers(uniqueUsers.data!.unique_users);
        setTotalViews(totalViews.data!.total_views);
        setAvgRespTime(avgRespTime.data!.avg);
        setUptimePercent(uptimePercent.data!.uptime_percent);
        console.log(avgRespTime.data!.avg);
        console.log(uptimePercent.data!.uptime_percent);
    }
    getAllData()
  }, [ domain ])
  return (
    <div className="w-fit">
      <div>
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] inline-block text-xl">Popularity :</div>
        <div className="flex flex-col xl:flex-row my-7 gap-8">
          <div className="min-w-[275px] md:min-w-[300px] flex flex-col items-center border-2 border-[#767676] rounded-2xl py-5">
            <Image 
            src="/images/total-views.svg"
            alt=""
            width={50}
            height={50}
            />
            <div className="text-md md:text-lg">Total Views</div>
            <div className="text-xl md:text-3xl text-[#C499FF] mt-2">{totalViews}</div>
          </div>
          <div className="min-w-[275px] md:min-w-[300px] flex flex-col items-center border-2 border-[#767676] rounded-2xl py-5">
            <Image 
            src="/images/unique-views.svg"
            alt=""
            width={46}
            height={46}
            />
            <div className="text-md md:text-lg mt-2">Unique Users</div>
            <div className="text-xl md:text-3xl text-[#C499FF] mt-2">{uniqueUsers}</div>
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