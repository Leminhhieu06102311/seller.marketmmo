"use client";

import { createPromotion } from "@/services/promotion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import ListProd from "./listPrd";
import { showModal } from "@/redux/modalSlice";
import { ENUM_NAME_MODAL } from "@/enum/name_modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Cookies from 'js-cookie'
import { useParams } from 'next/navigation'


export default function createDiscount() {
  const router = useRouter()
  const params = useParams()
  const dispatch = useAppDispatch()
  const token = Cookies.get('token')
  const code = params.create as string

  const [promotionType, setPromotionType] = useState('');
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [minAmout, setMinAmount] = useState('');
  const [listPrd, setListPrd] = useState<{ id: string; name: string }[]>([]);
  const [discount, setDiscount] = useState('');

  useEffect(() => {
    if (code === '655caa32d7b31be96da71a26') {
      setPromotionType('discount-product');
    } else if (code === '655caa6fd7b31be96da71a28') {
      setPromotionType('preferential-price');
    } else if (code === '655caa88d7b31be96da71a29') {
      setPromotionType('gift');
    } else {
      router.push('/seller/promotion');
    }
  }, [code]);

  // const handleChangeDiscountType = (section: string) => {
  //   setDiscountType(section)
  // }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    setEndDate(newEndDate);
  };

  const handleCancel = () => {
    router.push('/seller/promotion')
  }

  const handleProductIdsChange = (newSelectedProducts: { id: string; name: string }[]) => {
    setListPrd(newSelectedProducts);
  };

  const handleShowListPrd = () => {
    dispatch(showModal(ENUM_NAME_MODAL.LISTPRODUCT_MODAL))
  }

  const handleSubmitPromotion = () => {
    if (!startDate || !endDate || startDate > endDate) {
      toast.warn('Ngày và giờ của ngày bắt đầu phải nhỏ hơn ngày kết thúc')
      return;
    }
    let defaultData = {};
    setDiscount('')
    setMinAmount('')
    setListPrd([])
    if (promotionType === 'discount-product') {
      const cutPrice = Number(discount);
      if (isNaN(cutPrice) || cutPrice == null || cutPrice == 0) {
        toast.warn("Số tiền giảm không hợp lệ");
        return;
      }
      if (listPrd.length === 0) {
        toast.warn("Vui lòng chọn sản phẩm được khuyến mãi")
        return;
      }
      const idArray = listPrd.map(product => product.id)
      defaultData = {
        start_date: startDate,
        end_date: endDate,
        discount: cutPrice,
        items: idArray,
      };
    } else if (promotionType === 'preferential-price') {
      const amount = Number(minAmout);
      if (isNaN(amount) || amount == 0 || amount == null) {
        toast.warn('Số lượng mua tối thiểu không hợp lệ');
        return;
      }
      const cutPrice = Number(discount);
      setDiscount('')
      if (isNaN(cutPrice) || cutPrice == null || cutPrice == 0) {
        toast.warn("Số tiền giảm không hợp lệ");
        return;
      }
      defaultData = {
        start_date: startDate,
        end_date: endDate,
        min_purchase_amount: amount,
        discount: cutPrice,
      };
    } else if (promotionType === 'gift') {
      if (listPrd.length === 0) {
        toast.warn("Vui lòng chọn sản phẩm được khuyến mãi")
        return;
      }
      const idArray = listPrd.map(product => product.id)
      defaultData = {
        start_date: startDate,
        end_date: endDate,
        product_id: idArray,
      };
    }
    const requestData = { ...defaultData, defaultData };

    toast.promise(createPromotion(promotionType, requestData, token), {
      pending: {
        render() {
          return "Đang tạo mã khuyến mãi, vui lòng đợi!"
        },
      },
      success: {
        async render({ data }) {
          return "Tạo mã khuyến mãi thành công"
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

  return (
    <>
      <div className="bg-white w-full rounded-lg px-6 py-2">
        <div className="py-3 flex gap-2 items-center">
          <h1 className="font-medium text-2xl">Thông tin cơ bản</h1>
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-2 flex-1 w-1/2">
            <div className="flex gap-2 flex-col">
              <h3 className="text-lg font-medium">Thời gian khuyến mãi</h3>
              <div className="flex gap-2">
                <input
                  type="datetime-local"
                  className="py-2 px-3 border border-gray-200 rounded-md w-full outline-none"
                  value={startDate.toISOString().slice(0, 16)}
                  onChange={handleStartDateChange}
                  onInput={(e) => e.preventDefault()}
                />
                <input
                  type="datetime-local"
                  className="py-2 px-3 border border-gray-200 rounded-md w-full outline-none"
                  value={endDate.toISOString().slice(0, 16)}
                  onChange={handleEndDateChange}
                  onInput={(e) => e.preventDefault()}
                />
              </div>
            </div>

            {(promotionType == "preferential-price") && (<div className="flex gap-2 flex-col">
              <h3 className="text-lg font-medium">Số lượng sản phẩm mua tối thiểu</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  min={0}
                  placeholder="50"
                  value={minAmout}
                  onChange={(e) => { setMinAmount(e.target.value) }}
                  className="py-2 px-3 border border-gray-200 rounded-md w-full outline-none"
                />
              </div>

            </div>)}
            {(promotionType === 'discount-product' || promotionType === 'preferential-price') && (
              <div className="flex gap-2 flex-col">
                <h3 className="text-lg font-medium">Giảm giá</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    min={0}
                    placeholder="50000"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="py-2 px-3 border border-gray-200 rounded-md w-full outline-none"
                  />
                </div>
              </div>
            )}

            {/* <div className="flex gap-2 flex-col"> */}
            {/* <h3 className="text-lg font-medium">Loại chiết khấu</h3> */}
            {/* <div className="flex gap-2">
                <input type="radio" className="" />
                <label htmlFor="" className="text-base">
                  Giảm giá phần trăm
                </label>
              </div> */}
            {/* <div className="flex gap-2">
                <input type="radio" className="" onChange={() => handleChangeDiscountType('fixedPrice')} checked={discountType === 'fixedPrice'} />
                <label htmlFor="" className="text-base">
                  Giá cố định
                </label>
              </div> */}
            {/* </div> */}
            {(promotionType == 'discount-product' || promotionType == 'gift') && (
              <><div className="py-3 flex gap-2 flex-col">
                <h1 className="font-medium text-2xl">Sản phẩm</h1>
                <p className="text-xs text-gray-700">
                  Chọn sản phẩm hoặc SKU bạn muốn khuyến mãi
                </p>
              </div><button className="px-3 py-2 bg-gray-100 text-black rounded-md inline-block" onClick={handleShowListPrd}>
                  Chọn sản phẩm
                </button><div>
                  <ul>
                    {(listPrd && listPrd.length > 0) && (<h3>Các sản phẩm đã chọn</h3>)}
                    {listPrd.map((item) => (
                      <li>{item.name}</li>
                    ))}
                  </ul>
                </div></>
            )}
          </div>
          <div className="flex gap-4 w-1/2 justify-center">
            <div className="relative group">
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-overlay rounded-lg group-hover:flex cursor-pointer items-center justify-center hidden">
                <AiOutlineEye className="text-white w-5 h-5" />
              </div>
              <Image
                className="rounded-lg"
                src="https://firebasestorage.googleapis.com/v0/b/marketmmo.appspot.com/o/seller%2Fdiscount%2Flive-stream.3c747bf8.png?alt=media&token=9f39cf6c-ae56-43de-a5c6-7a1d89b76cd2&_gl=1*11nuhsp*_ga*NTAzMzEwNjUwLjE2OTg5MTI2OTU.*_ga_CW55HF8NVT*MTY5OTAxOTc3Mi41LjEuMTY5OTAyMTEzNy42MC4wLjA."
                width={250}
                height={250}
                alt=""
              />
            </div>
            <div className="relative group">
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-overlay rounded-lg group-hover:flex cursor-pointer items-center justify-center hidden">
                <AiOutlineEye className="text-white w-5 h-5" />
              </div>
              <Image
                className="rounded-lg"
                src="https://firebasestorage.googleapis.com/v0/b/marketmmo.appspot.com/o/seller%2Fdiscount%2Fpdp.b940b71e.png?alt=media&token=86179fd3-8e90-4a83-9bc4-47173eb37530&_gl=1*23pd6b*_ga*NTAzMzEwNjUwLjE2OTg5MTI2OTU.*_ga_CW55HF8NVT*MTY5OTAxOTc3Mi41LjEuMTY5OTAxOTg2MC4zNy4wLjA."
                width={250}
                height={250}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg w-full mt-10 mb-4 py-4 px-8">
          <h4 className="font-semibold my-4">Yêu cầu về chiết khấu sản phẩm</h4>
          <div className="flex">
            <div className="w-1/2">
              <h5 className="font-medium">
                Chiết khấu cao nhất sẽ có hiệu lực
              </h5>
              <p className="text-sm text-gray-700">
                Một sản phẩm có thể được đưa vào nhiều chương trình khuyến mãi
                chiết khấu, nhưng chỉ mức chiết khấu cao nhất mới có hiệu lực
                tại một thời điểm cụ thể.
              </p>
            </div>
            <div className="w-1/2">
              <h5 className="font-medium">
                Giá chiến dịch và giá ưu đãi chớp nhoáng sẽ được ưu tiên áp dụng

              </h5>
              <p className="text-sm text-gray-700">
                chỉ mức chiết khấu cao nhất mới có hiệu lực tại một thời điểm cụ thể.
                Giá chiến dịch và giá ưu đãi chớp nhoáng sẽ được ưu tiên áp dụng
                Khi một sản phẩm có cả chiết khấu sản phẩm và chiết khấu ưu đãi chớp nhoáng, chỉ giá ưu đãi chớp nhoáng mới được hiển thị. Tương tự, khi một sản phẩm có cả khuyến mãi chiết khấu và được chấp thuận là một phần trong chiến dịch của TikTok Shop, giá chiến dịch sẽ được ưu tiên áp dụng.
              </p>
            </div>
          </div>
        </div>
      </div >
      <div className="flex items-center justify-evenly mb-10">
        <p className="text-gray-700">Bằng việc nhấp vào "Đồng ý & đăng", bạn đồng ý  <span className="text-primary">Điều khoản & điều kiện của Công cụ quảng bá cho người bán của MarketMMO</span></p>
        <div className="flex gap-2 justify-end">
          <button className="text-black bg-gray-100 px-3 py-2 rounded-md text-sm font-semibold" onClick={handleCancel}>
            Hủy
          </button>
          <button className="text-white bg-primary px-3 py-2 rounded-md text-sm font-semibold" type="submit" onClick={handleSubmitPromotion}>
            Đồng ý và đăng
          </button>
        </div>
      </div>
      <ListProd onProductIdsChange={handleProductIdsChange} />
    </>
  );
}