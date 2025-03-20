
import { User } from '../types/authType'; 

const BASE_URL = import.meta.env.VITE_DATABASE_API_URL; 

const token = localStorage.getItem('token'); 

// funktion för att hämta användardata baserat på användarens id
export const getUserById = async (userId: string): Promise<User> => {
  if (!token) { 
    throw new Error('No authentication token found. Please log in.');
  }

  try {
    const response = await fetch(`${BASE_URL}/user/${userId}`, { // hämtar användardata från servern
      headers: {
        Authorization: `Bearer ${token}`, // skickar med token i headern för autentisering
      },
    });

    if (!response.ok) { 
      const errorData = await response.json(); 
      throw new Error(errorData.message || "kunde inte hitta user"); 
    }
    const data = await response.json(); // Hämtar användardata från svar
    return data; // Returnerar användardata

  } catch (error) {
    console.error(error); 
    throw new Error('ett fel inträffades.... försök igen.'); 
  }
};

// registrera en ny användare
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, { // skickar registreringsdata till servern
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(userData), 
    });

    if (!response.ok) { 
      const errorData = await response.json(); 
      throw new Error(errorData.message || 'registering misslyckades...'); 
    }

    const data = await response.json(); 
    return data.user; // returnerar användardatan som skapades vid registrering
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error("E-postadressen används redan.");
    }
    throw new Error('Något gick fel vid registreringen. Försök igen.'); 
  }
};

// logga in en användare
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<{ user: User; token: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/user/signin`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) { 
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login misslyckades...'); 
    }

    const data = await response.json(); 
    return data; // returnerar användardata och token vid lyckad inloggning
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      throw new Error("E-post eller lösenord är felaktigt. Försök igen.");
    }
    throw new Error('Ett fel inträffade vid inloggning. Försök igen senare.');
  }
};

