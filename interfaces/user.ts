export default interface User {
    balance: null | number;
    bank: null | string;
    deletedAt: null | Date;
    _id: string;
    username: string;
    website: null | string;
    isFlag: number;
    name: string;
    bio: string;
    email: string;
    sessionToken: null | string;
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
    birthday: Date;
    updatedAt: Date;
  }
  