export async function Signup(name: string, email: string, password: string, class_user: string) {
  const response = await fetch('https://46572290-9c8d-4920-9040-dc6e13a21dc5.us-east-1.cloud.genez.io/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({ name, email, password, class_user }),
  });
  const data = await response.json();
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
  }
  return data;
}
