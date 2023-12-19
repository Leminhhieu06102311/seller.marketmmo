import api from "./api";

export async function createPromotion(voucherID: string, start_date: Date, end_date:Date , min_purchase_amount:number, discount: number, items: string[], access_token:string) {
    const res = await api.post("/promotion", {
        voucherID: voucherID,
        start_date: start_date,
        end_date: end_date,
        min_purchase_amount: min_purchase_amount,
        discount: discount,
        items: items
    },{headers:
        {
        Authorization: "Bearer " + access_token,
        }
    });
    return res.data;
  }

  export async function getPromotion(access_token:string) {
    const res = await api.get("/promotion?limit=30&page=1", {
      headers: {
          Authorization: 'Bearer ' + access_token
      }
  })
    const { result } = res.data.data
    console.log(result);
    
    return result
  }