import api from "./api";

export async function getTransactionManagement(access_token: string) {
  const res = await api.get(
    `/payment?limit=30&page=1&type=R%C3%BAt%20ti%E1%BB%81n`,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );
  const { result } = res.data.data;
  return result;
}

export async function WithdrawalPaymentAccept(
  access_token: string,
  transactionID: string,
  receiverID: string
) {
  const res = await api.patch(
    `/payment/withdrawal?transactionID=${transactionID}&receiverID=${receiverID}&transaction_type=Th%C3%A0nh%20c%C3%B4ng`,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );
    return res
}
