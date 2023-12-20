"use client"
import { SetStateAction, useState, useEffect, memo } from "react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline, IoIosSearch } from "react-icons/io";
import { ENUM_NAME_MODAL } from "@/enum/name_modal";
import ContentModal from "@/components/Modal";
import { deletePromotion, getPromotion, getPromotionVoucher } from "@/services/promotion";
import { Promotion } from "@/interfaces/promotion";
import Cookies from 'js-cookie'
import { toast } from "react-toastify";
import { PromotionVoucher } from '@/interfaces/promotion'
import { MdDeleteForever } from "react-icons/md";

function ListPromotion() {
    const [page, setPage] = useState(1)
    const [promotions, setPromotions] = useState<Promotion[]>()
    const [promotionVoucher, setPromotionVoucher] = useState<PromotionVoucher[]>([]);
    const [activeTab, setActiveTab] = useState(0);
    const token = Cookies.get('token')

    type GroupedPromotions = Record<string, Promotion[]>;

    const groupedPromotions: GroupedPromotions = {};

    promotions?.forEach((promotion) => {
        if (promotion.voucher) {
            const voucherName = promotion.voucher.name;
            if (!groupedPromotions[voucherName]) {
                groupedPromotions[voucherName] = [];
            }
            groupedPromotions[voucherName].push(promotion);
        }
    })

    console.log(groupedPromotions);

    const formattedDate = (date: Date) => { return new Date(date).toISOString().split('T')[0] };


    const showTab = (index: SetStateAction<number>) => {
        setActiveTab(index);
    };
    const fetchData = async () => {
        try {
            const promotionData = await getPromotion(token);
            setPromotions(promotionData);

            const voucherData = await getPromotionVoucher();
            setPromotionVoucher(voucherData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [page, token]);

    const handleDeletePromotion = (promotionID: string) => {
        toast.promise(deletePromotion(promotionID, token), {
            pending: {
                render() {
                    return "vui lòng đợi!"
                },
            },
            success: {
                async render({ data }) {
                    fetchData()
                    return "Xóa mã khuyến mãi thành công"
                },
                // other options
                icon: "🟢",
            },
            error: {
                render: ({ data }) => {
                    console.log(data)
                    const error: any = data
                    if (error.response && error.response.status === 401) {
                        // Lỗi 401 có nghĩa là "Sai tài khoản hoặc mật khẩu"
                        console.log(error);
                    } else {
                        console.error("Lỗi:", error);
                    }
                    return <div>Lỗi, xin vui lòng thử lại. {error.response.data.message}</div>
                }
            }
        })
    }

    const tabs = [
        {
            label: 'Tất cả', content:
                <div>
                    <div className="bg-white">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="border-t bg-white">
                                    <th className=" text-start text-sm p-4 whitespace-nowrap">STT</th>
                                    <th className=" text-start text-sm p-4 whitespace-nowrap">Mã giảm giá</th>
                                    <th className=" text-start text-sm p-4 whitespace-nowrap">Loại mã giảm giá</th>
                                    <th className=" text-start text-sm p-4 whitespace-nowrap">Ngày bắt đầu</th>
                                    <th className=" text-start text-sm p-4 whitespace-nowrap">Ngày kết thúc</th>
                                    <th className=" text-start text-sm p-4 whitespace-nowrap">Số tiền mua tối thiểu</th>
                                    <th className=" text-start text-sm p-4 whitespace-nowrap">Giảm giá</th>
                                    {/* <th className=" text-start text-sm p-4 whitespace-nowrap">Danh sách các sản phẩm được áp dụng</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(groupedPromotions).map(([voucherName, promotionsForVoucher], index) => (
                                    promotionsForVoucher.slice(0, 3).map((promotion, innerIndex) => (
                                        <tr key={promotion._id} className="bg-white border-t hover:bg-gray-50">
                                            <td className="p-4 whitespace-nowrap text-sm">{index * 3 + innerIndex + 1}</td>
                                            <td className="p-4 whitespace-nowrap text-sm">{promotion.code}</td>
                                            <td className="p-4 whitespace-nowrap md:sticky">
                                                {voucherName}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-sm">{formattedDate(promotion.start_date)}</td>
                                            <td className="p-4 whitespace-nowrap text-sm">{formattedDate(promotion.end_date)}</td>
                                            <td className="p-4 whitespace-nowrap text-sm">{promotion.min_purchase_amount}</td>
                                            <td className="p-4 whitespace-nowrap text-sm">{promotion.discount}</td>
                                            <td className="p-4 whitespace-nowrap text-sm">{promotion.items}</td>
                                            <th className="text-start p-4 relative">
                                                <button className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 " onClick={() => handleDeletePromotion(promotion._id)}>
                                                    <MdDeleteForever className="text-[30px] text-red-500" />
                                                </button>
                                            </th>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div >
        }
    ];
    useEffect(() => {
        import('preline')
    }, [])
    return (
        <ContentModal nameModal={ENUM_NAME_MODAL.LISTPROMOTION_MODAL}>
            <div className="mx-auto shadow-lg rounded-xl w-4/5 mt-4">
                <ul className="flex px-6 py-4 bg-white rounded-t-xl overflow-hidden">
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
                <div className="flex justify-between bg-white items-center  px-6 pb-4">
                    <div className="flex items-center bg-white border px-3 py-2 rounded-lg hover:border-primary transition duration-300 w-[250px]">
                        <IoIosSearch className="text-lg mr-2 text-gray-400 flex-shrink-0" />
                        <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-full" />
                    </div>
                </div>
                <div>
                    <div>
                        {tabs.map((tab, index) => (
                            <div key={index} className={`${index === activeTab ? 'block overflow-x-auto' : 'hidden'}`}>
                                {tab.content}
                            </div>
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
        </ContentModal>
    )

}

export default memo(ListPromotion);