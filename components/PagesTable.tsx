import { getViewsPerPage } from "@/lib/websiteFunctions";
import React, { use, useEffect, useState } from "react";

export type PageView = {
  page_path: string;
  total_views: number;
};

export type UniqueUsers = {
  unique_users: number;
}

export type TotalViews = {
  total_views: number;
}

const PagesTable = ( { domain } : { domain: string }) => {
  const [ data, setData ] = useState<PageView[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const getPagesViewsData = async () => await getViewsPerPage(domain);
    getPagesViewsData().then((d) => setData(d.data!)).finally(() => setLoading(false));
  }, [ domain ])

  return (
    <div className="bg-[#262626] rounded-2xl p-6 shadow-md text-white w-full max-w-md mt-6">
      { loading ? <div className="text-[14px]">Loading...</div> :
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
                <td className="py-2">{item.page_path}</td>
                <td className="text-right py-2">{item.total_views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default PagesTable;