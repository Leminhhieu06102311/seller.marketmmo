import React from 'react'
import Image from 'next/image'
export default function UserDetail() {
    return (
        <div className='p-6 max-w-[1536px] w-full m-auto'>
            <h1 className="mb-10 font-bold leading-5">
                Hi, Welcome back 👋
            </h1>
            <div className='w-full bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row lg:flex-row items-start md:items-center lg:items-center justify-between mb-3 '>
                <div className='flex items-center flex-shrink-0 mb-5 mr-0 md:mr-5 md:mb-0 lg:mb-0'>
                    <div className='flex-shrink-0 w-[100px] h-[100px] overflow-hidden rounded-full mr-5'>
                        <img src="https://i.pinimg.com/564x/f1/99/a4/f199a4490901723e23bcc5b6d16e66ef.jpg" alt="" />
                    </div>
                    <div>
                        <h2 className='text-xl uppercase font-bold mb-1'> Phạm Gia Kiện</h2>
                        <div className='text-base font-semibold'><span className='px-3 py-1 border border-[red] text-[red] rounded-lg text-xs'>ADMIN</span></div>
                    </div>
                </div>
                <div className='flex w-full lg:w-3/6 px-3 justify-between lg:justify-around flex-wrap md:flex-nowrap lg:flex-nowrap '>
                    <div className='mr-5'>
                        <div className='mb-5'>
                            <h3 className='w-[60px] font-semibold text-primary'>ID:</h3>
                            <span className='font-semibold'>6553509c27aedebac5eefedd</span>
                        </div>
                        <div className='mb-5'>
                            <h3 className='w-[60px] font-semibold text-primary'>Email:</h3>
                            <span className='font-semibold'>pgkien230515@gmail.com</span>
                        </div>

                    </div>
                    <div>
                        <div className='mb-5'>
                            <h3 className='w-[100px] font-semibold text-primary'>Username:</h3>
                            <span className='font-semibold'>Shunn</span>
                        </div>
                        <div className='mb-5'>
                            <h3 className='w-[100px] font-semibold text-primary'>Phone:</h3>
                            <span className='font-semibold'>0376729508</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                <div className=''>
                    <div className='p-6 bg-white rounded-xl shadow-lg h-full'>
                        <h2 className='text-lg font-bold border-b pb-2'>Thông tin cá nhân</h2>
                        <div className='grid grid-cols-2 mb-1 mt-2'>
                            <div className='mb-1'>
                                <h4 className='text-primary font-semibold text-base'>Ngày sinh:</h4>
                                <span>--</span>
                            </div>
                            <div className='mb-1'>
                                <h4 className='text-primary font-semibold text-base'>Địa chỉ:</h4>
                                <span>--</span>
                            </div>
                            <div className='mb-1'>
                                <h4 className='text-primary font-semibold text-base'>Website:</h4>
                                <span>--</span>
                            </div>
                            <div className='mb-1'>
                                <h4 className='text-primary font-semibold text-base'>Xác thực Email:</h4>
                                <span>--</span>
                            </div>
                        </div>
                        <div>
                            <h4 className='text-primary font-semibold text-base'>Mô tả:</h4>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus fuga, odio eveniet sequi tenetur perspiciatis asperiores repellendus fugit ipsam ullam, quo labore excepturi similique voluptatem, molestiae minima repudiandae obcaecati corporis.
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='p-6 bg-white rounded-xl h-[320px] shadow-lg'>
                        <h2 className='text-lg font-bold border-b pb-2'>Lịch sử mua hàng</h2>
                        <div className='overflow-auto scroll-smooth h-5/6 relative'>
                            <table className="table-auto border-collapse">
                                <thead>
                                    <tr className='bg-white sticky top-0'>
                                        <th className='text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 '>STT</th>
                                        <th className='text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 '>Tên sản phẩm</th>
                                        <th className='text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 '>Ngày</th>
                                        <th className='text-start text-primary border-b p-1 text-sm whitespace-nowrap py-2 '>Thanh toán</th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    <tr className='border-y py-2'>
                                        <td className='py-2 text-center'>1</td>
                                        <td className='py-2 text-sm'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                        <td className='py-2 text-sm'>2023-11-14T10:49:00.368Z</td>
                                        <td className='py-2 text-sm'>20.000đ</td>
                                    </tr>
                                    <tr className='border-y py-2'>
                                        <td className='py-2 text-center'>1</td>
                                        <td className='py-2 text-sm'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                        <td className='py-2 text-sm'>2023-11-14T10:49:00.368Z</td>
                                        <td className='py-2 text-sm'>20.000đ</td>
                                    </tr>
                                    <tr className='border-y py-2'>
                                        <td className='py-2 text-center'>1</td>
                                        <td className='py-2 text-sm'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                        <td className='py-2 text-sm'>2023-11-14T10:49:00.368Z</td>
                                        <td className='py-2 text-sm'>20.000đ</td>
                                    </tr>
                                    <tr className='border-y py-2'>
                                        <td className='py-2 text-center'>1</td>
                                        <td className='py-2 text-sm'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                        <td className='py-2 text-sm'>2023-11-14T10:49:00.368Z</td>
                                        <td className='py-2 text-sm'>20.000đ</td>
                                    </tr>
                                    <tr className='border-y py-2'>
                                        <td className='py-2 text-center'>1</td>
                                        <td className='py-2 text-sm'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                        <td className='py-2 text-sm'>2023-11-14T10:49:00.368Z</td>
                                        <td className='py-2 text-sm'>20.000đ</td>
                                    </tr>
                                    <tr className='border-y py-2'>
                                        <td className='py-2 text-center'>1</td>
                                        <td className='py-2 text-sm'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                        <td className='py-2 text-sm'>2023-11-14T10:49:00.368Z</td>
                                        <td className='py-2 text-sm'>20.000đ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
