 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import axios, { } from "axios";

const baseURL = _nullishCoalesce(import.meta.env.VITE_API_BASE_URL, () => ( "http://localhost:8000/api/v1"));










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
  if (_optionalChain([error, 'access', _ => _.response, 'optionalAccess', _2 => _2.data, 'optionalAccess', _3 => _3.error])) {
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
