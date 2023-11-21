"use client";
import { IoMdAdd } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
export default function Order() {
    const [modals, setModals] = useState<string[]>([]);
    const openModal = (modalId: string) => {
        setModals([...modals, modalId]);
    };

    const closeModal = (modalId: string) => {
        setModals(modals.filter((id) => id !== modalId));
    };
    //
    return (
        <div className="p-6 max-w-[1536px] w-full m-auto">
            <div className="flex justify-between items-center mb-3">
                <h1 className="font-bold text-lg">Quản lý đơn hàng</h1>
            </div>
            <div>
                <div className="flex justify-between items-center bg-white  px-6 rounded-t-xl h-[96px]">
                    <div className="flex items-center gap-x-3">
                        <p className="leading-5 font-semibold lg:m-0 text-black text-sm">
                            1234 đơn hàng
                        </p>
                        <div className="flex items-center bg-white border px-3 py-4 rounded-lg hover:border-primary transition duration-300 w-[250px]">
                            <IoIosSearch className="text-lg mr-2 text-gray-400 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent focus:outline-none w-full"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="p-2">
                            <IoFilterOutline />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Mã đơn hàng</th>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Thông tin đơn hàng</th>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Tên khách hàng</th>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Số điện thoại</th>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Ngày đặt hàng</th>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Thành tiền</th>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-t hover:bg-gray-50">
                                <td className="p-4 whitespace-nowrap text-sm">655b59757e87bab1ae8fc25d</td>
                                <td className="p-4 whitespace-nowrap md:sticky">
                                    <div className="flex justify-start items-center">
                                        <div className="flex">
                                            <div className="text-sm text-primary font-semibold mr-1">
                                                AJDIEHEHGFLASLKDJJASKDAS
                                            </div>
                                            <div className="text-sm">x1</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm">Pham Gia Kien</td>
                                <td className="p-4 whitespace-nowrap text-sm">0123456789</td>
                                <td className="p-4 whitespace-nowrap text-sm">16/07/2023 11:45:02</td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold">20.000VND</td>
                                <th className="text-start p-4 relative">
                                    <button className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 ">
                                        <CiEdit />
                                    </button>
                                    <button className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] ">
                                        <MdDeleteForever />
                                    </button>
                                </th>
                            </tr>

                        </tbody>
                    </table>
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
                                    Showing
                                    <span className="font-medium mx-1">1</span>
                                    to
                                    <span className="font-medium mx-1">10</span>
                                    of
                                    <span className="font-medium mx-1">97</span>
                                    results
                                </div>
                            </div>
                            <div>
                                <nav
                                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                    aria-label="Pagination"
                                >
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
                                    </a>
                                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                                    <a
                                        href="#"
                                        aria-current="page"
                                        className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        1
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        2
                                    </a>
                                    <a
                                        href="#"
                                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                    >
                                        3
                                    </a>
                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                        ...
                                    </span>
                                    <a
                                        href="#"
                                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                    >
                                        8
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        9
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        10
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
