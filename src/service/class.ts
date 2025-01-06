export async function GetAllClass() {
    try {
        const response = await fetch('https://46572290-9c8d-4920-9040-dc6e13a21dc5.us-east-1.cloud.genez.io/api/v1/student/all-class',
            {
                method: 'GET',    
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra";
        throw new Error(errorMessage);
    }
}