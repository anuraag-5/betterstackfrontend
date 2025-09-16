"use client";

import { poppinsFont } from "@/app/fonts/fonts";
import {
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

const LineChart = ( websiteData : { name: string, views: number }[]) => {
  
  const data: { name: string, "Total Views": number, amt: number }[] = [];

  websiteData.forEach(d => {
    const websiteViews = {
      name: d.name,
      "Total Views": d.views,
      amt: 2400
    }

    data.push(websiteViews);
  });

  return (
    <AreaChart
      width={
        window.innerWidth > 768
          ? window.innerWidth / 2
          : window.innerWidth / 1.1
      }
      height={window.innerHeight / 2}
      data={data}
      margin={{ top: 5, bottom: 5 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#F5F5DC" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#F5F5DC" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* <CartesianGrid strokeDasharray="2 2" strokeOpacity="0.3" stroke="black" /> */}
      <XAxis dataKey="name" stroke="#FBBB3F" { ...poppinsFont.style } />
      <YAxis stroke="#FBBB3F" { ...poppinsFont.style } />
      <Tooltip
        contentStyle={{ backgroundColor: "black", borderRadius: "5px" }}
        labelStyle={{ color: "#FBBB3F" }}
      />
      {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
      {/* <Line type="monotone" dataKey="Total Views" stroke="#F5F5DC" /> */}
      <Area type="monotone" dataKey="Total Views" stroke="#F5F5DC" fillOpacity={1} fill="url(#colorUv)" />
    </AreaChart>
  );
};

export default LineChart;
