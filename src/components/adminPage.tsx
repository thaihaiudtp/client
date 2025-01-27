'use client'
import { useRouter } from "next/navigation";

export default function AdminPage(){
    const router = useRouter();


    return(
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div  onClick={() => {router.push("/admin/users")}}className="flex items-center justify-center rounded-sm bg-green-400 h-48">
                        <p  className="text-2xl text-white text-bond">
                            Student
                        </p>
                    </div>
                    <div onClick={() => {router.push("/admin/class")}} className="flex items-center justify-center rounded-sm bg-amber-500 h-48">
                        <p className="text-2xl text-white text-bond">
                            Class
                        </p>
                    </div>
                    <div onClick={() => {router.push("/admin/test")}} className="flex items-center justify-center rounded-sm bg-blue-400 h-48">
                        <p className="text-2xl text-white text-bond">
                            Test
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded-sm bg-red-400 h-48">
                        <p className="text-2xl text-white text-bond">
                            Setting
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}