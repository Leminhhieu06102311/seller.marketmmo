import api from "./api";

export async function withDrawal(amount: number, access_token:string) {
    const res = await api.post(`/payment/withdrawal?amount=${amount}`, {
    },{
        headers:
        {
        Authorization: "Bearer " + access_token,
        }
    });
    return res.data;
  }

  export async function bank(bank: string, access_token:string) {
    const res = await api.patch("/user/bank", {
        bank: bank,
    },{
        headers:
        {
        Authorization: "Bearer " + access_token,
        }
    });
    return res.data;
  }

export async function historyWidthDrawal(access_token: string) {
    const res = await api.get(`/payment/by-user?limit=30&page=1`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    })
    const { result } = res.data.data
    return result
}


  


