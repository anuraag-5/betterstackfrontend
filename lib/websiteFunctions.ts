import axios from "axios";

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
            website
        });

        return (await res.data) as { data: {
            hour: string,
            views: number
        }[] | null, success: boolean };
    } catch (_) {
        return { data: null, success: false }
    }
}