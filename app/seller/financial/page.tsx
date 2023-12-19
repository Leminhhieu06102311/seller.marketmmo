'use client'
import React, { SetStateAction, useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
import { IoFilterOutline } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import Cookies from 'js-cookie'
import { getUser } from '@/services/user';
import User from '@/interfaces/user';
import { toast } from 'react-toastify';
import { bank, historyWidthDrawal, withDrawal } from '@/services/payment';
import HistoryWidthDraw from '@/interfaces/history_width_drawal';


export default function Finalcial() {
    const token = Cookies.get('token')
    const [modals, setModals] = useState<string[]>([]);
    const [isModalWidthDrawOpen, setIsModalWidthDrawOpen] = useState(false);
    const [isModalBankOpen, setIsModalBankOpen] = useState(false);
    const [withdrawalAmount, setWithdrawalAmount] = useState<number>(1000);
    const [codeBank, setCodeBank] = useState('');
    const [dataUser, setDataUser] = useState<User | null>(null);
    const [history, setHistory] = useState<HistoryWidthDraw[]>()

    const formattedDate = (date: string | number | Date) => { return new Date(date).toISOString().split('T')[0] };


    const openModal = (modalId: string) => {
        setModals([...modals, modalId]);
    };

    const closeModal = (modalId: string) => {
        setModals(modals.filter((id) => id !== modalId));
    };

    const handleOpenModal = () => {
        setIsModalWidthDrawOpen(true);
    }

    const handleOpenModalBank = () => {
        setIsModalBankOpen(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseInt(e.target.value, 10);

        if (!isNaN(amount)) {
            setWithdrawalAmount(amount);
        }
    };

    const handleWithdrawal = () => {
        setIsModalWidthDrawOpen(false);
        setWithdrawalAmount(1000)
        toast.promise(withDrawal(withdrawalAmount, token), {
            pending: {
                render() {
                    return "Đang tạo giao dịch vui lòng đợi!"
                },
            },
            success: {
                async render({ data }) {
                    return "Tạo giao dịch rút tiền thành công"
                },
                // other options
                icon: "🟢",
            },
            error: {
                render: ({ data }) => {
                    const error: any = data
                    if (error.response && error.response.status === 401) {
                        // Lỗi 401 có nghĩa là "Sai tài khoản hoặc mật khẩu"
                        console.log(error);
                    } else {

                        console.error("Lỗi :", error);
                    }
                    return "lỗi vui lòng thử lại"
                }
            }
        })
    }

    const handleBank = () => {
        setIsModalBankOpen(false);
        toast.promise(bank(codeBank, token), {
            pending: {
                render() {
                    return "Đang thêm tài khoản ngân hàng vui lòng đợi!"
                },
            },
            success: {
                async render({ data }) {
                    return "thêm tài khoản ngân hàng thành công"
                },
                // other options
                icon: "🟢",
            },
            error: {
                render: ({ data }) => {
                    const error: any = data
                    if (error.response && error.response.status === 401) {
                        // Lỗi 401 có nghĩa là "Sai tài khoản hoặc mật khẩu"
                        console.log(error);
                    } else {

                        console.error("Lỗi :", error);
                    }
                    return "lỗi vui lòng thử lại"
                }
            }
        })
    }

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser(token);
            const dataHistory = await historyWidthDrawal(token);
            setDataUser(data)
            setHistory(dataHistory)
            console.log(data);

        }
        fetchUser()
    }, [token])


    const tabs = [
        {
            label: 'Tất cả', content:
                <div>
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="border-t">
                                {/* <th className=" text-start text-sm p-4 whitespace-nowrap">Mã sản phẩm</th> */}
                                <th className=" text-start text-sm p-4 whitespace-nowrap">Số tiền rút</th>
                                <th className=" text-start text-sm p-4 whitespace-nowrap">Hành động</th>
                                <th className=" text-start text-sm p-4 whitespace-nowrap">Trạng thái</th>
                                <th className=" text-start text-sm p-4 whitespace-nowrap">Ngày tạo</th>
                                {/* <th className=" text-start text-sm p-4 whitespace-nowrap">Hành động</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {history && history.map((item) => {
                                const formatDateISO = () => {
                                    const date = new Date(item.createdAt);
                                    const isoString = date.toISOString();
                                    return isoString;
                                }
                                return (
                                    <><tr className="bg-white border-t hover:bg-gray-50">
                                        {/* <td className="p-4 whitespace-nowrap text-sm">655b59757e87bab1ae8fc25d</td> */}
                                        <td className="p-4 whitespace-nowrap md:sticky">{item.amount}</td>
                                        <td className="p-4 whitespace-nowrap text-sm">{item.description}</td>
                                        <td className="p-4 whitespace-nowrap text-sm font-semibold">
                                            <span className={`text-xs px-2 py-1 border rounded-md text-center ${item.status === 'Thành công' ? 'text-green-500 bg-green-50 border-green-500' :
                                                item.status === 'Thất bại' ? 'text-red-500 bg-red-50 border-red-500' :
                                                    item.status === 'Đang xử lý' ? 'text-yellow-500 bg-yellow-50 border-yellow-500' :
                                                        'text-gray-500 bg-gray-200 border-gray-500'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm">{formattedDate(item.createdAt)}</td>

                                        {/* <th className="text-start p-4 relative">
        <button onClick={() => openModal('modal1')} className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 ">
            <CiEdit />
        </button>
        <button className="text-lg p-1 hover:bg-gray-200 rounded-full text-[red] ">
            <MdDeleteForever />
        </button>
                                          </th> */}
                                    </tr ></>
                                )
                            })}
                        </tbody>
                    </table>
                    {
                        modals.includes('modal1') && (
                            <div className="modal">
                                <div className="modal-content">
                                    <div className="fixed inset-0 flex items-center justify-center z-50">
                                        <div className="fixed inset-0 bg-[#0a1e4266] opacity-50" onClick={() => closeModal('modal1')}></div>
                                        <div className="bg-white p-4 z-50 w-full h-full md:h-auto  md:w-3/6 md:rounded-xl  lg:h-auto lg:rounded-xl lg:w-528" >
                                            <div className=" w-full flex justify-between mb-5">
                                                <h2 className='font-semibold text-xl'>Chỉnh sửa sản phẩm</h2>
                                                <button onClick={() => closeModal('modal1')}> <IoMdClose className="text-2xl text-gray-200" /></button>
                                            </div>
                                            <div>
                                                <div className="flex flex-col mb-2">
                                                    <label className="text-sm font-semibold">Tên sản phẩm phẩm:</label>
                                                    <input type="text" className="mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg" />
                                                </div>
                                                <div className="flex flex-col mb-2">
                                                    <label className="text-sm font-semibold">Số lượng:</label>
                                                    <input type="text" className="mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg" />
                                                </div >
                                                <div className="flex flex-col mb-2">
                                                    <label className="text-sm font-semibold">Giá:</label>
                                                    <input type="text" className="mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg" />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="text-sm font-semibold">Ảnh:</label>
                                                    <label className="block mt-1">
                                                        <span className="sr-only">Choose profile photo</span>
                                                        <input type="file" className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:file:bg-blue-500 dark:hover:file:bg-blue-400 " /> </label>
                                                </div>
                                                <div className="flex flex-col mb-2">
                                                    <label className="text-sm font-semibold">Mô tả:</label>
                                                    <textarea name="" id="" className=" focus:border-primary focus:outline-none h-24 mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg"></textarea>
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
                </div >
        },
        {
            label: 'Đang hoạt động', content:
                <p>This is the content of Tab 2.</p>
        },
        {
            label: 'Trạng Thái', content:
                <p>This is the content of Tab 3.</p>
        },
        {
            label: 'Đá xoá', content:
                <p>This is the content of Tab 4.</p>
        },
    ];

    const [activeTab, setActiveTab] = useState(0);

    const showTab = (index: SetStateAction<number>) => {
        setActiveTab(index);
    };
    return (
        <div className="p-6 max-w-[1536px] w-full m-auto">
            {dataUser ? (
                <div>
                    <h1 className="text-xl font-bold mb-4">Quản lí tài chính</h1>
                    <div className='flex flex-col md:flex-row lg:flex-row justify-between items-start'>
                        <div className='w-full md:w-[48%] mb-5 lg:w-[48%] bg-white px-6 py-4 shadow-lg rounded-lg relative'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-lg font-semibold'>Số tiền</h2>
                            </div>
                            <div className='mb-2'>
                                <span className='text-base font-semibold text-gray-500 mb-2'>Số tiền khả dụng</span>
                                <div className='flex items-center justify-between'>
                                    <div className='text-gray-500 text-lg'>
                                        <span className='font-bold text-black'>{dataUser.balance}</span> đ
                                    </div>
                                    <button
                                        className='px-5 py-2 bg-primary rounded-lg text-white font-semibold'
                                        onClick={handleOpenModal}
                                    >
                                        Rút
                                    </button>
                                </div>
                            </div>
                            {isModalWidthDrawOpen && (
                                <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center ">
                                    <div className="bg-white p-8 rounded relative flex flex-col gap-y-3 ">
                                        <button
                                            className="absolute right-5 top-5 cursor-pointer"
                                            onClick={() => setIsModalWidthDrawOpen(false)}
                                        >
                                            x
                                        </button>
                                        <p className='mt-[15px] font-semibold text-base'>Nhập số tiền cần rút:</p>
                                        <input
                                            type="number"
                                            placeholder='100000'
                                            className='pl-2 w-full h-[40px] focus:outline-none border rounded-[5px]'
                                            value={withdrawalAmount}
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            onClick={handleWithdrawal}
                                            className='bg-primary text-white p-2 rounded-[5px] font-semibold'
                                        >
                                            Xác nhận Rút
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div>
                                <div className='text-sm font-medium text-gray-500'>
                                    Bạn có thể rút tiền một lần sau mỗi 24h
                                </div>
                                <div className='text-sm font-medium text-gray-500'>
                                    Bật tự động rút tiền. <a href="" className='text-primary text-sm font-bold'> Tại đây</a>{' '}
                                </div>
                            </div>
                        </div>
                        <div className='w-full md:w-[48%] mb-5 lg:w-[48%] bg-white px-6 py-4 shadow-lg rounded-lg'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-lg font-semibold'>Tài khoản ngân hàng</h2>
                            </div>
                            <div className='mb-2'>
                                <span className='text-base font-semibold text-gray-500 mb-2'>Số tài khoản</span>
                                <div className='flex items-center justify-between'>
                                    <div className='text-black font-semibold text-lg'>
                                        {dataUser.bank ? (
                                            dataUser.bank
                                        ) : (
                                            <p className='text-base'>
                                                Chưa có tài khoản ngân hàng
                                            </p>
                                        )}</div>
                                    <button className='px-5 py-2 bg-primary border-blue-800 text-white rounded-lg font-semibold uppercase text-sm'
                                        onClick={handleOpenModalBank}
                                    >Thêm tài khoản</button>
                                </div>
                            </div>
                            {isModalBankOpen && (
                                <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center ">
                                    <div className="bg-white p-8 rounded relative flex flex-col gap-y-3 ">
                                        <button
                                            className="absolute right-5 top-5 cursor-pointer"
                                            onClick={() => setIsModalBankOpen(false)}
                                        >
                                            x
                                        </button>
                                        <p className='mt-[15px] font-semibold text-base'>Nhập số tài khoản:</p>
                                        <input
                                            type="text"
                                            placeholder=''
                                            className='pl-2 w-full h-[40px] focus:outline-none border rounded-[5px]'
                                            value={codeBank}
                                            onChange={(e) => { setCodeBank(e.target.value) }}
                                        />
                                        <button
                                            onClick={handleBank}
                                            className='bg-primary text-white p-2 rounded-[5px] font-semibold'
                                        >
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div>
                                <div className='text-sm font-medium text-gray-500'> Vui lòng kiểm tra thông tin trước khi rút</div>
                                <div className='text-sm font-medium text-gray-500'>Chuyển đổi tài khoản <a href="" className='text-primary text-sm font-bold'> Tại đây</a> </div>
                            </div>
                        </div>
                    </div>
                    <div className='shadow-lg'>
                        <div className='bg-white rounded-t-xl p-4'>
                            <h1 className='font-semibold text-lg mb-2'>
                                Lịch sử
                            </h1>
                            <div className="flex justify-between items-center  rounded-xl">

                                <div className="flex items-center gap-x-3">
                                    <div className="flex items-center border px-3 py-2 rounded-lg hover:border-primary transition duration-300 w-[250px]">
                                        <IoIosSearch className="text-lg mr-2 text-gray-400 flex-shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="bg-transparent focus:outline-none w-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <p className="leading-5 font-semibold lg:m-0 text-black text-sm">
                                        1234 đơn hàng
                                    </p>
                                    <div className="p-2">
                                        <IoFilterOutline />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ul className="flex bg-white rounded-t-xl overflow-hidden">
                                    {tabs.map((tab, index) => (
                                        <li
                                            key={index}
                                            onClick={() => showTab(index)}
                                            className="cursor-pointer px-4 py-1 transition-all duration-300"
                                            style={{
                                                borderBottom: index === activeTab ? '3px solid #3861fb' : '3px solid #ffff',
                                            }}
                                        >
                                            <label className="text-sm cursor-pointer ">{tab.label}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='rounded-b-lg'>
                            {tabs.map((tab, index) => (
                                <div key={index} className={`${index === activeTab ? 'block overflow-x-auto' : 'hidden'}`}>
                                    {tab.content}
                                </div>
                            ))}
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
                </div>
            ) : (
                <div className=' w-full h-[350px] flex items-center justify-center rounded-[10px] text-lg font-semibold'>Đang tải ...</div>
            )}
        </div>
    )
}
