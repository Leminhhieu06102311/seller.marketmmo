import Image from "next/image";
import { AiOutlineEye } from "react-icons/ai";

export default function createDiscount() {
  return (
    <>
      <div className="bg-white w-full rounded-lg px-6 py-2">
        <div className="py-3 flex gap-2 items-center">
          <h1 className="font-medium text-2xl">Thông tin cơ bản</h1>
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-2 flex-1 w-1/2">
            <div className="flex gap-2 flex-col">
              <h3 className="text-lg font-medium">Tên khuyến mãi</h3>
              <input
                type="text"
                placeholder="Chiết khấu sản phẩm 03/11/2023 20:21:53"
                className="py-2 px-3 border border-gray-200 rounded-md w-full outline-none"
              />
            </div>
            <div className="flex gap-2 flex-col">
              <h3 className="text-lg font-medium">Thời gian khuyến mãi</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="03/11/2023 23:21(GMT+7)"
                  className="py-2 px-3 border border-gray-200 rounded-md w-full outline-none"
                />
                <input
                  type="text"
                  placeholder="01/05/2024 23:21(GMT+7)"
                  className="py-2 px-3 border border-gray-200 rounded-md w-full outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <h3 className="text-lg font-medium">Loại chiết khấu</h3>
              <div className="flex gap-2">
                <input type="radio" className="" />
                <label htmlFor="" className="text-base">
                  Giảm giá phần trăm
                </label>
              </div>
              <div className="flex gap-2">
                <input type="radio" className="" />
                <label htmlFor="" className="text-base">
                  Giá cố định
                </label>
              </div>
            </div>
            <div className="py-3 flex gap-2 flex-col">
              <h1 className="font-medium text-2xl">Sản phẩm</h1>
              <p className="text-xs text-gray-700">
                Chọn sản phẩm hoặc SKU bạn muốn khuyến mãi
              </p>
            </div>
            <button className="px-3 py-2 bg-gray-100 text-black rounded-md inline-block">
              Chọn sản phẩm
            </button>
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
      </div>
      <div className="flex items-center justify-evenly mb-10">
        <p className="text-gray-700">Bằng việc nhấp vào "Đồng ý & đăng", bạn đồng ý  <span className="text-primary">Điều khoản & điều kiện của Công cụ quảng bá cho người bán của MarketMMO</span></p> 
        <div className="flex gap-2 justify-end">
        <button className="text-black bg-gray-100 px-3 py-2 rounded-md text-sm font-semibold">
          Hủy
        </button>
        <button className="text-white bg-primary px-3 py-2 rounded-md text-sm font-semibold">
          Đồng ý và đăng
        </button>
      </div>
      </div>
    </>
  );
}