import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../hooks/authHook";
import { loginSuccess, registerSuccess } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

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
  // Hanterar formulären s submit händelse
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(""); // Reset error message
    setSuccess(""); // Reset success message

    if (!email || !password || (!isLogin && !username)) {
      setError("Vänligen fyll i alla fält");
      return;
    }

    try {
      if (isLogin) {
        const { user, token } = await loginUser({ email, password }); // Anropa loginUser funktionen
        localStorage.setItem("token", token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("Email", user.email);
        dispatch(loginSuccess(user)); //  skicka action för att uppdatera Redux store med användaren
        navigate('/')
      } else {
        const user = await registerUser({ username, email, password }); // Anropa registerUser funktionen
        dispatch(registerSuccess(user)); // Skicka action för att uppdatera Redux store med den registrerade användaren
        setSuccess("Ditt konto har skapats framgångsrikt!");
      }
    } catch (err: any) {
      setError(err.message);
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
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 curser-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
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
