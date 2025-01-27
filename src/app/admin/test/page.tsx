'use client'
import SidebarAdminPage from "@/app/sidebar";
import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { CreateTest } from "@/service/admin";
import { GetAllTest } from "@/service/admin";
export interface TestItem {
    _id: string;
    name_test: string;
    slug: string;
    description_test: string;
    diffcult_test: string;
    duration: number;
    status_test: number;
}
export default function TestAdminPage(){
    const router = useRouter();
    const [testData, setTestData] = useState<TestItem[]>([]);
    const [err, setErr] = useState("");
    const [errClass, setErrClass] = useState("");
    const [loading, setLoading] = useState(true); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [testName, setTestName] = useState("");
    const [testDes, setTestDes] = useState("");
    const [testDiff, setTestDiff] = useState("");
    const [testTime, setTestTime] = useState<number>(Number);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
            try {
                await CreateTest(testName, testDes, testDiff, testTime);
                alert("Tạo lớp thành công");
                window.location.reload();
            } catch (error) {
                setErrClass(error instanceof Error ? error.message : 'Có lỗi xảy ra!');
            }
    }
    useEffect(() => {
        const fetchClass = async () => {
          try {
            const data = await GetAllTest();
            console.log(data.data)
            setTestData(Array.isArray(data.data) ? data.data : [])
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra";
            setErr(errorMessage);
          } finally {
            setLoading(false); // Khi dữ liệu được tải xong, set loading = false
        }
        }
        fetchClass();
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
                                    <span className="ml-2">Create Test</span>
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
                                            <label className="block text-gray-700">Test Name</label>
                                            <input 
                                            onChange={(e) => {setTestName(e.target.value)}}
                                            type="text"
                                            className="border p-2 w-full rounded text-gray-700"
                                            placeholder="Enter class name"
                                            required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Test Description</label>
                                            <input 
                                            onChange={(e) => {setTestDes(e.target.value)}}
                                            type="text"
                                            className="border p-2 w-full rounded text-gray-700"
                                            placeholder="Enter test description"
                                            required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Test Difficult</label>
                                            <select 
                                                onChange={(e) => setTestDiff(e.target.value)} 
                                                className="border p-2 w-full rounded text-gray-700" 
                                                required
                                            >
                                                <option value="">Select difficulty</option>
                                                <option value="easy">Easy</option>
                                                <option value="medium">Medium</option>
                                                <option value="difficult">Difficult</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Test Time Limit</label>
                                            <input 
                                            onChange={(e) => {           
                                                const value = parseInt(e.target.value, 10); // Chuyển đổi giá trị input sang số nguyên
                                                setTestTime(value);
                                            }}
                                            type="number"
                                            className="border p-2 w-full rounded text-gray-700"
                                            placeholder="Enter time limit in minutes"
                                            min={30}
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
                            </div>
                            <div className="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700">
                                <div className="relative overflow-x-auto">
                                    <p className="text-2xl text-gray-800">Test</p>
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
                                                    Description
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Difficult
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Time
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Active
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {testData.map((Test, i) => (
                                                <tr key= {i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {Test.name_test}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {Test.slug}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {Test.description_test}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {Test.diffcult_test}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {Test.duration}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {Test.status_test === 0 ? (
                                                            <span>Close</span>
                                                        ):(
                                                            <span>Open</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <a onClick={() => {router.push(`/admin/test/${Test._id}`)}}>Edit</a>
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