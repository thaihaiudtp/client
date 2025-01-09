import Cookies from "js-cookie";
const token = Cookies.get('token');
interface GetUsersResponse {
    success: boolean;
    message: string;
    data: [],
  }
export async function GetAllUser(){
    try {
        const response = await fetch('https://46572290-9c8d-4920-9040-dc6e13a21dc5.us-east-1.cloud.genez.io/api/v1/admin/show-users',
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
            console.error('Signup error:', error.message);
            throw new Error(error.message);
        }
          // Trường hợp lỗi không rõ ràng
        throw new Error('An unexpected error occurred');
    }
}