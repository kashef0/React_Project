import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import usePut from '../hooks/usePut';
import useDelete from '../hooks/useDelete';
import { deleteReview, updateReview } from '../store/slices/reviewSlice';
import { Review } from '../types/reviewType';
import ReviewStar from './ReviewStar';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {

  const { user } = useSelector((state: RootState) => state.auth);
  const { reviewLoading } = useSelector((state: RootState) => state.reviews);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editedReviewText, setEditedReviewText] = useState('');
  const [editedRating, setEditedRating] = useState(5);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_DATABASE_API_URL; 
  
  const { updateData } = usePut<Review>(`${BASE_URL}/review`);
  const { deleteData } = useDelete<Review>(`${BASE_URL}/review`);
  
  // Hantera redigering av en recension
  const handleEdit = (review: Review) => {
    setEditingReviewId(review._id);
    setEditedReviewText(review.reviewText);
    setEditedRating(review.rating);
  };
  
  let existingReview;
  // Spara ändringar i recensionen
  const handleSave = async (id: string) => {
    try {
      existingReview = reviews.find((r) => r._id === id);
      if (!existingReview) {
        console.error('Recensionen hittades inte');
        return;
      }
      await updateData(
        { ...existingReview, reviewText: editedReviewText, rating: editedRating, _id: id },
        `update/${id}`
      );
      dispatch(updateReview({ ...existingReview, reviewText: editedReviewText, rating: editedRating }));
      setEditingReviewId(null);
      setSuccessMessage(`Recension från ${existingReview.userId.username} har uppdaterats!`);
      alert("Recensionen har uppdaterats.");
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Fel vid uppdatering av recension:', error);
    }
  };


  // Ta bort en recension
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Är du säker på att du vill ta bort denna recension?');
    if (!confirmDelete) {
      return;
    }
    
    try {
      await deleteData(`delete/${id}`);
      dispatch(deleteReview(id));

    } catch (error) {
      console.error('Fel vid borttagning av recension:', error);
    }
  };

  if (reviewLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (reviews.length === 0) {
    return <p>Inga recensioner ännu. Bli den första att skriva en!</p>;
  } 
  
  return (
    <div className="flex flex-col ml-0 space-y-4 p-4 max-w-lg mx-auto">
      {successMessage && <div className="bg-green-500 text-white p-2 rounded-lg">{successMessage}</div>}
      {reviews.map((review) => (
        <div key={review._id} className="border p-2 rounded-lg shadow-md">
          {editingReviewId === review._id ? (
            <div className="space-y-2">
              <textarea
                value={editedReviewText}
                onChange={(e) => setEditedReviewText(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="number"
                value={editedRating}
                onChange={(e) => setEditedRating(Number(e.target.value))}
                min="1"
                max="5"
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={() => handleSave(review._id)}
                className="bg-green-500 text-white p-2 rounded-lg"
              >
                Spara
              </button>
            </div>
          ) : (
            <>
            <div>
              <p className="text-gray-700 font-lato">Recension: {review.reviewText}</p>
              <p className="text-gray-600 flex items-center">
                  Betyg: <ReviewStar star={review.rating} />
                </p>
              <p className="text-gray-500">Av: {review.userId ? review.userId.username : 'Laddar...'}</p>
              <p className="text-gray-500">
                Datum: {new Date(review.createdAt).toLocaleDateString()}
              </p>
              {user?.id === review.userId._id && (
                <div className="mt-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="bg-blue-500 text-white p-2 hover:bg-blue-700 rounded-lg mr-2 cursor-pointer"
                  >
                    Redigera
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 cursor-pointer"
                  >
                    Ta bort
                  </button>
                </div>
              )}
            </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;

