import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 

export const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export const fetchSearchedProducts = async (query: string) => {
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  if (!res.ok) throw new Error("Error fetching products");
  return res.json();
};