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

enum GraphType {
  "Last Hour",
  "Last Day",
  "Last Month",
}

const Project = ({ params }: { params: Promise<{ domain: string }> }) => {
  const domainName = use(params).domain;
  const { user, websites } = useUserStore();
  const website = websites!.filter((w) => w.domain == domainName);
  const nextJsScript = `
     import Script from "next/script";

     <Script
       defer
       data-domain="your-domain.com" // Replace with your domain
       src="http://localhost:3001/snippet"
     />
  `;
  const htmlScript = `
     <script defer data-domain="your-website.com"
     src="https://monitoryour.website/tracking-script.js"></script>
  `;
  const [selectedTabType, setSelectTabType] = useState("analysis");
  const [selectedGrpahType, setSelectedGrpahType] = useState<GraphType>(
    GraphType["Last Hour"]
  );
  const [lastHourData, setLastHourData] = useState<MinuteView[]>([]);
  const [lastDayData, setLastDayData] = useState<HourlyView[]>([]);
  const [lastDailyData, setLastDailyData] = useState<DailyView[]>([]);

  const handleTabChange = (tab: string) => setSelectTabType(tab);

  useEffect(() => {
    const getGraphData = async () => {
      const lastHourViews = await getWebsiteLastHourViews(domainName, user!.id);
      const hourlyViews = await getWebsiteHourlyViews(domainName, user!.id);
      const dailyViews = await getWebsiteDailyViews(domainName, user!.id);

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
        <span className="text-[#777777]">{domainName}</span>
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
        <div className="flex-1 bg-[#181818] rounded-4xl py-8 px-7">
          {website[0].isSnippetAdded ? (
            <div></div>
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
                <p className="text-[14px] text-gray-400">Snippet is not configured for your website, add the code below to get started.</p>
              </div>
              <CodeBlock language="javascript" code={nextJsScript} />
              <CodeBlock language="html" code={htmlScript} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
