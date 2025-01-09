'use client'
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState} from "react";
import { GetAllUser } from "@/service/admin";
export interface Users {
    _id: string;
    class_user: string;
    email: string;
    name: string;
    role: number;
    test: [];
  }
export default function AdminPage(){
    const router = useRouter();
    const token = Cookies.get('token');
    const [users, setUsers] = useState<Users[]>([]);
    const [err, setErr] = useState('');
    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
        const fetchUser = async () => {
            try {
                const data = await GetAllUser()
                setUsers(data.data)
                console.log(data.data)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra";
                setErr(errorMessage)
            }
        }
        fetchUser()
    }, [token])
    return(
        <>
        {err && (
            <div>
                <h1 className="text-red-900 text-bond text-2xl">{err}</h1>
            </div>
        )}
        <div className="font-sans overflow-x-auto ml-[240px]">
            <div>
                <h1 className="text-2xl text-gray-800 font-bold mt-5 ml-5">Student</h1>
            </div>
            <table className="min-w-full divide-y divide-gray-200 ml-5 mr-5">
                <thead className="bg-gray-100 whitespace-nowrap">
                <tr>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Active
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Class
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Test
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody  className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                {users.map((users) => {
                    return(

                        <tr key={users._id}>
                            <td className="px-4 py-4 text-sm text-gray-800">
                            {users.name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-800">
                            {users.email}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-800">
                            {users.role === 3 ? (
                                <>No active</>
                            ):(
                                <>Active</>
                            )}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-800">
                            {users.class_user}
                            </td>
                            <td key={users._id} className="px-4 py-4 text-sm text-gray-800">
                            <span className = 'text-blue-600' onClick={() => {router.push(`/admin/dashboard/${users._id}/test`)}}>test</span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-800">
                            <button className="text-blue-600 mr-4">Edit</button>
                            <button className="text-red-600">Delete</button>
                            </td>
                        </tr>
                       
                    )
                })}

            </tbody>            
            </table>
        </div>
        </>
    )
}