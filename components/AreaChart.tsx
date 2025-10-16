"use client";

import { DailyView, HourlyView } from "@/lib/types";
import { Area, Tooltip, AreaChart, XAxis, YAxis } from "recharts";

const AreaChartsPerHour = ({
  hourlyViews,
  dailyViews,
}: {
  hourlyViews: HourlyView[] | null;
  dailyViews: DailyView[] | null;
}) => {
  const hourlyData =
    hourlyViews?.map((d) => ({
      hour: d.hour,
      Views: d.views,
      amt: 1400,
    })) ?? [];

  const dailyData =
    dailyViews?.map((d) => ({
      day: d.day,
      Views: d.views,
      amt: 1400,
    })) ?? [];

  const isHourly = hourlyData.length > 0;

  return (
    <div>
      <AreaChart
        width={730}
        height={300}
        data={isHourly ? hourlyData : dailyData}
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DEC6FF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#C499FF" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey={isHourly ? "hour" : "day"}
          interval={"preserveStartEnd"}
          tickFormatter={(value) =>
            isHourly
              ? new Date(value).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : new Date(value).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })
          }
          tickMargin={16}
          tick={{ fill: "#7A6A9E" }} // tick label color
          tickLine={{ stroke: "#7A6A9E" }} // tick line color
          axisLine={{ stroke: "#7A6A9E" }}
        />

        <YAxis
          tickMargin={16}
          tick={{ fill: "#7A6A9E" }} // tick label color
          tickLine={{ stroke: "#7A6A9E" }} // tick line color
          axisLine={{ stroke: "#7A6A9E" }} // (optional) axis line color
        />
        <Tooltip
          labelClassName="text-[#FBBB3F]"
          contentStyle={{ backgroundColor: "#6b7280" }}
          itemStyle={{ color: "pink" }}
        />

        <Area
          type="monotone"
          dataKey="Views"
          stroke="#C499FF"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartsPerHour;
