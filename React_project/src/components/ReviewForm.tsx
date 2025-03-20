import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, setReviewLoading } from '../store/slices/reviewSlice';
import { RootState } from '../store/store';
import { CreateReview, Review } from '../types/reviewType';
import usePost from '../Hooks/usepost';


interface ReviewFormProps {
  bookId: string;
  
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const BASE_URL = import.meta.env.VITE_DATABASE_API_URL; 
  // Använd usePost hooken för att hantera POST förfrågningar
  const { postData, loading: postLoading, error: postError } = usePost<CreateReview>(`${BASE_URL}/review/create`);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // kontrollera om den aktuella användaren har recenserat den aktuella boken
    const existingReview = reviews.find(
      (review) => review.bookId === bookId && review.userId._id === user?.id
      );
  
    // Kontrollera om användaren är inloggad
    if (!isAuthenticated || !user) {
      setError('Du måste vara inloggad för att skicka en recension.');
      return;
    }

    if (existingReview) {
      setError('Du har redan lämnat en recension för den här boken.');
      return;
    }

    // Kontrollera om recensionstexten inte är tom
    if (!reviewText.trim()) {
      setError('Recensionen kan inte vara tom.');
      return;
    }

    // Kontrollera om betyget är mellan 1 och 5
    if (rating < 1 || rating > 5) {
      setError('Betyget måste vara mellan 1 och 5.');
      return;
    }

    setLoading(true);
    const review: CreateReview = {
      bookId,
      userId: user,
      reviewText,
      rating,
    };

    try {
      // Skicka POST förfrågningen med hjälp av postData
      const createdReview = await postData(review);
      dispatch(setReviewLoading(true)); 
      if (createdReview) {
        dispatch(addReview(createdReview as Review));
        dispatch(setReviewLoading(true)); 
        setReviewText('');
        setRating(5);
        setError('');
        setSuccessMessage('Din recension skickades framgångsrikt!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
      setError(postError || 'Det gick inte att skicka recensionen. Försök igen.');
      dispatch(setReviewLoading(false)); 
    } finally {
      setLoading(false);
    }
    
  };
  

  if (!isAuthenticated) {
    return <p>Vänligen logga in för att skicka en recension.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ml-0 space-y-4 p-4 max-w-lg mx-auto">
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Skriv din recension..."
        aria-label="Recensionstext"
        className="w-full p-2 border rounded-lg"
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min="1"
        max="5"
        aria-label="Betyg"
        className="w-full p-2 border rounded-lg"
      />
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <button
        type="submit"
        disabled={loading || postLoading}
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 cursor-pointer"
      >
        {loading || postLoading ? 'Skickar...' : 'Skicka'}
      </button>
    </form>
  );
};

export default ReviewForm;
