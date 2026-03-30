import { Category } from "./category";
//! Product Types
export interface Product {
  priceAfterDiscount?: number;
  _id: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  images: string[];
  category: Category;
  brand: any;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Product[];
}
