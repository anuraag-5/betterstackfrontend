"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import Issues from "@/components/Issues";
import Overview from "@/components/Overview";
import CodeBlock from "@/components/Code";
import AreaCharts from "@/components/AreaChart";
import PagesTable from "@/components/PagesTable";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/userStore";
import { use, useEffect, useState } from "react";
import {
  DailyView,
  HourlyView,
  htmlScript,
  MinuteView,
  nextJsScript
} from "@/lib/types";
import {
  getWebsiteDailyViews,
  getWebsiteHourlyViews,
  getWebsiteLastHourViews,
} from "@/lib/websiteFunctions";

enum GraphType {
  LAST_HOUR = "Last Hour",
  LAST_DAY = "Last Day",
  LAST_MONTH = "Last Month",
}

const Project = ({ params }: { params: Promise<{ domain: string }> }) => {
  const { user, websites } = useUserStore();
  const router = useRouter();
  const domainName = use(params).domain;
  const website = websites!.filter((w) => w.domain === domainName);

  const [selectedTabType, setSelectTabType] = useState("analysis");
  const [selectedGraphType, setSelectedGraphType] = useState<GraphType>(
    GraphType.LAST_HOUR
  );
  const [lastHourData, setLastHourData] = useState<MinuteView[]>([]);
  const [lastDayData, setLastDayData] = useState<HourlyView[]>([]);
  const [lastDailyData, setLastDailyData] = useState<DailyView[]>([]);
  const [isTabOpen, setIsTabOpen] = useState(false);

  const handleTabChange = (tab: string) => setSelectTabType(tab);
  const handleAddClicked = () => router.push("/projects/add");
  const toggleTabType = (tab: GraphType) => {
    setSelectedGraphType(tab);
    setIsTabOpen(false);
  };
  const toggleOpen = () => setIsTabOpen((open) => !open);

  useEffect(() => {
    const getGraphData = async () => {
      const [ lastHourViews, hourlyViews, dailyViews ] = await Promise.all([
        getWebsiteLastHourViews(domainName, user!.id),
        getWebsiteHourlyViews(domainName, user!.id),
        getWebsiteDailyViews(domainName, user!.id)
      ]);

      setLastHourData(lastHourViews.data!);
      setLastDayData(hourlyViews.data!);
      setLastDailyData(dailyViews.data!);
    };

    getGraphData();
  }, [user, domainName]);
  return (
    <div className="flex-1 flex flex-col justify-between pt-6 md:pl-4">
      <div className="text-[#bfbfbf] flex justify-between items-center">
        <div className="flex">
          <div className="hidden md:block">
            Your Projects &nbsp; &gt; &nbsp;{" "}
          </div>
          <div className="text-[#777777] text-[15px] pl-2 md:pl-0">
            {domainName}
          </div>
        </div>
        <div
          className="cursor-pointer mr-5 md:mr-7 text-[12px] md:text-[14px] text-black py-1 px-2 md:py-2 md:px-4 bg-[#C499FF] rounded-full"
          onClick={handleAddClicked}
        >
          Add +
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col gap-5 bg-[#181818] md:bg-[#262626] mt-6 rounded-4xl md:rounded-tl-4xl md:rounded-bl-4xl md:rounded-tr-[0px] md:rounded-br-[0px] px-6 md:px-12 pt-12 pb-5 overflow-y-scroll">
        <div className="flex gap-4 justify-around md:justify-start">
          <div
            className="px-5 py-2 text-[12px] md:text-[14px] relative cursor-pointer rounded-md"
            onClick={() => handleTabChange("analysis")}
          >
            Analysis
            {
              selectedTabType === "analysis" ? (
                <motion.div
                  className="absolute inset-0 bg-white rounded-md"
                  layoutId="background"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
              ) : null
            }
          </div>
          <div
            className="px-5 py-2 text-[12px] md:text-[14px] relative cursor-pointer"
            onClick={() => handleTabChange("overview")}
          >
            Overview
            {
              selectedTabType === "overview" ? (
                <motion.div
                  className="absolute inset-0 bg-white rounded-md"
                  layoutId="background"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
              ) : null
            }
          </div>
          <div
            className="px-5 py-2 text-[12px] md:text-[14px] relative cursor-pointer"
            onClick={() => handleTabChange("issues")}
          >
            Issues
            {
              selectedTabType === "issues" ? (
                <motion.div
                  className="absolute inset-0 bg-white rounded-md"
                  layoutId="background"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
              ) : null
            }
          </div>
        </div>
        <div
          className={
            "flex-1 flex justify-center md:bg-[#181818] rounded-4xl pt-10 md:pb-8 px-3 md:px-12" +
            (selectedTabType === "analysis" ? "" : " max-h-[1200px]") +
            (selectedTabType === "overview" ? " md:justify-start" : "")
          }
        >
          {selectedTabType === "analysis" ? (
            website[0].isSnippetAdded ? (
              <div className="flex flex-col gap-5 w-full">
                <div className="flex gap-3 items-center mb-5">
                  <div>Filter by :</div>
                  <div className="relative flex gap-4 items-center bg-[#262626] px-3 py-1 rounded-md">
                    <div className="text-[#C499FF] text-[12px] md:text-[14px] font-medium min-w-[80px]">
                      {selectedGraphType}
                    </div>
                    <Image
                      src="/images/arrow-down.svg"
                      alt=""
                      width={12}
                      height={15}
                      onClick={toggleOpen}
                      className="cursor-pointer"
                    />
                    {isTabOpen ? (
                      <div className="absolute top-8 right-0 left-0 text-[#C499FF] text-[12px] md:text-[14px] font-medium bg-[#262626] px-3 py-1 rounded-lg z-10">
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
                  {selectedGraphType === GraphType.LAST_HOUR ? (
                    <AreaCharts
                      minuteViews={lastHourData}
                      hourlyViews={null}
                      dailyViews={null}
                    />
                  ) : selectedGraphType === GraphType.LAST_DAY ? (
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
              <div className="flex flex-col items-center justify-evenly rounded-lg">
                <div className="flex flex-col justify-center items-center gap-3">
                  <Image
                    src="/images/no-data.svg"
                    alt=""
                    width={100}
                    height={100}
                    className="opacity-70"
                  />
                  <p>No Analysis Data</p>
                  <p className="text-[12px] md:text-[14px] text-gray-400">
                    Snippet is not configured for your website, add the code
                    below to get started.
                  </p>
                </div>
                <CodeBlock language="javascript" code={nextJsScript} />
                <CodeBlock language="html" code={htmlScript} />
              </div>
            )
          ) : selectedTabType === "overview" ? (
            <Overview domain={domainName} />
          ) : (
            <div>
              <Issues />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
