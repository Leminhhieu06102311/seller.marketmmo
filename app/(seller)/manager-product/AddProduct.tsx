"use client"
import ContentModal from "@/components/Modal";
import { ENUM_NAME_MODAL } from "@/enum/name_modal";
import Category from "@/interfaces/category";
import { useAppDispatch } from "@/redux/hooks";
import { hideModal } from "@/redux/modalSlice";
import { addProduct, getCategories } from "@/services/product";
import { useEffect, useState, memo } from "react";
import { IoMdClose } from "react-icons/io";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../../../firebase'
import { generateRandomString } from "@/utils/generate_string";
import { getCurrentTimestamp } from "@/utils/get_current_time";
import Image from "next/image";
import Cookies from 'js-cookie'
import { AddProduct, Product } from "@/interfaces/product";
import { toast } from "react-toastify";
function AddProduct({ setProducts }: {
    setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>
}) {
    const dispatch = useAppDispatch()
    const [imageUrl, setImageUrl] = useState<string>()
    const [selectFile, setSelectFile] = useState<File | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const token = Cookies.get('access_token')
    const [fields, setFields] = useState<AddProduct>({
        name: '',
        categories: '',
        pictures: [''],
        price: 0,
        quantity: 0,
        description: ''
    })
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories()
            setCategories(data)
        }
        fetchCategories()
    }, [])
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target?.files?.[0];

        if (selectedFile) {
            setSelectFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile)
            setImageUrl(objectUrl)
        }
    };
    const handleUpload = async () => {
        if (!selectFile) return;
        const randomString = generateRandomString(8);
        const timestamp = getCurrentTimestamp();
        const storageRef = ref(storage, `product/${randomString}_${timestamp}_${selectFile.name}`);
        const task = await uploadBytes(storageRef, selectFile)
        const url = await getDownloadURL(task.ref)
        setFields({ ...fields, pictures: [url] })
    };
    useEffect(() => {
        return () => {
            if (imageUrl) URL.revokeObjectURL(imageUrl)
        }
    }, [imageUrl])
    const hanldeAdd = async () => {
        try {
            const res = await addProduct(fields.name, fields.categories, fields.price, fields.pictures, fields.quantity, fields.description, token)
            const newProduct = res?.data.data
            dispatch(hideModal(ENUM_NAME_MODAL.ADD_PRODUCT))
            handleUpload()
            setFields({
                name: '',
                categories: '',
                pictures: [''],
                price: 0,
                quantity: 0,
                description: ''
            })
            setProducts((prev: any) => [...newProduct, ...prev])
            toast.success("Tạo sản phẩm thành công")

        } catch (error) {
            toast.error("Tạo sản phẩm thất bại vui lòng thử lại sau!")


        }
    }
    return (
        <ContentModal nameModal={ENUM_NAME_MODAL.ADD_PRODUCT}>
            <div className="flex justify-center items-center w-full h-full">
                <div className="bg-white p-4 z-50 w-full h-full md:h-auto max-h-[700px]  overflow-y-scroll md:w-3/6 md:rounded-xl  lg:h-auto lg:rounded-xl lg:w-528" >
                    <div className=" w-full flex justify-between mb-5">
                        <h2 className='font-semibold text-xl'>Chỉnh sửa sản phẩm</h2>
                        <button onClick={() => dispatch(hideModal(ENUM_NAME_MODAL.ADD_PRODUCT))}> <IoMdClose className="text-2xl text-gray-200" /></button>
                    </div>
                    <div>
                        <div className="flex flex-col mb-2">
                            <label className="text-sm font-semibold">Tên sản phẩm phẩm:</label>
                            <input
                                type="text"
                                className="mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg"
                                value={fields.name}
                                onChange={(e) => setFields({ ...fields, name: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className="text-sm font-semibold">Số lượng:</label>
                            <input
                                type="text"
                                className="mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg"
                                value={fields.quantity}
                                onChange={(e) => setFields({ ...fields, quantity: +e.target.value })}
                            />
                        </div >
                        <div className="flex flex-col mb-2">
                            <label className="text-sm font-semibold">Giá:</label>
                            <input
                                type="text"
                                className="mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg"
                                value={fields.price}
                                onChange={(e) => setFields({ ...fields, price: +e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className="text-sm font-semibold">Danh mục:</label>

                            <select name="" id="" onChange={(e) => setFields({ ...fields, categories: e.target.value })} className="mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg">
                                {categories && categories.map((cate) => (
                                    <option key={cate.name} value={cate._id}>{cate.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="text-sm font-semibold">Ảnh:</label>
                            <label className="block mt-1">
                                <span className="sr-only">Choose profile photo</span>
                                <input
                                    type="file"
                                    className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:file:bg-blue-500 dark:hover:file:bg-blue-400 "
                                    onChange={handleFileChange}
                                />
                            </label>
                            {imageUrl && <Image src={imageUrl} width={0} height={0} alt="banner" className="w-full h-[300px] my-2 rounded-md" />}
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className="text-sm font-semibold">Mô tả:</label>
                            <textarea name="" id="" value={fields.description} onChange={(e) => setFields({ ...fields, description: e.target.value })} className=" focus:border-primary focus:outline-none h-24 mt-1 w-full px-3 py-2 hover:border-primary border rounded-lg"></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => dispatch(hideModal(ENUM_NAME_MODAL.ADD_PRODUCT))} className="rounded-lg text-black font-semibold text-sm bg-gray-50 px-4 py-2 mr-2">Huỷ</button>
                            <button
                                className="rounded-lg text-white font-semibold text-sm bg-primary px-4 py-2"
                                onClick={hanldeAdd}
                            >Lưu</button>
                        </div>
                    </div>
                </div>

            </div>
        </ContentModal>

    )
}

export default memo(AddProduct)