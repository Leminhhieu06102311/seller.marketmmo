"use client";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { fetchHistoriesOrder } from "@/services/order";
import Cookies from 'js-cookie'
import { ENUM_STATUS_ORDER } from "@/enum/status_order";
import { HistoryOrder } from "@/interfaces/history_order";
import { formatCurrencyVND } from "@/utils/format_vnd";
export default function Order() {
    const [status, setStatus] = useState(ENUM_STATUS_ORDER.SUCCESS)
    const [historiesOrder, setHistoriesOrder] = useState<HistoryOrder[]>([])
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const token = Cookies.get('token')
    useEffect(() => {
        const getHistoriesOrder = async () => {
            const res = await fetchHistoriesOrder(token, status, page)
            setHistoriesOrder(res)
        }
        getHistoriesOrder()
    }, [status, page])
    useEffect(() => {
        const result = historiesOrder.filter((his) => his.product.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    }, [searchTerm])
    return (
        <div className="p-6 max-w-[1536px] w-full m-auto">
            <h1 className="text-xl font-bold mb-4">Quản lí đơn hàng</h1>
            <div>
                <div className="flex justify-between items-center bg-white gap-3 px-6 rounded-t-xl h-[96px]">
                    <div className="flex items-center gap-x-3 w-full flex-1 ">
                        <div className="flex items-center bg-white border px-3 py-2 w-full rounded-lg hover:border-primary transition duration-300 ">
                            <IoIosSearch className="text-lg mr-2 text-gray-400 flex-shrink-0" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="text"
                                placeholder="Tìm kiếm bằng tên hoặc mã đơn hàng"
                                className="bg-transparent focus:outline-none w-full"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <p className="leading-5 font-semibold lg:m-0 text-black text-sm">
                            {historiesOrder.length} đơn hàng
                        </p>
                        <div className="p-2">
                            <IoFilterOutline />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Tên sản phẩm</th>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Tên khách hàng</th>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Ngày đặt hàng</th>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Thành tiền</th>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Trạng thái</th>
                                <th className="text-start text-sm p-4 whitespace-nowrap">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historiesOrder.length > 0 ? (<>
                                {historiesOrder.map((his) => (

                                    <tr className="bg-white border-t hover:bg-gray-50">
                                        <td className="p-4 whitespace-nowrap md:sticky">
                                            <div className="flex justify-start items-center">
                                                <div className="flex">
                                                    <div className="text-sm text-primary font-semibold mr-1">
                                                        AJDIEHEHGFLASLKDJJASKDAS
                                                    </div>
                                                    <div className="text-sm">x{his.quantity}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm">Le Minh Hieu</td>
                                        <td className="p-4 whitespace-nowrap text-sm">{his.createdAt}</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold">{formatCurrencyVND(his.totalPrice)}</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold">
                                            <button type="button" className="py-2 text-xs px-4 inline-flex items-center gap-x-2  font-semibold rounded-lg border border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-yellow-900 dark:text-yellow-500 dark:hover:text-yellow-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                Đang chờ duyệt
                                            </button>

                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold ">
                                            <button type="button" className="py-2 px-4 inline-flex gap-2 items-center gap-x-2 text-xs font-semibold rounded-lg border border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                <p>Nhắn tin</p>
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </>) : (
                               <tr className="bg-white border-t hover:bg-gray-50">
                               <td className="p-4 whitespace-nowrap md:sticky">
                                  
                               </td>
                               <td className="p-4 whitespace-nowrap text-sm"></td>
                               <td className="p-4 whitespace-nowrap text-sm text-slate-900 font-medium ">Không có dữ liệu đơn hàng nào</td>
                               <td className="p-4 whitespace-nowrap text-sm"></td>
                               <td className="p-4 whitespace-nowrap text-sm font-semibold">
                                  

                               </td>
                               <td className="p-4 whitespace-nowrap text-sm font-semibold ">
                                   
                               </td>

                           </tr>
                            )}

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
                                    Tổng <b>{historiesOrder.length}</b> kết quả 
                                </div>
                            </div>
                            <div>
                                <nav
                                    className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-2"
                                    aria-label="Pagination"
                                >
                                    <button
                                        onClick={() => setPage((pre : number) => {
                                            if (pre === 1) {
                                                return 1
                                            } else {
                                                return pre - 1
                                            }
                                        })}
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
                                    </button>

                                    <button
                                        onClick={() => setPage((pre : number) => pre + 1)}
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
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
