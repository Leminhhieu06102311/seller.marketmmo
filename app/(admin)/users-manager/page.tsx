"use client";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { DeleteUser, editUser, getUserManager } from "@/services/user";
import User from "@/interfaces/user";
import { useState, useEffect } from "react";
import { ENUM_ROLE_TYPE } from "@/enum/role_type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TRUserManagerLoader from "./Loader/TRusers-managerLoader";
import UsersManagerLoader from "./Loader/users-managerLoader";
export default function UsersManager() {
  const [modals, setModals] = useState<string[]>([]);
  const [modalsDelete, setModalsDelete] = useState<string[]>([]);
  const [ErrDelete, setErrDelete] = useState<string[]>([]);
  const [modalsErr, setModalsErr] = useState<string[]>([]);
  const [user, setUser] = useState<User[] | undefined>([]);
  const [isReversed, setIsReversed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countUser, setCountUser] = useState(0);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [searchResults, setSearchResults] = useState<User[] | undefined>([]);
  const [isFlag, setIsFlag] = useState(0);

  const router = useRouter();
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTdhYTk4YzQ5MGMyYzJhYmUzMWVlYjQiLCJlbWFpbCI6Im5ndXllbnZhbnRlbzEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MDI3OTA4NjksImV4cCI6MTcwMjgyNzQ2OX0.vMSxLLdAymuRzTTjOTHAv0lUIbEMCWCt7eguktvxoJ8";

  useEffect(() => {
    const getUser = async () => {
      const res = await getUserManager();
      setUser(res);
      setLoadingPage(false);
      setCountUser(res);
      console.log(res);
      
    };
    getUser();
  }, []);

  const reverseUserList = () => {
    setIsFlag((prevIsFlag) => {
      if (prevIsFlag === 0) {
        setUser((prevUser) =>
          [...(prevUser || [])].sort((a, b) => a.isFlag - b.isFlag)
        );
        return 1;
      } else {
        setUser((prevUser) => [...(prevUser || [])].reverse());
        return 0;
      }
    });
  };
  const handleButtonClick = (userId: string) => {
    const selectedUser = user?.find((userData) => userData._id === userId);
    if (selectedUser) {
      router.push(`/users-manager/${selectedUser._id}`);
    }
  };
  const closeModalErr = (modalId: string) => {
    setModalsErr(modalsErr.filter((id) => id !== modalId));
  };
  const openModal = (modalId: string, roleType: string) => {
    if (roleType === ENUM_ROLE_TYPE.ADMINISTRATION) {
      setModalsErr([...modalsErr, modalId]);
    } else if (roleType === ENUM_ROLE_TYPE.SELLER) {
      setModalsErr([...modalsErr, modalId]);
    } else {
      setModals([...modals, modalId]);
    }
  };
  const openModalDelete = (modalId: string) => {
    setModalsDelete([...modalsDelete, modalId]);
  };
  const openErrDelete = (modalId: string) => {
    setErrDelete([...ErrDelete, modalId]);
  };
  const closeErrDelete = (modalId: string) => {
    setErrDelete(ErrDelete.filter((id) => id !== modalId));
  };
  const closeModal = (modalId: string) => {
    setModals(modals.filter((id) => id !== modalId));
  };
  const closeModalDelete = (modalId: string) => {
    setModalsDelete(modalsDelete.filter((id) => id !== modalId));
  };
  const StatusBan = "True";
  const hanldeDelete = async (idUser: string, status: string) => {
    toast.promise(DeleteUser(idUser, status, token), {
      pending: {
        render: () => {
          return <div>Đang banned User</div>;
        },
      },
      success: {
        render: async () => {
          setUser(user?.filter((item) => item._id !== idUser));
          toast.dismiss(); // Đóng toast hiển thị xóa User
          return <div>Banned User thành công</div>;
        },
      },
      error: {
        render: () => {
          return <div>Lỗi khi banned User. Thử lại sau!</div>;
        },
      },
    });
  };
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
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
    }, 1000);
  };
  const totalPages = Math.ceil((user?.length ?? 0) / 7);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handleEdit = (userId: string) => {
    toast.promise(
      editUser(userId, selectedValue),
      {
        pending: {
          render: () => <div>Đang chỉnh sửa người dùng...</div>,
          icon: "🔄",
        },
        success: {
          render: () => {
            window.location.reload();
            return <div>Chỉnh sửa người dùng thành công!</div>;
          },
          icon: "✅",
        },
        error: {
          render: () => <div>Lỗi khi chỉnh sửa người dùng. Thử lại sau!</div>,
          icon: "❌",
        },
      },
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
  };

  const handleSearch = (event: any) => {
    const inputValue = event.target.value.trim();

    if (inputValue.length > 0) {
      const results = user?.filter((userData) => {
        // Handle cases where fields are null
        const username = userData.username ?? "";
        const name = userData.name ?? "";
        const email = userData.email ?? "";
        const phone = userData.phone ?? "";

        return (
          username.includes(inputValue) ||
          name.includes(inputValue) ||
          email.includes(inputValue) ||
          phone.includes(inputValue)
        );
      });

      setSearchResults(results);
      setSearchTerm(inputValue);
      setTotalResults(results?.length ?? 0); // Set the total number of results
    } else {
      setSearchResults(undefined);
      setSearchTerm("");
      setTotalResults(0); // Reset the total number of results
    }
  };
  return (
    <>
      {loadingPage ? (
        <UsersManagerLoader />
      ) : (
        <>
          <div className="p-6 max-w-[1536px] w-full m-auto">
            <div className="mb-3">
              <h1 className="font-bold text-lg">Quản lí người dùng</h1>
            </div>
            <div>
              <div className="flex justify-between items-center bg-white  px-6 rounded-t-xl h-[96px]">
                <div className="flex items-center bg-white border px-3 py-4 rounded-lg hover:border-primary transition duration-300 w-[250px]">
                  <IoIosSearch className="text-lg mr-2 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    className="bg-transparent focus:outline-none w-full"
                    onInput={handleSearch}
                  />
                </div>
                <div className="flex items-center gap-x-4">
                  {searchTerm.length > 0 ? (
                    (searchResults ?? []).length > 0 ? (
                      <>
                        <div className="text-sm text-gray-700">
                          Tìm thấy
                          <span className="font-medium mx-1">
                            {totalResults}
                          </span>
                          kết quả
                        </div>
                      </>
                    ) : (
                      <>
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
                  <button
                    className="p-2 hover:bg-gray-50 hover:rounded-[50%]"
                    onClick={reverseUserList}
                  >
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
                        {searchTerm.length > 0 ? (
                          (searchResults ?? []).length > 0 ? (
                            searchResults?.map((users) => (
                              <>
                                <tr className="bg-white border-t hover:bg-gray-50 cursor-pointer">
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
                                    {users.role ===
                                      ENUM_ROLE_TYPE.ADMINISTRATION && (
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
                                      onClick={() =>
                                        openModal(users._id, users.role)
                                      }
                                      className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 "
                                    >
                                      <CiEdit />
                                    </button>

                                    <button
                                      className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] "
                                      onClick={() => openModalDelete(users._id)}
                                    >
                                      <MdDeleteForever />
                                    </button>
                                  </th>
                                </tr>
                              </>
                            ))
                          ) : (
                            // Code to display "No data found" message
                            <>
                              <tr className="bg-white border-t hover:bg-gray-50 cursor-pointer">
                                <td className="p-4"></td>
                                <td className="p-4 text-sm"></td>
                                <td className="p-4 text-sm"></td>
                                <td className="px-4 py-20 text-sm text-slate-900 font-medium">
                                  Không tìm thấy dữ liệu người dùng nào
                                </td>
                                <td className="p-4"></td>
                                <td className="p-4 text-sm"></td>
                                <th className="text-start p-4 relative"></th>
                              </tr>
                            </>
                          )
                        ) : (
                          displayedUsers?.map((users) => (
                            <>
                              <tr className="bg-white border-t hover:bg-gray-50 cursor-pointer">
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
                                  {users.role ===
                                    ENUM_ROLE_TYPE.ADMINISTRATION && (
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
                                    onClick={() =>
                                      openModal(users._id, users.role)
                                    }
                                    className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 "
                                  >
                                    <CiEdit />
                                  </button>
                                  {users.role ===
                                    ENUM_ROLE_TYPE.ADMINISTRATION && (
                                    <button
                                      className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] "
                                      onClick={() => openErrDelete(users._id)}
                                    >
                                      <MdDeleteForever />
                                    </button>
                                  )}
                                  {users.role !==
                                    ENUM_ROLE_TYPE.ADMINISTRATION && (
                                    <button
                                      className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] "
                                      // onClick={() => hanldeDelete(users._id)}
                                      onClick={() => openModalDelete(users._id)}
                                    >
                                      <MdDeleteForever />
                                    </button>
                                  )}
                                </th>
                              </tr>
                            </>
                          ))
                        )}
                      </>
                    )}
                  </tbody>
                </table>
                {searchResults?.map((users) => (
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
                                    className="mt-1 w-full px-3 py-2 focus:outline-primary"
                                    disabled
                                  />
                                </div>
                                <div className="flex flex-col mb-2">
                                  <label className="text-sm font-semibold">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    value={users.name}
                                    disabled
                                    className="mt-1 w-full px-3 py-2  focus:outline-primary"
                                  />
                                </div>
                                <div className="flex flex-col mb-2">
                                  <label className="text-sm font-semibold">
                                    Status
                                  </label>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    {users.isFlag !== 0 && (
                                      <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        disabled
                                      />
                                    )}
                                    {users.isFlag === 0 && (
                                      <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked
                                        disabled
                                      />
                                    )}
                                    <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-500" />
                                  </label>
                                </div>
                                <div className="mb-2">
                                  <label className="text-sm font-semibold">
                                    Role
                                  </label>
                                  <label className="block mt-1">
                                    <div className="flex gap-x-3">
                                      <span className="sr-only">
                                        Select Role
                                      </span>
                                      <span className="sr-only text-sm text-red-500">
                                        *chỉ có thể chuyển từ người dùng sang
                                        người bán
                                      </span>
                                    </div>
                                    <select
                                      id="countries"
                                      onChange={handleSelectChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none hover:border-primary rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 "
                                    >
                                      {users.role ===
                                        ENUM_ROLE_TYPE.CUSTOMER && (
                                        <>
                                          <option
                                            selected
                                            value="651a93c59df8ccec8945a68f"
                                          >
                                            User
                                          </option>
                                          <option value="651a93d79df8ccec8945a690">
                                            Seller
                                          </option>
                                        </>
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
                                  <button
                                    onClick={() => handleEdit(users._id)}
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
                                    className="mt-1 w-full px-3 py-2 focus:outline-primary"
                                    disabled
                                  />
                                </div>
                                <div className="flex flex-col mb-2">
                                  <label className="text-sm font-semibold">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    value={users.name}
                                    disabled
                                    className="mt-1 w-full px-3 py-2  focus:outline-primary"
                                  />
                                </div>
                                <div className="flex flex-col mb-2">
                                  <label className="text-sm font-semibold">
                                    Status
                                  </label>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    {users.isFlag !== 0 && (
                                      <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        disabled
                                      />
                                    )}
                                    {users.isFlag === 0 && (
                                      <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked
                                        disabled
                                      />
                                    )}
                                    <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-500" />
                                  </label>
                                </div>
                                <div className="mb-2">
                                  <label className="text-sm font-semibold">
                                    Role
                                  </label>
                                  <label className="block mt-1">
                                    <div className="flex gap-x-3">
                                      <span className="sr-only">
                                        Select Role
                                      </span>
                                      <span className="sr-only text-sm text-red-500">
                                        *chỉ có thể chuyển từ người dùng sang
                                        người bán
                                      </span>
                                    </div>
                                    <select
                                      id="countries"
                                      onChange={handleSelectChange}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none hover:border-primary rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 "
                                    >
                                      {users.role ===
                                        ENUM_ROLE_TYPE.CUSTOMER && (
                                        <>
                                          <option
                                            selected
                                            value="651a93c59df8ccec8945a68f"
                                          >
                                            User
                                          </option>
                                          <option value="651a93d79df8ccec8945a690">
                                            Seller
                                          </option>
                                        </>
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
                                  <button
                                    onClick={() => handleEdit(users._id)}
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
                {displayedUsers?.map((users) => (
                  <>
                    {ErrDelete.includes(users._id) && (
                      <div className="modal">
                        <div className="modal-content">
                          <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div
                              className="fixed inset-0 bg-[#0a1e4266] opacity-50"
                              onClick={() => closeErrDelete(users._id)}
                            ></div>
                            <div className="bg-white py-4 px-10 z-50 w-[400px] h-full md:h-auto md:rounded-xl  lg:h-auto lg:rounded-xl lg:w-528">
                              <div className=" w-full flex justify-between mb-5">
                                <h2 className="font-semibold text-xl"></h2>
                                <button
                                  onClick={() => closeErrDelete(users._id)}
                                >
                                  <IoMdClose className="text-2xl text-gray-200" />
                                </button>
                              </div>
                              <div>
                                <h2 className="font-semibold text-xl text-center">
                                  Không thể Banned Admin
                                </h2>
                                <div className="pt-4 flex justify-center">
                                  <svg
                                    width="22"
                                    height="20"
                                    viewBox="0 0 22 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M11 0C11.3632 0 11.6978 0.196892 11.8742 0.514357L21.8742 18.5144C22.0462 18.8241 22.0416 19.2017 21.8619 19.5071C21.6822 19.8125 21.3543 20 21 20H1C0.64568 20 0.317815 19.8125 0.138129 19.5071C-0.0415561 19.2017 -0.0462301 18.8241 0.125843 18.5144L10.1258 0.514357C10.3022 0.196892 10.6368 0 11 0ZM2.69951 18H19.3005L11 3.05913L2.69951 18ZM11 7C11.5523 7 12 7.44772 12 8V12C12 12.5523 11.5523 13 11 13C10.4477 13 10 12.5523 10 12V8C10 7.44772 10.4477 7 11 7Z"
                                      fill="#FF0000"
                                    />
                                  </svg>
                                </div>
                                <div className="py-4">
                                  <p className="text-sm font-regular text-center">
                                    Chỉ có thể Banned User hoặc Seller!
                                    <br />
                                  </p>
                                </div>
                                <div className="flex justify-center">
                                  <button
                                    onClick={() => closeErrDelete(users._id)}
                                    className="rounded-lg text-white font-semibold text-sm bg-primary px-4 py-2"
                                  >
                                    Đã hiểu
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
                {displayedUsers?.map((users) => (
                  <>
                    {modalsErr.includes(users._id) && (
                      <div className="modal">
                        <div className="modal-content">
                          <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div
                              className="fixed inset-0 bg-[#0a1e4266] opacity-50"
                              onClick={() => closeModalDelete(users._id)}
                            ></div>
                            <div className="bg-white py-4 px-10 z-50 w-[400px] h-full md:h-auto md:rounded-xl  lg:h-auto lg:rounded-xl lg:w-528">
                              <div className=" w-full flex justify-between mb-5">
                                <h2 className="font-semibold text-xl"></h2>
                                <button
                                  onClick={() => closeModalErr(users._id)}
                                >
                                  <IoMdClose className="text-2xl text-gray-200" />
                                </button>
                              </div>
                              <div>
                                <h2 className="font-semibold text-xl text-center">
                                  Không thể đổi quyền
                                </h2>
                                <div className="pt-4 flex justify-center">
                                  <svg
                                    width="22"
                                    height="20"
                                    viewBox="0 0 22 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M11 0C11.3632 0 11.6978 0.196892 11.8742 0.514357L21.8742 18.5144C22.0462 18.8241 22.0416 19.2017 21.8619 19.5071C21.6822 19.8125 21.3543 20 21 20H1C0.64568 20 0.317815 19.8125 0.138129 19.5071C-0.0415561 19.2017 -0.0462301 18.8241 0.125843 18.5144L10.1258 0.514357C10.3022 0.196892 10.6368 0 11 0ZM2.69951 18H19.3005L11 3.05913L2.69951 18ZM11 7C11.5523 7 12 7.44772 12 8V12C12 12.5523 11.5523 13 11 13C10.4477 13 10 12.5523 10 12V8C10 7.44772 10.4477 7 11 7Z"
                                      fill="#FF0000"
                                    />
                                  </svg>
                                </div>
                                <div className="py-4">
                                  <p className="text-sm font-regular text-center">
                                    Chỉ có thể đổi quyền của User!
                                    <br />
                                  </p>
                                </div>
                                <div className="flex justify-center">
                                  <button
                                    onClick={() => closeModalErr(users._id)}
                                    className="rounded-lg text-white font-semibold text-sm bg-primary px-4 py-2"
                                  >
                                    Đã hiểu
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
                {searchResults?.map((users) => (
                  <>
                    {modalsErr.includes(users._id) && (
                      <div className="modal">
                        <div className="modal-content">
                          <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div
                              className="fixed inset-0 bg-[#0a1e4266] opacity-50"
                              onClick={() => closeModalDelete(users._id)}
                            ></div>
                            <div className="bg-white py-4 px-10 z-50 w-[400px] h-full md:h-auto md:rounded-xl  lg:h-auto lg:rounded-xl lg:w-528">
                              <div className=" w-full flex justify-between mb-5">
                                <h2 className="font-semibold text-xl"></h2>
                                <button
                                  onClick={() => closeModalErr(users._id)}
                                >
                                  <IoMdClose className="text-2xl text-gray-200" />
                                </button>
                              </div>
                              <div>
                                <h2 className="font-semibold text-xl text-center">
                                  Không thể đổi quyền
                                </h2>
                                <div className="pt-4 flex justify-center">
                                  <svg
                                    width="22"
                                    height="20"
                                    viewBox="0 0 22 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M11 0C11.3632 0 11.6978 0.196892 11.8742 0.514357L21.8742 18.5144C22.0462 18.8241 22.0416 19.2017 21.8619 19.5071C21.6822 19.8125 21.3543 20 21 20H1C0.64568 20 0.317815 19.8125 0.138129 19.5071C-0.0415561 19.2017 -0.0462301 18.8241 0.125843 18.5144L10.1258 0.514357C10.3022 0.196892 10.6368 0 11 0ZM2.69951 18H19.3005L11 3.05913L2.69951 18ZM11 7C11.5523 7 12 7.44772 12 8V12C12 12.5523 11.5523 13 11 13C10.4477 13 10 12.5523 10 12V8C10 7.44772 10.4477 7 11 7Z"
                                      fill="#FF0000"
                                    />
                                  </svg>
                                </div>
                                <div className="py-4">
                                  <p className="text-sm font-regular text-center">
                                    Chỉ có thể đổi quyền của User!
                                    <br />
                                  </p>
                                </div>
                                <div className="flex justify-center">
                                  <button
                                    onClick={() => closeModalErr(users._id)}
                                    className="rounded-lg text-white font-semibold text-sm bg-primary px-4 py-2"
                                  >
                                    Đã hiểu
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
                {searchResults?.map((users) => (
                  <>
                    {modalsDelete.includes(users._id) && (
                      <div className="modal">
                        <div className="modal-content">
                          <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div
                              className="fixed inset-0 bg-[#0a1e4266] opacity-50"
                              onClick={() => closeModalDelete(users._id)}
                            ></div>
                            <div className="bg-white py-4 px-10 z-50 w-[400px] h-full md:h-auto md:rounded-xl  lg:h-auto lg:rounded-xl lg:w-528">
                              <div className=" w-full flex justify-between mb-5">
                                <h2 className="font-semibold text-xl"></h2>
                                <button
                                  onClick={() => closeModalDelete(users._id)}
                                >
                                  <IoMdClose className="text-2xl text-gray-200" />
                                </button>
                              </div>
                              <div>
                                <h2 className="font-semibold text-xl text-center">
                                  Xóa tài khoản
                                </h2>
                                <div className="pt-4 flex justify-center">
                                  <svg
                                    width="22"
                                    height="20"
                                    viewBox="0 0 22 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M11 0C11.3632 0 11.6978 0.196892 11.8742 0.514357L21.8742 18.5144C22.0462 18.8241 22.0416 19.2017 21.8619 19.5071C21.6822 19.8125 21.3543 20 21 20H1C0.64568 20 0.317815 19.8125 0.138129 19.5071C-0.0415561 19.2017 -0.0462301 18.8241 0.125843 18.5144L10.1258 0.514357C10.3022 0.196892 10.6368 0 11 0ZM2.69951 18H19.3005L11 3.05913L2.69951 18ZM11 7C11.5523 7 12 7.44772 12 8V12C12 12.5523 11.5523 13 11 13C10.4477 13 10 12.5523 10 12V8C10 7.44772 10.4477 7 11 7Z"
                                      fill="#FF0000"
                                    />
                                  </svg>
                                </div>
                                <div className="py-4">
                                  <p className="text-sm font-regular text-center">
                                    Hành động này sẽ không thể hoàn tác
                                    <br />
                                  </p>
                                  <p className="text-sm font-regular text-center">
                                    Bạn có muốn tiếp tục?
                                  </p>
                                </div>
                                <div className="flex justify-center">
                                  <button
                                    onClick={() => closeModalDelete(users._id)}
                                    className="rounded-lg text-black font-semibold text-sm bg-gray-50 px-4 py-2 mr-2"
                                  >
                                    Huỷ
                                  </button>
                                  <button
                                    onClick={() =>
                                      hanldeDelete(users._id, StatusBan)
                                    }
                                    className="rounded-lg text-white font-semibold text-sm bg-primary px-4 py-2"
                                  >
                                    Xóa
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
                {displayedUsers?.map((users) => (
                  <>
                    {modalsDelete.includes(users._id) && (
                      <div className="modal">
                        <div className="modal-content">
                          <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div
                              className="fixed inset-0 bg-[#0a1e4266] opacity-50"
                              onClick={() => closeModalDelete(users._id)}
                            ></div>
                            <div className="bg-white py-4 px-10 z-50 w-[400px] h-full md:h-auto md:rounded-xl  lg:h-auto lg:rounded-xl lg:w-528">
                              <div className=" w-full flex justify-between mb-5">
                                <h2 className="font-semibold text-xl"></h2>
                                <button
                                  onClick={() => closeModalDelete(users._id)}
                                >
                                  <IoMdClose className="text-2xl text-gray-200" />
                                </button>
                              </div>
                              <div>
                                <h2 className="font-semibold text-xl text-center">
                                  Xóa tài khoản
                                </h2>
                                <div className="pt-4 flex justify-center">
                                  <svg
                                    width="22"
                                    height="20"
                                    viewBox="0 0 22 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M11 0C11.3632 0 11.6978 0.196892 11.8742 0.514357L21.8742 18.5144C22.0462 18.8241 22.0416 19.2017 21.8619 19.5071C21.6822 19.8125 21.3543 20 21 20H1C0.64568 20 0.317815 19.8125 0.138129 19.5071C-0.0415561 19.2017 -0.0462301 18.8241 0.125843 18.5144L10.1258 0.514357C10.3022 0.196892 10.6368 0 11 0ZM2.69951 18H19.3005L11 3.05913L2.69951 18ZM11 7C11.5523 7 12 7.44772 12 8V12C12 12.5523 11.5523 13 11 13C10.4477 13 10 12.5523 10 12V8C10 7.44772 10.4477 7 11 7Z"
                                      fill="#FF0000"
                                    />
                                  </svg>
                                </div>
                                <div className="py-4">
                                  <p className="text-sm font-regular text-center">
                                    Hành động này sẽ không thể hoàn tác
                                    <br />
                                  </p>
                                  <p className="text-sm font-regular text-center">
                                    Bạn có muốn tiếp tục?
                                  </p>
                                </div>
                                <div className="flex justify-center">
                                  <button
                                    onClick={() => closeModalDelete(users._id)}
                                    className="rounded-lg text-black font-semibold text-sm bg-gray-50 px-4 py-2 mr-2"
                                  >
                                    Huỷ
                                  </button>
                                  <button
                                    onClick={() =>
                                      hanldeDelete(users._id, StatusBan)
                                    }
                                    className="rounded-lg text-white font-semibold text-sm bg-primary px-4 py-2"
                                  >
                                    Xóa
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
                      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                          <div className="text-sm text-gray-700">
                            Hiển thị từ
                            <span className="font-medium mx-1">
                              {currentPage}
                            </span>
                            đến
                            <span className="font-medium mx-1">
                              {totalPages}
                            </span>
                            của
                            <span className="font-medium mx-1">
                              {countUser}
                            </span>
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
                                      onClick={() =>
                                        handlePageClick(currentPage)
                                      }
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
                                      onClick={() =>
                                        handlePageClick(currentPage)
                                      }
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
                                      onClick={() =>
                                        handlePageClick(totalPages)
                                      }
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
