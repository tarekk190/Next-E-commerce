"use server";

import { ChangePasswordSchema } from "@/types/schemas.types";
import { api } from "../api";
import { cookies } from "next/headers";

export async function changePassword(data: ChangePasswordSchema) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { statusMsg: "fail", message: "You are not logged in" };
  }

  let res = await fetch(`${api}/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(data),
  });

  let resData = await res.json();

  return resData;
}
