import { configureStore } from '@reduxjs/toolkit'; 
import authReducer from './slices/authSlice'; 
import bookReducer from './slices/bookSlice'; 
import reviewReducer from './slices/reviewSlice'; 

// skapar Redux store med reducer funktioner för autentisering, böcker och recensioner
export const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer för autentisering
    books: bookReducer, // Reducer för böcker
    reviews: reviewReducer, // Reducer för recensioner
  },
});

// exporterar RootState för att definiera typen av applikationens globalt
export type RootState = ReturnType<typeof store.getState>; 


export type AppDispatch = typeof store.dispatch;
