"use client";

import Image from "next/image";

import z from "zod";
import toast from "@/components/Toast";
import { useForm } from "@tanstack/react-form";
import { formSchemaAddWebsite } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { createWebsite } from "@/lib/websiteFunctions";
import { useUserStore } from "@/lib/userStore";

const Page = () => {
  const router = useRouter();
  const { user, getWebsites, setWebsites } = useUserStore();

  const form = useForm({
    defaultValues: {
      domain: "",
      about: "",
    },
    validators: {
      onSubmit: formSchemaAddWebsite,
    },
    onSubmit: async ({ value }) => {
      const newWebsite = await createWebsite(value.domain, value.about, user!.id);
      if(newWebsite.success) {
        toast({ title: "Website Added", description: ""});
        const websites = await getWebsites(localStorage.getItem("jwt")!);
        setWebsites(websites);
        return router.push("/projects");
      } else {
        toast({ title: "Servers are down at the moment" , description: "" });
      }
    },
  });
  return (
    <div className="flex-1 flex flex-col pt-6 md:pl-4">
      <div>
        <div className="text-[#bfbfbf] flex justify-between items-center">
          <div className="flex">
            <div className="hidden md:block">
              Your Projects &nbsp; &gt; &nbsp;{" "}
            </div>
            <div className="text-[#777777] text-[15px] pl-2 md:pl-0">Add</div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-[#262626] mt-6 rounded-4xl md:rounded-tl-4xl md:rounded-bl-4xl md:rounded-tr-[0px] md:rounded-br-[0px] px-6 md:px-12 pt-11 pb-10 overflow-y-auto">
        <div className="flex flex-col border-2 border-[#767676] rounded-3xl h-full pt-7 pb-5 px-7 md:p-10 xl:p-15 justify-evenly overflow-y-scroll">
          <div>
            <Image
              src="/images/violet-project-icon.svg"
              alt=""
              width={25}
              height={25}
            />
          </div>
          <div className="mt-7 h-full">
            <form
              id="website-add-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="flex flex-col justify-evenly h-full"
            >
              <FieldGroup>
                <form.Field name="domain">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} className="mt-3">
                        <FieldLabel htmlFor={field.name} className="text-lg">
                          Domain
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="xyz.com"
                          autoComplete="off"
                          className="placeholder:text-[#C499FF] placeholder:text-[12px] md:placeholder:text-[14px] rounded-4xl text-[#C499FF]"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name="about">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid} className="mt-3">
                        <FieldLabel htmlFor={field.name} className="text-lg">
                          About
                        </FieldLabel>
                        <InputGroup className="rounded-2xl md:rounded-3xl border-2 border-[#767676]">
                          <InputGroupTextarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Tell us something about your website"
                            rows={6}
                            className="min-h-24 resize-none placeholder:text-[#C499FF] placeholder:text-[12px] md:placeholder:text-[14px] p-5 text-[#C499FF]"
                            aria-invalid={isInvalid}
                          />
                          <InputGroupAddon align="block-end">
                            <InputGroupText className="tabular-nums pl-2 text-[#C499FF]">
                              {field.state.value.length}/40 characters
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>
              <Field className="flex items-center">
                <Button
                  type="submit"
                  form="website-add-form"
                  className="max-w-[200px] rounded-full bg-[#C499FF] text-black py-6 text-md md:text-lg hover:bg-[#a96ffa] cursor-pointer mt-3 md:mt-6"
                >
                  Add +
                </Button>
              </Field>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
