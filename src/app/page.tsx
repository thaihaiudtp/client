'use client'
import { useEffect, useState } from 'react';
import UserPage from '@/components/userPage';
import AdminPage from '@/components/adminPage';
import Header from "@/app/header";
import SidebarAdminPage from "@/app/sidebar";
import Cookies from 'js-cookie';
import { getTokenFromCookies } from '@/service/auth';
import { useRouter } from 'next/navigation';
const HomePage = () => {
  const [role, setRole] = useState<number | null>(null);
  const token = getTokenFromCookies();
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if(!token){
      router.push('/login')
    }
    const storedRole = Cookies.get('role');
    if (storedRole) {
      setRole(parseInt(storedRole, 10));
      setLoading(false)
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return role === 1 ? <><SidebarAdminPage/> <AdminPage /></> : <><Header/> <UserPage/></>;
};

export default HomePage;
