"use client";

import * as z from "zod";
import Image from "next/image";
import toast from "@/components/Toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/lib/userStore";
import { createWebsite } from "@/lib/websiteFunctions";
import { delaFont, neueFont } from "@/app/fonts/fonts";
import { Controller, useForm } from "react-hook-form";
import { formSchemaAddWebsite } from "@/lib/types";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

const AddPage = () => {
  const router = useRouter();
  const { user, getWebsites, setWebsites } = useUserStore();
  const form = useForm<z.infer<typeof formSchemaAddWebsite>>({
    resolver: zodResolver(formSchemaAddWebsite),
    defaultValues: {
      domain: "",
      about: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchemaAddWebsite>) {
    const domain = data.domain;
    const about = data.about;

    const res = await createWebsite(domain, about, user!.id);
    if (!res.success) {
      return toast({ title: "Failed to create website", description: "" });
    }

    toast({ title: "Created", description: "" });
    const websites = await getWebsites(localStorage.getItem("jwt")!);

    setWebsites(websites);
    return router.push("/projects");
  }

  return (
    <section className="w-full xl:px-35 md:px-24">
      <div
        className={
          delaFont.className +
          " text-[#FBBB3F] xl:text-[22px] text-[20px] mt-2 flex justify-between"
        }
      >
        <div>Add Website</div>
        <Image src="/images/website.png" alt="" width={35} height={35} />
      </div>
      <div className="mt-5 bg-[rgba(255,255,255,0.19)] rounded-xl px-8 pt-10 pb-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="domain"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-domain"
                    className="text-[20px] text-white"
                  >
                    Domain
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-domain"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    className={
                      neueFont.className +
                      " outline-none border-none bg-[rgba(255,255,255,0.19)] rounded-full h-[65px] px-7"
                    }
                  />
                </Field>
              )}
            />
            <Controller
              name="about"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-about"
                    className="text-[20px] text-white"
                  >
                    Description
                  </FieldLabel>
                  <InputGroup
                    className={
                      neueFont.className +
                      " outline-none border-none bg-[rgba(255,255,255,0.19)] rounded-3xl px-4"
                    }
                  >
                    <InputGroupTextarea
                      {...field}
                      id="form-about"
                      rows={6}
                      className="min-h-30 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums text-[#F5F5DC]">
                        {field.value.length}/40 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field
              orientation="horizontal"
              className="w-full flex justify-center items-center"
            >
              <Button
                type="submit"
                className={
                  neueFont.className +
                  " bg-[#fbbb3f] min-w-[150px] h-[50px] rounded-full text-black text-[18px] hover:bg-[#fdd483] cursor-pointer"
                }
              >
                Add
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </section>
  );
};

export default AddPage;