"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import AuthFooter from "@/app/_components/footer/auth-footer";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/app/schemas/auth.schema";
import { ForgotPasswordSchema } from "@/types/schemas.types";
import { forgotPassword } from "@/app/api/auth/forgotPassword";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    const res = await forgotPassword(data);

    if (res?.statusMsg === "success") {
      setMessage(res.message);
      router.push(`/verify-code?email=${data.email}`);
    } else if (res?.statusMsg === "fail") {
      form.setError("root", {
        message: res.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      {/* Header  */}
      <div className="flex items-center gap-2 my-4">
        <Image
          src="/images/logo/logo.webp"
          alt="omnibuy Logo"
          width={103}
          height={31}
          className="object-contain w-auto h-auto"
          priority
        />
        <h1 className="text-3xl font-bold capitalize">omnibuy</h1>
      </div>

      {/* Forgot Password Card */}
      <div className="w-full max-w-[350px] sm:max-w-[350px] p-6 border border-gray-300 rounded-lg">
        <h1 className="text-3xl font-medium mb-4 text-center text-gray-700">
          Password assistance
        </h1>
        <p className="text-[13px] text-gray-700 mb-4 bg-gray-50 p-2 rounded-md">
          Enter the email address associated with your Omnibuy account.
        </p>

        {/* Success Message */}
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 mb-4 rounded-md text-sm text-center">
            {message}
          </div>
        )}

        {/* Error Message */}
        {form.formState.errors.root && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 mb-4 rounded-md text-sm text-center">
            {form.formState.errors.root.message}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="email@example.com"
                    autoComplete="email"
                    className="h-9 border-gray-400 focus-visible:ring-2 focus-visible:ring-[#e77600]/50 focus-visible:border-[#e77600] rounded-[3px] shadow-[0_1px_0_rgba(255,255,255,0.5),0_1px_0_rgba(0,0,0,0.07)_inset]"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-600 font-medium"
                    />
                  )}
                </Field>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[29px] bg-blue-800 hover:bg-blue-900 text-white font-normal text-[13px] rounded-xl shadow-sm border border-gray-400 cursor-pointer"
          >
            Continue
          </Button>
        </form>
      </div>

      <AuthFooter />
    </div>
  );
}
