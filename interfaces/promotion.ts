export interface Promotion {
    _id: string,
    voucher:{
      deletedAt:null,
      _id: string,
      name: string,
      description: string
    } | null,
    code: string,
    start_date: Date,
    end_date: Date,
    min_purchase_amount: number | null,
    discount: number | null,
    items: string[],
    deletedAt: Date | null,
    createdAt:Date,
    updatedAt:Date,
   
  }


  export interface PromotionVoucher {
    _id: string;
    name: string;
    description: string | null;
}