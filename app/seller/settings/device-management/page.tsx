import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
export default function sellerDeviceManagement() {
    return (
        <>
            <div className='p-6 max-w-[1536px] w-full m-auto'>
                <Link href='/seller-settings'>
                    <div className="flex items-center w-full mb-0">
                        <span className="text-2xl"><IoIosArrowBack /> </span>
                        <h1 className='mx-2 py-4  text-xl font-semibold'>Quản lý tài khoản</h1>
                    </div>
                </Link>
                <div className="p-6 bg-white shadow-lg rounded-lg">
                    <div className="w-full">
                        <table className="w-full">
                            <thead>
                                <tr className="border-t border-b border-gray-200 ">
                                    <th className="p-2 text-center "><span className="text-xs">#</span></th>
                                    <th className="p-2 text-left "><span className="text-xs" >Họ và tên</span></th>
                                    <th className="p-2 text-left "><span className="text-xs" >Thời gian đăng nhập</span></th>
                                    <th className="p-2 text-left "><span className="text-xs" >Vị trí</span></th>
                                    <th className="p-2 text-left "><span className="text-xs" >Địa chỉ IP</span></th>
                                    <th className="p-2 text-left "><span className="text-xs" >Hành động</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={6}>
                                        <div className="relative">
                                            <div className="h-20 py-7 border-b border-gray-200 flex justify-between ">
                                                <span className="block h-7 rounded-lg w-7 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-1/5 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-7 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-1/5 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-7 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-1/5 bg-gray-200"></span>
                                            </div>
                                            <div className="h-20 py-7 border-b border-gray-200 flex justify-between ">
                                                <span className="block h-7 rounded-lg w-7 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-1/5 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-7 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-1/5 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-7 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-1/5 bg-gray-200"></span>
                                            </div>
                                            <div className="h-20 py-7 border-b border-gray-200 flex justify-between ">
                                                <span className="block h-7 rounded-lg w-7 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-1/5 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-7 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-1/5 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-7 bg-gray-200"></span>
                                                <span className="block h-7 rounded-lg w-1/5 bg-gray-200"></span>
                                            </div>
                                            <div className="absolute w-full left-0 top-1/3">
                                                <h2 className="w-full text-center text-2xl font-bold">Hiện tại không có dữ liệu</h2>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {/* <tr className="border-y border-gray-200 hover:bg-gray-50">
                                            <td className="p-2 text-center"><span className="text-xs font-semibold">1</span></td>
                                            <td className="p-2"><span className="text-xs font-semibold" >Phạm Gia Kiện</span></td>
                                            <td className="p-2"><span className="text-xs font-semibold" >11/12/2023</span></td>
                                            <td className="p-2"><span className="text-xs font-semibold" >Hồ Chí Minh</span></td>
                                            <td className="p-2"><span className="text-xs font-semibold" >152.262.12</span></td>
                                            <td className="p-2"><span className="text-xs font-semibold" >Thay đổi mật khẩu</span></td>
                                        </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}
