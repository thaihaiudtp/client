import { OneTestItem } from "@/app/admin/test/[id]/page";
import Cookies from "js-cookie";
const token = Cookies.get('token');
const url = "https://c15c7662-ad85-4a34-9170-43f42728a191.us-east-1.cloud.genez.io"
interface GetUsersResponse {
    success: boolean;
    message: string;
    data: [],
}
interface GetTestsResponse {
    success: boolean;
    message: string;
    data: [],
}
interface GetTestResponse {
    success: boolean;
    message: string;
    data: OneTestItem,
}
interface GetClassResponse {
    success: boolean;
    message: string;
    data: [],
}
interface CreateResponse {
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
export async function GetAllTest(){
    try {
        const response = await fetch(`${url}/api/v1/admin/show-tests`/*'http://localhost:7021/api/v1/admin/show-users''https://46572290-9c8d-4920-9040-dc6e13a21dc5.us-east-1.cloud.genez.io/api/v1/admin/show-users'*/,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }, 
            }
        );
        const data: GetTestsResponse = await response.json();
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
        const data: CreateResponse = await response.json();
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
export async function CreateTest(name_test: string, description_test: string, diffcult_test: string, duration: number) {
    try {
        const response = await fetch(`${url}/api/v1/admin/create-test`, 
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name_test: name_test, description_test: description_test, diffcult_test: diffcult_test, duration: duration })
            }
        );
        const data: CreateResponse = await response.json();
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
    
export async function GetAllClass(testId: string) {
    try {
        const response = await fetch(`http://localhost:7021/api/v1/admin/all-class/${testId}`/*'https://46572290-9c8d-4920-9040-dc6e13a21dc5.us-east-1.cloud.genez.io/api/v1/student/all-class'*/,
            {
                method: 'GET',    
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
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
export async function GetOneTest(testId: string) {
    try {
        const response = await fetch(`${url}/api/v1/admin/showOneTest/${testId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const data: GetTestResponse = await response.json();
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

export async function CreateQuestion(question_name: string, answer_a: string, answer_b: string, answer_c: string, answer_d: string, correct_answer: string, testId: string) {
    try {
        const response = await fetch(`${url}/api/v1/admin/${testId}/create-question`, 
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({question_name: question_name, answer_a: answer_a, answer_b: answer_b, answer_c: answer_c, answer_d: answer_d, correct_answer: correct_answer})
            }
        );
        const data: CreateResponse = await response.json();
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
export async function ActiveTest(status_test: number, testId: string) {
    try {
        const response = await fetch(`${url}/api/v1/admin/${testId}/active-test`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({status_test: status_test})
        });
        const data: CreateResponse = await response.json();
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

export async function AddTestToClass(class_id: string, testId: string) {
    try {
        const response = await fetch(`${url}/api/v1/admin/${testId}/add-test`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({class_id: class_id})
        });
        const data: CreateResponse = await response.json(); 
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        if (!data.success) {
            throw new Error(data.message || 'Unknown error occurred');
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    }
}