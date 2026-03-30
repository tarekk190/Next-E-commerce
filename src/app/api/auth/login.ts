"use server";
import { LoginSchema } from "@/types/schemas.types";
import { api } from "../api";
import { cookies } from "next/headers";

export async function Login(data: LoginSchema) {
  let res = await fetch(`${api}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  let resData = await res.json();

  if (resData.message === "success" && resData.token) {
    const cookieStore = await cookies();
    cookieStore.set("token", resData.token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  console.log("resData", resData);

  return resData;
}
