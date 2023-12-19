export interface HistoryOrder {
  _id: string;
  user: string;
  product: string;
  quantity: number;
  status: string;
  discount: number;
  orderPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface HistoryOrderAdmin {
  promotion: null | any;
  _id: string;
  user: string;
  product: {
    _id: string;
    creator: string;
    categories: string;
    quantity: number;
    name: string;
    description: string;
    price: number;
    numberHasSeller: number;
    statsSale: boolean;
    pictures: string[];
    slug: string;
    deletedAt: null | string;
    accompanyingProducts: Array<{
      name: string;
      price: number;
    } | null>;
    __v: number;
    createdAt: string;
    updatedAt: string;
    discount: number;
  };
  quantity: number;
  status: string;
  discount: number;
  orderPrice: number;
  totalPrice: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
