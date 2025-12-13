"use client";

import * as motion from "motion/react-client";
import { useAnimate } from "motion/react";
import { useState } from "react";
import Image from "next/image";

const FAQsCards = () => {
  const [scope2, animate2] = useAnimate();
  const [scope3, animate3] = useAnimate();
  const [scope4, animate4] = useAnimate();
  const [answerScope1, answerAimate1] = useAnimate();
  const [answerScope2, answerAimate2] = useAnimate();
  const [answerScope3, answerAimate3] = useAnimate();
  const [answerScope4, answerAimate4] = useAnimate();
  const [imageScope1, iamgeAnimate1] = useAnimate();
  const [imageScope2, iamgeAnimate2] = useAnimate();
  const [imageScope3, iamgeAnimate3] = useAnimate();
  const [imageScope4, iamgeAnimate4] = useAnimate();
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [fourthOpen, setFourthOpen] = useState(false);

  const handleFirstClick = (value: boolean) => {
    if (secondOpen) handleSecondClick(false);
    if (thirdOpen) handleThirdClick(false);
    if (fourthOpen) handleFourthClick(false);
    if (value) {
      
      answerAimate1(answerScope1.current, { y: 38 }, { duration: 0.4 });
      animate2(scope2.current, { y: 38 }, { duration: 0.4 });
      animate3(scope3.current, { y: 38 }, { duration: 0.4 });
      animate4(scope4.current, { y: 38 }, { duration: 0.4 });
    } else {
      answerAimate1(answerScope1.current, { y: 0 }, { duration: 0.4 });
      animate2(scope2.current, { y: 0 }, { duration: 0.4 });
      animate3(scope3.current, { y: 0 }, { duration: 0.4 });
      animate4(scope4.current, { y: 0 }, { duration: 0.4 });
    }
    iamgeAnimate1(imageScope1.current, { rotate: firstOpen ? 0 : 180 }, { duration: 0.4 });
    setFirstOpen(value);
  };

  const handleSecondClick = (value: boolean) => {
    if (firstOpen) handleFirstClick(false);
    if (thirdOpen) handleThirdClick(false);
    if (fourthOpen) handleFourthClick(false);
    if (value) {
      answerAimate2(answerScope2.current, { y: 38 }, { duration: 0.4 });
      animate3(scope3.current, { y: 38 }, { duration: 0.4 });
      animate4(scope4.current, { y: 38 }, { duration: 0.4 });
    } else {
      answerAimate2(answerScope2.current, { y: 0 }, { duration: 0.4 });
      animate3(scope3.current, { y: 0 }, { duration: 0.4 });
      animate4(scope4.current, { y: 0 }, { duration: 0.4 });
    }
    iamgeAnimate2(imageScope2.current, { rotate: secondOpen ? 0 : 180 }, { duration: 0.4 });
    setSecondOpen(value);
  };

  const handleThirdClick = (value: boolean) => {
    if (secondOpen) handleSecondClick(false);
    if (firstOpen) handleFirstClick(false);
    if (fourthOpen) handleFourthClick(false);
    if (value) {
      answerAimate3(answerScope3.current, { y: 38 }, { duration: 0.4 });
      animate4(scope4.current, { y: 38 }, { duration: 0.4 });
    } else {
      answerAimate3(answerScope3.current, { y: 0 }, { duration: 0.4 });
      animate4(scope4.current, { y: 0 }, { duration: 0.4 });
    }
    
    iamgeAnimate3(imageScope3.current, { rotate: thirdOpen ? 0 : 180 }, { duration: 0.4 });
    setThirdOpen(value);
  };

  const handleFourthClick = (value: boolean) => {
    if (secondOpen) handleSecondClick(false);
    if (firstOpen) handleFirstClick(false);
    if (thirdOpen) handleThirdClick(false);

    if (value)
      answerAimate4(answerScope4.current, { y: 38 }, { duration: 0.4 });
    else answerAimate4(answerScope4.current, { y: 0 }, { duration: 0.4 });

    iamgeAnimate4(imageScope4.current, { rotate: fourthOpen ? 0 : 180 }, { duration: 0.4 });
    setFourthOpen(value);
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-2">
      <div className="w-full max-w-[700px] flex flex-col justify-center items-center gap-3 text-white">
        <div className="relative h-[60px] w-full">
          <div
            className="absolute top-5 left-5 right-0 z-60 bg-[#301751] text-[#C499FF] font-medium text-[14px] md:text-[16px]"
            onClick={() => handleFirstClick(!firstOpen)}
          >
            Does Nexus slow down my website?
          </div>
          <motion.div
            className="absolute top-7 right-6 z-60 bg-[#301751]"
            onClick={() => handleFirstClick(!firstOpen)}
            ref={imageScope1}
          >
            <Image src="/images/_.svg" alt="" width={13} height={8} />
          </motion.div>
          <div
            className="absolute top-4 md:top-5 left-5 z-40 text-[8px] md:text-xs max-w-[300px] md:max-w-[650px]"
            ref={answerScope1}
          >
            No, not at all. Nexus uses a lightweight tracking snippet loaded
            asynchronously via a script tag.
          </div>
          {!firstOpen ? (
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[#301751] h-full z-50 rounded-lg"
              layoutId="firstFAQ"
              transition={{ duration: 0.4 }}
            ></motion.div>
          ) : (
            <motion.div
              className="absolute top-0 left-0 right-0 h-[90px] bg-[#301751] z-30 rounded-xl"
              layoutId="firstFAQ"
              transition={{ duration: 0.4 }}
            ></motion.div>
          )}
        </div>
        <div className="relative h-[60px] w-full" ref={scope2}>
          <div
            className="absolute top-5 left-5 right-0 z-60 bg-[#301751] text-[#C499FF] font-medium text-[14px] md:text-[16px]"
            onClick={() => handleSecondClick(!secondOpen)}
          >
            How does Nexus monitoring work?
          </div>
          <motion.div
            className="absolute top-7 right-6 z-60 bg-[#301751]"
            onClick={() => handleSecondClick(!secondOpen)}
            ref={imageScope2}
          >
            <Image src="/images/_.svg" alt="" width={13} height={8} />
          </motion.div>
          <div
            className="absolute top-4 md:top-5 left-5 z-40 text-[8px] md:text-xs max-w-[300px] md:max-w-[650px]"
            ref={answerScope2}
          >
            Nexus works by adding a small script tag snippet to your website. It
            tracks Basic performance metrics.
          </div>
          {!secondOpen ? (
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[#301751] h-full rounded-lg z-50"
              layoutId="secondFAQ"
              transition={{ duration: 0.4 }}
            ></motion.div>
          ) : (
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[#301751] h-[90px] rounded-xl z-30"
              layoutId="secondFAQ"
              transition={{ duration: 0.4 }}
            ></motion.div>
          )}
        </div>
        <div className="relative h-[60px] w-full z-10" ref={scope3}>
          <div
            className="absolute top-5 left-5 right-0 z-60 bg-[#301751] text-[#C499FF] font-medium text-[14px] md:text-[16px]"
            onClick={() => handleThirdClick(!thirdOpen)}
          >
            What data do you track?
          </div>
          <motion.div
            className="absolute top-7 right-6 z-60 bg-[#301751]"
            onClick={() => handleThirdClick(!thirdOpen)}
            ref={imageScope3}
          >
            <Image src="/images/_.svg" alt="" width={13} height={8} />
          </motion.div>
          <div
            className="absolute top-4 md:top-5 left-5 z-40 text-[8px] md:text-xs max-w-[300px] md:max-w-[650px]"
            ref={answerScope3}
          >
            Nexus tracks essential analytics like key metrics, events for
            graph generation.
          </div>
          {!thirdOpen ? (
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[#301751] h-full rounded-lg z-50"
              layoutId="thirFAQ"
              transition={{ duration: 0.4 }}
            ></motion.div>
          ) : (
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[#301751] h-[90px] rounded-xl z-30"
              layoutId="thirFAQ"
              transition={{ duration: 0.4 }}
            ></motion.div>
          )}
        </div>
        <div className="relative h-[60px] w-full" ref={scope4}>
          <div
            className="absolute top-5 left-5 right-0 z-60 bg-[#301751] text-[#C499FF] font-medium text-[14px] md:text-[16px]"
            onClick={() => handleFourthClick(!fourthOpen)}
          >
            Can I export reports?
          </div>
          <motion.div
            className="absolute top-7 right-6 z-60 bg-[#301751]"
            onClick={() => handleFourthClick(!fourthOpen)}
            ref={imageScope4}
          >
            <Image src="/images/_.svg" alt="" width={13} height={8} />
          </motion.div>
          <div
            className="absolute top-4 md:top-5 left-5 z-40 text-[8px] md:text-xs max-w-[300px] md:max-w-[650px]"
            ref={answerScope4}
          >
            Coming soon !!!.
          </div>
          {!fourthOpen ? (
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[#301751] h-full rounded-lg z-50"
              layoutId="fourthFAQ"
              transition={{ duration: 0.4 }}
            ></motion.div>
          ) : (
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[#301751] h-[90px] rounded-xl z-30"
              layoutId="fourthFAQ"
              transition={{ duration: 0.4 }}
            ></motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQsCards;
