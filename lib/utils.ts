import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const makePostRequest = (url:string, details:any) => {
  return fetch(url,
      {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
      })
      .then((response) => response.json());
};