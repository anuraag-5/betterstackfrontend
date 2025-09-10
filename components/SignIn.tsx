"use client";

import z from "zod";
import toast from "./Toast";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const email = values.email;
    const password = values.password;

    try {
      const res = await axios.post(
        "http://localhost:3001/api/user/signin",
        { username: email, password },
        {
          withCredentials: true,
        }
      );

      const data = (await res.data) as { jwt: string };

      if (data.jwt.length > 0) {
        toast({ title: `✅ Logged In`, description: "" });
        router.replace("/dashboard");
        return;
      }

      toast({ title: `❌ User not found`, description: "" });
      router.push("/signup");
    } catch (_error) {
      toast({ title: `❌ Internal server error`, description: "" });
    }
  }

  return (
    <div className="xl:max-w-[45vw] min-h-screen flex flex-col justify-center px-4 md:px-12">
      <div className="text-[54px] text-[#FBBB3F] mb-15">Sign In</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="bg-[#ffffff] shad-form-item w-full min-w-[200px] max-w-[700px]">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="abc@xyz.com"
                      {...field}
                      className="shad-no-focus shad-input"
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="bg-[#ffffff] shad-form-item w-full min-w-[200px] max-w-[700px]">
                  <FormLabel className="shad-form-label">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="@@@@"
                      {...field}
                      className="shad-no-focus shad-input"
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <div className="w-full max-w-[700px] flex justify-center mt-15">
            <Button type="submit" className="form-submit-button cursor-pointer">
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
