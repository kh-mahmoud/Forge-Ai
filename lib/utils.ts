import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormData } from "@/types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export const checkData = (
  data: FormData
): { status: "error"; message: string } | null => {
  let error = false;

  if (!data.title?.trim()) {
    error = true;
  }
  if (!data.desc?.trim()) {
    error = true;
  }
  if (!data.palette?.trim()) {
    error = true;
  }
  if (!data.model?.trim()) {
    error = true;
  }

  return error
    ? { status: "error", message: "Please fill all the fields" }
    : null;
};



