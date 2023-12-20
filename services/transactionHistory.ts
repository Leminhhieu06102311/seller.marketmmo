import api from "./api";
export async function getTransactionHistory(access_token : string) {
    const res = await api.get('/order/histories?limit=30&page=1', {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    })
    return res.data.data
}

export async function getAll() {
    const res = await api.get('/order/histories?limit=30&page=1')
    const  result = res.data.data
    return result
}
