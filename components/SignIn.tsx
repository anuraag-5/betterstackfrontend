"use client";

import toast from "./Toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { neueFont } from "@/app/fonts/fonts";
import { useRouter } from "next/navigation";
import { signInUser } from "@/lib/auths";
import { formSchemaSignIn } from "@/lib/types";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import GoogleAuthButton from "./GoogleAuthButton";
import { useEffect } from "react";

export default function Signin() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchemaSignIn,
    },
    onSubmit: async ({ value }) => {
      try {
        const { email, password } = value;
        console.log(value);
        const signin = await signInUser(email, password);
        if (signin.success) {
          localStorage.setItem("jwt", signin.jwt);
          toast({
            title: "Signed In",
            description: "Welcome back!",
          });
          setTimeout(() => {
            router.push("/projects");
          }, 100);
        } else {
          return toast({
            title: "Signed In Failed",
            description: "Welcome back!",
          });
        }
      } catch (error) {
        console.error("Sign in error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Sign in failed";
        toast({
          title: "Server Error",
          description: errorMessage,
        });
      }
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      router.push("/projects");
    }
  }, [router]);

  return (
    <section className="w-full md:w-[58%] min-h-full flex flex-col justify-evenly items-center gap-5 bg-black">
      <div className="flex flex-col items-center gap-7 justify-evenly">
        <div>
          <div className={neueFont.className + " text-[40px] w-full"}>
            Sign in
          </div>
          <div className="pt-9">
            <form
              id="bug-report-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="w-[330px] mt-4 md:w-[360px] lg:w-[450px] xl:w-[600px] flex flex-col gap-8"
            >
              <FieldGroup>
                <div>
                  {" "}
                  <form.Field name="email">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-white"
                          >
                            Email
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            className="focus:ring-0 border-none shadow-none focus-visible:ring-0 px-4  py-8 text-[#C499FF] rounded-4xl bg-[#4A4A4A]"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </div>
              </FieldGroup>
              <FieldGroup>
                <div>
                  <form.Field name="password">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-white"
                          >
                            Password
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            className="focus:ring-0 border-none shadow-none focus-visible:ring-0 px-4  py-8 text-[#C499FF] rounded-4xl bg-[#4A4A4A]"
                            type="password"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </div>
              </FieldGroup>
              <div className="flex flex-col gap-1">
                <div className="text-[14px]">
                  <span>New User ?</span>
                  <span
                    className="text-[#6750A4] ml-1 cursor-pointer"
                    onClick={() => router.push("/signup")}
                  >
                    Sign Up
                  </span>
                </div>
                <div className="text-[#6750A4] text-[14px]">
                  Forgot Password
                </div>
              </div>
              <div className="flex flex-col gap-5 items-center pt-3">
                <Button
                  className={
                    neueFont.className +
                    " text-[20px] px-8 bg-[#C499FF] w-fit rounded-full font-semibold cursor-pointer text-black"
                  }
                  type="submit"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
        <GoogleAuthButton tab="signin"/>
      </div>
    </section>
  );
}
