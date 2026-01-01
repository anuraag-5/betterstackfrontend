"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Spinner from "./Spinner";

export default function GoogleAuthButton({ tab }: { tab: string }) {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const authenticate = async () => {
      try {
        setLoading(true);
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
      } catch (err) {
        console.error("Google auth failed", err);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, [isSignedIn, user]);

  return (
    <SignInButton mode="modal">
      <button
        disabled={loading}
        className="flex items-center gap-3 bg-white rounded-tl-4xl rounded-bl-4xl rounded-tr-lg rounded-br-lg px-3 py-2 disabled:opacity-70"
      >
        {loading ? (
          <Spinner />
        ) : (
          <Image
            src="/images/google-icon.png"
            alt="Google"
            width={28}
            height={28}
          />
        )}

        <span className="text-black">
          {tab === "signup" ? "Sign up with Google" : "Sign in with Google"}
        </span>
      </button>
    </SignInButton>
  );
}