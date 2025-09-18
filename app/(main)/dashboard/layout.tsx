"use client";

import LeftNavbar from "@/components/LeftNavbar";
import { useUserStore } from "@/lib/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { setUser, getUser } = useUserStore();

  useEffect(() => {
    const get_user = async () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt == null) {
        router.replace("/signin");
        return;
      }
      const data = await getUser(jwt);
      if (!data.success) {
        router.replace("/signin");
        return;
      }
      setUser({ name: data.name, email: data.email });
    };
    get_user();
  }, [router, setUser, getUser]);

  return (
    <section className="flex bg-[#4B4B3E] min-h-screen min-w-screen">
      <LeftNavbar />
      <div className="flex-1 md:my-1.5 bg-[#252424] md:rounded-tl-2xl md:rounded-bl-2xl">
        {children}
      </div>
    </section>
  );
};

export default DashBoardLayout;
