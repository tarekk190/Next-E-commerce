"use server";
import { api } from "./api";

const MAIN_API = api || "https://ecommerce.routemisr.com/api/v1";
const API_V2 =
  process.env.API_V2_URL || "https://ecommerce.routemisr.com/api/v2";

export async function getProducts(params?: {
  categoryId?: string;
  subCategoryId?: string;
  keyword?: string;
  limit?: number;
}) {
  const baseUrl = params?.keyword ? API_V2 : MAIN_API;
  let url = `${baseUrl}/products`;
  const queryParams = new URLSearchParams();

  if (params?.keyword) queryParams.append("keyword", params.keyword);
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.subCategoryId) {
    queryParams.append("subcategory", params.subCategoryId);
  } else if (params?.categoryId) {
    queryParams.append("category", params.categoryId);
  }

  const queryString = queryParams.toString();
  if (queryString) url += `?${queryString}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Failed to fetch products: ${res.status} at ${url}`);
      return { data: [] };
    }

    const text = await res.text();

    if (!text || text.trim().startsWith("<")) {
      console.error(`❌ Error: Received HTML instead of JSON from ${url}`);
      return { data: [] };
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [] };
  }
}

export async function getProductById(id: string) {
  const url = `${MAIN_API}/products/${id}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      console.error(` HTML response from ${url}`);
      return null;
    }

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function getProductsByBrand(brandId: string) {
  const url = `${MAIN_API}/products?brand=${brandId}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) return { data: [] };

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      return { data: [] };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for brand ${brandId}:`, error);
    return { data: [] };
  }
}