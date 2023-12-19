"use client"
import { SetStateAction, useState, useEffect, memo } from "react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline, IoIosSearch } from "react-icons/io";
import Cookies from 'js-cookie'
import { getAllProducts, getCategories } from "@/services/product";
import { Product } from "@/interfaces/product";
import { ENUM_NAME_MODAL } from "@/enum/name_modal";
import { formatCurrencyVND } from "@/utils/format_vnd";
import Category from "@/interfaces/category";
import ContentModal from "@/components/Modal";

interface ListProdProps {
    onProductIdsChange: (newProductIds: string[]) => void;
}

function ListProd({ onProductIdsChange }: ListProdProps) {
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState<Product[]>()
    const token = Cookies.get('token')
    const [activeTab, setActiveTab] = useState(0);
    const [activeSearchByCate, setActiveSearchByCate] = useState(0)
    const [productIds, setProductIds] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>()
    const showTab = (index: SetStateAction<number>) => {
        setActiveTab(index);
    };
    useEffect(() => {
        const getCate = async () => {
            const res = await getCategories()
            setCategories(res)
        }
        getCate()

    }, [])
    useEffect(() => {
        const getAllProduct = async () => {
            const res = await getAllProducts(token, page)
            setProducts(res)
        }
        getAllProduct()
    }, [page, activeSearchByCate])

    const handleAddListPromotion = (productId: string) => {
        const newProductIds = [...productIds, productId];
        setProductIds(newProductIds);

        onProductIdsChange(newProductIds);
    }

    const handleRemoveListPromotion = (productId: string) => {
        const newProductIds: string[] = productIds.filter(id => id !== productId);
        setProductIds(newProductIds);

        onProductIdsChange(newProductIds);
    };

    const hanldeSearchByCate = (cateId: string, index: number) => {
        setActiveSearchByCate(index)
        const filterProductByCate = products?.filter((product) => product.categories === cateId)
        setProducts(filterProductByCate)
    }

    const tabs = [
        {
            label: 'Tất cả', content:
                <div>
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="border-t bg-white">
                                <th className=" text-start text-sm p-4 whitespace-nowrap">Tên sản phẩm</th>
                                <th className=" text-start text-sm p-4 whitespace-nowrap">Giá</th>
                                <th className=" text-start text-sm p-4 whitespace-nowrap">Số lượng</th>
                                <th className=" text-start text-sm p-4 whitespace-nowrap">Đã bán</th>
                                <th className=" text-start text-sm p-4 whitespace-nowrap"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map((product) => {
                                const isProductAdded = productIds.includes(product._id);
                                return (
                                    <tr key={product._id} className="bg-white border-t hover:bg-gray-50">
                                        <td className="p-4 whitespace-nowrap text-sm">{product.name}</td>
                                        <td className="p-4 whitespace-nowrap md:sticky">{formatCurrencyVND(product.price)}</td>
                                        <td className="p-4 whitespace-nowrap text-sm">{product.quantity}</td>
                                        <td className="p-4 whitespace-nowrap text-sm">{product.numberHasSeller}</td>

                                        <th className="text-start p-4 relative">
                                            {isProductAdded ? (
                                                <button onClick={() => handleRemoveListPromotion(product._id)} className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 ">
                                                    <IoIosCloseCircleOutline />
                                                </button>
                                            ) : (
                                                <button onClick={() => handleAddListPromotion(product._id)} className="text-lg p-1 hover:bg-gray-200 rounded-full mr-1 ">
                                                    <IoIosAddCircleOutline />
                                                </button>
                                            )}
                                        </th>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div >
        }
    ];
    useEffect(() => {
        import('preline')
    }, [])
    return (
        <ContentModal nameModal={ENUM_NAME_MODAL.LISTPRODUCT_MODAL}>
            <div className="mx-auto shadow-lg rounded-xl w-4/5">
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
                <div className="flex gap-2 px-6 pb-4 bg-white">
                    {categories?.map((cate, index) => (
                        <button type="button" onClick={() => hanldeSearchByCate(cate._id, index)} className={`${activeSearchByCate === index ? 'text-white bg-blue-600' : ''} py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}>
                            {cate.name}
                        </button>
                    ))}
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

export default memo(ListProd);