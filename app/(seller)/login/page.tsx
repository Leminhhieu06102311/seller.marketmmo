"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Cookies from 'js-cookie'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { getUser, loginUser } from "@/services/user";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUser } from "@/redux/userSlice";
import { ENUM_ROLE_TYPE } from "@/enum/role_type";
export default function Login() {
    const router = useRouter();
    const dispatch = useAppDispatch()
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [messageErrorLogin, setMessageErrorLogin] = useState('');
  const [notification, setNotification] = useState(false);
  const handleEmailChange = useCallback(
    (e: { target: { value: any } }) => {
      const value = e.target.value;
      setEmail(value);
      setError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    },
    [setEmail]
  );
  
  const handlePasswordChange = useCallback(
    (e: { target: { value: any } }) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setMessageErrorLogin('')
    toast.promise(loginUser(email, password), {
      pending: {
        render() {
          return "Đang đăng nhập vui lòng đợi!"
        },
      },
      success: {
        async render({ data }) {
          const { access_token } = data.data
          dispatch(fetchUser(access_token))
          const dataUser = await getUser(access_token)
          if (dataUser.role === ENUM_ROLE_TYPE.SELLER) {
                console.log(dataUser.role)
              Cookies.set('access_token_seller', access_token, { expires: 10 })
              router.push("/");
              return "Đăng nhập thành công"
          } else {
            return "Bạn là người mua nên không thể bán vui lòng đăng kí tài khoản người bán trước khi đăng nhập"
          }

        },
        // other options
        icon: "🟢",
      },
      error: {
        render: ({ data }) => {
          const error: any = data
          if (error.response && error.response.status === 401) {
            // Lỗi 401 có nghĩa là "Sai tài khoản hoặc mật khẩu"
            setMessageErrorLogin(error.response.data.message)
            setNotification(true);
            console.log(error);
          } else {
            setMessageErrorLogin(error.response.data.message)
            setNotification(true);

            console.error("Lỗi đăng nhập:", error);
          }
          return <div>{error.response.data.message}</div>
        }
      }
    })
  };

    return (
        <section className="flex flex-col flex-1 justify-center w-full  ">
          <div className=" flex justify-center items-center grow m-0 p-0  pt-8  ">
            <div className="  w-full max-w-[440px] ">
              <h2 className="font-bold md:text-2xl mb-10 text-2xl lg:text-3xl">
                Đăng nhập Market MMO
              </h2>
              <div className="flex m-0 w-full ">
                <button className="inline-flex gap-2 items-center justify-center border rounded-full w-full pt-2 pb-2  md:text-base font-medium cursor-pointer text-sm h-14 ">
                  <FcGoogle className="w-5 h-5" />
                  Đăng nhập với Google
                </button>
              </div>
              <div className="flex items-center font-light justify-between mt-6 mb-6 text-zinc-400 text-sm md:text-base">
                <hr className="w-1/5 " />
                hoặc đăng nhập với Email
                <hr className="w-1/5" />
              </div>
              <div>
                <form action="">
                  <div>
                    <fieldset className="flex flex-col mb-4">
                      <label
                        htmlFor=""
                        className="mt-1 mb-1 font-semibold md:text-base text-sm"
                      >
                        Email
                      </label>
                      {notification && (
                        <div className="pb-2">
                          <p className="text-sm text-red-500">
                            {messageErrorLogin}
                          </p>
                        </div>
                      )}
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className={`block rounded-lg w-full h-14 focus:outline-none ${error
                          ? "border border-red-500 focus:ring-red-100"
                          : "hover:bg-white border hover:border-blue-500 hover:ring hover:ring-blue-100 focus:ring focus:ring-blue-100 focus:border-blue-500"
                          } pl-4 focus:bg-white `}
                        onChange={handleEmailChange}
                        value={email}
                      />
                      {error && (
                        <p className="text-red-500 text-sm mt-1">
                          Vui lòng nhập đúng định dạng email
                        </p>
                      )}
                    </fieldset>
                    <fieldset className="flex flex-col mb-4 relative">
                      <label
                        htmlFor=""
                        className=" flex justify-between mt-3.5 mb-1 md:text-base text-sm font-semibold"
                      >
                        Mật khẩu
                        <a
                          href="/recover"
                          className="font-normal underline text-sm"
                        >
                          Quên mật khẩu?
                        </a>
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="rounded-lg h-14 pr-10 hover:bg-white border  hover:border-blue-500 focus:border-blue-500 hover:transition hover:duration-30 hover:ring hover:ring-blue-100 focus:ring focus:ring-blue-100 focus:outline-none pl-4     "
                        name=""
                        onChange={handlePasswordChange}
                        value={password}
                        required
                      />
                      {password && (
                        <div
                          className="absolute top-14 right-2 px-2 py-1 cursor-pointer"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? (<FaRegEyeSlash className="w-5 h-5" />) : (<FaRegEye className="w-5 h-5" />)}
                        </div>
                      )}
                    </fieldset>
                  </div>
                  <button
                    type="submit"
                    className="rounded-full bg-primary text-white font-medium w-full md:text-base mt-5 text-sm h-14  hover:bg-blue-500"
                    name=""
                    onClick={handleLogin}
                    id=""
                  >
                    Đăng nhập
                  </button>
                  <p className="font-normal text-center mt-5 text-sm">
                    Chưa có tài khoản?{" "}
                    <Link href="/register" className="underline ">
                      Đăng ký ngay
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
    )
}