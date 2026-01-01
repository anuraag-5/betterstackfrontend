"use client";

import Image from "next/image";
import { neueFont } from "@/app/fonts/fonts";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/userStore";

const YourProjects = () => {
  const { websites } = useUserStore();
  const router = useRouter();
  const linearGradients = [
    "bg-gradient-to-b from-[#1A1A1A] to-[#204954]",
    "bg-gradient-to-b from-[#1A1A1A] to-[#202754]",
    "bg-gradient-to-b from-[#1A1A1A] to-[#312054]",
  ];
  const handleProjectClick = (website: string) => {
    router.push(`/projects/${website}`);
  };
  const handleAddClicked = () => router.push("/projects/add");
  return (
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
        {websites?.length === 0 || !websites ? (
          <div className="flex flex-col gap-4 justify-start text-[#A8A8A8] w-full h-full py-3">
            <p className="text-xl md:text-2xl">You have no projects</p>
            <p className="text-sm text-[#C499FF]">
              Click <span className="text-white font-medium mx-1">Add +</span> to
              create your first project
            </p>
          </div>
        ) : (
          websites.map((w, i) => (
            <div
              key={w.domain}
              className="flex flex-col h-[380px] w-fit border border-[#767676] rounded-4xl cursor-pointer"
              onClick={() => handleProjectClick(w.domain)}
            >
              <div
                className={
                  linearGradients[i % 3] +
                  " flex-1 rounded-tl-4xl rounded-tr-4xl"
                }
              ></div>
              <div className="flex gap-4 items-center px-5 py-7 border-t border-[#767676]">
                <Image
                  src="/images/violet-project-icon.svg"
                  alt=""
                  width={26}
                  height={26}
                />
                <div>
                  <div>{w.domain}</div>
                  <div
                    className={
                      neueFont.className +
                      " lg:text-sm text-[12px] text-[#A8A8A8] min-w-[250px] md:min-w-[295px]"
                    }
                  >
                    {w.about}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default YourProjects;
