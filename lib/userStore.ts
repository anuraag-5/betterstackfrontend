import axios from "axios";
import { create } from "zustand";

type User = {
  name: string;
  email: string;
  id: string;
};

type Website = {
  domain: string;
  isSnippetAdded: boolean;
}

type UserStore = {
  user: User | null;
  websites: Website[] | null;
  setUser: (user: User) => void;
  setWebsites: (websites: Website[]) => void;
  getUser: (jwt: string) => Promise<{
    id: string;
    name: string;
    email: string;
    success: boolean;
  }>;
  getWebsites: (jwt: string) => Promise<Website[]>;
  clearUser: () => void;
  clearWebsites: () => void;
  clearAll: () => void;
};

const getActualUser = async (jwt: string) => {
  const res = await axios.get("http://localhost:3001/api/get_user", {
    headers: {
      jwt,
    },
  });

  const data = (await res.data) as {
    id: string;
    name: string;
    email: string;
    success: boolean;
  };

  return data;
};

const getActualWebsites = async (jwt: string) => {
  const res = await axios.get("http://localhost:3001/api/user/get_all_websites", {
    headers: {
      jwt
    }
  });

  if(res.status !== 200) {
    return [];
  }

  const data = (await res.data) as {
    websites: {
      id: string,
      url: string,
      user_id: string,
      time_added: Date,
      is_snippet_added: boolean
    }[],
    success: boolean
  }

  if(!data.success){
    return [];
  }

  const websites = data.websites.map((w) => {
    const website: Website = { domain: w.url, isSnippetAdded: w.is_snippet_added }
    return website; 
  })

  return websites;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  websites: null,
  setUser: (user) => set({ user }),
  setWebsites: (websites) => set({websites}),
  getUser: async (jwt) => await getActualUser(jwt),
  getWebsites: async (jwt) => await getActualWebsites(jwt),
  clearUser: () => set({ user: null }),
  clearWebsites: () => set({ websites: null }),
  clearAll: () => set({ user: null, websites: null })
}));
