export interface Product {
  deletedAt: null;
  _id: string;
  creator: {
    deletedAt: null;
    _id: string;
    username: string;
    website: null;
    isFlag: number;
    name: string;
    bio: string;
    email: string;
    sessionToken: null;
    role: string;
    online: boolean;
    password: string;
    facebookId: string;
    googleId: string;
    avatar: string;
    phone: string;
    address: string;
    activeMail: boolean;
    twoFactorAuthenticationSecret: boolean;
    birthday: string;
    updatedAt: string;
  };
  categories: {
    _id: string;
    name: string;
    description: string;
  };
  slug: string,
  accompanyingProducts: [
    {
      name: string,
      price: number
    }
  ]
  status: string;
  quantity: number;
  code: string;
  name: string;
  description: string;
  price: number;
  numberHasSeller: number;
  createdAt: string;
  updatedAt: string;
  statsSale: boolean;
  pictures: string[];
  rating: {
    value: null;
    count: number;
  };
}
export interface AddProduct {
  name: string,
  categories: string,
  price: number, 
  pictures: string[], 
  quantity: number, 
  description: string, 
}
