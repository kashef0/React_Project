import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store/store';

const LogoutButton = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth); // Hämtar information om användarens autentisering från Redux store
  const dispatch = useDispatch(); // Skapar en dispatch funktion för att skicka actioner till Redux store
  const navigate = useNavigate(); 

  // Hanterar utloggning
  const handleLogout = () => {
    dispatch(logout()); // skickar logout action till Redux för att logga ut användaren

    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    localStorage.removeItem("username"); 
    localStorage.removeItem("Email"); 

    navigate("/login"); 
  }

  return (
    <button onClick={handleLogout} className='cursor-pointer'>
        {isAuthenticated ? "Logga ut" : "Logga in"}
    </button>
  )
}

export default LogoutButton