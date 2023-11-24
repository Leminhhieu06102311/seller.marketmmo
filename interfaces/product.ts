export interface Product {
  _id: string
  creator: string
  categories: string
  quantity: number
  name: string
  description: string
  price: number
  numberHasSeller: number
  statsSale: boolean
  discount: number
  pictures: string[]
  slug: string
  deletedAt: any
  accompanyingProducts: any[]
  __v: number
  createdAt: string
  updatedAt: string
}

export interface AddProduct {
  name: string,
  categories: string,
  price: number, 
  pictures: string[], 
  quantity: number, 
  description: string, 
}
