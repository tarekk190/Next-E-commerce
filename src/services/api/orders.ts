"use server";

import { cookies, headers } from "next/headers";
import { jwtDecode } from "jwt-decode";
async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress,
) {
  const token = await getToken();
  if (!token) return { status: "fail", message: "No token found" };

  try {
    const res = await fetch(`${process.env.API_V2_URL}/orders/${cartId}`, {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { status: "fail", message: error.message };
  }
}

export async function createCheckoutSession(
  cartId: string,
  shippingAddress: ShippingAddress,
) {
  const token = await getToken();
  if (!token) return { status: "fail", message: "No token found" };

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const appUrl = `${protocol}://${host}`;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1"}/orders/checkout-session/${cartId}?url=${appUrl}/allorders?success=true`,
      {
        method: "POST",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress }),
      },
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { status: "fail", message: error.message };
  }
}

export async function getUserOrders() {
  const token = await getToken();
  if (!token) return { status: "fail", message: "No token found" };

  try {
    const decoded: any = jwtDecode(token);
    const userId = decoded.id;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/api/v1"}/orders/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { status: "fail", message: error.message };
  }
}
