import { api } from "./api";

export async function getReviews() {
  const res = await fetch(`${api}/reviews`, { next: { revalidate: 3600 } });
  const data = await res.json();
  return data;
}
