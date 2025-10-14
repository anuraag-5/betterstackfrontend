"use client";

import { HourlyView } from "@/lib/types";
import { Area, Tooltip, AreaChart, XAxis, YAxis } from "recharts";

const AreaChartsPerHour = ({ hourlyViews }: { hourlyViews: HourlyView[] }) => {
  const data: { hour: string; Views: number; amt: number }[] = [];
  hourlyViews.forEach((d) =>
    data.push({ hour: d.hour, Views: d.views, amt: 1400 })
  );
  return (
    <div>
      <AreaChart
        width={730}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        className=""
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9C9C8C" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F5F5DC" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="hour" interval={0} tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} tickMargin={18}  style={{backgroundColor: "red"}} padding={ {}}/>
        <YAxis tickMargin={16}/>
        <Tooltip
          labelClassName="text-[#FBBB3F]"
          contentStyle={{ backgroundColor: "#6b7280" }}
          itemStyle={{ color: "pink" }}
        />
        <Area
          type="monotone"
          dataKey="Views"
          stroke="#F5F5DC"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartsPerHour;
