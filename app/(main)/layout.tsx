"use client";

import { useUserStore } from "@/lib/userStore";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as motion from "motion/react-client";
import Navbar from "@/components/Navbar";

const ProjectsLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { getUser, getWebsites, setUser, setWebsites } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return router.replace("/signin");
    }

    getUser(token).then(
      (user) => {
        if (!user.success) {
          localStorage.removeItem("jwt");
          return router.replace("/signin");
        }
        setUser({ name: user.name, email: user.email, id: user.id });
      },
      () => {
        return router.replace("/signin");
      }
    );
    getWebsites(token).then(
      (w) => {
        setWebsites(w);
        setLoading(false);
      },
      () => {
        return router.replace("/signin");
      }
    );
  }, [router, getUser, getWebsites, setUser, setWebsites]);

  return (
    <section className="h-screen w-screen bg-black py-3 flex">
      <Navbar />
      {loading ? (
        <div className="flex-1 flex flex-col justify-between pt-6 pl-4">
          <div className="text-[#bfbfbf]">Your Projects</div>
          <div className="flex-1 bg-[#262626] mt-6 rounded-tl-4xl rounded-bl-4xl p-6 grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-y-16 overflow-y-auto">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
              }}
              className="h-[380px] w-[350px] bg-[#767676] rounded-4xl"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
              }}
              className="h-[380px] w-[350px] bg-[#767676] rounded-4xl"
            ></motion.div>
          </div>
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export default ProjectsLayout;
