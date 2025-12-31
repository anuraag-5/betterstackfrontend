"use client";

import toast from "./Toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { neueFont } from "@/app/fonts/fonts";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/lib/auths";
import { formSchemaSignUp } from "@/lib/types";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import GoogleAuthButton from "./GoogleAuthButton";

export default function SignUp() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchemaSignUp,
    },
    onSubmit: async ({ value }) => {
      try {
        const { name, email, password } = value;

        const res = await signUpUser(email, password, name);

        if (res.success) {
          toast({
            title: "Account Created",
            description: "You can now sign in",
          });
          router.push("/signin");
        } else {
          toast({
            title: "Signup Failed",
            description: "Please try again",
          });
        }
      } catch (error) {
        toast({
          title: "Server Error",
          description:
            error instanceof Error ? error.message : "Something went wrong",
        });
      }
    },
  });

  return (
    <section className="w-full md:w-[58%] min-h-full flex flex-col justify-evenly items-center gap-5 bg-black">
      <div className="flex flex-col items-center gap-7 justify-evenly mt-5">
        <div>
          <div className={neueFont.className + " text-[40px] w-full"}>
            Sign Up
          </div>

          <div className="pt-9">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="w-[330px] mt-4 md:w-[360px] lg:w-[450px] xl:w-[600px] flex flex-col gap-8"
            >
              {/* Name */}
              <FieldGroup>
                <form.Field name="name">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel className="text-white">Name</FieldLabel>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="focus:ring-0 border-none shadow-none focus-visible:ring-0 px-4 py-6 text-[#C499FF] rounded-4xl bg-[#4A4A4A]"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              {/* Email */}
              <FieldGroup>
                <form.Field name="email">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel className="text-white">Email</FieldLabel>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="focus:ring-0 border-none shadow-none focus-visible:ring-0 px-4 py-6 text-[#C499FF] rounded-4xl bg-[#4A4A4A]"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>

              {/* Password */}
              <FieldGroup>
                <form.Field name="password">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel className="text-white">Password</FieldLabel>
                        <Input
                          type="password"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="focus:ring-0 border-none shadow-none focus-visible:ring-0 px-4 py-6 text-[#C499FF] rounded-4xl bg-[#4A4A4A]"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>
              <div className="flex flex-col gap-1">
                <div className="text-[14px]">
                  <span>Already a User ?</span>
                  <span
                    className="text-[#6750A4] ml-1 cursor-pointer"
                    onClick={() => router.push("/signin")}
                  >
                    Sign In
                  </span>
                </div>
                <div className="text-[#6750A4] text-[14px]">
                  Forgot Password
                </div>
              </div>
              <div className="flex flex-col gap-5 items-center pt-3">
                <Button
                  type="submit"
                  className={
                    neueFont.className +
                    " text-[20px] px-8 bg-[#C499FF] w-fit rounded-full font-semibold cursor-pointer text-black"
                  }
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>

        <GoogleAuthButton tab="signup"/>
      </div>
    </section>
  );
}
