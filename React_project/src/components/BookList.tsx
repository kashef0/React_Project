

import React from 'react';
import { Book } from '../types/bookType';
import { Link } from 'react-router-dom';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  if (books.length === 0) return <p>Inga böcker hittades....</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {books
      .filter((book) => book.image && book.description)
      .map((book) => (
        <div
          key={book.id}
          className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          <Link to={`/book/${book.id}`} className="block">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
  
            {book.image && (
              <img
                className="w-50 h-64 object-cover rounded-lg shadow-md drop-shadow-xl"
                src={book.image}
                alt={book.title}
              />
            )}
  
            {book.authors && (
              <p className="text-gray-600 mt-2 text-sm">By {book.authors.join(', ')}</p>
            )}
  
            {book.description && (
              <p className="text-gray-700 mt-2 text-sm">
                {book.description.substring(0, 150)}...
                <span className="text-red-500 underline ml-1">Läs mer</span>
              </p>
            )}
          </Link>
        </div>
      ))}
  </div>
  
  );
};

export default BookList;

