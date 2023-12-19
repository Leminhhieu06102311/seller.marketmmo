export interface TransactionPayAdmin {
    _id: string;
    receiver: {
      bank: null | string;
      _id: string;
      username: string;
      website: null | string;
      isFlag: number;
      name: string;
      bio: null | string;
      email: string;
      role: string;
      online: boolean;
      avatar: null | string;
      phone: null | string;
      address: null | string;
      birthday: null | string;
      balance: number;
    };
    depositor: {
      _id: string;
      username: string;
      name: string;
      bio: null | string;
      email: string;
      role: string;
      online: boolean;
      avatar: null | string;
      phone: null | string;
      isFlag: number;
      address: null | string;
      website: null | string;
      birthday: null | string;
      balance: number;
      bank: null | string;
      __v: number;
    };
    amount: number;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }