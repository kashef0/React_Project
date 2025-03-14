import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface Props {
  star: number; // Rating out of 5
}

const ReviewStar: React.FC<Props> = ({ star }) => {
  const renderStars = () => {
    const stars = [];

    // Loop through to create the stars
    for (let i = 0; i < 5; i++) {
      if (i < star) {
        // Filled star (yellow)
        stars.push(
          <FaStar key={i} className="text-yellow-500" />
        );
      } else {
        // Empty star (gray)
        stars.push(
          <FaRegStar key={i} className="text-gray-300" />
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex space-x-1">
      {renderStars()}
    </div>
  );
};

export default ReviewStar;
