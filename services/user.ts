import User from "@/interfaces/user";
import api from "./api";
import { HistoryOrder, HistoryOrderAdmin } from "@/interfaces/history_order";

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


export async function getUserIdOrder(access_token: string, customerId: string): Promise<HistoryOrderAdmin[]> {
  const res = await api.get(`/order/histories-order-by-user?customer_id=${customerId}&limit=30&page=1`, {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  });
  return res.data.data as HistoryOrderAdmin[]; // Trả về dữ liệu lịch sử đơn hàng
}

export async function getUserIdPay(access_token: string,userId: string) {
  const res = await api.get(`/payment?limit=30&page=1&userID=${userId}`, {
      headers: {
          Authorization: 'Bearer ' + access_token
      }
  })
  const { result } = res.data.data
  return result
}

export async function editUser(userID: string, role: string) {

  try {
    const res = await api.patch(`/user/update-role?userID=${userID}&role=${role}`);
    return res;
  } catch (error) {
    console.error('Lỗi khi chỉnh sửa người dùng:', error);
    throw error;
  }
}

export async function DeleteUser(idUser: string,status:string, access_token: string) {
  const res = await api.delete(`/user/banned-user?userId=${idUser}&status=${status}`, {
      headers: {
          Authorization: 'Bearer ' + access_token
      }
  })

  return res
}