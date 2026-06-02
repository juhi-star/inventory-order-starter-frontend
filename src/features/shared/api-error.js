import { ApiError } from "@/lib/api/client";



export const isApiError = (e) => e instanceof ApiError;

export const getErrorMessage = (e) => {
  if (isApiError(e)) return e.message;
  if (e instanceof Error) return e.message;
  return "Unexpected error";
};

export const getOversellDetails = (e) => {
  if (!isApiError(e)) return [];
  if (e.code !== "oversell") return [];
  if (!Array.isArray(e.details)) return [];
  return e.details.filter(
    (d) =>
      typeof d === "object" &&
      d !== null &&
      "line" in d &&
      "product_id" in d &&
      "requested" in d &&
      "available" in d,
  );
};
