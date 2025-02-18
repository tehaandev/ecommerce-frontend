import axios, { AxiosError } from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
  },
});

export const getHTTPErrorMessage = (
  error: unknown,
  defaultMessage = "Something went wrong. Please try again.",
): string => {
  if (error instanceof AxiosError && error.response) {
    return error.response.data.message;
  }
  return defaultMessage;
};
