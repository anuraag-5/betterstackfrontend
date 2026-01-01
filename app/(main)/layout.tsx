"use client";

import * as motion from "motion/react-client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/userStore";
import { ReactNode, useEffect, useState } from "react";
import NavbarMobile from "@/components/NavbarMobile";

const ProjectsLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { getUser, getWebsites, setUser, setWebsites } = useUserStore();

  const handleAddClicked = () => router.push("/projects/add");
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
    <section className="h-screen min-h-screen w-screen bg-black py-3 flex flex-col md:flex-row overflow-y-scroll">
      <NavbarMobile />
      <Navbar />
      {loading ? (
        <div className="flex-1 flex flex-col justify-between p-2 md:pt-6 md:pb-0 md:pl-4 md:pr-0">
          <div className="text-[#bfbfbf] flex justify-between items-center">
            <div>Your Projects</div>
            <div
              className="cursor-pointer mr-5 md:mr-7 text-[12px] md:text-[14px] text-black py-1 px-2 md:py-2 md:px-4 bg-[#C499FF] rounded-full"
              onClick={handleAddClicked}
            >
              Add +
            </div>
          </div>
          <div className="flex-1 bg-[#262626] mt-6 rounded-4xl md:rounded-tl-4xl md:rounded-bl-4xl md:rounded-tr-[0px] md:rounded-br-[0px] p-6 grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-y-16 place-items-center md:place-items-start overflow-y-auto">
            <motion.div className="h-[380px] w-[315px] md:w-[380px] bg-[#767676] rounded-4xl"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
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
