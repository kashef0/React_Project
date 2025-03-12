import { useEffect, useState } from "react";

// hook för att hantera post förfrågningar
export default function usePost<T>(url: string) : {
    data: T | null,                  // hämtade datan
    error: string | null,     // felmeddelande
    loading: boolean,         // Indikerar om förfrågan är pågående
    postData: (req: T) => Promise<T | null>  //  skicka post förfrågan
} {

    // State för data, error och loading
    const [data, setData] = useState<T>([] as T);    
    const [error, setError] = useState<string | null>(null);  
    const [loading, setLoading] = useState<boolean>(false);

    //trigga postData när url ändras
    useEffect(() => {
        postData(data);  // Skickar post förfrågan med data
    }, [url]);

    // skicka post förfrågan
    const postData = async (req: T) => {
        setLoading(true); 

        try {
            const token = localStorage.getItem("token");  // Hämta token
            const response = await fetch(url, {
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json',   
                    'Authorization': `Bearer ${token}`,   
                },
                body: JSON.stringify(req),  
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText); 
            }

            const responseData = await response.json();  // Spara data
            setData(responseData);
            return responseData;
        } catch (error) {
            console.error("Fel:", error);  
            setError("Kunde inte hämta data.");
            return null;
        } finally {
            setLoading(false);  
        }
    };

    // Returnera alla data och funktioner
    return {data, error, loading, postData};
}
