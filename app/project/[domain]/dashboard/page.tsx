"use client";

import { use, useEffect, useState } from "react";
import { HourlyView } from "@/lib/types";
import { useUserStore } from "@/lib/userStore";
import { getWebsiteHourlyViews } from "@/lib/websiteFunctions";
import AreaChartsPerHour from "@/components/AreaChart";

const ProjectPage = ({ params }: { params: Promise<{ domain: string }>}) => {
  const [ hourlyViews, setHourlyViews ] = useState<HourlyView[]>([]);
  const [ loading, setLoading ] = useState(true);
  const { domain } = use(params);
  const { user } = useUserStore();

  useEffect(() => {
    const getHourlyViews = async () => {
      try {
        const res = await getWebsiteHourlyViews(domain, user!.id);
        setHourlyViews(res.data!);
      } catch (_) {
      } finally {
        setLoading(false);
      }
    }
    getHourlyViews();
  }, [ setHourlyViews, domain, user ])

  return (
    <>
      { 
        <div>
          <div>{ loading ? <div className='text-3xl text-red-800'>Loading...</div> : JSON.stringify(hourlyViews) }</div>
          <AreaChartsPerHour hourlyViews={hourlyViews} />
        </div>
      }
    </>
  )
}

export default ProjectPage