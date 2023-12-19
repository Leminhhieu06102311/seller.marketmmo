"use client"
import React, { SetStateAction, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { showModal } from '@/redux/modalSlice';
import { ENUM_NAME_MODAL } from '@/enum/name_modal';
import ListPromotion from './listPromotion';

export default function Promotion() {
  const tabs = [
    {
      label: 'Tất cả', content:
        <div className='sm:block md:flex lg:flex justify-around px-4 rounded-b-xl'>
          <div className='flex p-4 w-full lg:md:w-full lg:w-full border justify-between rounded-lg '>
            <div className='flex flex-col '>
              <h3 className='text-sm font-semibold'>Doanh thu</h3>
              <div className='text-lg flex font-bold'><span className='mr-1'>đ</span><div className=''>0</div></div>
              <span className='text-xs'>So với 7 ngày qua --</span>
            </div>
            <div>
              <Image src='/images/promotion/money-growth.png' alt='' width={62} height={62} />
            </div>
          </div>
          <div className='flex p-4 w-full lg:md:w-full lg:w-full border justify-between rounded-lg my-2 md:my-0 lg:my-0 md:mx-2'>
            <div className='flex flex-col '>
              <h3 className='text-sm font-semibold'>Đơn hàng</h3>
              <div className='text-lg flex font-bold'><span className='mr-1'>đ</span><div className=''>0</div>
              </div>
              <span className='text-xs'>So với 7 ngày qua --</span>
            </div>
            <div><Image src='/images/promotion/shopping-list.png' alt='' width={62} height={62} />
            </div>
          </div>
          <div className='flex p-4 w-full md:w-[full] lg:w-full border justify-between rounded-lg '>
            <div className='flex flex-col '>
              <h3 className='text-sm font-semibold'>Người mua</h3>
              <div className='text-lg flex font-bold'><span className='mr-1'>đ</span><div className=''>0</div>
              </div>
              <span className='text-xs'>So với 7 ngày qua --</span>
            </div>
            <div><Image src='/images/promotion/businessman.png' alt='' width={62} height={62} />
            </div>
          </div>
        </div >
    },
    {
      label: '1 Tuần', content:
        <p>This is the content of Tab 2.</p>
    },
    {
      label: '1 Tháng', content:
        <p>This is the content of Tab 3.</p>
    },
    {
      label: '1 Năm', content:
        <p>This is the content of Tab 4.</p>
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch()

  const showTab = (index: SetStateAction<number>) => {
    setActiveTab(index);
  };

  const promotionType = {
    productDiscount: '655caa32d7b31be96da71a26',
    buyALot: '655caa57d7b31be96da71a27',
    voucher: '655caa6fd7b31be96da71a28',
    gift: '655caa88d7b31be96da71a29'
  }
  const handleShowListPromotion = () => {
    dispatch(showModal(ENUM_NAME_MODAL.LISTPROMOTION_MODAL))
  }

  return (
    <div className='p-6 max-w-[1536px] w-full m-auto'>
      <h1 className="text-xl font-bold w-[99%]">Ưu đãi</h1>
      <div className='px-6 py-4'>
        <div className='px-6 py-4 bg-white mb-5 rounded-xl shadow-lg'>
          <div className='flex flex-col md:flex-row lg:flex-row py-4 items-center justify-start md:justify-between lg:justify-between rounded-t-xl overflow-hidden'>
            <h2 className='font-bold inline-block whitespace-nowrap'>Dữ liệu khuyến mãi bán hàng</h2>
            <ul className="flex bg-white rounded-t-xl overflow-hidden w-full justify-center md:justify-end lg:justify-end">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => showTab(index)}
                  className="cursor-pointer px-4 py-1 transition-all duration-300"
                  style={{
                    borderBottom: index === activeTab ? '3px solid #3861fb' : '3px solid #ffff',
                  }}
                >
                  <label className="text-sm cursor-pointer font-semibold">{tab.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className='mb-5'>
            {tabs.map((tab, index) => (
              <div key={index} className={`${index === activeTab ? 'block overflow-x-auto' : 'hidden'}`}>
                {tab.content}
              </div>
            ))}
          </div>
        </div>
        <div className='bg-white rounded-lg px-6 py-4 shadow-lg'>
          <h1 className='text-lg font-semibold'>Công cụ quảng cáo</h1>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 md:gap-5 lg:gap-10 items-start'>
            <div className='h-full'>
              <div className='border p-4 rounded-lg flex flex-col justify-between h-full'>
                <div className='flex items-start'>
                  <div className='mr-2 p-2 bg-blue-50 rounded-full flex justify-center items-center flex-shrink-0'><Image src='/images/promotion/VoucherIcon/1.png' alt='' width={40} height={40} /></div>
                  <div className='flex flex-col mb-3'>
                    <h4 className='text-lg font-semibold'>
                      Chiết khấu sản phẩm
                    </h4>
                    <span className='text-sm text-gray-500'>Thiết lập giảm giá hàng ngày để tạo sức hút hơn với giá gốc</span>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button className='bg-gray-50 text-sm font-semibold px-3 py-2 rounded-md mr-2' onClick={handleShowListPromotion}>Khuyến mãi của tôi</button>
                  <Link href={`/seller/promotion/${promotionType.productDiscount}`} className='bg-primary text-sm text-white font-semibold px-3 py-2 rounded-md' >Tạo</Link>
                </div>
              </div>
            </div>
            <div className="h-full">
              <div className='border p-4 rounded-lg flex flex-col justify-between h-full'>
                <div className='flex items-start'>
                  <div className='mr-2 p-2 bg-blue-50 rounded-full flex justify-center items-center flex-shrink-0'><Image src='/images/promotion/VoucherIcon/2.png' alt='' width={40} height={40} /></div>
                  <div className='flex flex-col mb-3'>
                    <h4 className='text-lg font-semibold'>
                      Ưu đãi Chớp nhoáng
                    </h4>
                    <span className='text-sm text-gray-500'>Cung cấp các ưu đãi trong thời gian giới hạn để khuyến khích mua hàng nhanh chóng, bán hàng tồn kho dư thừa hoặc thu hút người mua mới.</span>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button className='bg-gray-50 text-sm font-semibold px-3 py-2 rounded-md mr-2'>Khuyến mãi của tôi</button>
                  <button disabled className='bg-blue-400 text-sm text-white font-semibold px-3 py-2 rounded-md '>Tạo</button>
                </div>
              </div>
            </div>
            <div className="h-full">
              <div className='border p-4 rounded-lg flex flex-col justify-between h-full'>
                <div className='flex items-start'>
                  <div className='mr-2 p-2 bg-blue-50 rounded-full flex justify-center items-center flex-shrink-0'><Image src='/images/promotion/VoucherIcon/3.png' alt='' width={40} height={40} /></div>
                  <div className='flex flex-col mb-3'>
                    <h4 className='text-lg font-semibold'>
                      Mua giá sỉ
                    </h4>
                    <span className='text-sm text-gray-500'>Tạo khuyến mãi đa tầng cho nhóm sản phẩm để tăng thêm giá trị đơn hàng</span>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button className='bg-gray-50 text-sm font-semibold px-3 py-2 rounded-md mr-2'>Khuyến mãi của tôi</button>
                  <Link href={`/seller/promotion/${promotionType.buyALot}`} className='bg-primary text-sm text-white font-semibold px-3 py-2 rounded-md '>Tạo</Link>
                </div>
              </div>
            </div>
            <div className="h-full">
              <div className='border p-4 rounded-lg flex flex-col justify-between h-full'>
                <div className='flex items-start'>
                  <div className='mr-2 p-2 bg-blue-50 rounded-full flex justify-center items-center flex-shrink-0'><Image src='/images/promotion/VoucherIcon/4.png' alt='' width={40} height={40} /></div>
                  <div className='flex flex-col mb-3'>
                    <h4 className='text-lg font-semibold'>
                      Voucher
                    </h4>
                    <span className='text-sm text-gray-500'>Khuyến khích người mua tăng tổng giá trị đơn hàng và tăng doanh số bán hàng tổng thể.</span>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button className='bg-gray-50 text-sm font-semibold px-3 py-2 rounded-md mr-2'>Khuyến mãi của tôi</button>
                  <Link href={`/seller/promotion/${promotionType.voucher}`} className='bg-primary text-sm text-white font-semibold px-3 py-2 rounded-md '>Tạo</Link>
                </div>
              </div>
            </div>
            <div className="h-full">
              <div className='border p-4 rounded-lg flex flex-col justify-between h-full'>
                <div className='flex items-start'>
                  <div className='mr-2 p-2 bg-blue-50 rounded-full flex justify-center items-center flex-shrink-0'><Image src='/images/promotion/VoucherIcon/5.png' alt='' width={40} height={40} /></div>
                  <div className='flex flex-col mb-3'>
                    <h4 className='text-lg font-semibold'>
                      Ưu đãi theo gói
                    </h4>
                    <span className='text-sm text-gray-500'>Thuận tiện cho người tiêu dùng đặt hàng thông qua các gói cố định</span>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button className='bg-gray-50 text-sm font-semibold px-3 py-2 rounded-md mr-2'>Khuyến mãi của tôi</button>
                  <button disabled className='bg-blue-400 text-sm text-white font-semibold px-3 py-2 rounded-md' >Tạo</button>
                </div>
              </div>
            </div>
            <div className="h-full">
              <div className='border p-4 rounded-lg flex flex-col justify-between h-full'>
                <div className='flex items-start'>
                  <div className='mr-2 p-2 bg-blue-50 rounded-full flex justify-center items-center flex-shrink-0'><Image src='/images/promotion/VoucherIcon/6.png' alt='' width={40} height={40} /></div>
                  <div className='flex flex-col mb-3'>
                    <h4 className='text-lg font-semibold'>
                      Quà tặng khi mua hàng
                    </h4>
                    <span className='text-sm text-gray-500'>Cung cấp quà tặng miễn phí để khuyến khích người mua đặt thêm sản phẩm trong một đơn hàng</span>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button className='bg-gray-50 text-sm font-semibold px-3 py-2 rounded-md mr-2'>Khuyến mãi của tôi</button>
                  <Link href={`/seller/promotion/${promotionType.gift}`} className='bg-primary text-sm text-white font-semibold px-3 py-2 rounded-md '>Tạo</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ListPromotion />
    </div>
  )
}


