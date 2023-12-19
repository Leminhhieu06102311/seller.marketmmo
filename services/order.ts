import api from "./api";

export async function fetchHistoriesOrder(access_token : string, status : string,page : number) {
    const res = await api.get(`/order/histories-order-by-status?limit=10&page=${page}&status=${status}`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        },
    })
    const {result} = res.data.data
    return result
}


export async function fetchAllHistoriesOrder(access_token : string,page : number) {
    const res = await api.get(`/order/histories-order-seller?limit=30&page=${page}`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        },
    })
    const {result} = res.data.data
    return result
}