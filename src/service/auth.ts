import Cookies from "js-cookie";

interface SignupResponse {
  success: boolean;
  message: string;
}
interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  role: number;
}
interface CheckResponse {
  success: boolean;
  message: string;
  token: string;
  role: string;
}
const url = "https://c15c7662-ad85-4a34-9170-43f42728a191.us-east-1.cloud.genez.io"
export async function Signup(name: string, email: string, password: string, class_user: string): Promise<SignupResponse> {
 
  try {
    const response = await fetch(`${url}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, class_user }),
    });
    const data: SignupResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    if (!data.success) {
      throw new Error(data.message || 'Unknown error occurred');
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    // Trường hợp lỗi không rõ ràng
    throw new Error('An unexpected error occurred');
  }
}
export async function Login(email: string, password: string): Promise<LoginResponse> {
  
  try {
    const response = await fetch(`${url}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    const data: LoginResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    if (!data.success) {
      throw new Error(data.message || 'Unknown error occurred');
    }
    Cookies.set('token', data.token);
    Cookies.set('role', data.role.toString());
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    // Trường hợp lỗi không rõ ràng
    throw new Error('An unexpected error occurred');
  }
}
export async function handleLogout() {
  const response = await fetch("http://localhost:7021/api/v1/auth/logout", {
    method: "POST",
    credentials: "include",  // Gửi cookie khi logout
  });

  if (response.ok) {
    Cookies.remove('token');
    window.location.href = "/"; 
    console.log("ok")
  } else {
    console.error("Logout failed");
  }
}

export function getTokenFromCookies() {
  return Cookies.get("token");
}
export async function checkUser(){
  try {
    const res = await fetch("http://localhost:7021/api/v1/auth/me", {
      method: 'GET',
      credentials: "include", 
    });
    if (!res.ok) throw new Error("Unauthorized");
    const data: CheckResponse = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}
