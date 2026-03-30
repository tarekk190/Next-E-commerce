"use server";
import { SignupSchema } from "@/types/schemas.types";
import { api } from "../api";

export async function Signup(data: SignupSchema) {
  let res = await fetch(`${api}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let resData = await res.json();

  return resData;
}
