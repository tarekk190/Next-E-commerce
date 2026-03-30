import { apiClient } from "./client";
import {
  Review,
  CreateReviewDto,
  UpdateReviewDto,
  ReviewsResponse,
} from "@/types/review";

export const getReviews = async (
  productId: string,
): Promise<ReviewsResponse> => {
  return await apiClient.get<ReviewsResponse>(`/products/${productId}/reviews`);
};

export const createReview = async (
  productId: string,
  data: CreateReviewDto,
  token?: string,
): Promise<{ data: Review }> => {
  return await apiClient.post<{ data: Review }>(
    `/products/${productId}/reviews`,
    data,
    {
      headers: token ? { token: token } : undefined,
    },
  );
};

export const updateReview = async (
  reviewId: string,
  data: UpdateReviewDto,
  token?: string,
): Promise<{ data: Review }> => {
  return await apiClient.put<{ data: Review }>(`/reviews/${reviewId}`, data, {
    headers: token ? { token: token } : undefined,
  });
};

export const deleteReview = async (
  reviewId: string,
  token?: string,
): Promise<{ message: string }> => {
  return await apiClient.delete<{ message: string }>(`/reviews/${reviewId}`, {
    headers: token ? { token: token } : undefined,
  });
};

export const getReviewById = async (
  reviewId: string,
): Promise<{ data: Review }> => {
  return await apiClient.get<{ data: Review }>(`/reviews/${reviewId}`);
};
