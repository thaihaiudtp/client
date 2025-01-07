"use client"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie";
export default function NoPage(){
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Chưa đến lượt của bạn!</h1>
        <p className="text-gray-600 mb-4">Xin vui lòng quay lại sau.</p>
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
                Cookies.remove('token')
                Cookies.remove('role')
                router.push('/login')
            }}
        >
            Quay về trang chủ
        </button>
    </div>
    )
}