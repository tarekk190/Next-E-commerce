"use client";

import Link from "next/link";

export default function ConditionsOfUsePage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-[#333]">
          Conditions of Use
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Last updated: February 7, 2026
        </p>

        <div className="space-y-6 text-sm text-[#333] leading-relaxed">
          <p>
            Welcome to Omnibuy. Omnibuy Services LLC and/or its affiliates
            ("Omnibuy") provide website features and other products and services
            to you when you visit or shop at Omnibuy, use Omnibuy products or
            services, use Omnibuy applications for mobile, or use software
            provided by Omnibuy in connection with any of the foregoing
            (collectively, "Omnibuy Services"). Omnibuy provides the Omnibuy
            Services subject to the following conditions.
          </p>

          <div className="bg-gray-100 p-4 border border-gray-300 rounded mb-4">
            <p className="font-bold">
              By using Omnibuy Services, you agree to these conditions. Please
              read them carefully.
            </p>
          </div>

          <p>
            We offer a wide range of Omnibuy Services, and sometimes additional
            terms may apply. When you use an Omnibuy Service (for example, Your
            Profile, Gift Cards, Omnibuy Video, Your Media Library, Omnibuy
            devices, or Omnibuy applications) you also will be subject to the
            guidelines, terms and agreements applicable to that Omnibuy Service
            ("Service Terms"). If these Conditions of Use are inconsistent with
            the Service Terms, those Service Terms will control.
          </p>

          <h2 className="text-xl font-bold text-[#c45500] mt-6">Privacy</h2>
          <p>
            Please review our{" "}
            <Link
              href="/privacy-notice"
              className="text-blue-600 hover:underline hover:text-[#c45500]"
            >
              Privacy Notice
            </Link>
            , which also governs your use of Omnibuy Services, to understand our
            practices.
          </p>

          <h2 className="text-xl font-bold text-[#c45500] mt-6">
            Electronic Communications
          </h2>
          <p>
            When you use Omnibuy Services, or send e-mails, text messages, and
            other communications from your desktop or mobile device to us, you
            may be communicating with us electronically. You consent to receive
            communications from us electronically, such as e-mails, texts,
            mobile push notices, or notices and messages on this site or through
            the other Omnibuy Services, such as our Message Center, and you can
            retain copies of these communications for your records.
          </p>

          <h2 className="text-xl font-bold text-[#c45500] mt-6">Copyright</h2>
          <p>
            All content included in or made available through any Omnibuy
            Service, such as text, graphics, logos, button icons, images, audio
            clips, digital downloads, data compilations, and software is the
            property of Omnibuy or its content suppliers and protected by United
            States and international copyright laws.
          </p>

          <h2 className="text-xl font-bold text-[#c45500] mt-6">
            Your Account
          </h2>
          <p>
            You may need your own Omnibuy account to use certain Omnibuy
            Services, and you may be required to be logged in to the account and
            have a valid payment method associated with it. You are responsible
            for maintaining the confidentiality of your account and password and
            for restricting access to your account, and you agree to accept
            responsibility for all activities that occur under your account or
            password.
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              <Link
                href="/"
                className="text-blue-600 hover:underline hover:text-[#c45500]"
              >
                Return to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
