import React from "react";

type PageView = {
  page: string;
  views: number;
};

const PagesTable = ({ data }: { data: PageView[]}) => {
  return (
    <div className="bg-[#262626] rounded-2xl p-6 shadow-md text-white w-full max-w-md">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-400 text-sm font-semibold border-b border-gray-700">
            <th className="text-left pb-2">Pages</th>
            <th className="text-right pb-2">Views</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={idx}
              className="text-gray-200 text-sm font-medium border-b border-gray-800 last:border-none"
            >
              <td className="py-2">{item.page}</td>
              <td className="text-right py-2">{item.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagesTable;