"use client";
import React from "react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { getUserId } from "@/services/user";
import User from "@/interfaces/user";
import Cookies from "js-cookie";
import { HistoryOrderAdmin } from "@/interfaces/history_order";
import { ENUM_ROLE_TYPE } from "@/enum/role_type";
import { getAllProducts } from "@/services/product";
import { Product } from "@/interfaces/product";
import { TransactionPayAdmin } from "@/interfaces/transacPay";
import { getUserIdOrder, getUserIdPay } from "@/services/user";
export default function UserDetail({
  params,
}: {
  params: { usersId: string };
}) {
  const creatorId = params.usersId;
  const [user, setUser] = useState<User | null>(null);
  const [orderHistory, setOrderHistory] = useState<HistoryOrderAdmin[]>([]);
  const [PayHistory, setPayHistory] = useState<TransactionPayAdmin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTdhYTk4YzQ5MGMyYzJhYmUzMWVlYjQiLCJlbWFpbCI6Im5ndXllbnZhbnRlbzEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MDI3MDE3MjYsImV4cCI6MTcwMjczODMyNn0.05wrnXR8JMN5rLUo0mi-M4MOy71_4uSknj6I9MlEdrw`;


  useEffect(() => {
    const fetchUser = async () => {
        const userData = await getUserId(token, creatorId);
        setUser(userData);

    };
    const getUserOrder = async () => {
      const res = await getUserIdOrder(token);
      setOrderHistory(res);
      console.log(res);
    };
    const getUserPay = async () => {
      const res2 = await getUserIdPay(token, creatorId);
      setPayHistory(res2);
      console.log(res2);
    };
    getUserOrder();
    getUserPay();
    fetchUser();
  }, [creatorId]);
  useEffect(() => {
    const filterOrderHistory = () => {
      const filteredOrders = orderHistory.filter(
        (order) => order.user._id === creatorId
      );
      setOrderHistory(filteredOrders);
      setIsLoading(true);
      console.log(filteredOrders);
    };
    const filterPayHistory = () => {
      const filteredPay = PayHistory.filter(
        (pay) => pay.receiver._id === creatorId
      );
      setPayHistory(filteredPay);
      setIsLoading(true);
      console.log(filteredPay);
    };
    filterPayHistory();
    filterOrderHistory();
  }, [creatorId, orderHistory, PayHistory]);

  return (
    <div className="p-6 max-w-[1536px] w-full m-auto">
      <h1 className="mb-10 font-bold leading-5">Hi, Welcome back 👋</h1>
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
              <h2 className="text-lg font-bold border-b pb-2">
                Lịch sử giao dịch
              </h2>
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
                        {orderHistory.length === 0 ? (
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
                          orderHistory.map(
                            (order: HistoryOrderAdmin, index: number) => (
                              <tr className="border-y py-2">
                                <td className="py-2 text-center">
                                  {index + 1}
                                </td>
                                <td className="py-2 text-sm">
                                  {order.product.name}
                                </td>
                                <td className="py-2 text-sm">
                                  {format(
                                    new Date(order.createdAt),
                                    "dd/MM/yyyy HH:mm:ss"
                                  )}
                                </td>
                                <td className="py-2 text-sm">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(order.totalPrice)}{" "}
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
                <table className="table-auto border-collapse w-full">
                  <thead>
                    <tr className="bg-white sticky top-0">
                      <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                        STT
                      </th>
                      <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                        Người nhận
                      </th>
                      <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                        Ngày
                      </th>
                      <th className="text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 ">
                        Số tiền
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
                        {PayHistory.length === 0 ? (
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
                          PayHistory.map(
                            (pay: TransactionPayAdmin, index: number) => (
                              <tr className="border-y py-2">
                                <td className="py-2 text-center">
                                  {index + 1}
                                </td>
                                <td className="py-2 text-sm">
                                  {pay.depositor.name}
                                </td>
                                <td className="py-2 text-sm">
                                  {format(
                                    new Date(pay.createdAt),
                                    "dd/MM/yyyy HH:mm:ss"
                                  )}
                                </td>
                                <td className="py-2 text-sm">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(pay.amount)}{" "}
                                </td>

                                {/* <td className="py-2 text-sm">{pay.status}</td> */}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
