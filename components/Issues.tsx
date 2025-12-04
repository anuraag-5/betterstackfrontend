"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

const Issues = () => {
  const [ size, setSize ] = useState(768);

  useEffect(() => {
    const getSize = () => setSize(window.innerWidth);
    getSize();

    window.addEventListener("resize", getSize);

    return () => window.removeEventListener("resize", getSize);
  }, [ size ]);

  return (
    <div className="md:m-4 flex flex-col items-center gap-8 md:gap-3 justify-center h-[500px] md:h-fit">
      <motion.div
        initial={{
          opacity: 0.4,
        }}
        animate={{
          opacity: 0.8,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image src="/images/contruction.svg" width={ size > 767 ? 230 : 130 } height={ size > 767 ? 230 : 130 } alt="" />
      </motion.div>
      <div className="mt-5">
        This page in under construction, come back soon.
      </div>
    </div>
  );
};

export default Issues;
