const BASE_URL = import.meta.env.VITE_DATABASE_API_URL; 
// Hämtar recensioner baserat på användarens ID
export const getReviewsByUserId = async (userId: string) => {

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Du måste vara inloggad för att hämta användarrecensioner');
  }

  try {
    // gör ett api anrop för att hämta recensioner för användaren baserat på userId
    const response = await fetch(`${BASE_URL}/review/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Skickar med token i headern för autentisering
      },
    });

    if (!response.ok) {
      throw new Error(`Fel vid hämtning av recensioner för användar-ID: ${response.statusText}`);
    }

    // konvertera svaret till JSON och returnera det
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fel vid hämtning av recensioner för användar-ID:', error);
    throw error; 
  }
};

