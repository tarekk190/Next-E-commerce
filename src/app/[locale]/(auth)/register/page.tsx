"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import AuthFooter from "@/app/_components/footer/auth-footer";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/schemas/auth.schema";
import { SignupSchema } from "@/types/schemas.types";
import { Signup } from "@/app/api/auth/signup";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations("Auth");
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    const res = await Signup(data);

    if (res?.message === "fail" && res?.errors) {
      if (res.errors.param && res.errors.msg) {
        form.setError(res.errors.param, {
          message: res.errors.msg,
        });
      }
    } else if (res?.statusMsg === "fail") {
      form.setError("root", {
        message: res.message,
      });
    } else if (res?.message === "success") {
      router.push("/login");
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

      {/* Register Card */}
      <div className="w-full max-w-[350px] sm:max-w-[350px] p-6 border border-gray-300 rounded-lg">
        <h1 className="text-3xl font-medium mb-4 text-center text-gray-700">
          {t("createAccount")}
        </h1>
        {/* Error Message */}
        {form.formState.errors.root && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 mb-4 rounded-md text-sm text-center">
            {form.formState.errors.root.message}
          </div>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>{t("nameLabel")}</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("namePlaceholder")}
                    autoComplete="name"
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

          {/* Email */}
          <div className="space-y-1">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    {t("emailLabel")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="email"
                    placeholder={t("emailPlaceholder")}
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

          {/* Phone */}
          <div className="space-y-1">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    {t("mobileLabel")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="tel"
                    placeholder={t("mobilePlaceholder")}
                    autoComplete="tel"
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

          {/* Password */}
          <div className="space-y-1">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    {t("passwordLabel")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("passwordPlaceholder")}
                    autoComplete="new-password"
                    className="h-9 border-gray-400 focus-visible:ring-2 focus-visible:ring-[#e77600]/50 focus-visible:border-[#e77600] rounded-[3px] shadow-[0_1px_0_rgba(255,255,255,0.5),0_1px_0_rgba(0,0,0,0.07)_inset]"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-600 font-medium"
                    />
                  )}
                  {!fieldState.invalid && (
                    <p className="text-[11px] text-gray-600 mt-1">
                      {t("passwordMinLength")}
                    </p>
                  )}
                </Field>
              )}
            />
          </div>

          {/* Re Password */}
          <div className="space-y-1">
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    {t("rePasswordLabel")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
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
            {t("createOmnibuyAccount")}
          </Button>

          <p className="text-[12px] leading-4 mt-4 text-gray-700">
            {t("createAccountAgree")}{" "}
            <Link
              href="/conditions-of-use"
              className="text-blue-600 hover:text-[#c45500] hover:underline"
            >
              {t("conditions")}
            </Link>{" "}
            {t("and")}{" "}
            <Link
              href="/privacy-notice"
              className="text-blue-600 hover:text-[#c45500] hover:underline"
            >
              {t("privacy")}
            </Link>
            .
          </p>

          <div className="mt-4 border-t border-gray-300 pt-4">
            <p className="text-[13px] text-gray-900">
              {t("alreadyHaveAccount")}{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-[#c45500] hover:underline"
              >
                {t("signIn")}
              </Link>
            </p>
          </div>
        </form>
      </div>

      <AuthFooter />
    </div>
  );
}
