
interface SignupResponse {
  success: boolean;
  message: string;
}
interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
}
export async function Signup(name: string, email: string, password: string, class_user: string): Promise<SignupResponse> {
  const url = 'https://46572290-9c8d-4920-9040-dc6e13a21dc5.us-east-1.cloud.genez.io/api/v1/auth/register';
  try {
    const response = await fetch(url, {
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
      console.error('Signup error:', error.message);
      throw new Error(error.message);
    }
    // Trường hợp lỗi không rõ ràng
    throw new Error('An unexpected error occurred');
  }
}
export async function Login(email: string, password: string): Promise<LoginResponse> {
  const url = 'https://46572290-9c8d-4920-9040-dc6e13a21dc5.us-east-1.cloud.genez.io/api/v1/auth/login';
  try {
    const response = await fetch(url, {
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
