"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import AuthFooter from "@/app/_components/footer/auth-footer";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/app/schemas/auth.schema";
import { ResetPasswordSchema } from "@/types/schemas.types";
import { resetPassword } from "@/app/api/auth/resetPassword";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email || "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (email) {
      form.setValue("email", email);
    } else {
      router.push("/forgot-password");
    }
  }, [email, form, router]);

  const onSubmit = async (data: ResetPasswordSchema) => {
    const res = await resetPassword(data);

    if (res?.token) {
      router.push("/login");
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

      {/* Reset Password Card */}
      <div className="w-full max-w-[350px] sm:max-w-[350px] p-6 border border-gray-300 rounded-lg">
        <h1 className="text-3xl font-medium mb-4 text-center text-gray-700">
          Create new password
        </h1>
        <p className="text-[13px] text-gray-700 mb-4 bg-gray-50 p-2 rounded-md">
          We'll ask for this password whenever you sign in.
        </p>

        {/* Error Message */}
        {form.formState.errors.root && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 mb-4 rounded-md text-sm text-center">
            {form.formState.errors.root.message}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input type="hidden" {...form.register("email")} />

          <div className="space-y-1">
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="At least 6 characters"
                    className="h-9 border-gray-400 focus-visible:ring-2 focus-visible:ring-[#e77600]/50 focus-visible:border-[#e77600] rounded-[3px] shadow-[0_1px_0_rgba(255,255,255,0.5),0_1px_0_rgba(0,0,0,0.07)_inset]"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-600 font-medium"
                    />
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Passwords must be at least 6 characters.
                  </p>
                </Field>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[29px] bg-blue-800 hover:bg-blue-900 text-white font-normal text-[13px] rounded-xl shadow-sm border border-gray-400 cursor-pointer"
          >
            Save changes and sign in
          </Button>
        </form>
      </div>

      <AuthFooter />
    </div>
  );
}
