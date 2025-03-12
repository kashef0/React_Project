import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookState } from '../../types/bookType'; 

// initialt för bokrelaterad state
const initialState: BookState = {
  searchResults: [], // initialt tom lista för sökresultat
  selectedBook: null, // initialt ingen bok vald
};

// Skapa en slice för att hantera bokdata
const bookSlice = createSlice({
  name: 'books', // Namnet på slice 
  initialState, // Sätter det initiala
  reducers: {
    // reducer för att sätta sökresultat i state
    setSearchResults: (state, action: PayloadAction<Book[]>) => {
      state.searchResults = action.payload; // Uppdatera sökresultaten med payload
    },
    // Reducer för att sätta den valda boken i state
    setSelectedBook: (state, action: PayloadAction<Book>) => {
      state.selectedBook = action.payload; // Uppdatera den valda boken med payload 
    },
  },
});


export const { setSearchResults, setSelectedBook } = bookSlice.actions;

// Exportera reducer för användning i store
export default bookSlice.reducer;
