import User from "@/interfaces/user";
import api from "./api";

export async function loginUser(email: string, password: string) {
  const res = await api.post("/auth/login", {
    email: email,
    password: password,
  });
  return res.data;
}

export async function getUser(access_token: string) {
  const res = await api.get("/auth/me", {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });
  const data: User = res.data.data;
  return data;
}

export async function getUserManager() {
  const res = await api.get(`/user`);

  return res.data.data;
}

export async function getUserId(access_token: string, userId: string) {
  const res = await api.get(`/user/${userId}`, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });
  const data: User = res.data.data;
  return data;
}

export async function deleteUser(idUser: string) {
  const res = await api.delete(`/product?id=${idUser}`);

  return res.data.data;
}
