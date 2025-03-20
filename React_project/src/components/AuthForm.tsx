import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { loginSuccess, registerSuccess } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import usePost from "../Hooks/usepost";

interface AuthFormProps {
  isLogin: boolean; // kolla om formuläret är för inloggning eller registrering
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const dispatch = useDispatch(); // Skapar dispatch funktion för att skicka actions till Redux
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // hanterar felmeddelanden
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_DATABASE_API_URL;

  // Använd usePost hook för att hantera inloggning och registrera POST förfrågningar
  const { postData, error: postError } = usePost<any>(
    isLogin ? `${BASE_URL}/user/signin` : `${BASE_URL}/user/signup`
  );
  // Hanterar formulären och submit händelse
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");
    setSuccess(""); 
    
    if (!email || !password || (!isLogin && !username)) {
      setError("Vänligen fyll i alla fält");
      return;
    }
   
  
    try {
      let response;
  
      if (isLogin) {
        response = await postData({ email, password }); // Post loginnig data
      } else {
        response = await postData({ username, email, password }); // Post registrating data
      }
      if (!response) {
        setError(postError || "Kunde inte hämta data.");
        return;
      }
      if (response && isLogin) {
        const { user, token } = response;
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        dispatch(loginSuccess(user)); 
        navigate("/"); 
  
      }
  
      if (!isLogin && response) {
        const { user } = response;
        dispatch(registerSuccess(user));
        setSuccess("Kontot har skapats framgångsrikt! Logga in nu.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      
    } catch (err: any) {
        setError(err.message || "Kunde inte hämta data.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Logga in" : "Skapa konto"}
        </h1>
        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
         
          {!isLogin && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700"
              >
                Användarnamn
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Välj ett användarnamn"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              E-post
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ange din e-postadress"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Lösenord
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ange ditt lösenord"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          
          {error && <p className="text-red-500 text-sm">{error}</p>}

          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLogin ? "Logga in" : "Skapa konto"}
          </button>
        </form>

        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            {isLogin ? "Har du inget konto?" : "Har du redan ett konto?"}{" "}
            <a
              href={isLogin ? "/register" : "/login"}
              className="text-blue-500 hover:text-blue-600"
            >
              {isLogin ? "Skapa konto" : "Logga in"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
