"use client";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import Cookies from "js-cookie";
import {
  WithdrawalPaymentAccept,
  getTransactionManagement,
} from "@/services/transactionManagement";
import { TransactionPayAdmin } from "@/interfaces/transacPay";
import { useState, useEffect } from "react";
import { log } from "console";
import { toast } from "react-toastify";
export default function TransactionManagement() {
  const token = Cookies.get("token");
  const [modals, setModals] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [PayHistory, setPayHistory] = useState<TransactionPayAdmin[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [CountPay, setCountPay] = useState(0);
  const [checkedStatus, setCheckedStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const [searchResults, setSearchResults] = useState<
    TransactionPayAdmin[] | undefined
  >([]);

  useEffect(() => {
    const getTransactionManage = async () => {
      const res2 = await getTransactionManagement(token);
      const sortedUsers = res2.sort(
        (a: TransactionPayAdmin, b: TransactionPayAdmin) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      );
      setPayHistory(sortedUsers);
      setCountPay(sortedUsers.length);
    };

    getTransactionManage();
  }, []);
  const startIndex = (currentPage - 1) * 7;
  const endIndex = startIndex + 7;
  const displayedUsers = PayHistory?.slice(startIndex, endIndex);
  const totalPages = Math.ceil((PayHistory?.length ?? 0) / 7);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const openModal = (modalId: string) => {
    setModals([...modals, modalId]);
    console.log("asdsad");
  };
  const closeModal = (modalId: string) => {
    setModals(modals.filter((id) => id !== modalId));
  };
  const handleSearch = (event: any) => {
    const inputValue = event.target.value.toLowerCase();
  
    if (inputValue.length > 0) {
      const results = PayHistory?.filter((Pay) => {
        // Handle cases where fields are null
        const username = Pay.receiver.username ?? "";
        const name = Pay.receiver.name ?? "";
        // const phone = Pay.receiver.phone ?? "";
        // const amount = Pay.amount ?? 0;
  
        return (
          username.toLowerCase().includes(inputValue) ||
          name.toLowerCase().includes(inputValue)
          // amount.includes(inputValue) ||
          // phone.includes(inputValue)
        );
      });
  
      setSearchResults(results);
      setSearchTerm(event.target.value);
      setTotalResults(results?.length ?? 0); // Set the total number of results
    } else {
      setSearchResults(undefined);
      setSearchTerm("");
      setTotalResults(0); // Reset the total number of results
    }
  };

  const handlePageClick = (pageNumber: any) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    setIsLoading(true);

    const newPageNumber = pageNumber;

    setTimeout(() => {
      setCurrentPage(newPageNumber);
      setIsLoading(false);
    }, 1000);
  };
  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  const handleCheckboxChange = (event: any, id: any) => {
    setCheckedStatus((prevStatus) => ({
      ...prevStatus,
      [id]: event.target.checked,
    }));
  };
  const handleEdit = (transactionID: string, receiverID: string) => {
    toast.promise(
      WithdrawalPaymentAccept(token, transactionID, receiverID),
      {
        pending: {
          render: () => <div>Đang kiểm duyệt...</div>,
          icon: "🔄",
        },
        success: {
          render: () => {
            window.location.reload();
            return <div>Đã hoàn tất kiểm duyệt rút tiền!</div>;
          },
          icon: "✅",
        },
        error: {
          render: () => <div>Lỗi khi kiểm duyệt. Thử lại sau!</div>,
          icon: "❌",
        },
      },
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
  };
    return (
      <div className="p-6 max-w-[1536px] w-full m-auto">
        <div className="mb-3">
          <h1 className="font-bold text-lg">Kiểm duyệt rút tiền</h1>
        </div>
        <div>
          <div className="flex justify-between items-center bg-white  px-6 rounded-t-xl h-[96px]">
            <div className="flex items-center bg-white border px-3 py-4 rounded-lg hover:border-primary transition duration-300 w-[250px]">
              <IoIosSearch className="text-lg mr-2 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none w-full"
                onChange={handleSearch}
              />
            </div>
            <div className="flex items-center gap-x-4">
              {searchTerm.length > 0 ? (
                (searchResults ?? []).length > 0 ? (
                  <>
                    <div className="text-sm text-gray-700">
                      Tìm thấy
                      <span className="font-medium mx-1">{totalResults}</span>
                      kết quả
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="text-sm text-gray-700">
                      Tìm thấy
                      <span className="font-bold mx-1">{totalResults}</span>
                      kết quả
                    </div>
                  </>
                )
              ) : (
                <> </>
              )}
              <button className="p-2 hover:bg-gray-50 hover:rounded-[50%]">
                <IoFilterOutline />
              </button>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="text-start text-sm p-4">Username</th>
                  <th className="text-start text-sm p-4">Họ và tên</th>
                  <th className="text-start text-sm p-4">Số tài khoản</th>
                  <th className="text-start text-sm p-4">Số điện thoại</th>
                  <th className="text-start text-sm p-4">Số tiền</th>
                  <th className="text-start text-sm p-4">Trạng thái</th>
                  <th className="text-start text-sm p-4">Kiểm duyệt</th>
                  <th className="text-start text-sm p-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {searchTerm.length > 0 ? (
                  (searchResults ?? []).length > 0 ? (
                    <>
                      {searchResults?.map((pay) => (
                        <>
                          <tr className="bg-white border-t hover:bg-gray-50">
                            <td className="p-4">
                              <span className="text-sm font-semibold">
                                {pay.receiver.username}
                              </span>
                            </td>
                            <td className="p-4 text-sm">{pay.receiver.name}</td>
                            <td className="p-4 text-sm">
                              {pay.receiver.bank === null && (
                                <div className="text-center">--</div>
                              )}
                              {pay.receiver.bank !== null && (
                                <>{pay.receiver.bank}</>
                              )}
                            </td>
                            <td className="p-4 text-sm">
                              {pay.depositor.phone}
                            </td>
                            <td className="p-4 text-sm">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(pay.amount)}{" "}
                            </td>
                            <td className="p-4 text-sm">
                              {pay.status === "Thành công" && (
                                <span className="text-[green] bg-green-50 border rounded-lg border-[green] px-3 py-1 text-xs whitespace-nowrap">
                                  Đã duyệt
                                </span>
                              )}
                              {pay.status === "Đang xử lý" && (
                                <span className="text-[red] bg-red-50 border rounded-lg border-[red] px-3 py-1 text-xs whitespace-nowrap">
                                  Chưa duyệt
                                </span>
                              )}
                            </td>
                            <td className="p-4 text-sm">
                              {pay.status === "Thành công" && (
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                                </label>
                              )}
                              {pay.status === "Đang xử lý" && (
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={checkedStatus[pay._id] || false}
                                    onChange={(event) =>
                                      handleCheckboxChange(event, pay._id)
                                    }
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                                </label>
                              )}
                            </td>
                            <th className="text-start p-4 relative">
                              {pay.status === "Thành công" && (
                                <div className="text-xs flex items-center gap-x-1 text-[blue]">
                                  Đã duyệt{" "}
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
                                      fill="#0000FF"
                                      fill-opacity="0.733333"
                                    />
                                  </svg>
                                </div>
                              )}
                              {pay.status === "Đang xử lý" && (
                                <>
                                  {checkedStatus[pay._id] ? (
                                    <>
                                      <button
                                        onClick={() => openModal(pay._id)}
                                        className="text-[white] bg-[blue] border rounded-lg px-3 py-2 text-xs whitespace-nowrap"
                                      >
                                        Hoàn tất
                                      </button>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )}

                              {/* <button className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] ">
                        <MdDeleteForever />
                      </button> */}
                            </th>
                          </tr>
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {" "}
                      <tr className="bg-white border-t hover:bg-gray-50 cursor-pointer">
                        {" "}
                        <td className="p-4"></td>
                        <td className="p-4 text-sm"></td>
                        <td className="p-4 text-sm"></td>
                        <td className="px-4 py-20 text-sm text-slate-900 font-medium">
                          Không tìm thấy dữ liệu kiểm duyệt nào
                        </td>
                        <td className="p-4"></td>
                        <td className="p-4 text-sm"></td>
                        <th className="text-start p-4 relative"></th>
                      </tr>
                    </>
                  )
                ) : (
                  <>
                    {displayedUsers?.map((pay) => (
                      <>
                        <tr className="bg-white border-t hover:bg-gray-50">
                          <td className="p-4">
                            <span className="text-sm font-semibold">
                              {pay.receiver.username}
                            </span>
                          </td>
                          <td className="p-4 text-sm">{pay.receiver.name}</td>
                          <td className="p-4 text-sm">
                            {pay.receiver.bank === null && (
                              <div className="text-center">--</div>
                            )}
                            {pay.receiver.bank !== null && (
                              <>{pay.receiver.bank}</>
                            )}
                          </td>
                          <td className="p-4 text-sm">{pay.depositor.phone}</td>
                          <td className="p-4 text-sm">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(pay.amount)}{" "}
                          </td>
                          <td className="p-4 text-sm">
                            {pay.status === "Thành công" && (
                              <span className="text-[green] bg-green-50 border rounded-lg border-[green] px-3 py-1 text-xs whitespace-nowrap">
                                Đã duyệt
                              </span>
                            )}
                            {pay.status === "Đang xử lý" && (
                              <span className="text-[red] bg-red-50 border rounded-lg border-[red] px-3 py-1 text-xs whitespace-nowrap">
                                Chưa duyệt
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-sm">
                            {pay.status === "Thành công" && (
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                              </label>
                            )}
                            {pay.status === "Đang xử lý" && (
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={checkedStatus[pay._id] || false}
                                  onChange={(event) =>
                                    handleCheckboxChange(event, pay._id)
                                  }
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                              </label>
                            )}
                          </td>
                          <th className="text-start p-4 relative">
                            {/* <button onClick={() => openModal('modal1')} className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 ">
                                        <CiEdit />
                                    </button> */}
                            {pay.status === "Thành công" && (
                              <div className="text-xs flex items-center gap-x-1 text-[blue]">
                                Đã duyệt{" "}
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
                                    fill="#0000FF"
                                    fill-opacity="0.733333"
                                  />
                                </svg>
                              </div>
                            )}
                            {pay.status === "Đang xử lý" && (
                              <>
                                {checkedStatus[pay._id] ? (
                                  <>
                                    <button
                                      onClick={() => openModal(pay._id)}
                                      className="text-[white] bg-[blue] border rounded-lg px-3 py-2 text-xs whitespace-nowrap"
                                    >
                                      Hoàn tất
                                    </button>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            )}

                            {/* <button className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] ">
                        <MdDeleteForever />
                      </button> */}
                          </th>
                        </tr>
                      </>
                    ))}
                  </>
                )}
              </tbody>
            </table>
            {displayedUsers?.map((pay) => (
              <>
                {modals.includes(pay._id) && (
                  <div className="modal">
                    <div className="modal-content">
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div
                          className="fixed inset-0 bg-[#0a1e4266] opacity-50"
                          onClick={() => closeModal(pay._id)}
                        ></div>
                        <div className="bg-white py-4 px-10 z-50 w-[400px] h-full md:h-auto md:rounded-xl  lg:h-auto lg:rounded-xl lg:w-528">
                          <div className=" w-full flex justify-between mb-5">
                            <h2 className="font-semibold text-xl"></h2>
                            <button onClick={() => closeModal(pay._id)}>
                              <IoMdClose className="text-2xl text-gray-200" />
                            </button>
                          </div>
                          <div>
                            <h2 className="font-semibold text-xl text-center">
                              Xác nhận
                            </h2>
                            <div className="pt-4 flex justify-center">
                              <svg
                                width="24"
                                height="25"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
                                  fill="#0000FF"
                                  fill-opacity="0.733333"
                                />
                              </svg>
                            </div>
                            <div className="py-4">
                              <p className="text-sm font-regular text-center">
                                Bạn có chắc chắn hoàn tất kiểm duyệt
                                <br />
                                <span className="font-semibold">
                                  {pay.receiver.name}
                                </span>
                                <div className="font-semibold">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(pay.amount)}
                                </div>
                                <br />
                              </p>
                            </div>
                            <div className="flex justify-center">
                              <button
                                onClick={() => closeModal(pay._id)}
                                className="rounded-lg text-black font-semibold text-sm bg-gray-50 px-4 py-2 mr-2"
                              >
                                Huỷ
                              </button>
                              <button
                                onClick={() =>
                                  handleEdit(pay._id, pay.receiver._id)
                                }
                                className="rounded-lg text-white font-semibold text-sm bg-primary px-4 py-2"
                              >
                                Lưu
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
          <div className="rounded-b-xl overflow-hidden">
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </a>
              </div>
              {searchTerm.length > 0 ? (
                (searchResults ?? []).length > 0 ? (
                  <></>
                ) : (
                  <></>
                )
              ) : (
                <>
                  {" "}
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm text-gray-700">
                        Hiển thị từ
                        <span className="font-medium mx-1">{currentPage}</span>
                        đến
                        <span className="font-medium mx-1">{totalPages}</span>
                        của
                        <span className="font-medium mx-1">{CountPay}</span>
                        kết quả
                      </div>
                    </div>
                    <div>
                      <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                      >
                        {currentPage > 1 && (
                          <p
                            onClick={() => handlePageClick(currentPage - 1)}
                            className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Previous</span>
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </p>
                        )}
                        {currentPage === 1 && (
                          <p className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-300 ring-1 bg-gray-150 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Previous</span>
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </p>
                        )}
                        {currentPage === totalPages ? (
                          <>
                            <span
                              key={`ellipsis-end`}
                              className="relative inline-block py-2 px-4 text-gray-500 ring-1 ring-inset ring-gray-300"
                            >
                              ...
                            </span>
                            <button
                              key={`page-${currentPage - 1}`}
                              onClick={() => handlePageClick(currentPage - 1)}
                              className="relative cursor-pointer z-10 inline-flex items-center bg-white text-gray-500 ring-1 ring-inset ring-gray-300 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              {currentPage - 1}
                            </button>
                            <button
                              key={`page-${currentPage}`}
                              onClick={() => handlePageClick(currentPage)}
                              aria-current="page"
                              className="relative cursor-pointer z-10 inline-flex items-center bg-indigo-600 text-white px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              {currentPage}
                            </button>
                          </>
                        ) : (
                          <>
                            {currentPage > 1 && (
                              <>
                                <button
                                  key={`page-${currentPage - 1}`}
                                  onClick={() =>
                                    handlePageClick(currentPage - 1)
                                  }
                                  className="relative cursor-pointer z-10 inline-flex items-center bg-white text-gray-500 ring-1 ring-inset ring-gray-300 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  {currentPage - 1}
                                </button>
                                <button
                                  key={`page-${currentPage}`}
                                  onClick={() => handlePageClick(currentPage)}
                                  aria-current="page"
                                  className="relative cursor-pointer z-10 inline-flex items-center bg-indigo-600 text-white px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  {currentPage}
                                </button>
                              </>
                            )}
                            {currentPage === 1 && (
                              <>
                                <button
                                  key={`page-${currentPage}`}
                                  onClick={() => handlePageClick(currentPage)}
                                  aria-current="page"
                                  className="relative cursor-pointer z-10 inline-flex items-center bg-indigo-600 text-white px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  {currentPage}
                                </button>
                                <button
                                  key={`page-${currentPage + 1}`}
                                  onClick={() =>
                                    handlePageClick(currentPage + 1)
                                  }
                                  className="relative cursor-pointer z-10 inline-flex items-center bg-white text-gray-500 ring-1 ring-inset ring-gray-300 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  {currentPage + 1}
                                </button>
                              </>
                            )}
                            {currentPage < totalPages && totalPages > 2 && (
                              <>
                                <span
                                  key={`ellipsis-end`}
                                  className="relative inline-block py-2 px-4 text-gray-500 ring-1 ring-inset ring-gray-300"
                                >
                                  ...
                                </span>
                                <button
                                  key={`page-${totalPages}`}
                                  onClick={() => handlePageClick(totalPages)}
                                  className="relative cursor-pointer z-10 inline-flex items-center bg-white text-gray-500 ring-1 ring-inset ring-gray-300 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  {totalPages}
                                </button>
                              </>
                            )}
                          </>
                        )}

                        {currentPage < totalPages && (
                          <p
                            onClick={() => handlePageClick(currentPage + 1)}
                            className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Next</span>
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </p>
                        )}
                        {currentPage === totalPages && (
                          <p className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Next</span>
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </p>
                        )}
                      </nav>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );

}
