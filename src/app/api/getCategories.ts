"use server";
import { api } from "./api";

export async function getCategories() {
  const res = await fetch(`${api}/categories`);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function getSubCategories() {
  const res = await fetch(`${api}/subcategories`);
  const data = await res.json();
  console.log(data);
  return data;
}
