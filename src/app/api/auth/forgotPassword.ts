"use server";

import { ForgotPasswordSchema } from "@/types/schemas.types";
import { api } from "../api";

export async function forgotPassword(data: ForgotPasswordSchema) {
  let res = await fetch(`${api}/auth/forgotPasswords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let resData = await res.json();

  return resData;
}
