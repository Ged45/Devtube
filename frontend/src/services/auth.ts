import { api } from "./api";

export function authRegister(data: { email: string; username: string; password: string }) {
  return api.post("/auth/register", data).then((r) => r.data);
}

export function authLogin(data: { email: string; password: string }) {
  return api.post("/auth/login", data).then((r) => r.data);
}

export type Profile = {
  id: number;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
};

export function fetchProfile() {
  return api.get("/auth/me").then((r) => r.data as Profile);
}

export function updateProfile(data: Omit<Profile, "id">) {
  return api.patch("/auth/me", data).then((r) => r.data as Profile);
}
