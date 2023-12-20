import { Product } from "@/interfaces/product";
import api from "./api";

export async function getAllProducts(access_token: string, page: number) {
    const res = await api.get(`/product/products-by-user?limit=30&page=${page}&timeSort=DESC`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    })
    const { result } = res.data.data
    return result
}

export async function deleteProduct(idProduct: string, access_token: string) {
    const res = await api.delete(`/product?id=${idProduct}`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    })

    return res
}

export async function addProduct(name: string, categories: string, price: number, pictures: string[], quantity: number, description: string, attach: string | string[], access_token: string) {
    const payload = {
        data: [
            {
                name,
                categories,
                price,
                pictures,
                quantity,
                description,
                attach
            }
        ]
    }
    const res = await api.post(`/product`, payload.data, {
        headers: {
            Authorization: 'Bearer ' + access_token
        },
    })

    return res
}
export async function editProduct(name: string, categories: string, price: number, pictures: string[], quantity: number, description: string, productId: string, access_token: string) {
    const payload = {
        name,
        categories,
        price,
        pictures,
        quantity,
        description
    }
    const res = await api.put(`/product?id=${productId}`, payload,{
        headers: {
           Authorization: 'Bearer ' + access_token
        }
    })
    return res
}
export async function getCategories() {
    const res = await api.get(`/categories`)    
    return res.data.data
}