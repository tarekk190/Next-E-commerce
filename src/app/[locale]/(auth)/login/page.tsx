"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import AuthFooter from "@/app/_components/footer/auth-footer";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginschema } from "@/app/schemas/auth.schema";
import { LoginSchema } from "@/types/schemas.types";
import { Login } from "@/app/api/auth/login";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("Auth");
  const form = useForm({
    resolver: zodResolver(loginschema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    console.log(data);

    const res = await Login(data);

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
      router.push("/");
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

      {/* Login Card */}
      <div className="w-full max-w-[350px] sm:max-w-[350px] p-6 border border-gray-300 rounded-lg">
        <h1 className="text-3xl font-medium mb-4 text-center text-gray-700">
          {t("signIn")}
        </h1>
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
                  <FieldLabel htmlFor={field.name}>
                    {t("emailLabel")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={t("emailPlaceholder")}
                    autoComplete="on"
                    className="h-9 border-gray-400 focus-visible:ring-2 focus-visible:ring-[#e77600]/50 focus-visible:border-[#e77600] rounded-[3px] shadow-[0_1px_0_rgba(255,255,255,0.5),0_1px_0_rgba(0,0,0,0.07)_inset]"
                  />
                  {/* Error Message */}
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

          <div className="space-y-1">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between items-center ">
                    <FieldLabel htmlFor={field.name}>
                      {t("passwordLabel")}
                    </FieldLabel>
                    <Link
                      href="/forgot-password"
                      className="text-[13px] text-blue-600 hover:text-[#c45500] hover:underline "
                    >
                      {t("forgotPassword")}
                    </Link>
                  </div>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder={t("passwordPlaceholder")}
                    autoComplete="on"
                    className="h-9 border-gray-400 focus-visible:ring-2 focus-visible:ring-[#e77600]/50 focus-visible:border-[#e77600] rounded-[3px] shadow-[0_1px_0_rgba(255,255,255,0.5),0_1px_0_rgba(0,0,0,0.07)_inset]"
                  />
                  {/* Error Message */}
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
            {t("signIn")}
          </Button>

          <p className="text-[12px] leading-4 mt-4 text-gray-700">
            {t("agreeToConditions")}{" "}
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

          <div className="mt-4">
            <div className="flex items-center text-[13px] text-gray-600 cursor-pointer hover:text-[#c45500]">
              <span className="me-1">▸</span>
              <Link href="/account-issues">
                <span className="hover:underline">{t("needHelp")}</span>
              </Link>
            </div>
          </div>
        </form>
      </div>

      {/* New to Amazon */}
      <div className="w-full max-w-[350px] my-4">
        <div className="relative flex py-2 items-center">
          <div className="grow border-t border-gray-300"></div>
          <span className="shrink-0 mx-2 text-xs text-gray-500">
            {t("newToOmnibuy")}
          </span>
          <div className="grow border-t border-gray-300"></div>
        </div>
        <Button
          variant="outline"
          className="w-full h-8 mt-2 bg-gray-50 hover:bg-gray-100 border-gray-300 shadow-sm text-[13px] font-normal text-gray-900 rounded-xl capitalize"
        >
          <Link href="/register">{t("createOmnibuyAccount")}</Link>
        </Button>
      </div>

      <AuthFooter />
    </div>
  );
}
