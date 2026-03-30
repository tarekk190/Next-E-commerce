"use server";

import { cookies } from "next/headers";

const API_Base_Url = `${process.env.API_V2_URL}/cart`;

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 3,
  delay = 1000,
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        if (
          res.status >= 400 &&
          res.status < 500 &&
          res.status !== 429 &&
          res.status !== 408
        ) {
          throw new Error(
            `Request failed with status ${res.status}: ${res.statusText}`,
          );
        }
        throw new Error(`Request failed with status ${res.status}`);
      }
      return res;
    } catch (error: any) {
      if (error.message.includes("Request failed with status 4")) {
        throw error;
      }

      if (i === retries - 1) throw error;
      await sleep(delay);
    }
  }
  throw new Error("Unreachable");
}

export async function getCart() {
  const token = await getToken();
  if (!token) return { status: "fail", message: "No token found" };

  try {
    const res = await fetchWithRetry(API_Base_Url, {
      method: "GET",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching cart from:", API_Base_Url, error);
    return {
      status: "error",
      message: error.message || "Failed to fetch cart",
    };
  }
}

export async function addToCart(productId: string) {
  const token = await getToken();
  if (!token) return { status: "fail", message: "No token found" };

  try {
    const res = await fetchWithRetry(API_Base_Url, {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    return {
      status: "error",
      message: error.message || "Failed to add to cart",
    };
  }
}

export async function updateCartItemCount(productId: string, count: number) {
  const token = await getToken();
  if (!token) return { status: "fail", message: "No token found" };

  try {
    const res = await fetchWithRetry(`${API_Base_Url}/${productId}`, {
      method: "PUT",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    return { status: "error", message: "Failed to update cart item" };
  }
}

export async function removeCartItem(productId: string) {
  const token = await getToken();
  if (!token) return { status: "fail", message: "No token found" };

  try {
    const res = await fetchWithRetry(`${API_Base_Url}/${productId}`, {
      method: "DELETE",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error removing cart item:", error);
    return { status: "error", message: "Failed to remove cart item" };
  }
}

export async function clearCart() {
  const token = await getToken();
  if (!token) return { status: "fail", message: "No token found" };

  try {
    const res = await fetchWithRetry(API_Base_Url, {
      method: "DELETE",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { status: "error", message: "Failed to clear cart" };
  }
}

export async function applyCoupon(couponName: string) {
  const token = await getToken();
  if (!token) return { status: "fail", message: "No token found" };

  try {
    const res = await fetchWithRetry(
      `${process.env.API_V2_URL}/cart/applyCoupon`,
      {
        method: "PUT",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ couponName }),
      },
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error applying coupon:", error);
    return { status: "error", message: "Failed to apply coupon" };
  }
}
