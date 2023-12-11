"use client"

import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/hooks'
import { getUser } from '@/services/user'
import { fetchUser } from '@/redux/userSlice'
import Cookies from 'js-cookie'

export default function ManagerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const token: string = Cookies.get('access_token_seller')
    // useEffect(() => {
    //     const checkLogin = async () => {
    //         try {
    //             const dataUser = await getUser(token)
    //             if (dataUser && dataUser._id) {
    //                 dispatch(fetchUser(token))
    //             }
    //         } catch (error) {
    //             router.replace('/login')
    //         }
    //     }
    //     checkLogin()
    // }, [token])
    return (
        <div>
            {children}
        </div>
    )
}
