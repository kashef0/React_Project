import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setReviews } from '../store/slices/reviewSlice';
import { getReviewsByUserId } from '../hooks/reviewHook';
import ReviewList from '../components/ReviewList';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  // Hämtar användarens recensioner från Redux Store

  // Hämta användarens recensioner när komponenten laddas eller när användaren ändras
  useEffect(() => {
    const fetchUserReviews = async () => {
      if (user) {
        try {
          const fetchedData = await getReviewsByUserId(user.id); // Anropar API för att hämta recensioner
          console.log('Fetched Reviews:', fetchedData); // Logga hämtad data för felsökning
          dispatch(setReviews(fetchedData.reviews)); // Uppdatera Redux Store med recensioner
        } catch (error) {
          console.error('Error fetching user reviews:', error); // Logga eventuella fel
        }
      }
    };

    fetchUserReviews();
  }, [user, dispatch]); // Kör effekten vid förändring av 'user' eller 'dispatch'

  // Om ingen användare är inloggad, visa meddelande
  if (!user) {
    return <div>Vänligen logga in för att se din profil.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">Profil</h1>
      
      <div className="space-y-2">
        {/* Visar användarnamn och e-post */}
        <p className="text-lg text-gray-700"><span className="font-semibold">Användarens namn:</span> {user.username}</p>
        <p className="text-lg text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-6 border-b pb-2">Dina recensioner</h2>
      
      <div className="mt-4">
        {/* Visar listan med recensioner */}
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default ProfilePage;
