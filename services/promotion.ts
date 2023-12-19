import api from "./api";

export async function createPromotion(promotionType: string, data: any, access_token:string) {

  const res = await api.post(`/promotion/${promotionType}`, data, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
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