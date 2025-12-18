import axios from "axios";
import { DailyView, HourlyView, MinuteView } from "./types";
import { AvgRespTime, PageView, TotalViews, UniqueUsers, UptimePercentage } from "@/components/PagesTable";

export const createWebsite = async (domain: string, about: string, userId: string) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/website", {
            user_id: userId,
            url: domain,
            about
        })

        const data = await res.data as { website_id: string, success: boolean };

        if(!data.success) {
            return {
                success: false,
                websiteId: null
            }
        }

        return {
            success: true,
            websiteId: data.website_id
        }
    } catch (_) {
        return {
            success: false,
            websiteId: null
        }
    }
}

export const getWebsiteHourlyViews = async (website: string, userId: string) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/website/hourly", {
            user_id: userId,
            website,
            hour: "24 hour"
        });

        return (await res.data) as { data: HourlyView[] | null, success: boolean };
    } catch (_) {
        return { data: null, success: false }
    }
}

export const getWebsiteDailyViews = async (website: string, userId: string) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/website/daily", {
            user_id: userId,
            website,
            day: "30 day"
        });

        return (await res.data) as { data: DailyView[] | null, success: boolean };
    } catch (_) {
        return { data: null, success: false }
    }
}

export const getWebsiteLastHourViews = async (website: string, userId: string) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/website/last_hour", {
            user_id: userId,
            website
        });

        return (await res.data) as { data: MinuteView[] | null, success: boolean };
    } catch (_) {
        return { data: null, success: false }
    }
}

export const getViewsPerPage = async (website: string) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/get_total_views_per_page", {
            website
        });

        return (await res.data) as { data: PageView[] | null, success: boolean };
    } catch (_) {
        return { data: null, success: false }
    }
}

export const getTotalUniqueUsers = async (website: string) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/get_total_unique_users", {
            website
        });

        return (await res.data) as { data: UniqueUsers | null, success: boolean };
    } catch (_) {
        return { data: null, success: false }
    }
}

export const getTotalViews = async (website: string) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/get_total_views", {
            website
        });

        return (await res.data) as { data: TotalViews | null, success: boolean };
    } catch (_) {
        return { data: null, success: false }
    }
}

export const getAvgRespTime = async (website: string) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/get_avg_resp", {
            website
        });

        return (await res.data) as { data: AvgRespTime | null, success: boolean };
    } catch (_) {
        return { data: null, success: false }
    }
}

export const getUptimePercentage = async (website: string) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/get_uptime_percentage", {
            website
        });

        return (await res.data) as { data: UptimePercentage | null, success: boolean };
    } catch (_) {
        return { data: null, success: false }
    }
}