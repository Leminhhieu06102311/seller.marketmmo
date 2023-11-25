"use client"
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
export default function TransactionManagement() {
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
            <div className='mb-3'>
                <h1 className='font-bold text-lg'>Kiểm duyệt rút tiền</h1>
            </div>
            <div>
                <div className="flex justify-between items-center bg-white  px-6 rounded-t-xl h-[96px]">
                    <div className="flex items-center bg-white border px-3 py-4 rounded-lg hover:border-primary transition duration-300 w-[250px]">
                        <IoIosSearch className="text-lg mr-2 text-gray-400 flex-shrink-0" />
                        <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-full" />
                    </div>
                    <div className="p-2">
                        <IoFilterOutline />
                    </div>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="text-start text-sm p-4">Username</th>
                                <th className="text-start text-sm p-4">Họ và tên</th>
                                <th className="text-start text-sm p-4">Số điện thoại</th>
                                <th className="text-start text-sm p-4">Số tiền</th>
                                <th className="text-start text-sm p-4">Trạng thái</th>
                                <th className="text-start text-sm p-4">Kiểm duyệt</th>
                                <th className="text-start text-sm p-4">Hành động</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr className="bg-white border-t hover:bg-gray-50">
                                <td className="p-4">
                                    <span className="text-sm font-semibold">AJDIEHEHGF</span>
                                </td>
                                <td className="p-4 text-sm">Pham Gia Kien</td>
                                <td className="p-4 text-sm">0376729508</td>
                                <td className="p-4 text-sm">200.000đ</td>
                                <td className="p-4 text-sm"><span className="text-[green] bg-green-50 border rounded-lg border-[green] px-3 py-1 text-xs whitespace-nowrap">Đã duyệt</span></td>
                                <td className="p-4 text-sm">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                                    </label></td>
                                <th className="text-start p-4 relative">
                                    {/* <button onClick={() => openModal('modal1')} className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 ">
                                        <CiEdit />
                                    </button> */}
                                    <button className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] ">
                                        <MdDeleteForever />
                                    </button>
                                </th>

                            </tr>
                            <tr className="bg-white border-t hover:bg-gray-50">
                                <td className="p-4">
                                    <span className="text-sm font-semibold">AJDIEHEHGF</span>
                                </td>
                                <td className="p-4 text-sm">Pham Gia Kien</td>
                                <td className="p-4 text-sm">0376729508</td>
                                <td className="p-4 text-sm">200.000đ</td>
                                <td className="p-4 text-sm"><span className="text-[red] bg-red-50 border rounded-lg border-[red] px-3 py-1 text-xs whitespace-nowrap">Chưa duyệt</span></td>
                                <td className="p-4 text-sm">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                                    </label></td>
                                <th className="text-start p-4 relative">
                                    {/* <button onClick={() => openModal('modal1')} className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 ">
                                        <CiEdit />
                                    </button> */}
                                    <button className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] ">
                                        <MdDeleteForever />
                                    </button>
                                </th>

                            </tr>
                            <tr className="bg-white border-t hover:bg-gray-50">
                                <td className="p-4">
                                    <span className="text-sm font-semibold">AJDIEHEHGF</span>
                                </td>
                                <td className="p-4 text-sm">Pham Gia Kien</td>
                                <td className="p-4 text-sm">0376729508</td>
                                <td className="p-4 text-sm">200.000đ</td>
                                <td className="p-4 text-sm"><span className="text-[red] bg-red-50 border rounded-lg border-[red] px-3 py-1 text-xs whitespace-nowrap">Chưa duyệt</span></td>
                                <td className="p-4 text-sm">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                                    </label></td>
                                <th className="text-start p-4 relative">
                                    {/* <button onClick={() => openModal('modal1')} className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 ">
                                        <CiEdit />
                                    </button> */}
                                    <button className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] ">
                                        <MdDeleteForever />
                                    </button>
                                </th>

                            </tr>
                            <tr className="bg-white border-t hover:bg-gray-50">
                                <td className="p-4">
                                    <span className="text-sm font-semibold">AJDIEHEHGF</span>
                                </td>
                                <td className="p-4 text-sm">Pham Gia Kien</td>
                                <td className="p-4 text-sm">0376729508</td>
                                <td className="p-4 text-sm">200.000đ</td>
                                <td className="p-4 text-sm"><span className="text-[red] bg-red-50 border rounded-lg border-[red] px-3 py-1 text-xs whitespace-nowrap">Chưa duyệt</span></td>
                                <td className="p-4 text-sm">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                                    </label></td>
                                <th className="text-start p-4 relative">
                                    {/* <button onClick={() => openModal('modal1')} className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 ">
                                        <CiEdit />
                                    </button> */}
                                    <button className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] ">
                                        <MdDeleteForever />
                                    </button>
                                </th>

                            </tr>
                            <tr className="bg-white border-t hover:bg-gray-50">
                                <td className="p-4">
                                    <span className="text-sm font-semibold">AJDIEHEHGF</span>
                                </td>
                                <td className="p-4 text-sm">Pham Gia Kien</td>
                                <td className="p-4 text-sm">0376729508</td>
                                <td className="p-4 text-sm">200.000đ</td>
                                <td className="p-4 text-sm"><span className="text-[red] bg-red-50 border rounded-lg border-[red] px-3 py-1 text-xs whitespace-nowrap">Chưa duyệt</span></td>
                                <td className="p-4 text-sm">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                                    </label></td>
                                <th className="text-start p-4 relative">
                                    {/* <button onClick={() => openModal('modal1')} className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 ">
                                        <CiEdit />
                                    </button> */}
                                    <button className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] ">
                                        <MdDeleteForever />
                                    </button>
                                </th>

                            </tr>
                        </tbody>
                    </table>
                    {modals.includes('modal1') && (
                        <div className="modal">
                            <div className="modal-content">
                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                    <div className="fixed inset-0 bg-[#0a1e4266] opacity-50" onClick={() => closeModal('modal1')}></div>
                                    <div className="bg-white p-4 z-50 w-full h-full md:h-auto  md:w-3/6 md:rounded-xl  lg:h-auto lg:rounded-xl lg:w-528" >
                                        <div className=" w-full flex justify-between mb-5">
                                            <h2 className='font-semibold text-xl'>Quản lí thông tin người dùng</h2>
                                            <button onClick={() => closeModal('modal1')}> <IoMdClose className="text-2xl text-gray-200" /></button>
                                        </div>
                                        <div>
                                            <div className="flex flex-col mb-2">
                                                <label className="text-sm font-semibold">Username</label>
                                                <input type="text" className="mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg focus:outline-primary" />
                                            </div>
                                            <div className="flex flex-col mb-2">
                                                <label className="text-sm font-semibold">Name</label>
                                                <input type="text" className="mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg focus:outline-primary" />
                                            </div >
                                            <div className="flex flex-col mb-2">
                                                <label className="text-sm font-semibold">Status</label>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-primary peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600" />
                                                </label>
                                            </div>
                                            <div className="mb-2">
                                                <label className="text-sm font-semibold">Role</label>
                                                <label className="block mt-1">
                                                    <span className="sr-only">Select Role</span>
                                                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none hover:border-primary rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 ">
                                                        <option selected>User</option>
                                                        <option value="US">Admin</option>
                                                        <option value="CA">Seller</option>
                                                    </select>
                                                </label>
                                            </div>

                                            <div className="flex justify-end">
                                                <button onClick={() => closeModal('modal1')} className="rounded-lg text-black font-semibold text-sm bg-gray-50 px-4 py-2 mr-2">Huỷ</button>
                                                <button className="rounded-lg text-white font-semibold text-sm bg-primary px-4 py-2">Lưu</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
                <div className="rounded-b-xl overflow-hidden">
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                            <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
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
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                                    <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                                    <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                                    <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                                    <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                                    <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
                                    <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                                    <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
