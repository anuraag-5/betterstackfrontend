"use client";

import * as motion from "motion/react-client";
import { useState } from "react";

const SettingsPage = () => {
  const [currentTab, setCurrentTab] = useState("general");
  return (
    <div className='flex-1 flex flex-col md:pt-6 md:pl-4 p-2'>
      <div>Settings</div>
      <div className='flex-1 h-full flex flex-col gap-5 bg-[#262626] mt-6 rounded-4xl md:rounded-tl-4xl md:rounded-bl-4xl md:rounded-tr-[0px] md:rounded-br-[0px] px-4 md:px-12 pt-12 pb-5 overflow-y-scroll'>
        <div className='flex px-2 py-3 md:p-4 border-b-2 border-white gap-1'>
          <div className='flex-1 text-center relative py-2 cursor-pointer' onClick={() => setCurrentTab("general")}>
            General
            {
              currentTab === "general" ? <motion.div className="absolute top-0 bottom-0 left-0 right-0 bg-[#D9D9D9] opacity-[17%] rounded-tl-2xl rounded-bl-2xl inset-0"
              layoutId="tabSettings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{
                duration: 0.5
              }}
              >

              </motion.div> : null
            }
          </div>
          <div className='flex-1 text-center relative py-2 cursor-pointer' onClick={() => setCurrentTab("subscription")}>
            Subscription
            {
              currentTab === "subscription" ? <motion.div className="absolute top-0 bottom-0 left-0 right-0 bg-[#D9D9D9] opacity-[17%] rounded-tr-2xl rounded-br-2xl inset-0"
              layoutId="tabSettings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{
                duration: 0.5
              }}
              >

              </motion.div> : null
            }
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default SettingsPage