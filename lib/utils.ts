import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function keysToNames(obj: any) {
  const newObj: any = {};

  Object.entries(obj).forEach(([key, value]) => {
    newObj[key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")] =
      value;
  });

  return newObj;
}
