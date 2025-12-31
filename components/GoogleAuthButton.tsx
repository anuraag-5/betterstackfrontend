"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GoogleAuthButton({ tab } : { tab: string }) {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const authenticate = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`,
        {
          username: user.emailAddresses[0].emailAddress,
          user_name: user.firstName,
        }
      );
      const data = res.data as { jwt: string };
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        router.push("/projects");
      }
    };

    authenticate();
  }, [isSignedIn, user]);

  return (
    <SignInButton mode="modal">
      <div className="flex bg-white rounded-tl-4xl rounded-bl-4xl rounded-tr-lg rounded-br-lg gap-2 pr-2 w-fit">
        <Image 
        src={"/images/google-icon.png"}
        alt=""
        width={40}
        height={30}
        />
        <button className="px-3 py-2 text-black rounded-lg">
        {
          tab === "signup" ? "Sign up with Google" : "Sign in with Google"
        }
      </button>
      </div>
    </SignInButton>
  );
}