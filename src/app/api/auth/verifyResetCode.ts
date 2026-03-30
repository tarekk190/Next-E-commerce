"use server";

import { VerifyResetCodeSchema } from "@/types/schemas.types";
import { api } from "../api";

export async function verifyResetCode(data: VerifyResetCodeSchema) {
  let res = await fetch(`${api}/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let resData = await res.json();

  return resData;
}
