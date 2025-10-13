"use client";

import { delaFont, neueFont } from "@/app/fonts/fonts";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { formSchemaAddWebsite } from "@/lib/types";
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
import { Button } from "@/components/ui/button";

const AddPage = () => {
  const form = useForm<z.infer<typeof formSchemaAddWebsite>>({
    resolver: zodResolver(formSchemaAddWebsite),
    defaultValues: {
      domain: "",
      about: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchemaAddWebsite>) {
    // Do something with the form values.
    console.log(data);
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
                  <FieldLabel htmlFor="form-domain" className="text-[20px] text-white">Domain</FieldLabel>
                  <Input
                    {...field}
                    id="form-domain"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    className={ neueFont.className + " outline-none border-none bg-[rgba(255,255,255,0.19)] rounded-full h-[65px] px-7"}
                  />
                </Field>
              )}
            />
            <Controller
              name="about"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-about" className="text-[20px] text-white">Description</FieldLabel>
                  <InputGroup className={neueFont.className + " outline-none border-none bg-[rgba(255,255,255,0.19)] rounded-3xl px-4"}>
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
            <Field orientation="horizontal" className="w-full flex justify-center items-center">
              <Button type="submit" className={ neueFont.className + " bg-[#fbbb3f] min-w-[150px] h-[50px] rounded-full text-black text-[18px] hover:bg-[#fdd483] cursor-pointer"}>
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
