import axios, { } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";










export class ApiError extends Error {
  
  
  
  

  constructor(status, payload) {
    super(payload.error.message);
    this.name = "ApiError";
    this.status = status;
    this.code = payload.error.code;
    this.requestId = payload.error.request_id;
    this.details = payload.error.details;
  }
}

function attachRequestId(config) {
  const token = readAccessToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
}

function readAccessToken() {
  try {
    return window.localStorage.getItem("access_token");
  } catch {
    return null;
  }
}

function toApiError(error) {
  if (error?.response?.data?.error) {
    return Promise.reject(new ApiError(error.response.status, error.response.data));
  }
  return Promise.reject(error);
}

export function createApiClient() {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });
  instance.interceptors.request.use(attachRequestId);
  instance.interceptors.response.use((response) => response, toApiError);
  return instance;
}

export const apiClient = createApiClient();
