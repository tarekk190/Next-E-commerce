"use server";
import { api } from "./api";

export async function getBrands() {
  try {
    const res = await fetch(`${api}/brands`, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Failed to fetch brands: ${res.status} ${res.statusText}`);
      return { data: [] };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return { data: [] };
  }
}

export async function getBrandById(id: string) {
  try {
    const res = await fetch(`${api}/brands/${id}`, { cache: "no-store" });
    if (!res.ok) {
      console.error(
        `Failed to fetch brand ${id}: ${res.status} ${res.statusText}`,
      );
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching brand ${id}:`, error);
    return null;
  }
}
