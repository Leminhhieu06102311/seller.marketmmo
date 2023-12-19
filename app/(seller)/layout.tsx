"use client"

import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getUser } from '@/services/user'
import { setLoggedIn } from '@/redux/userSlice'
import Cookies from 'js-cookie'
const inter = Inter({ subsets: ['latin'] })

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const token: string = Cookies.get('access_token')
    const { isLoggedIn } = useAppSelector((state) => state.user)
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const dataUser = await getUser(token)
                if (dataUser && dataUser._id) {
                    dispatch(setLoggedIn(true))
                }
            } catch (error) {
                router.replace('/login')
            }
            
        }
        checkLogin()
    }, [])
  return (
    <div>

        {children}
    </div>
  )
}
