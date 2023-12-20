import { DashBoard } from "@/interfaces/DashBoard";
import api from "./api";

export async function getDashBoard(access_token: string,start_date : string,end_date:string) {
    const res = await api.get(`/payment/statistical-overview?start_date=${start_date}&end_date=${end_date}`, {
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      });
    return res.data.data
}

export async function getDashBoardSeller(access_token: string,start_date : string,end_date:string) {
  const res = await api.get(`/payment/statistical-overview-by-user?start_date=${start_date}&end_date=${end_date}`, {
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    });
    // const { result } = res.data.data
    return res
}