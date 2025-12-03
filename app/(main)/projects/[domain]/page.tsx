"use client";

import { DailyView, HourlyView, MinuteView } from "@/lib/types";
import { useUserStore } from "@/lib/userStore";
import {
  getWebsiteDailyViews,
  getWebsiteHourlyViews,
  getWebsiteLastHourViews,
} from "@/lib/websiteFunctions";
import { use, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import CodeBlock from "@/components/Code";
import Image from "next/image";
import AreaCharts from "@/components/AreaChart";
import PagesTable from "@/components/PagesTable";
import Overview from "@/components/Overview";

enum GraphType {
  LAST_HOUR = "Last Hour",
  LAST_DAY = "Last Day",
  LAST_MONTH = "Last Month",
}

const Project = ({ params }: { params: Promise<{ domain: string }> }) => {
  const domainName = use(params).domain;
  const { user, websites } = useUserStore();
  const website = websites!.filter((w) => w.domain == domainName);
  const nextJsScript = `
     import Script from "next/script";

     <Script
       src="http://localhost:3001/snippet"
       strategy="afterInteractive"
     />
  `;
  const htmlScript = `
     <script
     src="http://localhost:3001/snippet"
     >
     </script>
  `;
  const [selectedTabType, setSelectTabType] = useState("analysis");
  const [selectedGraphType, setSelectedGraphType] = useState<GraphType>(
    GraphType.LAST_HOUR
  );
  const [lastHourData, setLastHourData] = useState<MinuteView[]>([]);
  const [lastDayData, setLastDayData] = useState<HourlyView[]>([]);
  const [lastDailyData, setLastDailyData] = useState<DailyView[]>([]);
  const [isTabOpen, setIsTabOpen] = useState(false);

  const handleTabChange = (tab: string) => setSelectTabType(tab);
  const toggleTabType = (tab: GraphType) => {
    setSelectedGraphType(tab);
    setIsTabOpen(false);
  };
  const toggleOpen = () => setIsTabOpen((open) => !open);

  useEffect(() => {
    const getGraphData = async () => {
      const lastHourViews = await getWebsiteLastHourViews(domainName, user!.id);
      const hourlyViews = await getWebsiteHourlyViews(domainName, user!.id);
      const dailyViews = await getWebsiteDailyViews(domainName, user!.id);
      console.log("Hourly Views Data:", hourlyViews);

      setLastHourData(lastHourViews.data!);
      setLastDayData(hourlyViews.data!);
      setLastDailyData(dailyViews.data!);
    };

    getGraphData();
  }, [user, domainName]);
  return (
    <div className="flex-1 flex flex-col justify-between pt-6 pl-4">
      <div className="text-[#bfbfbf]">
        Your Projects &nbsp; &gt; &nbsp;{" "}
        <span className="text-[#777777] text-[15px]">{domainName}</span>
      </div>
      <div className="flex-1 flex flex-col gap-5 bg-[#262626] mt-6 rounded-tl-4xl rounded-bl-4xl px-12 pt-12 pb-5 overflow-y-auto">
        <div className="flex gap-4">
          <div
            className="px-5 py-2 text-[14px] relative cursor-pointer rounded-md"
            onClick={() => handleTabChange("analysis")}
          >
            Analysis
            {selectedTabType == "analysis" ? (
              <motion.div
                className="absolute inset-0 bg-white rounded-md"
                layoutId="background"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            ) : null}
          </div>
          <div
            className="px-5 py-2 text-[14px] relative cursor-pointer"
            onClick={() => handleTabChange("overview")}
          >
            Overview
            {selectedTabType == "overview" ? (
              <motion.div
                className="absolute inset-0 bg-white rounded-md"
                layoutId="background"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            ) : null}
          </div>
          <div
            className="px-5 py-2 text-[14px] relative cursor-pointer"
            onClick={() => handleTabChange("issues")}
          >
            Issues
            {selectedTabType == "issues" ? (
              <motion.div
                className="absolute inset-0 bg-white rounded-md"
                layoutId="background"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            ) : null}
          </div>
        </div>
        <div className="flex-1 bg-[#181818] rounded-4xl pt-10 pb-8 px-12">
          {selectedTabType == "analysis" ? (
            website[0].isSnippetAdded ? (
              <div className="flex flex-col gap-5">
                <div className="flex gap-3 items-center mb-5">
                  <div>Filter by :</div>
                  <div className="relative flex gap-4 items-center  bg-[#262626] px-3 py-1 rounded-md">
                    <div className="text-[#C499FF] text-[14px] font-medium min-w-[80px]">
                      {selectedGraphType}
                    </div>
                    <Image
                      src="/images/arrow-down.svg"
                      alt=""
                      width={9}
                      height={15}
                      onClick={toggleOpen}
                      className="cursor-pointer"
                    />
                    {isTabOpen ? (
                      <div className="absolute top-8 right-0 left-0 text-[#C499FF] text-[14px] font-medium bg-[#262626] px-3 py-1 rounded-lg z-10">
                        <div
                          className="border-b border-gray-400 p-2 cursor-pointer"
                          onClick={() => toggleTabType(GraphType.LAST_HOUR)}
                        >
                          Last Hour
                        </div>
                        <div
                          className="border-b border-gray-400 p-2 cursor-pointer"
                          onClick={() => toggleTabType(GraphType.LAST_DAY)}
                        >
                          Last Day
                        </div>
                        <div
                          className="pt-2 pl-2 cursor-pointer"
                          onClick={() => toggleTabType(GraphType.LAST_MONTH)}
                        >
                          Last Month
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  {selectedGraphType == GraphType.LAST_HOUR ? (
                    <AreaCharts
                      minuteViews={lastHourData}
                      hourlyViews={null}
                      dailyViews={null}
                    />
                  ) : selectedGraphType == GraphType.LAST_DAY ? (
                    <AreaCharts
                      minuteViews={null}
                      hourlyViews={lastDayData}
                      dailyViews={null}
                    />
                  ) : (
                    <AreaCharts
                      minuteViews={null}
                      hourlyViews={null}
                      dailyViews={lastDailyData}
                    />
                  )}
                </div>
                <div>
                  <PagesTable domain={domainName} />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col justify-center items-center gap-3">
                  <Image
                    src="/images/no-data.svg"
                    alt=""
                    width={100}
                    height={100}
                    className="opacity-70"
                  />
                  <p>No Analysis Data</p>
                  <p className="text-[14px] text-gray-400">
                    Snippet is not configured for your website, add the code
                    below to get started.
                  </p>
                </div>
                <CodeBlock language="javascript" code={nextJsScript} />
                <CodeBlock language="html" code={htmlScript} />
              </div>
            )
          ) : selectedTabType == "overview" ? (
            <Overview domain={domainName}/>
          ) : (
            <div>Issues</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
