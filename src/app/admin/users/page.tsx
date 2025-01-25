'use client'
import SidebarAdminPage from "@/app/sidebar";
import { useEffect, useState} from "react";
import { GetAllUser } from "@/service/admin";
import { useRouter } from "next/navigation";
export interface Users {
    _id: string;
    class_user: string;
    email: string;
    name: string;
    role: number;
    test: [];
}
export default function ShowUsersAdminPage(){
    const router = useRouter();
    const [users, setUsers] = useState<Users[]>([]);
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await GetAllUser()
                setUsers(data.data)
                console.log(data.data)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra";
                setErr(errorMessage)
            } finally {
                setLoading(false); // Khi dữ liệu được tải xong, set loading = false
            }
        }
        fetchUser()
    }, [])
    return (
        <>
        {loading ? (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-gray-700">Loading...</span> {/* Hiển thị thông báo loading */}
            </div>
        ):(
            <>
            {err ? (
                <>
                <div className="text-red-500 bg-red-100 p-4 rounded-md mb-4">
                <strong>Lỗi:</strong> {err}
                </div>
                </>
            ) : (
                <>
                <SidebarAdminPage/>
                <div className="p-4 sm:ml-64">
                <div onClick={() => {router.back()}} className="border-2 border-gray-800 w-[42px] h-[42px] mb-6 rounded-xl bg-orange-400 hover:bg-orange-800">
                <svg className="w-[42px] h-[42px] text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                </svg>
                </div>
                <div className="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700">
                    <div className="relative overflow-x-auto">
                        <p className="text-2xl text-gray-800">Users</p>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Class
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Test
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Active
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key= {index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.class_user}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span>test</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href="#">Edit</a>
                                        </td>
                                </tr>  
                                ))}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
                </>
            )}
            </>
        )}

            
        </>
        
    )
}