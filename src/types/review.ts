export interface User {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  title: string;
  imageCover: string;
}

export interface Review {
  _id: string;
  title?: string;
  ratings?: number;
  rating?: number; 
  review?: string;
  user?: User;
  product?: string | Product;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReviewDto {
  review: string;
  rating: number;
}

export interface UpdateReviewDto {
  review?: string;
  rating?: number;
}

export interface ReviewsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Review[];
}
