"use client"
import type { Metadata } from 'next'
import { useEffect, useState } from 'react'
import { FaBell, FaCreditCard, FaFileInvoice, FaGift, FaRegClock, FaUser } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosSearch, IoMdClose, IoMdSettings } from 'react-icons/io'
import { AiFillDashboard } from 'react-icons/ai'
import { FaCartShopping } from 'react-icons/fa6'
import { FiMenu } from 'react-icons/fi'
import 'animate.css';
import { usePathname, useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getUser } from '@/services/user'
import { fetchUser } from '@/redux/userSlice'
import Cookies from 'js-cookie'
import User from '@/interfaces/user'
import { ENUM_ROLE_TYPE } from '@/enum/role_type'
interface Links {
  name: string,
  path: string,
  icon: JSX.Element
}
const links: Links[] = [
  {
    name: 'Dashboard',
    path: '/seller',
    icon: <AiFillDashboard className="w-6 h-6 mr-4" />,
  },
  {
    name: 'Sản phẩm',
    path: '/seller/product-manager',
    icon: <FaCartShopping className="w-6 h-6 mr-4" />,
  },
  {
    name: 'Tài chính',
    path: '/seller/financial',
    icon: <FaCreditCard className="w-6 h-6 mr-4" />,
  },
  {
    name: 'Quản lí đơn hàng',
    path: '/seller/orders-manager',
    icon: <FaFileInvoice className="w-6 h-6 mr-4" />,
  },
  {
    name: 'Ưu đãi',
    path: '/seller/promotion',
    icon: <FaGift className="w-6 h-6 mr-4" />,
  },
  {
    name: 'Cài đặt',
    path: '/seller/settings',
    icon: <IoMdSettings className="w-6 h-6 mr-4" />,
  },
];
export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {name, avatar} = useAppSelector((state) => state.user)
  const pathName = usePathname()
  const [searchModallOpen, setSearchModalOpen] = useState(false);
  const [notificationModallOpen, setNotificationModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [infoUser, setInforUser] = useState<User>()
  
  
  // useEffect(() => {
  //   // Kiểm tra nếu cookie tồn tại
  //   const loggedInUser = Cookies.get('token');
  //   // check user logged
  //   if (loggedInUser) {
  //     const expirationDate = new Date(Cookies.get('token_expiration'));
      
  //     if (Date.now() > expirationDate.getTime()) {
  //       Cookies.remove('token');
  //       Cookies.remove('token_expiration');
  //       router.push('/')
  //     } else {
  //       dispatch(fetchUser(loggedInUser))
  //     }
  //   }
  // }, []);
  
  return (
    <>
      <div className="bg-[#f9fafb] ">
            {searchModallOpen ? null : (
              <header className=" flex flex-col box-border fixed top-0 left-auto right-0 text-[rgb(255, 255, 255)] shadow-none h-[80px] z-50 backdrop-blur-[50px] bg-[rgba(249, 250, 251, 0.8)] transition w-full md:w-full lg:w-[calc(100%-281px)] ">
                <div className="md:px-6 lg:px-[40px] ">
                  <div className="flex items-center justify-between h-[80px]">
                    <div className="flex items-center">
                      <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center relative justify-center p-2 text-[1.5rem] cursor-pointer w-10 h-10 hover:bg-[#63738114] rounded-full  md:block lg:hidden"><FiMenu className="w-5 h-5" /></button>
                      <button onClick={() => setSearchModalOpen(false)} className="inline-flex items-center relative justify-center p-2 text-[1.5rem] cursor-pointer w-10 h-10 hover:bg-[#63738114] rounded-full"><IoIosSearch className="w-5 h-5" /></button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="">
                        <button onClick={() => setNotificationModalOpen(true)} className="inline-flex relative items-center justify-center p-2 text-[1.5rem] w-10 h-10 hover:bg-[#63738114] rounded-full">
                          <FaBell className="w-5 h-5" />
                          <span className='absolute top-[9px] right-[9px] rounded-full p-[5px] bg-[red]'></span>
                        </button>
                        <button className="inline-flex items-center justify-center p-2 ml-2 w-10 h-10  rounded-full hover:bg-[#63738114] ">
                          <div className="w-full h-full rounded-full overflow-hidden border-[2px solid rgb(249, 250, 251)]">
                            <Image className="w-full h-full text-center object-cover " src={avatar} alt="" width={40} height={40} />
                          </div>
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </header>
            )}
            <div className="flex relative ">
              {/* NAV */}
              <div className='h-full sticky top-0 '>
                <div className=" flex-shrink-0 w-[280px] h-screen p-0 overflow-scroll scroll-auto border-r hidden  lg:block">
                  <div className="">
                    <div className="text-xl font-bold w-full text-center p-7">Market MMO</div>
                    <div className="my-6 mx-5 py-4 px-5 rounded-xl bg-[#919eab1f] flex ">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                            <Image src={avatar} alt="" width={40} height={40} />
                          </div>
                          <div className="flex items-center ml-4">
                            <h6 className="font-semibold text-[0.875rem text-black">{name}</h6>
                          </div>
                    </div>
                    <nav className="px-4 ">
                      {links && links.map((link) => (

                        <Link key={link.name} href={link.path} className={`mb-1 text-sm rounded-md capitalize  font-semibold py-2 px-4 min-h-[44px] flex items-center cursor-pointer hover:bg-white ${link.path === pathName ? 'bg-[#1877f214] text-primary' : 'text-black '}`}>{link.icon}<span>{link.name}</span></Link>

                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Notification Modal */}
              {notificationModallOpen && (
                <div className="fixed inset-0 overflow-y-auto z-50 transition">
                  <div className="flex items-start justify-start min-h-screen pt-4 px-4 pb-20 text-left sm:block sm:p-0">
                    <div className="fixed inset-0 ">
                      <div
                        className="absolute inset-0 bg-transparent"
                        onClick={() => setNotificationModalOpen(false)}
                      ></div>
                    </div>

                    <div className="w-full h-full fixed right-0  top-0 md:top-[45px] md:right-[105px] lg:right-[125px] rounded-lg shadow-lg  lg:top-[45px]  bg-white  md:h-[80vh] md:w-[380px] lg:h-[80vh] lg:w-[380px]">
                      <div className=" overflow-scroll scroll-auto w-full h-full">
                        <div className='font-bold border-b pb-2 px-6 py-4 flex items-center justify-between'>  <h2 className=' text-xl '>Thông báo</h2> <button onClick={() => setNotificationModalOpen(false)}><IoMdClose className='text-2xl text-gray-400' /></button></div>
                        <h3 className='text-sm py-1 mb-3 px-6 border-b font-semibold '>MỚI</h3>
                        <div>
                          <div className='hover:bg-gray-50 bg-gray-100 px-6 py-4'>

                            <div className='flex items-center'>
                              <div className='w-10 h-10 bg-gray-50 p-2 rounded-full overflow-hidden mr-4'>
                                <Image src="/images/promotion/businessman.png" alt="" width={40} height={40} />
                              </div>
                              <div className='text-sm'>
                                <div className='mb-[2px]'>
                                  <span className='font-semibold mr-1'>Sản phẩm</span>
                                  <span className='text-gray-600'>của bạn đang được chờ duyệt</span>
                                </div>
                                <div className='font-medium text-xs flex items-center text-gray-400'><FaRegClock className='mr-1' /> 1 tiếng trước</div>
                              </div>
                            </div>
                          </div>
                          <div className='hover:bg-gray-50 bg-gray-100 px-6 py-4'>

                            <div className='flex items-center '>
                              <div className='w-10 h-10 bg-gray-50 p-2 rounded-full overflow-hidden mr-4'>
                                <Image src="/images/promotion/businessman.png" alt="" width={40} height={40} />
                              </div>
                              <div className='text-sm'>
                                <div className='mb-[2px]'>
                                  <span className='font-semibold mr-1'>Sản phẩm</span>
                                  <span className='text-gray-600'>của bạn đang được chờ duyệt</span>
                                </div>
                                <div className='font-medium text-xs flex items-center text-gray-400'><FaRegClock className='mr-1' /> 1 tiếng trước</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h3 className='text-sm py-1 my-3 px-6 border-y font-semibold '>ĐÃ ĐỌC</h3>
                        <div>
                          <div className='px-6 py-4 hover:bg-gray-50'>
                            <div className='flex items-center'>
                              <div className='w-10 h-10 bg-gray-50 p-2 rounded-full overflow-hidden mr-4'>
                                <Image src="/images/promotion/businessman.png" alt="" width={40} height={40} />
                              </div>
                              <div className='text-sm'>
                                <div className='mb-[2px]'>
                                  <span className='font-semibold mr-1'>Sản phẩm</span>
                                  <span className='text-gray-600'>của bạn đang được chờ duyệt</span>
                                </div>
                                <div className='font-medium text-xs flex items-center text-gray-400'><FaRegClock className='mr-1' /> 1 tiếng trước</div>
                              </div>
                            </div>
                          </div>
                          <div className='px-6 py-4 hover:bg-gray-50'>
                            <div className='flex items-center'>
                              <div className='w-10 h-10 bg-gray-50 p-2 rounded-full overflow-hidden mr-4'>
                                <Image src="/images/promotion/businessman.png" alt="" width={40} height={40} />
                              </div>
                              <div className='text-sm'>
                                <div className='mb-[2px]'>
                                  <span className='font-semibold mr-1'>Sản phẩm</span>
                                  <span className='text-gray-600'>của bạn đang được chờ duyệt</span>
                                </div>
                                <div className='font-medium text-xs flex items-center text-gray-400'><FaRegClock className='mr-1' /> 1 tiếng trước</div>
                              </div>
                            </div>
                          </div>
                          <div className='px-6 py-4 hover:bg-gray-50'>
                            <div className='flex items-center'>
                              <div className='w-10 h-10 bg-gray-50 p-2 rounded-full overflow-hidden mr-4'>
                                <Image src="/images/promotion/businessman.png" alt="" width={40} height={40} />
                              </div>
                              <div className='text-sm'>
                                <div className='mb-[2px]'>
                                  <span className='font-semibold mr-1'>Sản phẩm</span>
                                  <span className='text-gray-600'>của bạn đang được chờ duyệt</span>
                                </div>
                                <div className='font-medium text-xs flex items-center text-gray-400'><FaRegClock className='mr-1' /> 1 tiếng trước</div>
                              </div>
                            </div>
                          </div>
                          <div className='px-6 py-4 hover:bg-gray-50'>
                            <div className='flex items-center'>
                              <div className='w-10 h-10 bg-gray-50 p-2 rounded-full overflow-hidden mr-4'>
                                <Image src="/images/promotion/businessman.png" alt="" width={40} height={40} />
                              </div>
                              <div className='text-sm'>
                                <div className='mb-[2px]'>
                                  <span className='font-semibold mr-1'>Sản phẩm</span>
                                  <span className='text-gray-600'>của bạn đang được chờ duyệt</span>
                                </div>
                                <div className='font-medium text-xs flex items-center text-gray-400'><FaRegClock className='mr-1' /> 1 tiếng trước</div>
                              </div>
                            </div>
                          </div>
                          <div className='px-6 py-4 hover:bg-gray-50'>
                            <div className='flex items-center'>
                              <div className='w-10 h-10 bg-gray-50 p-2 rounded-full overflow-hidden mr-4'>
                                <Image src="/images/promotion/businessman.png" alt="" width={40} height={40} />
                              </div>
                              <div className='text-sm'>
                                <div className='mb-[2px]'>
                                  <span className='font-semibold mr-1'>Sản phẩm</span>
                                  <span className='text-gray-600'>của bạn đang được chờ duyệt</span>
                                </div>
                                <div className='font-medium text-xs flex items-center text-gray-400'><FaRegClock className='mr-1' /> 1 tiếng trước</div>
                              </div>
                            </div>
                          </div>
                          <div className='px-6 py-4 hover:bg-gray-50'>
                            <div className='flex items-center'>
                              <div className='w-10 h-10 bg-gray-50 p-2 rounded-full overflow-hidden mr-4'>
                                <Image src="/images/promotion/businessman.png" alt="" width={40} height={40} />
                              </div>
                              <div className='text-sm'>
                                <div className='mb-[2px]'>
                                  <span className='font-semibold mr-1'>Sản phẩm</span>
                                  <span className='text-gray-600'>của bạn đang được chờ duyệt</span>
                                </div>
                                <div className='font-medium text-xs flex items-center text-gray-400'><FaRegClock className='mr-1' /> 1 tiếng trước</div>
                              </div>
                            </div>
                          </div>

                        </div>
                        <div className='w-full text-primary py-2 px-6 border-y text-center'>
                          <h5 className='w-full py-1 rounded-lg hover:bg-blue-50'>Xem thêm</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="w-full md:w-full lg:w-[100% calc(100%-280px)]">
                {searchModallOpen && (
                  <div className="relative inset-0  items-center justify-center z-50 ">
                    <div className="fixed inset-0 bg-transparent" onClick={() => setSearchModalOpen(false)} ></div>
                    <div className="absolute shadow-lg right-0 bg-[#f9fafbcc] bg-blur-[6px] w-full h-[80px]  animate__animated animate__slideInDown animate__faster flex items-center lg:px-10 ">
                      <button className="inline-flex items-center relative justify-center p-2 text-[1.5rem] cursor-pointer w-10 h-10 hover:bg-[#63738114] rounded-full"><IoIosSearch className="w-5 h-5" /></button>
                      <input type="text" className="w-full focus:outline-none bg-transparent" placeholder="Search..." />
                      <button className="px-4 py-[6px] bg-primary text-white font-semibold rounded-xl">Search</button>
                    </div>
                  </div>
                )}
                <div className="pt-[88px] px-4 w-full">

                  {children}

                </div>
              </div>
            </div>
      </div >
    </>
  )
}
