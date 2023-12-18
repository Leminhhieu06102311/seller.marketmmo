import api from "./api";

export async function getHistoryOrder(access_token: string, page: number) {
    const res = await api.get(`/product/products-by-user?limit=30&page=${page}&timeSort=DESC`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    })
    const { result } = res.data.data
    return result
}