import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

// definierar typ för komponentens props
interface ProtectedRouteProps {
  children: ReactNode; 
}

// skyddad route komponent som bara tillåter åtkomst för autentiserade användare
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  // hämtar isAuthenticated från Redux store för att se om användaren är inloggad
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Om användaren är autentiserad, renderas barnkomponenterna (children)
  // Annars, omdirigeras användaren till login sidan
  return <>{isAuthenticated ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;