export interface Login {
  email: string;
  password: string;
}
export interface ApiError {
  message?: string;
  messages?: string[];
}

export type User = { name?: string; email: string };
export interface LoginResponse {
  message?: string;
  token?: string;
  user?: User;
  data?: { token?: string; user?: User; message?: string };
}
export interface Register {
  email: string;
  password: string;
  confirmPassword: string;
}
