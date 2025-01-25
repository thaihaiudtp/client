'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserPage from '@/components/userPage';
import AdminPage from '@/components/adminPage';
import Header from "@/app/header";
import SidebarAdminPage from "@/app/sidebar";
import Cookies from 'js-cookie';
const HomePage = () => {
  const [role, setRole] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const storedRole = Cookies.get('role');

    if (!token) {
      router.push('/login');
      return;
    }

    if (storedRole) {
      setRole(parseInt(storedRole, 10));
    }
  }, [router]);

  if (role === null) {
    return <p>Loading...</p>;
  }

  return role === 1 ? <><SidebarAdminPage/> <AdminPage /></> : <><Header/> <UserPage/></>;
};

export default HomePage;
