import { ProfessorTokenVerifyRoute } from "./APIRoutes";

export const CheckProfessorLogin = async() => {
  const professor = JSON.parse(localStorage.getItem('professor'));
  
  if (!professor || !professor.token) {
    return false;
  }

  try {
    const response = await fetch(ProfessorTokenVerifyRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${professor.token}`,
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

