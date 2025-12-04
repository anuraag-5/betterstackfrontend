"use client";

import Image from "next/image";
import * as motion from "motion/react-client";

const Issues = () => {
  return (
    <div className="m-4 flex-1 flex flex-col items-center gap-3">
      <motion.div
        initial={{
          opacity: 0.4,
        }}
        animate={{
          opacity: 0.8,
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image src="/images/contruction.svg" width={230} height={230} alt="" />
      </motion.div>
      <pre className="mt-5">
        This page in under construction, come back soon.
      </pre>
    </div>
  );
};

export default Issues;
