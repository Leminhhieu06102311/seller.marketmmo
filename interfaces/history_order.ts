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
  user: {
    balance: null | any;
    bank: null | any;
    _id: string;
    username: string;
    website: null | any;
    isFlag: number;
    name: string;
    bio: string;
    email: string;
    role: string;
    online: boolean;
    avatar: string;
    phone: string;
    address: string;
    birthday: string;
  };
  product: {
    _id: string;
    creator: {
      balance: null | any;
      bank: null | any;
      _id: string;
      username: string;
      website: null | any;
      isFlag: number;
      name: string;
      bio: string;
      email: string;
      role: string;
      online: boolean;
      avatar: string;
      phone: string;
      address: string;
      birthday: string;
    };
    categories: {
      _id: string;
      name: string;
      description: string;
      slug: string;
    };
    quantity: number;
    name: string;
    description: string;
    price: number;
    numberHasSeller: number;
    statsSale: boolean;
    pictures: string[];
    slug: string;
    deletedAt: null | any;
    accompanyingProducts: ({
      name: string;
      price: number;
    } | null)[];
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
