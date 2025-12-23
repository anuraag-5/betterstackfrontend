"use client";

import { updateEmail, updatePassword } from "@/lib/auths";
import { useUserStore } from "@/lib/userStore";
import { isValidEmail, isValidPassword } from "@/lib/utils";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useRef, useState } from "react";
import toast from "./Toast";

const GeneralUpdate = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const oldPassRef = useRef<HTMLInputElement | null>(null);
  const newPassRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>("");
  const [emailUpdateOpen, setEmailUpdateOpen] = useState(false);
  const [passwordUpdateOpen, setPasswordUpdateOpen] = useState(false);
  const { user, setUser } = useUserStore();

  const handleEmailSubmit = async () => {
    if (!user) {
      return toast({ title: "Unauthenticated", description: "" });
    }
    const newEmail = emailRef.current!.value;
    if (isValidEmail(newEmail)) {
      const result = await updateEmail(newEmail, user.id);
      if (result.success) {
        toast({ title: "Email Updated", description: "" });
        const updatedUser = { ...user, email: newEmail };
        setUser(updatedUser);
        setEmailUpdateOpen(false);
      } else toast({ title: "Internal server err", description: "" });
    } else setError("Invalid Email");
  };

  const handlePasswordSubmit = async () => {
    if (!user) {
      return toast({ title: "Unauthenticated", description: "" });
    }
    const oldPassword = oldPassRef.current!.value;
    const newPassword = newPassRef.current!.value;

    if (isValidPassword(newPassword)) {
      const result = await updatePassword(oldPassword, newPassword, user.id);
      if (result.success) {
        toast({ title: "Password Updated", description: "" });
        setPasswordUpdateOpen(false);
        return;
      }

      toast({ title: "Somethings Wrong", description: "" });
    } else setError("Password length must be atleast 8 chars.");
  };
  return (
    <div className="flex-1 flex flex-col justify-evenly">
      <motion.div className="flex flex-col gap-1">
        <motion.div>Name</motion.div>
        <motion.div className="flex gap-2">
          <div className="relative py-2 px-4 w-[200px] md:w-[270px] lg:w-[350px] rounded-lg text-xs md:text-sm flex items-center text-[#C499FF] font-medium">
            {user?.name}{" "}
            <div className="absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-[#D9D9D9] opacity-15"></div>
          </div>
          <div className="py-2 px-4 bg-[#8364AD] cursor-not-allowed md:min-w-[180px] text-center rounded-lg text-black font-medium">
            Update
          </div>
        </motion.div>
      </motion.div>
      <motion.div>
        <AnimatePresence mode="wait">
          {!emailUpdateOpen ? (
            <motion.div
              key="emailClose"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <motion.div className="mb-1">Email</motion.div>
              <motion.div className="flex gap-2">
                <div className="relative py-2 px-4 w-[200px] md:w-[270px] lg:w-[350px] rounded-lg text-xs md:text-sm flex items-center text-[#C499FF] font-medium">
                  {user?.email}{" "}
                  <div className="absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-[#D9D9D9] opacity-15 pointer-events-none"></div>
                </div>
                <div
                  className="py-2 px-4 bg-[#C499FF] cursor-pointer md:min-w-[180px] text-center rounded-lg text-black font-medium"
                  onClick={() => setEmailUpdateOpen((i) => !i)}
                >
                  Update
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="emailOpen"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <motion.div>Email</motion.div>
              <motion.div className="flex gap-2">
                <div className="relative py-2 px-4 w-[200px] md:w-[270px] lg:w-[350px] rounded-lg text-xs md:text-sm flex items-center text-[#C499FF] font-medium">
                  <input
                    type="email"
                    className="border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none"
                    ref={emailRef}
                  />
                  <div className="absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-[#D9D9D9] opacity-15 pointer-events-none"></div>
                </div>
                <div
                  className="py-2 px-4 bg-[#C499FF] cursor-pointer md:min-w-[180px] text-center rounded-lg text-black font-medium"
                  onClick={handleEmailSubmit}
                >
                  Submit
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div>
        <AnimatePresence mode="wait">
          {!passwordUpdateOpen ? (
            <motion.div
              key="passwordClose"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <motion.div className="mb-1">Password</motion.div>
              <motion.div className="flex gap-2">
                <div className="relative py-2 px-4 w-[200px] md:w-[270px] lg:w-[350px] rounded-lg text-xs md:text-sm flex items-center text-[#C499FF] font-medium">
                  <div className="relative top-1">************</div>
                  <div className="absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-[#D9D9D9] opacity-15 pointer-events-none"></div>
                </div>
                <div
                  className="py-2 px-4 bg-[#C499FF] cursor-pointer md:min-w-[180px] text-center rounded-lg text-black font-medium"
                  onClick={() => setPasswordUpdateOpen((i) => !i)}
                >
                  Update
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="passwordOpen"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <motion.div className="mb-1">Password</motion.div>
              <motion.div className="flex gap-2 items-center">
                <div className="flex flex-col gap-4">
                  <div className="relative py-2 px-4 w-[200px] md:w-[270px] lg:w-[350px] rounded-lg text-xs md:text-sm items-center text-[#C499FF] font-medium">
                    <div className="text-xs">Old Password</div>
                    <input
                      type="password"
                      className="border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none"
                      ref={oldPassRef}
                    />
                    <div className="absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-[#D9D9D9] opacity-15 pointer-events-none"></div>
                  </div>
                  <div className="relative py-2 px-4 w-[200px] md:w-[270px] lg:w-[350px] rounded-lg text-xs md:text-sm items-center text-[#C499FF] font-medium">
                    <div className="text-xs">New Password</div>
                    <input
                      type="password"
                      className="border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none"
                      ref={newPassRef}
                    />
                    <div className="absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-[#D9D9D9] opacity-15 pointer-events-none"></div>
                  </div>
                  {
                    error ? <div className="text-xs text-red-500">{error}</div> : null
                  }
                </div>
                <div
                  className="py-2 px-4 bg-[#C499FF] cursor-pointer md:min-w-[180px] text-center rounded-lg text-black font-medium h-fit"
                  onClick={handlePasswordSubmit}
                >
                  Submit
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GeneralUpdate;
