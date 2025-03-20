
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store'; 
import { setSelectedBook } from '../store/slices/bookSlice'; 
import BookDetail from '../components/BookDetails'; 
import ReviewList from '../components/ReviewList'; 
import ReviewForm from '../components/ReviewForm'; 
import { setReviews } from '../store/slices/reviewSlice'; 
import { Item } from '../types/bookType';
import { Review } from '../types/reviewType'; 
import useGet from '../Hooks/useGet';


const BookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>(); // hämtar bok id från url via useParams
  const { reviewLoading, reviews  } = useSelector((state: RootState) => state.reviews);
  const dispatch = useDispatch(); // initierar redux dispatch för att skicka actions
  const { selectedBook } = useSelector((state: RootState) => state.books); // hämtar den valda boken från Redux state
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth); // hämtar autentisering och användarinfo från Redux
  const BASE_URL = import.meta.env.VITE_DATABASE_API_URL; 
  const BOOK_URL = import.meta.env.VITE_BOOKS_API_URL;
  // hämta bokdata från Google Books API
  const { data: bookData, error: bookError, loading: bookLoading } = useGet<Item>(
    bookId ? `${BOOK_URL }/${bookId}` : '' // api anrop för att hämta bokdata med bok id
  , true);
  // hämta recensioner för den valda boken från API
  const { data: reviewsData } = useGet<Review[]>(
    bookId
      ? `${BASE_URL}/review/book/${bookId}` // api anrop för att hämta recensioner baserat på bok id
      : '', 
    true
  );

  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.bookId === selectedBook?.id)
    : [];

  useEffect(() => {
    const fetchBookData = async () => {
  
      try {
        if (bookId && bookData) {
          const book = { // Skapar ett bokobjekt från data från Google Books API
            id: bookData.id,
            title: bookData.volumeInfo?.title || 'Ingen titel', 
            authors: bookData.volumeInfo?.authors || [], 
            description: bookData.volumeInfo?.description || 'Ingen beskrivning', 
            image: bookData.volumeInfo?.imageLinks?.thumbnail || '', 
          };
          dispatch(setSelectedBook(book)); // Dispatchear action för att sätta vald bok i Redux
        }

        
      // Remove the call to setReviews to prevent overwriting the current state
      if (bookId && reviewsData) {
        dispatch(setReviews(reviewsData || [])); 
      }

      } catch (error) {
        console.error('Fel vid hämtning av bokdata:', error);
        
      }
      
    };

    fetchBookData(); // hämta bokdata och recensioner
  }, [bookData, bookId, reviewsData, dispatch, reviewLoading]); // Kör om någon av dessa variabler ändras
  
  // visa en spinner om boken håller på att laddas
  if (bookLoading) 
    return (
    <div className=" flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
  

  if (bookError) return <div>Fel: {bookError}</div>;
  

  if (!selectedBook) return <div>Ingen bok hittades</div>;

  return (
    
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <BookDetail /> 
  
      <h2 className="text-3xl font-bold text-gray-800 mt-8 border-b pb-2">Recensioner</h2> 
      <div className="mt-4">
        <ReviewList reviews={filteredReviews}/> 
      </div>
      {!user && <p> Vänligen <Link to="/login" className="decoration-blue-900 underline link-text-color">logga in</Link> för att skicka en recension.</p>} 
    
      {isAuthenticated && (
        <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Skriv en recension</h3> 
          <ReviewForm bookId={bookId!} /> 
        </div>
      )}
    </div>
  );
};

export default BookPage;  
