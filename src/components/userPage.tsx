'use client'
import Image from "next/image";
import { GetAllClass} from "@/service/class";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export interface ClassItem {
    id: string;
    class_name: string;
    slug: string;
}
export default function UserPage(){
    const [classData, setClassData] = useState<ClassItem[]>([]);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true); 
    const router = useRouter();
    useEffect(() => {
        const fetchClass = async () => {
          try {
            const data = await GetAllClass();
            console.log(data.data)
            setClassData(data.data)
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra";
            setErr(errorMessage);
          } finally {
            setLoading(false); // Khi dữ liệu được tải xong, set loading = false
        }
        }
        fetchClass();
      }, [])
    return(
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="text-xl text-gray-700">Loading...</span> {/* Hiển thị thông báo loading */}
        </div>
      ):(
        <div className="font-[sans-serif]">
          <div className="p-4 mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-10 mt-6 ml-4">Welcome</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
              {classData.length===0 ? (
                <p className="col-span-full text-center text-gray-800">No classes available. {err}</p>
              ):(
                classData.map((classData)=>{
                    return(
                      <div  key = {classData.slug} onClick={() => router.push(`/${classData.slug}`)} className="bg-white rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative">
                      <div className="mb-4  rounded p-2">
                        <Image src="/english.jpg" alt="Product 1"
                          className=" w-full object-contain" 
                          width={1200}  // Specify the width
                          height={240}/>
                      </div>
          
                      <div>
                        <div className="flex gap-2">
                          <h5 className="text-base font-bold text-gray-800">{classData.class_name}</h5>
                        </div>              
                        <div className="flex items-center gap-2 mt-4">
                          <button type="button" className="text-sm px-2 h-9 font-semibold w-full bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded">Enroll</button>
                        </div>
                      </div>
                    </div>
                    )
                  })
              )}
            </div>
          </div>
        </div> 
      )}

    </>
    )
}
