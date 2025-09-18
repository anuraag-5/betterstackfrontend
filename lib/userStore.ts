import axios from "axios";
import { create } from "zustand";

type User = {
  name: string;
  email: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  getUser: (jwt: string) => Promise<{
    id: string;
    name: string;
    email: string;
    success: boolean;
  }>;
  clearUser: () => void;
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

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  getUser: async (jwt) => await getActualUser(jwt),
  clearUser: () => set({ user: null }),
}));
