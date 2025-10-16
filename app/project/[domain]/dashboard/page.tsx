"use client";

import { use, useEffect, useState } from "react";
import { DailyView, HourlyView } from "@/lib/types";
import { useUserStore } from "@/lib/userStore";
import { getWebsiteDailyViews, getWebsiteHourlyViews } from "@/lib/websiteFunctions";
import AreaChartsPerHour from "@/components/AreaChart";

const ProjectPage = ({ params }: { params: Promise<{ domain: string }> }) => {
  const [chartType, setChartType] = useState("hourly");
  const [hourlyViews, setHourlyViews] = useState<HourlyView[]>([]);
  const [dailyViews, setDailyViews] = useState<DailyView[]>([]);
  const [loading, setLoading] = useState(true);
  const { domain } = use(params);
  const { user } = useUserStore();

  const handleChartTypeChange = (chartType: string) => {
    setChartType(chartType);
  };

  useEffect(() => {
    const getHourlyAndDailyViews = async () => {
      try {
        const hourlyRes = await getWebsiteHourlyViews(domain, user!.id);
        const dailyRes = await getWebsiteDailyViews(domain, user!.id);
        setHourlyViews(hourlyRes.data!);
        setDailyViews(dailyRes.data!);
      } catch (_) {
      } finally {
        setLoading(false);
      }
    };
    getHourlyAndDailyViews();
  }, [setHourlyViews, domain, user]);

  return (
    <div>
      <button onClick={() => handleChartTypeChange("daily")} className="cursor-pointer">Daily</button>
      <button onClick={() => handleChartTypeChange("hourly")} className="cursor-pointer mb-10">hourly</button>
      {chartType == "hourly" ? (
        <div>
          <div>
            {loading ? (
              <div className="text-3xl text-red-800">Loading...</div>
            ) : (
              // JSON.stringify(hourlyViews)
              null
            )}
          </div>
          <AreaChartsPerHour hourlyViews={hourlyViews} dailyViews={null} />
        </div>
      ) : (
        <div>
          <div>
            {loading ? (
              <div className="text-3xl text-red-800">Loading...</div>
            ) : (
              JSON.stringify(dailyViews)
            )}
          </div>
          <AreaChartsPerHour dailyViews={dailyViews} hourlyViews={null} />
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
