import { StudentTokenVerifyRoute } from "./APIRoutes";

export const CheckLogin = async() => {
  const student = JSON.parse(localStorage.getItem('student'));
  
  if (!student || !student.token) {
    return false;
  }

  try {
    const response = await fetch(StudentTokenVerifyRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${student.token}`,
      },
    });

    console.log(response);

    if (response.status === 200) {
      return true;
    } else {
      console.error('Failed to verify login:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Invalid token:', error.message);
    return false;
  }
}

