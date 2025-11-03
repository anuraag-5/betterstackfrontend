import axios from "axios";
import { DailyView, HourlyView, MinuteView } from "./types";

export const createWebsite = async (domain: string, about: string, userId: string) => {
    try {
        const res = await axios.post("http://localhost:3001/api/website", {
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
        const res = await axios.post("http://localhost:3001/api/website/hourly", {
            user_id: userId,
            website,
            hour: "24 hours"
        });

        return (await res.data) as { data: HourlyView[] | null, success: boolean };
    } catch (_) {
        return { data: null, success: false }
    }
}

export const getWebsiteDailyViews = async (website: string, userId: string) => {
    try {
        const res = await axios.post("http://localhost:3001/api/website/daily", {
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
        const res = await axios.post("http://localhost:3001/api/website/last_hour", {
            user_id: userId,
            website
        });

        return (await res.data) as { data: MinuteView[] | null, success: boolean };
    } catch (_) {
        return { data: null, success: false }
    }
}