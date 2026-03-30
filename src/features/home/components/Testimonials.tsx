"use client";

import { useState } from "react";
import { Star, User } from "lucide-react";
import { useTranslations } from "next-intl";

interface Review {
  _id: string;
  title?: string;
  rating?: number;
  review?: string;
  user?: {
    name: string;
  };
  product?:
    | string
    | {
        imageCover: string;
        title: string;
      };
  createdAt?: string;
}

interface TestimonialsProps {
  reviews: Review[];
}

export default function Testimonials({ reviews }: TestimonialsProps) {
  const t = useTranslations("Testimonials");
  const [visibleCount, setVisibleCount] = useState(5);

  if (!reviews || reviews.length === 0) return null;

  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / totalReviews;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/*  Ratings Summary */}
          <div className="lg:w-1/4 shrink-0 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("customerReviews") || "Customer Reviews"}
              </h2>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.round(averageRating)
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-gray-900">
                  {averageRating.toFixed(1)} {t("outOf5") || "out of 5"}
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                {totalReviews} {t("globalRatings") || "global ratings"}
              </p>
            </div>

            {/* Rating Bars  */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3 text-sm">
                  <span className="w-12 text-blue-600 hover:underline hover:text-amber-600 cursor-pointer font-medium whitespace-nowrap">
                    {star} {t("star") || "star"}
                  </span>
                  <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden border border-gray-200 shadow-inner">
                    <div
                      className="h-full bg-amber-500 border-r border-amber-600"
                      style={{
                        width: star === 5 ? "70%" : star === 4 ? "20%" : "5%",
                      }}
                    />
                  </div>
                  <span className="w-8 text-right text-blue-600 hover:text-amber-600 cursor-pointer">
                    {star === 5 ? "70%" : star === 4 ? "20%" : "5%"}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">
                {t("reviewThisProduct") || "Review this product"}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {t("shareThoughts") ||
                  "Share your thoughts with other customers"}
              </p>
              <button className="w-full py-1.5 px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                {t("writeReview") || "Write a customer review"}
              </button>
            </div>
          </div>

          {/*  Reviews List */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t("topReviews") || "Top reviews"}
            </h3>

            <div className="space-y-6">
              {reviews.slice(0, visibleCount).map((review) => (
                <div
                  key={review._id}
                  className="pb-6 border-b border-gray-200 last:border-0"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                      <User size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {review.user?.name || t("anonymous") || "Anonymous"}
                    </span>
                  </div>

                  {/* Rating & Title */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < (review.rating || 0)
                              ? "fill-amber-500 text-amber-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="text-xs text-gray-500 mb-3 space-y-1">
                    <p>
                      {t("reviewedOn") || "Reviewed on"}{" "}
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : new Date().toLocaleDateString()}
                    </p>
                    <p className="text-amber-700 font-semibold text-[11px]">
                      {t("verifiedPurchase") || "Verified Purchase"}
                    </p>
                  </div>

                  {/* Review Body */}
                  <div className="mb-4">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {review.review ||
                        t("defaultReview") ||
                        "Good quality product."}
                    </p>
                  </div>

                  {/* Product Link  */}
                  {review.product && typeof review.product !== "string" && (
                    <div className="mb-4 flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200 max-w-md">
                      <div className="relative w-10 h-10 shrink-0 bg-white border border-gray-200 rounded">
                        <img
                          src={review.product.imageCover}
                          alt={review.product.title}
                          className="w-full h-full object-contain p-0.5"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {review.product.title}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="px-4 py-1 border border-gray-300 rounded shadow-sm hover:bg-gray-50 text-gray-700 font-medium transition-colors cursor-pointer">
                      {t("helpful") || "Helpful"}
                    </button>
                    <span className="text-gray-300">|</span>
                    <button className="hover:text-gray-700 hover:underline cursor-pointer">
                      {t("report") || "Report"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < totalReviews && (
              <button
                onClick={handleShowMore}
                className="mt-4 font-medium text-blue-600 hover:text-amber-600 hover:underline text-sm cursor-pointer flex items-center gap-1"
              >
                {t("seeMore") || "See more reviews"}
                <span className="text-xs">›</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
