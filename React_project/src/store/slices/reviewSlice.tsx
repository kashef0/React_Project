import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { Review } from '../../types/reviewType'; 


interface ReviewState {
  reviews: Review[]; // En array av recensioner
  reviewLoading: boolean;
}


const initialState: ReviewState = {
  reviews: [], // Initialt ingen recension i listan
  reviewLoading: false,
};

// skapa en slice för recensioner
const reviewSlice = createSlice({
  name: 'reviews', 
  initialState, 
  reducers: {
    // reducer för att sätta recensioner i state
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload; // uppdatera recensionerna med payload
      state.reviewLoading = false;
    },
    // reducer för att lägga till en ny recension
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload); // Lägg till recensionen i listan
      state.reviewLoading = false;
    },
    // reducer för att uppdatera en befintlig recension
    updateReview: (state, action: PayloadAction<Review>) => {
      const index = state.reviews.findIndex((r) => r._id === action.payload._id); // Hitta index för den recension som ska uppdateras
      if (index !== -1) {
        state.reviews[index] = action.payload; // Uppdatera recensionen om den hittades
      }
    },
    // reducer för att ta bort en recension
    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter((r) => r._id !== action.payload); // Filtrera bort recensionen med det specifika id
    },
    setReviewLoading: (state, action: PayloadAction<boolean>) => {
      state.reviewLoading = action.payload;
    },
  },
});


export const { setReviews, addReview, updateReview, deleteReview, setReviewLoading } = reviewSlice.actions;


export default reviewSlice.reducer;
