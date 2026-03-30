"use server";

import { ResetPasswordSchema } from "@/types/schemas.types";
import { api } from "../api";

export async function resetPassword(data: ResetPasswordSchema) {
  let res = await fetch(`${api}/auth/resetPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let resData = await res.json();

  return resData;
}
