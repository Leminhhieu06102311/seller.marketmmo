"use client";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { deleteUser, getUserManager } from "@/services/user";
import User from "@/interfaces/user";
import { useState, useEffect } from "react";
import { ENUM_ROLE_TYPE } from "@/enum/role_type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TRUserManagerLoader from "./Loader/TRusers-managerLoader";
import UsersManagerLoader from "./Loader/users-managerLoader";
export default function UsersManager() {
  const [modals, setModals] = useState<string[]>([]);
  const [user, setUser] = useState<User[] | undefined>([]);
  const [isReversed, setIsReversed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countUser, setCountUser] = useState(0);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const res = await getUserManager();
      setUser(res);
      setLoadingPage(false);
      setCountUser(res.length);
    };
    getUser();
  }, []);
  const handleButtonClick = (userId: string) => {
    const selectedUser = user?.find((userData) => userData._id === userId);
    if (selectedUser) {
      router.push(`/users-manager/${selectedUser._id}`);
    }
  };
  const reverseUserList = () => {
    setUser((prevUser) => [...(prevUser || []).reverse()]);
    setIsReversed((prevIsReversed) => !prevIsReversed);
  };
  const openModal = (modalId: string) => {
    setModals([...modals, modalId]);
  };

  const closeModal = (modalId: string) => {
    setModals(modals.filter((id) => id !== modalId));
  };
  const hanldeDelete = async (idUser: string) => {
    toast.promise(deleteUser(idUser), {
      pending: {
        render: () => {
          return <div>Đang xóa sản phẩm</div>;
        },
      },
      success: {
        render: async () => {
          setUser(user?.filter((item) => item._id !== idUser));
          return <div>Xoá sản phẩm thành công</div>;
        },
      },
      error: {
        render: () => {
          return <div>Lỗi khi xóa sản phẩm. Thử lại sau!</div>;
        },
      },
    });
  };
  const startIndex = (currentPage - 1) * 7;
  const endIndex = startIndex + 7;
  const displayedUsers = user?.slice(startIndex, endIndex);
  const handlePageClick = (pageNumber: any) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    setIsLoading(true);

    const newPageNumber = pageNumber;

    setTimeout(() => {
      setCurrentPage(newPageNumber);
      setIsLoading(false);
    }, 1000); // Độ trễ 1 giây (1000 milliseconds)
  };
  const totalPages = Math.ceil((user?.length ?? 0) / 7); // Tổng số trang
  const pageNumbers = []; // Mảng chứa số trang

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const visiblePageNumbers = [1, 2, totalPages - 1, totalPages];

  return (
    <>
      {loadingPage ? (
        <UsersManagerLoader/>
      ) : (
        <>
          {" "}
          <div className="p-6 max-w-[1536px] w-full m-auto">
            <div className="mb-3">
              <h1 className="font-bold text-lg">Users</h1>
            </div>
            <div>
              <div className="flex justify-between items-center bg-white  px-6 rounded-t-xl h-[96px]">
                <div className="flex items-center bg-white border px-3 py-4 rounded-lg hover:border-primary transition duration-300 w-[250px]">
                  <IoIosSearch className="text-lg mr-2 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent focus:outline-none w-full"
                  />
                </div>
                <button
                  className="p-2 hover:bg-gray-50 hover:rounded-[50%]"
                  onClick={reverseUserList}
                >
                  <IoFilterOutline />
                </button>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="text-start text-sm p-4">Username</th>
                      <th className="text-start text-sm p-4">Họ và tên</th>
                      <th className="text-start text-sm p-4">Email</th>
                      <th className="text-start text-sm p-4">Số điện thoại</th>
                      <th className="text-start text-sm p-4">Quyền</th>
                      <th className="text-start text-sm p-4">Trạng thái</th>
                      <th className="text-start text-sm p-4">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <TRUserManagerLoader />
                    ) : (
                      <>
                        {" "}
                        {displayedUsers?.map((users) => (
                          <tr className="bg-white border-t hover:bg-gray-50 cursor-pointer">
                            {" "}
                            <td
                              onClick={() => handleButtonClick(users._id)}
                              className="p-4"
                            >
                              <div className="flex justify-start items-center">
                                <div className="w-10 h-10 overflow-hidden rounded-full mr-2">
                                  <img
                                    src={`${users.avatar}`}
                                    alt=""
                                    className="w-full h-full"
                                  />
                                </div>
                                <span className="text-sm font-semibold">
                                  {users.username}
                                </span>
                              </div>
                            </td>
                            <td
                              onClick={() => handleButtonClick(users._id)}
                              className="p-4 text-sm"
                            >
                              {users.name}
                            </td>
                            <td
                              onClick={() => handleButtonClick(users._id)}
                              className="p-4 text-sm"
                            >
                              {users.email}
                            </td>
                            <td
                              onClick={() => handleButtonClick(users._id)}
                              className="p-4 text-sm"
                            >
                              {users.phone}
                            </td>
                            <td
                              onClick={() => handleButtonClick(users._id)}
                              className="p-4"
                            >
                              {users.role === ENUM_ROLE_TYPE.ADMINISTRATION && (
                                <span className="text-[red] bg-red-50 border rounded-lg border-[red] px-3 py-1 text-xs ">
                                  ADMIN
                                </span>
                              )}
                              {users.role === ENUM_ROLE_TYPE.CUSTOMER && (
                                <span className="text-[green] bg-green-50 border rounded-lg border-[green] px-3 py-1 text-xs ">
                                  USER
                                </span>
                              )}
                              {users.role === ENUM_ROLE_TYPE.SELLER && (
                                <span className="text-[blue] bg-blue-50 border rounded-lg border-[blue] px-3 py-1 text-xs ">
                                  SELLER
                                </span>
                              )}
                            </td>
                            <td
                              onClick={() => handleButtonClick(users._id)}
                              className="p-4 text-sm"
                            >
                              {users.isFlag === 0 && (
                                <span className="text-[green] bg-green-50 border rounded-lg border-[green] px-3 py-1 text-xs">
                                  Active
                                </span>
                              )}
                              {users.isFlag !== 0 && (
                                <span className="text-[red] bg-red-50 border rounded-lg border-[red] px-3 py-1 text-xs">
                                  Ban
                                </span>
                              )}
                            </td>
                            <th className="text-start p-4 relative">
                              <button
                                onClick={() => openModal(users._id)}
                                className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 "
                              >
                                <CiEdit />
                              </button>
                              <button
                                className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] "
                                onClick={() => hanldeDelete(users._id)}
                              >
                                <MdDeleteForever />
                              </button>
                            </th>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
                {displayedUsers?.map((users) => (
                  <>
                    {modals.includes(users._id) && (
                      <div className="modal">
                        <div className="modal-content">
                          <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div
                              className="fixed inset-0 bg-[#0a1e4266] opacity-50"
                              onClick={() => closeModal(users._id)}
                            ></div>
                            <div className="bg-white p-4 z-50 w-full h-full md:h-auto  md:w-3/6 md:rounded-xl  lg:h-auto lg:rounded-xl lg:w-528">
                              <div className=" w-full flex justify-between mb-5">
                                <h2 className="font-semibold text-xl">
                                  Quản lí thông tin người dùng
                                </h2>
                                <button onClick={() => closeModal(users._id)}>
                                  {" "}
                                  <IoMdClose className="text-2xl text-gray-200" />
                                </button>
                              </div>
                              <div>
                                <div className="flex flex-col mb-2">
                                  <label className="text-sm font-semibold">
                                    Username
                                  </label>
                                  <input
                                    type="text"
                                    value={users.username}
                                    className="mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg focus:outline-primary"
                                  />
                                </div>
                                <div className="flex flex-col mb-2">
                                  <label className="text-sm font-semibold">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    value={users.name}
                                    className="mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg focus:outline-primary"
                                  />
                                </div>
                                <div className="flex flex-col mb-2">
                                  <label className="text-sm font-semibold">
                                    Status
                                  </label>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    {users.isFlag === 0 && (
                                      <input
                                        type="checkbox"
                                        className="sr-only peer"
                                      />
                                    )}
                                    {users.isFlag !== 0 && (
                                      <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked
                                      />
                                    )}
                                    <div className="w-11 h-6 bg-primary peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600" />
                                  </label>
                                </div>
                                <div className="mb-2">
                                  <label className="text-sm font-semibold">
                                    Role
                                  </label>
                                  <label className="block mt-1">
                                    <span className="sr-only">Select Role</span>
                                    <select
                                      id="countries"
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none hover:border-primary rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 "
                                    >
                                      {users.role ===
                                        ENUM_ROLE_TYPE.CUSTOMER && (
                                        <option value="US" selected>
                                          User
                                        </option>
                                      )}
                                      {users.role !==
                                        ENUM_ROLE_TYPE.CUSTOMER && (
                                        <option value="US">User</option>
                                      )}
                                      {users.role ===
                                        ENUM_ROLE_TYPE.ADMINISTRATION && (
                                        <option value="US" selected>
                                          Admin
                                        </option>
                                      )}
                                      {users.role !==
                                        ENUM_ROLE_TYPE.ADMINISTRATION && (
                                        <option value="US">Admin</option>
                                      )}
                                      {users.role === ENUM_ROLE_TYPE.SELLER && (
                                        <option value="US" selected>
                                          Seller
                                        </option>
                                      )}
                                      {users.role !== ENUM_ROLE_TYPE.SELLER && (
                                        <option value="US">Seller</option>
                                      )}
                                    </select>
                                  </label>
                                </div>

                                <div className="flex justify-end">
                                  <button
                                    onClick={() => closeModal(users._id)}
                                    className="rounded-lg text-black font-semibold text-sm bg-gray-50 px-4 py-2 mr-2"
                                  >
                                    Huỷ
                                  </button>
                                  <button className="rounded-lg text-white font-semibold text-sm bg-primary px-4 py-2">
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
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm text-gray-700">
                        Hiển thị từ
                        <span className="font-medium mx-1">{currentPage}</span>
                        đến
                        <span className="font-medium mx-1">{totalPages}</span>
                        của
                        <span className="font-medium mx-1">{countUser}</span>
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
                        {/* previous button o tren */}
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

                            {currentPage < totalPages && (
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

                        {/* next button */}
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
