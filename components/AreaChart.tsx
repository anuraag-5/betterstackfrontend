"use client";

import { useWidth } from "@/hooks/useWidth";
import { DailyView, HourlyView, MinuteView } from "@/lib/types";
import { Area, Tooltip, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

type Props = {
  minuteViews: MinuteView[] | null;
  hourlyViews: HourlyView[] | null;
  dailyViews: DailyView[] | null;
};

const AreaCharts = ({ minuteViews, hourlyViews, dailyViews }: Props) => {
  const size = useWidth();
  
  const minuteData =
    minuteViews?.map((d) => ({
      time: d.minute,
      views: d.views,
    })) ?? [];

  const hourlyData =
    hourlyViews?.map((d) => ({
      time: d.hour,
      views: d.views,
    })) ?? [];

  const dailyData =
    dailyViews?.map((d) => ({
      time: d.day,
      views: d.views,
    })) ?? [];

  // Pick best available data automatically
  const data =
    minuteData.length > 0
      ? minuteData
      : hourlyData.length > 0
      ? hourlyData
      : dailyData;

  const mode =
    minuteData.length > 0
      ? "minute"
      : hourlyData.length > 0
      ? "hour"
      : "day";

  return (
    <div style={{ width: size > 767 ? "75%": "93%", height: 320 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DEC6FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#C499FF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="time"
            tickMargin={16}
            tick={{ fill: "#7A6A9E" }}
            tickLine={{ stroke: "#7A6A9E" }}
            axisLine={{ stroke: "#7A6A9E" }}
            tickFormatter={(value) => {
              const date = new Date(value);

              if (mode === "minute") {
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }

              if (mode === "hour") {
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                });
              }

              return date.toLocaleDateString([], {
                month: "short",
                day: "numeric",
              });
            }}
          />

          <YAxis
            tickMargin={16}
            tick={{ fill: "#7A6A9E" }}
            tickLine={{ stroke: "#7A6A9E" }}
            axisLine={{ stroke: "#7A6A9E" }}
          />

          <Tooltip
            labelClassName="text-[#FBBB3F]"
            contentStyle={{ backgroundColor: "#6b7280" }}
            itemStyle={{ color: "white" }}
            formatter={(value) => [`${value} views`, ""]}
          />

          <Area
            type="monotone"
            dataKey="views"
            stroke="#C499FF"
            fillOpacity={1}
            fill="url(#colorViews)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaCharts;