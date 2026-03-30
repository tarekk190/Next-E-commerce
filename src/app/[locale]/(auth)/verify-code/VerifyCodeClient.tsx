"use client";

import { forgotPassword } from "@/app/api/auth/forgotPassword";
import { verifyResetCode } from "@/app/api/auth/verifyResetCode";
import { verifyResetCodeSchema } from "@/app/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { VerifyResetCodeSchema } from "@/types/schemas.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AuthFooter from "@/app/_components/footer/auth-footer";

import { useTranslations } from "next-intl";

export default function VerifyCodeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [message, setMessage] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const t = useTranslations("VerifyCode");

  const form = useForm<VerifyResetCodeSchema>({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  useEffect(() => {
    if (!email) {
      router.push("/forgot-password");
    }
  }, [email, router]);

  const onSubmit = async (data: VerifyResetCodeSchema) => {
    const res = await verifyResetCode(data);

    if (res?.status === "Success") {
      router.push(`/reset-password?email=${email}`);
    } else if (res?.statusMsg === "fail") {
      form.setError("root", {
        message: res.message,
      });
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setResendMessage(null);
    const res = await forgotPassword({ email });
    if (res?.statusMsg === "success") {
      setResendMessage(t("resendSuccess"));
    } else {
      setResendMessage(res?.message || t("resendError"));
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

      {/* Verify Code Card */}
      <div className="w-full max-w-[350px] sm:max-w-[350px] p-6 border border-gray-300 rounded-lg">
        <h1 className="text-3xl font-medium mb-4 text-center text-gray-700">
          {t("title")}
        </h1>
        <p className="text-[13px] text-gray-700 mb-4 bg-gray-50 p-2 rounded-md">
          {t.rich("instruction", { email: () => email })}
          <span
            onClick={() => router.push("/forgot-password")}
            className="text-blue-600 hover:text-[#c45500] hover:underline cursor-pointer ms-1"
          >
            {t("change")}
          </span>
        </p>

        {/* Resend Message */}
        {resendMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 mb-4 rounded-md text-sm text-center">
            {resendMessage}
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
              name="resetCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>{t("enterOTP")}</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("otpPlaceholder")}
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
            {t("verify")}
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleResend}
              className="text-[13px] text-blue-600 hover:text-[#c45500] hover:underline"
            >
              {t("resend")}
            </button>
          </div>
        </form>
      </div>

      <AuthFooter />
    </div>
  );
}
