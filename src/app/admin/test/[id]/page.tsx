'use client'
import SidebarAdminPage from "@/app/sidebar";
import { useEffect, useState} from "react";
import { useRouter, useParams } from "next/navigation";
import { getTokenFromCookies } from "@/service/auth";
import { CreateQuestion, GetOneTest, ActiveTest, AddTestToClass, GetAllClass } from "@/service/admin";
export interface OneTestItem {
    _id: string;
    name_test: string;
    slug: string;
    description_test: string;
    diffcult_test: string;
    duration: number;
    status_test: number;
    total_questions: number;
    question_test: [{
        question: {
        _id: string;
        question_name: string;
        answer_a: string;
        answer_b: string;
        answer_c: string;
        answer_d: string;
        correct_answer: string;
        }
    }];
}
export interface ClassItem {
    _id: string;
    class_name: string;
    slug: string;
}
export default function OneTestPage(){
    const router = useRouter();
    const [testData, setTestData] = useState<OneTestItem | null>(null);
    const [classData, setClassData] = useState<ClassItem[]>([]);
    const [classId, setClassId] = useState<string>('');
    const [err, setErr] = useState("");
    const [errClass, setErrClass] = useState("");
    const [errAddTest, setErrAddTest] = useState("");
    const [loading, setLoading] = useState(true); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenActive, setIsModalOpenActive] = useState(false);
    const [isModalOpenAddTest, setIsModalOpenAddTest] = useState(false);
    const [question_name, setQuestion_name] = useState("");
    const [answer_a, setAnswer_a] = useState("");
    const [answer_b, setAnswer_b] = useState("");
    const [answer_c, setAnswer_c] = useState("");
    const [answer_d, setAnswer_d] = useState("");
    const [correct_answer, setCorrect_answer] = useState("");
    const params = useParams();
    const testId: string = params?.id as string;
    const token = getTokenFromCookies();
    console.log(testId);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOpenModalActive = () => {
        setIsModalOpenActive(true);
    }
    const handleCloseModalActive = () => {
        setIsModalOpenActive(false);
    };
    const handleOpenModalAddTest = () => {
        setIsModalOpenAddTest(true);
    }
    const handleCloseModalAddTest = () => {
        setIsModalOpenAddTest(false);
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
            try {
                await CreateQuestion(question_name, answer_a, answer_b, answer_c, answer_d, correct_answer, testId);
                alert("Tạo lớp thành công");
                window.location.reload();
            } catch (error) {
                setErrClass(error instanceof Error ? error.message : 'Có lỗi xảy ra!');
            }
    }
    const handleActiveTest = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            if(testData?.status_test === 0){
                await ActiveTest(1, testId);
                alert("Thành công");
                window.location.reload();
            }
            if(testData?.status_test === 1){
                await ActiveTest(0, testId);
                alert("Thành công");
                window.location.reload();
            }

        } catch (error) {
            setErrClass(error instanceof Error ? error.message : 'Có lỗi xảy ra!');
        }
    }
    const handleAddTest = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await AddTestToClass(classId, testId);
            alert("Thành công");
            setIsModalOpenAddTest(false)
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Có lỗi xảy ra!')
            setErrAddTest(error instanceof Error ? error.message : 'Có lỗi xảy ra!');
        }
    }
    useEffect(() => {
        if(!token){
            router.push('/login')
        }
        const fetchTest = async () => {
          try {
            const data = await GetOneTest(testId);
            console.log(data.data)
            setTestData(data.data)
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra";
            setErr(errorMessage);
          } finally {
            setLoading(false); // Khi dữ liệu được tải xong, set loading = false
        }
        }
        fetchTest();
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
      },[testId, token, router])
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
                                                <label className="block text-gray-700">Question Name</label>
                                                <input 
                                                onChange={(e) => {setQuestion_name(e.target.value)}}
                                                type="text"
                                                className="border p-2 w-full rounded text-gray-700"
                                                placeholder="Enter class name"
                                                required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">Answer A</label>
                                                <input 
                                                onChange={(e) => {setAnswer_a(e.target.value)}}
                                                type="text"
                                                className="border p-2 w-full rounded text-gray-700"
                                                placeholder="Enter test description"
                                                required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">Answer B</label>
                                                <input 
                                                onChange={(e) => {setAnswer_b(e.target.value)}}
                                                type="text"
                                                className="border p-2 w-full rounded text-gray-700"
                                                placeholder="Enter test description"
                                                required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">Answer C</label>
                                                <input 
                                                onChange={(e) => {setAnswer_c(e.target.value)}}
                                                type="text"
                                                className="border p-2 w-full rounded text-gray-700"
                                                placeholder="Enter test description"
                                                required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">Answer D</label>
                                                <input 
                                                onChange={(e) => {setAnswer_d(e.target.value)}}
                                                type="text"
                                                className="border p-2 w-full rounded text-gray-700"
                                                placeholder="Enter test description"
                                                required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">Correct Answer</label>
                                                <select 
                                                    onChange={(e) => setCorrect_answer(e.target.value)} 
                                                    className="border p-2 w-full rounded text-gray-700" 
                                                    required
                                                >
                                                    <option value="">Select Correct Answer</option>
                                                    <option value="A">A</option>
                                                    <option value="B">B</option>
                                                    <option value="C">C</option>
                                                    <option value="C">D</option>
                                                </select>
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
                                {isModalOpenActive && (
                                    <form onSubmit={handleActiveTest}>
                                        <div id="popup-modal" className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                                            <div className="relative p-4 w-full max-w-md max-h-full">
                                            {errAddTest && (
                                            <div className="text-red-500 bg-red-100 p-4 rounded-md mb-4">
                                                <strong>Lỗi:</strong> {errAddTest}
                                            </div>
                                            )}  
                                                <div className="relative bg-white rounded-lg shadow-sm">
                                                    <button onClick={handleCloseModalActive} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                    <div className="p-4 md:p-5 text-center">
                                                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                        </svg>
                                                        {testData?.status_test === 0 ? (
                                                            <h3 className="mb-5 text-lg font-normal text-gray-800">Do you want to active this test?</h3>
                                                        ):(
                                                            <h3 className="mb-5 text-lg font-normal text-gray-800">Do you want to inactive this test?</h3>
                                                        )}
                                                        <button data-modal-hide="popup-modal" type="submit" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                            Yes, I&#39;sm sure
                                                        </button>
                                                        <button onClick={handleCloseModalActive} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                                {isModalOpenAddTest && (
                                    <form onSubmit={handleAddTest}>
                                         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                                <div className="relative bg-white rounded-lg shadow-sm">
                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                                                    <h3 className="text-xl font-semibold text-gray-900">Select a Class</h3>
                                                    <button
                                                    type="button"
                                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                                    >
                                                    <svg onClick={handleCloseModalAddTest} className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                        />
                                                    </svg>
                                                    <span onClick={handleCloseModalAddTest} className="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                                <div className="p-4 md:p-5 space-y-4">
                                                    {classData.map((classItem) => (
                                                    <label key={classItem._id} className="flex items-center space-x-3">
                                                        <input
                                                        type="radio"
                                                        name="class"
                                                        value={classItem._id}
                                                        onChange={(e) => setClassId(e.target.value)}
                                                        className="form-radio h-4 w-4 "
                                                        />
                                                        <span className="text-gray-800">{classItem.class_name}</span>
                                                    </label>
                                                    ))}
                                                </div>
                                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                    <button
                                                    type="submit"
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                    Confirm
                                                    </button>
                                                    <button
                                                    onClick={handleCloseModalAddTest}
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
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="flex items-center justify-center h-24 rounded-sm bg-green-400 hover:bg-green-600">
                                        <p className="text-2xl text-gray-800">
                                            Test&#39;s name: {testData?.name_test}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center h-24 rounded-sm bg-blue-400 hover:bg-blue-700">
                                        <p className="text-2xl text-gray-800">
                                            Test&#39;s time: {testData?.duration} phút
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center h-24 rounded-sm bg-orange-400 hover:bg-orange-600">
                                        <p className="text-2xl text-gray-800">
                                            Total Questions: {testData?.total_questions}
                                        </p>
                                    </div>
                                    <div onClick={handleOpenModalActive} className="flex items-center justify-center h-24 rounded-sm bg-rose-400 hover:bg-rose-600">
                                        {testData?.status_test === 0 ? (
                                            <p className="text-2xl text-gray-800">
                                                Test&#39;s status: Close
                                            </p>
                                        ):(
                                            <p className="text-2xl text-gray-800">
                                                Test&#39;s status: Open
                                            </p>
                                        )}
                                    </div>
                                    <div onClick={handleOpenModalAddTest} className="flex items-center justify-center h-24 rounded-sm bg-red-400 hover:bg-red-600">
                                        <p className="text-2xl text-gray-800">
                                            Add test to class
                                        </p>
                                    </div>

                                    <div onClick={handleOpenModal} className="flex items-center justify-center h-24 rounded-sm bg-lime-400 hover:bg-lime-600">
                                        <p className="text-2xl text-gray-800">
                                            Create Question
                                        </p>
                                    </div>
                                </div>
                                <div className="relative overflow-x-auto">
                                    <p className="text-2xl text-gray-800">Question</p>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Answer A
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Answer B
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Answer C
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Answer D
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Correct Answer
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {testData?.question_test.map((Question, i) => (
                                                <tr key= {i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {Question.question.question_name}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {Question.question.answer_a}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {Question.question.answer_b}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {Question.question.answer_c}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {Question.question.answer_d}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {Question.question.correct_answer}
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