"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  getUserId,
  getUserIdwithdrawalPay,
  getSellerIdByOrder,
  getUserIdOrder,
} from "@/services/user";
import User from "@/interfaces/user";
import Cookies from "js-cookie";
import { HistoryOrderAdmin } from "@/interfaces/history_order";
import { ENUM_ROLE_TYPE } from "@/enum/role_type";
import { TransactionPayAdmin } from "@/interfaces/transacPay";
export default function UserDetail({
  params,
}: {
  params: { usersId: string };
}) {
  
  const creatorId = params.usersId;
  const [user, setUser] = useState<User | null>(null);
  const [orderHistory, setOrderHistory] = useState<HistoryOrderAdmin[]>([]);
  const [PaywithdrawalHistory, setPaywithdrawalHistory] = useState<
    TransactionPayAdmin[]
  >([]);
  const [sellerOrder, setsellerOrder] = useState<HistoryOrderAdmin[]>([]);
  const [PayHistory, setPayHistory] = useState<TransactionPayAdmin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [totalMoneyOrderUser, settotalMoneyOrderUser] = useState(0);
  const [totalQuanlityOrderUser, SettotalQuanlityOrderUser] = useState(0);
  const [totalMoneyOrderSeller, settotalMoneyOrderSellerr] = useState(0);
  const [totalQuanlityOrderSeller, SettotalQuanlityOrderSeller] = useState(0);
  const [totalMoneywithdrawalPay, settotalMoneywithdrawalPay] = useState(0);

  const token = Cookies.get("token");
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserId(token, creatorId);
      setUser(userData);
    };
    fetchUser();
  }, [creatorId]);
  useEffect(() => {
    const getUserOrder = async () => {
      const res = await getUserIdOrder(token, creatorId);
      setOrderHistory(res);
    };
    getUserOrder();
  }, [creatorId]);

  useEffect(() => {
    const calculateTotalMoney = () => {
      const totalPriceSum = orderHistory.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );
      settotalMoneyOrderUser(totalPriceSum);
      SettotalQuanlityOrderUser(orderHistory.length);
    };
    calculateTotalMoney();
  }, [orderHistory]);

  const sortedOrderHistory = orderHistory?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  useEffect(() => {
    const getUserIdwithdrawalPaya = async () => {
      const despay = await getUserIdwithdrawalPay(token, creatorId);
      setPaywithdrawalHistory(despay);
    };

    getUserIdwithdrawalPaya();
  }, [creatorId]);

  useEffect(() => {
    const calculateTotalMoney = () => {
      const totalPriceSum = PaywithdrawalHistory.reduce(
        (acc, order) => acc + order.amount,
        0
      );
      settotalMoneywithdrawalPay(totalPriceSum);
    };
    calculateTotalMoney();
  }, [PaywithdrawalHistory]);

  const sortedPaywithdrawalHistory = PaywithdrawalHistory?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  useEffect(() => {
    const getSellerIdByOrdera = async () => {
      const resSellerOrder = await getSellerIdByOrder(token, creatorId);
      setsellerOrder(resSellerOrder);
    };
    getSellerIdByOrdera();
  }, [creatorId]);

  useEffect(() => {
    const calculateTotalMoney = () => {
      const totalPriceSum = sellerOrder.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );
      settotalMoneyOrderSellerr(totalPriceSum);
      SettotalQuanlityOrderSeller(sellerOrder.length);
    };
    calculateTotalMoney();
  }, [sellerOrder]);

  const sortedSellerOrder = sellerOrder?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  useEffect(() => {
    const filterPayHistory = () => {
      const filteredPay = PayHistory.filter(
        (pay) => pay.receiver._id === creatorId
      );
      setPayHistory(filteredPay);
      setIsLoading(true);
    };
    filterPayHistory();
  }, [creatorId]);
  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };
  return (
    <div className="p-6 max-w-[1536px] w-full m-auto">
      <h1 className="mb-10 font-bold leading-5">Hi, Welcome back 👋</h1>
      {user?.role === ENUM_ROLE_TYPE.CUSTOMER && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 mb-5">
          <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md  ">
            <div className="flex justify-center flex-row w-full py-10 px-6 ">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  className="m-w-full inline-block"
                  src="https://www.logolynx.com/images/logolynx/c4/c4e297cf6b1f22c8df0e7d5ef5bf846e.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col ml-6">
                <h6 className="text-lg">Tổng tiền mua hàng</h6>
                <h1 className="text-lg font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalMoneyOrderUser)}
                </h1>
              </div>
            </div>
          </div>
          <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md  ">
            <div className="flex justify-center flex-row w-full py-10 px-6 ">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  className="m-w-full inline-block"
                  src="/images/admin/dashboard/ic_glass_buy.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col ml-6">
                <h6 className="text-lg">Tổng đơn hàng đã mua</h6>
                <h4 className="text-lg font-bold">
                  {totalQuanlityOrderUser} đơn hàng
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
      {user?.role === ENUM_ROLE_TYPE.SELLER && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 mb-5">
          <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md  ">
            <div className="flex justify-center flex-row w-full py-10 px-6 ">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  className="m-w-full inline-block"
                  src="/images/admin/dashboard/ic_glass_bag.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col ml-6">
                <h6 className="text-lg">Tổng doanh thu</h6>
                <h4 className="text-lg font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalMoneyOrderSeller)}
                </h4>
              </div>
            </div>
          </div>
          <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md  ">
            <div className="flex justify-center flex-row w-full py-10 px-6 ">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  className="m-w-full inline-block"
                  src="/images/admin/dashboard/ic_glass_buy.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col ml-6">
                <h6 className="text-lg">Tổng đơn hàng</h6>
                <h4 className="text-lg font-bold">
                  {totalQuanlityOrderSeller} đơn hàng
                </h4>
              </div>
            </div>
          </div>
          <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md ">
            <div className="flex justify-center flex-row w-full py-10 px-6 ">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  className="m-w-full inline-block"
                  src="https://www.logolynx.com/images/logolynx/c4/c4e297cf6b1f22c8df0e7d5ef5bf846e.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col ml-6">
                <h6 className="text-lg">Tổng số tiền rút </h6>
                <h4 className="text-lg font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalMoneywithdrawalPay)}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row lg:flex-row items-start md:items-center lg:items-center justify-between mb-3 ">
        <div className="flex items-center flex-shrink-0 mb-5 mr-0 md:mr-5 md:mb-0 lg:mb-0">
          <div className="flex-shrink-0 w-[100px] h-[100px] overflow-hidden rounded-full mr-5">
            <img src={`${user?.avatar}`} alt="" />
          </div>
          <div>
            <h2 className="text-xl uppercase font-bold mb-1">{user?.name}</h2>
            <div className="text-base font-semibold">
              {user?.role === ENUM_ROLE_TYPE.ADMINISTRATION && (
                <span className="px-3 py-1 border border-[red] text-[red] rounded-lg text-xs">
                  ADMIN
                </span>
              )}
              {user?.role === ENUM_ROLE_TYPE.CUSTOMER && (
                <span className="px-3 py-1 border border-[green] text-[green] rounded-lg text-xs">
                  User
                </span>
              )}
              {user?.role === ENUM_ROLE_TYPE.SELLER && (
                <span className="px-3 py-1 border border-[blue] text-[blue] rounded-lg text-xs">
                  Seller
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-3/6 px-3 justify-between lg:justify-around flex-wrap md:flex-nowrap lg:flex-nowrap ">
          <div className="mr-5">
            <div className="mb-5">
              <h3 className="w-[60px] font-semibold text-primary">ID:</h3>
              <span className="font-semibold">{user?._id}</span>
            </div>
            <div className="mb-5">
              <h3 className="w-[60px] font-semibold text-primary">Email:</h3>
              <span className="font-semibold">{user?.email}</span>
            </div>
          </div>
          <div>
            <div className="mb-5">
              <h3 className="w-[100px] font-semibold text-primary">
                Username:
              </h3>
              <span className="font-semibold">{user?.username}</span>
            </div>
            <div className="mb-5">
              <h3 className="w-[100px] font-semibold text-primary">Phone:</h3>
              <span className="font-semibold">{user?.phone}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="">
          <div className="p-6 bg-white rounded-xl shadow-lg h-full">
            <h2 className="text-lg font-bold border-b pb-2">
              Thông tin cá nhân
            </h2>
            <div className="grid grid-cols-2 mb-1 mt-2">
              <div className="mb-1">
                <h4 className="text-primary font-semibold text-base">
                  Ngày sinh:
                </h4>
                {user?.birthday ? (
                  <span>{new Date(user.birthday).toLocaleDateString()}</span>
                ) : (
                  <span>--</span>
                )}
              </div>
              <div className="mb-1">
                <h4 className="text-primary font-semibold text-base">
                  Địa chỉ:
                </h4>
                {user?.address ? <span>{user.address}</span> : <span>--</span>}
              </div>
              <div className="mb-1">
                <h4 className="text-primary font-semibold text-base">
                  Website:
                </h4>
                {user?.website ? <span>{user.website}</span> : <span>--</span>}
              </div>
              <div className="mb-1">
                <h4 className="text-primary font-semibold text-base">
                  Xác thực Email:
                </h4>
                {user?.activeMail === true ? (
                  <span>{user.activeMail}</span>
                ) : (
                  <span>--</span>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-primary font-semibold text-base">Mô tả:</h4>
              <div>{user?.bio ? <span>{user.bio}</span> : <span>--</span>}</div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="p-6 bg-white rounded-xl h-[320px] shadow-lg">
            {user?.role === ENUM_ROLE_TYPE.ADMINISTRATION && (
              <h2 className="text-lg font-bold border-b pb-2">ADMIN</h2>
            )}
            {user?.role === ENUM_ROLE_TYPE.CUSTOMER && (
              <h2 className="text-lg font-bold border-b pb-2">
                Lịch sử mua hàng
              </h2>
            )}
            {user?.role === ENUM_ROLE_TYPE.SELLER && (
              <div className="border-b pb-2">
                <div className="flex justify-around">
                  <button
                    className={`tab-button pb-2 relative transition-colors duration-300 ease-in-out ${
                      activeTab === 0
                        ? "border-b-2  border-[blue]"
                        : "border-b-2 border-transparent"
                    }`}
                    onClick={() => handleTabClick(0)}
                  >
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transition-all duration-300 ease-in-out transform origin-left scale-x-0"></span>
                    Tất cả đơn hàng
                  </button>
                  <button
                    className={`tab-button pb-2 relative transition-colors duration-300 ease-in-out ${
                      activeTab === 2
                        ? "border-b-2 border-[blue]"
                        : "border-b-2 border-transparent"
                    }`}
                    onClick={() => handleTabClick(2)}
                  >
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transition-all duration-300 ease-in-out transform origin-left scale-x-0"></span>
                    Lịch sử rút tiền
                  </button>
                </div>
              </div>
            )}
            <div className="overflow-auto scroll-smooth h-5/6 relative">
              {user?.role === ENUM_ROLE_TYPE.ADMINISTRATION && (
                <div className="py-2 text-center text-md text-slate-900 font-medium flex justify-center mt-10 pt-10">
                  Không có nội dung để hiển thị
                </div>
              )}
              {user?.role === ENUM_ROLE_TYPE.CUSTOMER && (
                <table className="table-auto border-collapse w-full">
                  <thead>
                    <tr className="bg-white sticky top-0">
                      <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                        STT
                      </th>
                      <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                        Tên sản phẩm
                      </th>
                      <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                        Ngày
                      </th>
                      <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                        Thanh toán
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {!isLoading ? (
                      <></>
                    ) : (
                      <>
                        {" "}
                        {orderHistory?.length === 0 ? (
                          <tr>
                            <td
                              rowSpan={4}
                              colSpan={4}
                              className="py-2 text-center text-md text-slate-900 font-medium"
                            >
                              <div className="flex justify-center">
                                Không có dữ liệu
                              </div>
                            </td>
                          </tr>
                        ) : (
                          sortedOrderHistory?.map(
                            (order: HistoryOrderAdmin, index: number) => (
                              <tr className="border-y py-2">
                                <td className="py-2 text-center">
                                  {index + 1}
                                </td>
                                <td className="py-2 text-sm">
                                  {order.product.name}
                                </td>
                                <td className="py-2 text-sm">
                                  {new Date(order.createdAt).toLocaleString(
                                    "vi-VN"
                                  )}
                                </td>
                                <td className="py-2 text-sm">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(order.totalPrice)}
                                </td>
                              </tr>
                            )
                          )
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              )}
              {user?.role === ENUM_ROLE_TYPE.SELLER && (
                <div>
                  <div className="tabs">
                    <div className="tab-content">
                      {activeTab === 0 && (
                        <div>
                          {" "}
                          <div>
                            {" "}
                            <table className="table-auto border-collapse w-full">
                              <thead>
                                <tr className="bg-white sticky top-0">
                                  <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                                    STT
                                  </th>
                                  <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                                    Tên sản phẩm
                                  </th>
                                  <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                                    Số lượng
                                  </th>
                                  <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                                    Ngày
                                  </th>
                                  <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                                    Tổng tiền
                                  </th>
                                  {/* <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                                    Trạng thái
                                  </th> */}
                                </tr>
                              </thead>
                              <tbody className="">
                                {!isLoading ? (
                                  <></>
                                ) : (
                                  <>
                                    {" "}
                                    {sellerOrder && sellerOrder.length === 0 ? (
                                      <tr>
                                        <td
                                          rowSpan={5}
                                          colSpan={5}
                                          className="py-2 text-center text-md text-slate-900 font-medium"
                                        >
                                          <div className="flex justify-center">
                                            Không có dữ liệu
                                          </div>
                                        </td>
                                      </tr>
                                    ) : (
                                      sortedSellerOrder?.map(
                                        (
                                          sellerOrder: HistoryOrderAdmin,
                                          index: number
                                        ) => (
                                          <tr className="border-y py-2">
                                            <td className="py-2 text-center">
                                              {index + 1}
                                            </td>
                                            <td className="py-2 text-sm">
                                              {sellerOrder.product.name}
                                            </td>
                                            <td className="py-2 text-sm">
                                              {sellerOrder.quantity}
                                            </td>
                                            <td className="py-2 text-sm">
                                              {new Date(
                                                sellerOrder.createdAt
                                              ).toLocaleString("vi-VN")}
                                            </td>
                                            <td className="py-2 text-sm">
                                              {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                              }).format(sellerOrder.totalPrice)}
                                            </td>
                                          </tr>
                                        )
                                      )
                                    )}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      {activeTab === 2 && (
                        <div>
                          {" "}
                          <table className="table-auto border-collapse w-full">
                            <thead>
                              <tr className="bg-white sticky top-0">
                                <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                                  STT
                                </th>
                                <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                                  Tên
                                </th>
                                <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                                  Số tiền rút
                                </th>
                                <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                                  Ngày
                                </th>
                                <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                                  Trạng thái
                                </th>
                              </tr>
                            </thead>
                            <tbody className="">
                              {!isLoading ? (
                                <></>
                              ) : (
                                <>
                                  {" "}
                                  {PaywithdrawalHistory.length === 0 ? (
                                    <tr>
                                      <td
                                        rowSpan={5}
                                        colSpan={5}
                                        className="py-2 text-center text-md text-slate-900 font-medium"
                                      >
                                        <div className="flex justify-center">
                                          Không có dữ liệu
                                        </div>
                                      </td>
                                    </tr>
                                  ) : (
                                    sortedPaywithdrawalHistory.map(
                                      (
                                        pay: TransactionPayAdmin,
                                        index: number
                                      ) => (
                                        <tr className="border-y py-2">
                                          <td className="py-2 text-center">
                                            {index + 1}
                                          </td>
                                          <td className="py-2 text-sm">
                                            {pay.receiver.name}
                                          </td>
                                          <td className="py-2 text-sm">
                                            -{" "}
                                            {new Intl.NumberFormat("vi-VN", {
                                              style: "currency",
                                              currency: "VND",
                                            }).format(pay.amount)}
                                          </td>
                                          <td className="py-2 text-sm">
                                            {new Date(
                                              pay.createdAt
                                            ).toLocaleString("vi-VN")}
                                          </td>
                                          {pay.status === "Thành công" && (
                                            <td className="py-2 text-sm font-semibold">
                                              <span className="px-3 py-1 border border-[green] text-[green] rounded-lg text-xs">
                                                Thành công
                                              </span>
                                            </td>
                                          )}
                                          {pay.status === "Đang xử lý" && (
                                            <td className="py-2 text-sm font-semibold">
                                              {" "}
                                              <td className="py-2 text-sm font-semibold">
                                                <span className="px-3 py-1 border border-[orange] text-[darkorange] rounded-lg text-xs">
                                                  Đang xử lý
                                                </span>
                                              </td>
                                            </td>
                                          )}
                                        </tr>
                                      )
                                    )
                                  )}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
