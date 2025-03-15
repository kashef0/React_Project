import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';



const BookDetailPage: React.FC = () => {
  const { selectedBook } = useSelector((state: RootState) => state.books);

  if (!selectedBook) {
    return <div>ingen bok valde...</div>;
  }
  return (
    <div className="max-w-2xl p-6 bg-white shadow-lg rounded-2xl">
  {selectedBook?.image && (
    <img
      src={selectedBook.image}
      alt={selectedBook.title}
      className="w-50 h-64 object-cover rounded-xl mb-4"
    />
  )}
  <h1 className="text-2xl font-bold text-gray-800">{selectedBook?.title}</h1>
  {selectedBook?.authors && (
    <p className="text-gray-600 text-lg mt-2">By <span className="font-semibold">{selectedBook.authors.join(', ')}</span></p>
  )}
  {selectedBook?.description && (
        <p className="text-gray-700 mt-4 leading-relaxed" 
          dangerouslySetInnerHTML={{ __html: selectedBook.description }} />
      )}
</div>

  );
};

export default BookDetailPage;
