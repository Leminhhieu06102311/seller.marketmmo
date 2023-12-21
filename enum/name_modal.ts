export enum ENUM_NAME_MODAL {
    ADD_PRODUCT = "ADD_PRODUCT",
    EDIT_PRODUCT = "EDIT_PRODUCT",
    LISTPRODUCT_MODAL = "LISTPRODUCT_MODAL",
    LISTPROMOTION_MODAL = "LISTPROMOTION_MODAL"
  }

  export const setSelectedVoucherType = (voucherType: string) => ({
    type: 'SET_SELECTED_VOUCHER_TYPE',
    payload: voucherType,
  });