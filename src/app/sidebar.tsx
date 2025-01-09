'use client'
import Link from "next/link";
import Cookies from "js-cookie";
export default function SidebarAdminPage(){
    const handleLogout = () => {
        Cookies.remove('token'); 
    }
    return(
        <nav className="bg-white shadow-lg h-screen fixed top-0 left-0 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto">
            <ul>
                <li>
                <Link href="/admin/dashboard"
                    className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all">
                    Dashboard
                </Link>
                </li>
            </ul>

            <div className="mt-4">
                <h6 className="text-blue-600 text-sm font-bold px-4">Information</h6>
                <ul className="mt-2">
                <li>
                    <Link href="/"
                    className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all">
                    Student
                    </Link>
                </li>
                <li>
                    <Link href="/admin/dashboard/class"
                    className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all">
                    Class
                    </Link>
                </li>
                <li>
                    <Link href="/admin/dashboard/test"
                    className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all">
                    Test
                    </Link>
                </li>
                </ul>
            </div>
            <div className="mt-4">
                <h6 className="text-blue-600 text-sm font-bold px-4">Actions</h6>
                <ul className="mt-2">
                <li>
                    <a href="javascript:void(0)"
                    className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all">
                    Profile
                    </a>
                </li>
                <li>
                    <Link href="/login" onClick={handleLogout}
                    className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all">
                    Logout
                    </Link>
                </li>
                </ul>
            </div>
        </nav>
    )
}