'use client'
import Image from "next/image";
import {usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
interface User {
    name: string;
    email: string;
}
export default function Header(){
    const router = useRouter();
    const pathName = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const token = Cookies.get('token');
    const handleOpenClick = () => {
        console.log("Menu mở");
        setIsMenuOpen(true); 
    };
    const handleCloseClick = () => {
        console.log("Menu đóng");
        setIsMenuOpen(false);
    };
    const handleMenuItemClick = () => {
        console.log("Menu mục đã chọn");
        setIsMenuOpen(false);
    };
    const handleClick = () => {
        setIsOpen(prevState => !prevState);
      };
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/login'; 
    }
    useEffect(() => {
        if(token){
            const decodedToken = jwtDecode<User>(token);
            setUser(decodedToken)
        }
        
    },[])
    

    
    
    if(pathName === "/login" || pathName === "/signup"){
        return null;
    }
    return(
        <header className='flex bg-white border-b py-3 sm:px-6 px-4 font-[sans-serif] min-h-[75px] tracking-wide relative z-50'>
        <div className='flex max-w-screen-xl mx-auto w-full'>
            <div className='flex flex-wrap items-center lg:gap-y-2 gap-4 w-full'>
                <div id="collapseMenu" style={{display: isMenuOpen ? 'block' : 'none'}}
                    className='lg:ml-6 max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
                    <button onClick={handleCloseClick} className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
                        <path
                        d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                        data-original="#000000"></path>
                        <path
                        d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                        data-original="#000000"></path>
                    </svg>
                    </button>

                    <ul
                    className='lg:flex lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
                        <li className='mb-6 hidden max-lg:block'>
                            
                            <div>
                                <p className="text-gray-800 text-2xl font-bold">Hi, {user?.name}</p>
                                <p className="text-gray-300">{user?.email}</p>
                            </div>                            


                        
                    </li>
                    <li className='max-lg:border-b max-lg:py-3 px-3' onClick={handleMenuItemClick}><a onClick={() => router.push('/')}
                        className='text-[#006eff] hover:text-[#0000ff] text-1xl block font-semibold'>Home</a></li>
                    <li className='max-lg:border-b max-lg:py-3 px-3' onClick={handleMenuItemClick}><a onClick={() => router.push('/course/my-course')}
                        className='text-[#333] hover:text-[#007bff] text-1xl block font-semibold'>My Point</a></li>
                    </ul>
                </div>
                <div className="flex items-center gap-x-6 gap-y-4 ml-auto">


                    <div className='flex items-center sm:space-x-8 space-x-6'>
                    
                            <div className="relative">
                                <button
                                type="button"
                                onClick={handleClick}
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
                                >
                                <Image src="https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg" alt="Avatar" className="w-full h-full object-cover" width={40} height={40}/>
                                </button>
                    
                                {isOpen && (
                                <div  className="absolute mt-2 bg-white shadow-lg rounded w-40  z-[1000] right-0">
                                <p className="text-blue-800 text-semibold ml-4 mt-2">Hi, {user?.name}</p>
                                <ul>
                                    <li className="py-2.5 px-5 hover:bg-blue-50 text-black text-sm cursor-pointer">Thống kê</li>
                                    <li className="py-2.5 px-5 hover:bg-blue-50 text-black text-sm cursor-pointer">Cài đặt</li>
                                    <li className="py-2.5 px-5 hover:bg-blue-50 text-black text-sm cursor-pointer" onClick={handleLogout}>
                                    Đăng xuất
                                    </li>
                                </ul>
                                </div>
                                )}
                            </div>                             


                        <button onClick={handleOpenClick} className='lg:hidden'>
                            <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </header>
    )
}