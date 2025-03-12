import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../hooks/authHook';
import { loginSuccess } from '../store/slices/authSlice';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch(); // Redux dispatch funktion för att skicka åtgärder
  const navigate = useNavigate(); // Hook för att navigera mellan sidor
  
  // State för att lagra användarinmatning och felmeddelanden
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Förhindrar sidomladdning vid formulärinlämning
    
    if (!email || !password) {
      setError('Please fill all fields'); // Kontroll om fälten är ifyllda
      return;
    }

    try {
      const { user, token } = await loginUser({ email, password }); // Anropar login funktionen
      
      // Sparar användardata i localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user.id);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email)
      
      dispatch(loginSuccess(user)); // Uppdaterar Redux store med inloggad användare
      navigate('/'); // Navigerar till startsidan efter lyckad inloggning
    } catch (err: any) {
      setError(err.message); // Hanterar fel och visar felmeddelande
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Logga in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">E-post</label>
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
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Lösenord</label>
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
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            Logga in
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Har du inget konto? 
            <a href="/register" className="text-blue-500 hover:text-blue-600">Skapa konto</a>
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default LoginPage;


