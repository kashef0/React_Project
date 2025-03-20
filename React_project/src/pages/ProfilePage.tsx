import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setReviews } from "../store/slices/reviewSlice";
import ReviewList from "../components/ReviewList";
import useGet from "../Hooks/useGet";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const BASE_URL = import.meta.env.VITE_DATABASE_API_URL;

  const { data, error, loading } = useGet<{ reviews: any[] }>(
    `${BASE_URL}/review/user/`,
    !!user, // Uppdatera när användaren ändras
    user?.id // Skicka userid om tillgängligt
  );
  // Hämta användarens recensioner när komponenten laddas eller när användaren ändras
  useEffect(() => {
    if (data?.reviews) {
      dispatch(setReviews(data.reviews)); // Skicka recensionsdata till Redux
    }
  }, [data, dispatch]);

  if (!user) {
    return <div>Vänligen logga in för att se din profil.</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div>Fel vid hämtning av recensioner: {error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
        Profil
      </h1>

      <div className="space-y-2">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Användarens namn:</span>{" "}
          {user.username}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-6 border-b pb-2">
        Dina recensioner
      </h2>

      <div className="mt-4">
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default ProfilePage;
