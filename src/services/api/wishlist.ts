"use server";

import { cookies } from "next/headers";
import { Product } from "@/types/product";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1"}/wishlist`;

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export const getWishlist = async (): Promise<{
  status: string;
  count: number;
  data: Product[];
}> => {
  const token = await getToken();
  if (!token) return { status: "fail", count: 0, data: [] };

  try {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return { status: "error", count: 0, data: [] };
  }
};

export const addToWishlist = async (
  productId: string,
): Promise<{
  status: string;
  message: string;
  data: string[];
}> => {
  const token = await getToken();
  if (!token) return { status: "fail", message: "No token found", data: [] };

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { status: "error", message: "Failed to add", data: [] };
  }
};

export const removeFromWishlist = async (
  productId: string,
): Promise<{
  status: string;
  message: string;
  data: string[];
}> => {
  const token = await getToken();
  if (!token) return { status: "fail", message: "No token found", data: [] };

  try {
    const res = await fetch(`${BASE_URL}/${productId}`, {
      method: "DELETE",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return { status: "error", message: "Failed to remove", data: [] };
  }
};
