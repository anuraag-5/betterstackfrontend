"use client";

import { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/userStore";

const ProjectLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { getUser, getWebsites, setUser, setWebsites } = useUserStore();
  //Remove loading in layout, layout only renders static part show loading in dynamic parts.
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        router.replace("/signin");
        return;
      }
      const user = await getUser(token);
      if (!user.success) {
        localStorage.removeItem("jwt");
        router.replace("/signin");
        return;
      }
      setUser({ name: user.name, email: user.email, id: user.id });

      const w = await getWebsites(token);
      setWebsites(w);
    };

    init();
  }, [router, getUser, getWebsites, setUser, setWebsites]);
  return (
    <div className="text-black bg-[#262626] min-h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default ProjectLayout;
