'use client'
import SidebarAdminPage from "@/app/sidebar";
import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { CreateClass, GetAllClass, GetAllUser } from "@/service/admin";
export interface ClassItem {
    _id: string;
    class_name: string;
    slug: string;
    tests: [];
    student: [];
};
export interface Users {
    _id: string;
    name: string;
}
export default function ClassAdminPage(){
    const router = useRouter();
    const [classData, setClassData] = useState<ClassItem[]>([]);
    const [users, setUsers] = useState<Users[]>([]);
    const [err, setErr] = useState("");
    const [errClass, setErrClass] = useState("");
    const [loading, setLoading] = useState(true); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenStudent, setIsModalOpenStudent] = useState(false);
    const [className, setClassName] = useState("");
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOpenModalAddStudent = () => {
        setIsModalOpenStudent(true);
    }
    const handleCloseModalAddStudent = () => {
        setIsModalOpenStudent(false);
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
            try {
                await CreateClass(className);
                alert("Tạo lớp thành công");
                window.location.reload();
            } catch (error) {
                setErrClass(error instanceof Error ? error.message : 'Có lỗi xảy ra!');
            }
    }
    useEffect(() => {
        const fetchClass = async () => {
          try {
            const data = await GetAllClass();
            console.log(data.data)
            setClassData(Array.isArray(data.data) ? data.data : [])
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra";
            setErr(errorMessage);
          } finally {
            setLoading(false); 
        }
        }
        fetchClass();
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
      },[])
    return(
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
                            <div className="flex justify-between items-center">
                                <div onClick={() => {router.back()}} className="border-2 border-gray-800 w-[42px] h-[42px] mb-6 rounded-xl bg-orange-400 hover:bg-orange-800">
                                    <svg className="w-[42px] h-[42px] text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                                    </svg>
                                </div>
                                <div  onClick={handleOpenModal} className="border-2 border-gray-800 w-48 h-[42px] mb-6 rounded-xl bg-green-400 hover:bg-green-600 mt-6">
                                    <span className="ml-2">Create Class</span>
                                </div>

                                {isModalOpen && (
                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                                        <div className="bg-white p-6 rounded-lg w-96">
                                            {errClass && (
                                            <div className="text-red-500 bg-red-100 p-4 rounded-md mb-4">
                                                <strong>Lỗi:</strong> {errClass}
                                            </div>
                                            )}  
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">Class Name</label>
                                                <input 
                                                onChange={(e) => {setClassName(e.target.value)}}
                                                type="text"
                                                className="border p-2 w-full rounded text-gray-700"
                                                placeholder="Enter class name"
                                                required
                                                />
                                            </div>
                                            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Create</button>
                                            </form>
                                            <button
                                            onClick={handleCloseModal}
                                            className="mt-4 bg-red-500 text-white p-2 rounded w-full"
                                            >
                                            Close
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {isModalOpenStudent && (
                                    <form>
                                         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                                <div className="relative bg-white rounded-lg shadow-sm">
                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                                                    <h3 className="text-xl font-semibold text-gray-900">Select students</h3>
                                                    <button
                                                    type="button"
                                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                                    >
                                                    <svg onClick={handleCloseModalAddStudent} className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                        />
                                                    </svg>
                                                    <span onClick={handleCloseModalAddStudent} className="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                                <div className="p-4 md:p-5 space-y-4">
                                                    {users.map((user) => (
                                                    <label key={user._id} className="flex items-center space-x-3">
                                                        <input
                                                        type="checkbox"
                                                        name="class"
                                                        
                                                        className="form-radio h-4 w-4 "
                                                        />
                                                        <span className="text-gray-800">{user.name}</span>
                                                    </label>
                                                    ))}
                                                </div>
                                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                    <button
                                                    type="submit"
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                    Add
                                                    </button>
                                                    <button
                                                    onClick={handleCloseModalAddStudent}
                                                    type="button"
                                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                    >
                                                    Cancel
                                                    </button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                    </form>
                                )}
                            </div>
                            <div className="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700">
                                <div className="relative overflow-x-auto">
                                    <p className="text-2xl text-gray-800">Class</p>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Slug
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Student Count
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Test Count
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Active
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classData.map((classes, i) => (
                                                <tr key= {i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {classes.class_name}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {classes.slug}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span>{classes.student.length}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span>{classes.tests.length}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <a onClick={handleOpenModalAddStudent}>Add student</a>
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