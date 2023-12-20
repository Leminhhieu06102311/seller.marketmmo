"use client";

import { useEffect, useState } from "react";
import Comments from "./Comments/Comments";
import { IoAddSharp } from "react-icons/io5";
import { getAllProducts } from "@/services/product";
import Product from "@/interfaces/product";
import Cookies from "js-cookie";
import Image from "next/image";

export default function DetailProduct({
  params,
}: {
  params: { productId: string };
}) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const token = Cookies.get("token");
  const { productId } = params;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProducts(token, page);
      setProducts(res);
    };

    fetchData();
  }, [token, page]);

  useEffect(() => {
    const filteredProduct = products.filter(
      (product) => product._id === productId
    );
    setFilteredProducts(filteredProduct);
  }, [products, productId]);
  return (
    <div className="bg-white rounded-l-lg w-full top-9 bottom-0 left-0 right-0  pb-52 overflow-y-scroll">
      {filteredProducts.map((product) => (
        <>
          <div className="flex justify-center mt-6">
            <div className="w-[90%] justify-center bg-white rounded-xl shadow-lg gap-x-5 p-6 flex flex-col md:flex-row lg:flex-row items-start md:items-center lg:items-center  mb-3 ">
              <div className="w-full lg:w-1/3 flex gap-5 flex-col">
                <div className=" rounded-2xl w-full">
                  <Image
                    className="rounded-2xl object-cover w-[full] h-auto"
                    src={product.pictures[0]}
                    width={500}
                    height={500}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-2/3 flex gap-5 flex-col">
                <div className="bg-white  rounded-2xl w-full lg:p-4">
                  <div className="w-full flex justify-end">
                    <p className="text-[14px] font-semibold">
                      Cập nhật lúc :{" "}
                      {new Date(product.updatedAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                  <div className="flex py-5">
                    <span className=" text-2xl text-primary font-bold">
                      {product.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className=" text-2xl font-bold">
                      Giá:{" "}
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="block">
                    <div className="flex w-full justify-between pt-2 py-5 items-center border border-b-gray-300 border-l-0 border-r-0 border-t-0 ">
                      <div className="w-full flex justify-between">
                        <div className="flex gap-x-3">
                          <div className=" flex gap-2">
                            <div className="gap-2 flex">
                              <p className="text-[blue]">ID: </p>
                            </div>
                            <p>{product._id}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="h-5 w-[1px] bg-gray-300 mx-2"></span>
                          </div>
                          <p>
                            {" "}
                            số lượng:{" "}
                            <span className="font-semibold">
                              {product.quantity}
                            </span>
                          </p>
                          <div className="flex items-center">
                            <span className="h-5 w-[1px] bg-gray-300 mx-2"></span>
                          </div>
                        </div>
                        <p>
                          {product.statsSale === true && (
                            <>
                              <span className="px-3 py-1 border-2 border-[red] text-[red] rounded-lg text-xs font-semibold">
                                Đã bán
                              </span>
                            </>
                          )}
                          {product.statsSale === false && (
                            <>
                              <span className="px-3 py-1 border-2 border-[blue] text-[blue] rounded-lg text-xs font-semibold">
                                Còn hàng
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <br />

                  <div className="flex justify-between">
                    <p>Giá trị giảm giá : {product.discount}</p>
                  </div>
                  <div className="flex justify-between"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-xxs md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl ">
            <div className="flex justify-center gap-5 my-8"></div>
            <div className="w-full rounded-3xl border border-gray-200 py-4 px-3 lg:p-10">
              <Comments productId={product.slug} _id={product._id} />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
