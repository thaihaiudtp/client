import Cookies from "js-cookie";
const token = Cookies.get('token');
const url = "https://c15c7662-ad85-4a34-9170-43f42728a191.us-east-1.cloud.genez.io"
interface GetUsersResponse {
    success: boolean;
    message: string;
    data: [],
}
interface GetClassResponse {
    success: boolean;
    message: string;
    data: [],
}
interface CreateClassResponse {
    success: boolean;
    message: string;
}
export async function GetAllUser(){
    try {
        const response = await fetch(`${url}/api/v1/admin/show-users`/*'http://localhost:7021/api/v1/admin/show-users''https://46572290-9c8d-4920-9040-dc6e13a21dc5.us-east-1.cloud.genez.io/api/v1/admin/show-users'*/,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }, 
            }
        );
        const data: GetUsersResponse = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        if (!data.success) {
            throw new Error(data.message || 'Unknown error occurred');
        }
        return data;
    } catch (error) {
        if (error instanceof Error) {
            //console.error('Signup error:', error.message);
            throw new Error(error.message);
        }
          // Trường hợp lỗi không rõ ràng
        throw new Error('An unexpected error occurred');
    }
}
export async function CreateClass(className: string) {
    try {
        const response = await fetch(`${url}/api/v1/admin/create-class`, 
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ class_name: className })
            }
        );
        const data: CreateClassResponse = await response.json();
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
        throw new Error('An unexpected error occurred');
    }
}

    
export async function GetAllClass() {
    try {
        const response = await fetch(`${url}/api/v1/admin/all-class`/*'http://localhost:7021/api/v1/admin/all-class''https://46572290-9c8d-4920-9040-dc6e13a21dc5.us-east-1.cloud.genez.io/api/v1/student/all-class'*/,
            {
                method: 'GET',    
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        const data: GetClassResponse = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        if (!data.success) {
            throw new Error(data.message || 'Unknown error occurred');
        }
        return data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    }
}