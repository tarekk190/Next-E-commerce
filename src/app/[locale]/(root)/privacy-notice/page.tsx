"use client";

import Link from "next/link";

export default function PrivacyNoticePage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-[#333]">
          Omnibuy Privacy Notice
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Last updated: February 7, 2026
        </p>

        <div className="space-y-6 text-sm text-[#333] leading-relaxed">
          <p>
            We know that you care how information about you is used and shared,
            and we appreciate your trust that we will do so carefully and
            sensibly. This Privacy Notice describes how Omnibuy collects and
            processes your personal information through Omnibuy websites,
            devices, products, services, online and physical stores, and
            applications that reference this Privacy Notice (together "Omnibuy
            Services").
          </p>

          <h2 className="text-xl font-bold text-[#c45500] mt-6">
            What Personal Information About Customers Does Omnibuy Collect?
          </h2>
          <p>
            We collect your personal information in order to provide and
            continually improve our products and services.
          </p>
          <p>Here are the types of personal information we collect:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Information You Give Us:</strong> We receive and store any
              information you provide in relation to Omnibuy Services.
            </li>
            <li>
              <strong>Automatic Information:</strong> We automatically collect
              and store certain types of information about your use of Omnibuy
              Services, including information about your interaction with
              content and services available through Omnibuy Services.
            </li>
            <li>
              <strong>Information from Other Sources:</strong> We might receive
              information about you from other sources, such as updated delivery
              and address information from our carriers, which we use to correct
              our records and deliver your next purchase more easily.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-[#c45500] mt-6">
            For What Purposes Does Omnibuy Use Your Personal Information?
          </h2>
          <p>
            We use your personal information to operate, provide, develop, and
            improve the products and services that we offer our customers. These
            purposes include:
          </p>
          <ul className="list-disc ps-5 space-y-2">
            <li>
              <strong>Purchase and delivery of products and services.</strong>{" "}
              We use your personal information to take and handle orders,
              deliver products and services, process payments, and communicate
              with you about orders, products and services, and promotional
              offers.
            </li>
            <li>
              <strong>
                Provide, troubleshoot, and improve Omnibuy Services.
              </strong>{" "}
              We use your personal information to provide functionality, analyze
              performance, fix errors, and improve the usability and
              effectiveness of the Omnibuy Services.
            </li>
            <li>
              <strong>Recommendations and personalization.</strong> We use your
              personal information to recommend features, products, and services
              that might be of interest to you, identify your preferences, and
              personalize your experience with Omnibuy Services.
            </li>
            <li>
              <strong>Comply with legal obligations.</strong> In certain cases,
              we collect and use your personal information to comply with laws.
            </li>
            <li>
              <strong>Communicate with you.</strong> We use your personal
              information to communicate with you in relation to Omnibuy
              Services via different channels (e.g., by phone, email, chat).
            </li>
          </ul>

          <h2 className="text-xl font-bold text-[#c45500] mt-6">
            Does Omnibuy Share Your Personal Information?
          </h2>
          <p>
            Information about our customers is an important part of our
            business, and we are not in the business of selling our customers'
            personal information to others.
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
