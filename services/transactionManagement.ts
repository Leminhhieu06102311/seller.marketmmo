import api from "./api";

export async function getTransactionManagement(access_token: string) {
  const res = await api.get(`/payment?limit=30&page=1&type=R%C3%BAt%20ti%E1%BB%81n`, {
      headers: {
          Authorization: 'Bearer ' + access_token
      }
  })
  const { result } = res.data.data
  return result
}
