"use client";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "@/services/api/reviews";
import { CreateReviewDto, Review, UpdateReviewDto } from "@/types/review";
import { Check, Edit2, Loader2, Star, Trash2, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UserData {
  name: string;
  id: string;
}

interface ProductTestimonialsProps {
  productId: string;
  token?: string;
  user?: UserData | null;
}

export default function ProductTestimonials({
  productId,
  token,
  user,
}: ProductTestimonialsProps) {
  const t = useTranslations("Testimonials");
  const router = useRouter();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  // Form States
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit State
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editReviewRating, setEditReviewRating] = useState(5);
  const [editReviewText, setEditReviewText] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getReviews(productId);
      setReviews(response.data || []);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
      toast.error(t("failedToLoad") || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error(t("loginToReview") || "Please login to write a review");
      router.push("/login");
      return;
    }

    try {
      setIsSubmitting(true);
      const data: CreateReviewDto = {
        rating: newReviewRating,
        review: newReviewText,
      };

      const response = await createReview(productId, data, token);

      const newReview: Review = {
        ...response.data,
        user: {
          _id: user.id,
          name: user.name,
        },
      };

      setReviews([newReview, ...reviews]);

      setNewReviewText("");
      setNewReviewRating(5);
      toast.success(t("reviewSubmitted") || "Review submitted successfully!");
    } catch (err: any) {
      console.error("Failed to create review", err);
      toast.error(err.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (review: Review) => {
    setEditingReviewId(review._id);
    setEditReviewRating(review.rating || review.ratings || 5);
    setEditReviewText(review.review || review.title || "");
  };

  const cancelEditing = () => {
    setEditingReviewId(null);
    setEditReviewRating(5);
    setEditReviewText("");
  };

  const handleUpdateReview = async (reviewId: string) => {
    try {
      const data: UpdateReviewDto = {
        rating: editReviewRating,
        review: editReviewText,
      };

      const response = await updateReview(reviewId, data, token);

      setReviews(reviews.map((r) => (r._id === reviewId ? response.data : r)));
      cancelEditing();
      toast.success(t("reviewUpdated") || "Review updated successfully");
    } catch (err: any) {
      console.error("Failed to update review", err);
      toast.error(err.message || "Failed to update review");
    }
  };

  const handleDeleteReview = (reviewId: string) => {
    toast(
      t("deleteConfirm") || "Are you sure you want to delete this review?",
      {
        action: {
          label: t("delete") || "Delete",
          onClick: async () => {
            try {
              await deleteReview(reviewId, token);
              setReviews((prev) => prev.filter((r) => r._id !== reviewId));
              toast.success(t("reviewDeleted") || "Review deleted");
            } catch (err: any) {
              console.error("Failed to delete review", err);
              toast.error(err.message || "Failed to delete review");
            }
          },
        },
        cancel: {
          label: t("cancel") || "Cancel",
          onClick: () => {},
        },
      },
    );
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  // Stats
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, r) => acc + (r.rating || r.ratings || 0), 0) /
        totalReviews
      : 0;

  // Rating Distribution
  const ratingCounts = reviews.reduce(
    (acc, review) => {
      const rating = Math.round(review.rating || review.ratings || 0);
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  if (loading) {
    return (
      <div className="py-12 space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-40 bg-gray-200 rounded w-full"></div>
        <div className="h-40 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/*  Summary & Write Review */}
        <div className="lg:w-1/3 space-y-8">
          {/* Summary */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t("customerReviews") || "Customer Reviews"}
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex flex-col">
                <div className="flex text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.round(averageRating)
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300 fill-gray-100"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-500 text-sm">
                  {totalReviews} {t("globalRatings") || "global ratings"}
                </p>
              </div>
            </div>

            {/* Rating Bars */}
            <div className="space-y-2 mb-6">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star] || 0;
                const percentage =
                  totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="w-12 font-medium text-gray-600">
                      {star} {t("star") || "star"}
                    </span>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-10 text-end text-gray-400">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Write Review Form */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t("writeReview") || "Write a Review"}
            </h3>
            {user ? (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("rating") || "Select Rating"}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="focus:outline-hidden transition-all hover:scale-110 active:scale-95"
                      >
                        <Star
                          size={28}
                          className={
                            star <= newReviewRating
                              ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                              : "text-gray-300 hover:text-amber-200"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("review") || "Your Review"}
                  </label>
                  <textarea
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-hidden resize-none transition-shadow"
                    placeholder={
                      t("shareThoughts") || "What did you like or dislike?"
                    }
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {t("submitting") || "Submitting..."}
                    </>
                  ) : (
                    t("submitReview") || "Submit Review"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-6 text-sm">
                  {t("loginToReview") || "Please login to write a review"}
                </p>
                <button
                  onClick={() => router.push("/login")}
                  className="w-full py-2.5 border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  {t("login") || "Login Now"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:w-2/3">
          <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 flex justify-between items-center">
            <span>{t("topReviews") || "Top Reviews"}</span>
            <span className="text-sm font-normal text-gray-500">
              Sorted by:{" "}
              <span className="font-semibold text-gray-900">Most Recent</span>
            </span>
          </h3>

          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Star size={32} />
              </div>
              <p className="text-lg font-medium text-gray-900">
                {t("noReviews") || "No reviews yet"}
              </p>
              <p className="text-gray-500 mt-1">
                {t("beFirst") || "Be the first to share your experience!"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.slice(0, visibleCount).map((review) => (
                <div
                  key={review._id}
                  className="pb-6 border-b border-gray-100 last:border-0 relative group animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  {/* Edit/Delete Actions for Owner */}
                  {user && review.user?._id === user.id && !editingReviewId && (
                    <div className="absolute top-0 end-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform ltr:translate-x-2 rtl:-translate-x-2 group-hover:translate-x-0">
                      <button
                        onClick={() => startEditing(review)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="p-2 text-gray-400 hover:text-red-600  transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}

                  {editingReviewId === review._id ? (
                    // Edit Mode
                    <div className="bg-white p-6 rounded-xl border-2 border-blue-100 shadow-md">
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Update your review
                      </label>
                      <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setEditReviewRating(star)}
                            className="focus:outline-hidden hover:scale-110 transition-transform"
                          >
                            <Star
                              size={24}
                              className={
                                star <= editReviewRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300 hover:text-amber-200"
                              }
                            />
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={editReviewText}
                        onChange={(e) => setEditReviewText(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-hidden resize-none"
                      />
                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={cancelEditing}
                          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateReview(review._id)}
                          className="px-6 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors flex items-center gap-2"
                        >
                          <Check size={16} /> Update Review
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 shadow-xs border border-white">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {review.user?.name || t("anonymous") || "Anonymous"}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>
                              {review.createdAt
                                ? new Date(review.createdAt).toLocaleDateString(
                                    undefined,
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    },
                                  )
                                : new Date().toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < (review.rating || review.ratings || 0)
                                  ? "fill-amber-500 text-amber-500"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        {review.title ? (
                          <span className="text-sm font-bold text-gray-900 border-s border-gray-300 ps-3">
                            {review.title}
                          </span>
                        ) : null}
                        <span className="text-emerald-700 text-xs font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          {t("verifiedPurchase") || "Verified Purchase"}
                        </span>
                      </div>

                      <p className="text-gray-700 leading-relaxed text-base">
                        {review.title || review.review}
                      </p>
                    </>
                  )}
                </div>
              ))}

              {visibleCount < totalReviews && (
                <button
                  onClick={handleShowMore}
                  className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                >
                  {t("seeMore") || "See more reviews"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
