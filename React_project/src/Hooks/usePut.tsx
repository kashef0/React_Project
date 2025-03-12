import { useState } from "react";

// hook för att hantera borttagning förfrågningar
export default function usePut<T extends { _id: string }>(url: string) : {
    data: T | null,                
    error: string | null,    
    loading: boolean,         
    updateData: ( updatedData: T, updateId: string) => Promise<void> 
} {

    // State för data, error och loading
    const [data, setData] = useState<T | null>(null);      
    const [error, setError] = useState<string | null>(null);  
    const [loading, setLoading] = useState<boolean>(false);

    // funktion för att radera item baserat på id
    const updateData = async (updatedData: T, updateId: string) => {
        setLoading(true); 
        
        // kontrollera om ett id skickas med
        const itemToUpdate = updateId;
        if (!itemToUpdate) throw new Error("Ingen ID angiven för borttagning");

        try {
            // hämtar token från localStorage 
            const token = localStorage.getItem("token");

            // skickar ta bort förfrågan till servern
            const responseData = await fetch(`${url}/${updateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',  
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData),  
            });

            if (!responseData.ok) {
                throw new Error('Misslyckades att ta bort item..');
            }
            const data = await responseData.json();
            setData(data);
            setError(null);  // Rensar felmeddelandet om borttagningen lyckas

        } catch (error) {
            console.error(error); 
            setError('Misslyckades att ta bort item..');  
        } finally {
            setLoading(false); 
        }
    };

    // returnerar data, error, loading och updateData funktionen
    return {data, error, loading, updateData};
}