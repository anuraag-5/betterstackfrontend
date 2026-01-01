"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import { Analytics, regions } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  getAvgRespTime,
  getAvgRespTimeByRegion,
  getTotalUniqueUsers,
  getTotalViews,
  getUptimePercentage,
  getUptimePercentageByRegion,
} from "@/lib/websiteFunctions";

const Overview = ({ domain }: { domain: string }) => {
  const [totalViews, setTotalViews] = useState(0);
  const [avgRespTime, setAvgRespTime] = useState(0);
  const [uniqueUsers, setUniqueUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uptimePercent, setUptimePercent] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [combinedUptime, setCombinedUptime] = useState(0);
  const [combinedAvgRespTime, setCombinedAvgRespTime] = useState(0);
  const [analyticByRegions, setAnalyticByRegions] = useState<null | Analytics>(
    null
  );

  const toggleDropdownOpen = () => setDropdownOpen((iv) => !iv);
  const toggleSelectedRegionType = (e: React.MouseEvent<HTMLDivElement>) => {
    const newRegion = e.currentTarget.dataset.id!;
    const newRegionData = analyticByRegions?.analyticByRegions.find(
      (data) => newRegion === data.region
    ) ?? {
      avgResp: combinedAvgRespTime,
      uptime: combinedUptime,
      region: newRegion,
    };
    setAvgRespTime(newRegionData!.avgResp);
    setUptimePercent(newRegionData!.uptime);
    setSelectedRegion(newRegion);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const getAllData = async () => {
      const [uniqueUsers, totalViews, avgRespTime, uptimePercent] =
        await Promise.all([
          getTotalUniqueUsers(domain),
          getTotalViews(domain),
          getAvgRespTime(domain),
          getUptimePercentage(domain),
        ]);

      const analyticByRegionsData = await Promise.all(
        regions?.map(async (region) => {
          const [avgRespByReg, uptimeByReg] = await Promise.all([
            getAvgRespTimeByRegion(domain, region),
            getUptimePercentageByRegion(domain, region),
          ]);

          if (!avgRespByReg.data || !uptimeByReg.data) {
            return {
              region,
              avgResp: 0,
              uptime: 0,
            };
          }

          return {
            region,
            avgResp: avgRespByReg.data.avg,
            uptime: uptimeByReg.data.uptime_percent,
          };
        }) || []
      );

      setUniqueUsers(uniqueUsers.data?.unique_users || 0);
      setTotalViews(totalViews.data?.total_views || 0);
      setCombinedAvgRespTime(avgRespTime.data?.avg || 0);
      setCombinedUptime(uptimePercent.data?.uptime_percent || 0);
      setAnalyticByRegions({
        analyticByRegions: analyticByRegionsData,
      });
    };
    getAllData().finally(() => setLoading(false));
  }, [domain]);
  return (
    <div className="w-fit">
      <div>
        <div className="flex gap-4">
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] inline-block text-xl">
            Analytics :
          </div>
          <div>
            <div className="mb-5">
              <div className="relative flex gap-4 items-center bg-[#262626] px-3 py-1 rounded-md">
                <div className="text-[#C499FF] text-[12px] md:text-[14px] font-medium min-w-[80px]">
                  {selectedRegion}
                </div>
                <Image
                  src="/images/arrow-down.svg"
                  alt=""
                  width={12}
                  height={15}
                  onClick={toggleDropdownOpen}
                  className="cursor-pointer"
                />
                {dropdownOpen ? (
                  <div className="absolute top-8 right-0 left-0 text-[#C499FF] text-[12px] md:text-[14px] font-medium bg-[#262626] px-3 py-1 rounded-lg z-10">
                    {regions?.map((region, i) => (
                      <div
                        className="border-b border-gray-400 p-2 cursor-pointer capitalize"
                        onClick={toggleSelectedRegionType}
                        data-id={region}
                        key={i}
                      >
                        {region}
                      </div>
                    ))}
                    <div
                      className="border-b border-gray-400 p-2 cursor-pointer capitalize"
                      onClick={toggleSelectedRegionType}
                      data-id="All Regions"
                    >
                      All Regions
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {!loading ? (
          <>
            <div className="flex flex-col xl:flex-row my-7 gap-8">
              <div className="min-w-[275px] md:min-w-[300px] flex flex-col items-center border-2 border-[#767676] rounded-2xl py-5">
                <Image
                  src="/images/time-white.svg"
                  alt=""
                  width={40}
                  height={40}
                />
                <div className="text-md md:text-lg pt-3">Avg Rsp Time</div>
                <div className="text-xl md:text-3xl text-[#C499FF] mt-2">
                  {selectedRegion === "All Regions"
                    ? Math.round(combinedAvgRespTime)
                    : Math.round(avgRespTime)}{" "}
                  ms
                </div>
              </div>
              <div className="min-w-[275px] md:min-w-[300px] flex flex-col items-center border-2 border-[#767676] rounded-2xl py-5">
                <Image
                  src="/images/unique-views.svg"
                  alt=""
                  width={46}
                  height={46}
                />
                <div className="text-md md:text-lg mt-2">Uptime</div>
                <div className="text-xl md:text-3xl text-[#C499FF] mt-2">
                  {selectedRegion === "All Regions"
                    ? Math.round(combinedUptime)
                    : Math.round(uptimePercent)}
                  %
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col xl:flex-row my-7 gap-8">
              <motion.div
                className="h-[200px] min-w-[275px] md:min-w-[300px] bg-[#767676] rounded-2xl"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
              <motion.div
                className="h-[170px] min-w-[275px] md:min-w-[300px] bg-[#767676] rounded-2xl"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
            </div>
          </>
        )}
      </div>
      <div>
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] inline-block text-xl">
          Popularity :
        </div>
        {!loading ? (
          <>
            <div className="flex flex-col xl:flex-row my-7 gap-8">
              <div className="min-w-[275px] md:min-w-[300px] flex flex-col items-center border-2 border-[#767676] rounded-2xl py-5">
                <Image
                  src="/images/total-views.svg"
                  alt=""
                  width={50}
                  height={50}
                />
                <div className="text-md md:text-lg">Total Views</div>
                <div className="text-xl md:text-3xl text-[#C499FF] mt-2">
                  {totalViews}
                </div>
              </div>
              <div className="min-w-[275px] md:min-w-[300px] flex flex-col items-center border-2 border-[#767676] rounded-2xl py-5">
                <Image
                  src="/images/unique-views.svg"
                  alt=""
                  width={46}
                  height={46}
                />
                <div className="text-md md:text-lg mt-2">Unique Users</div>
                <div className="text-xl md:text-3xl text-[#C499FF] mt-2">
                  {uniqueUsers}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col xl:flex-row my-7 gap-8">
              <motion.div
                className="h-[170px] min-w-[275px] md:min-w-[300px] bg-[#767676] rounded-2xl"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
              <motion.div
                className="h-[180px] min-w-[275px] md:min-w-[300px] bg-[#767676] rounded-2xl"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
export const dynamic = "force-dynamic";
