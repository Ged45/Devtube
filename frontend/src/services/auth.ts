import { api } from "./api";

export function authRegister(data: { email: string; username: string; password: string }) {
  return api.post("/auth/register", data).then((r) => r.data);
}

export function authLogin(data: { email: string; password: string }) {
  return api.post("/auth/login", data).then((r) => r.data);
}
