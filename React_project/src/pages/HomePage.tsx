

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSearchResults } from "../store/slices/bookSlice";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { BookItem, Book, Item } from "../types/bookType";

import Pagination from "../components/Pagination";
import useGet from "../Hooks/useGet";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state: RootState) => state.books); // Hämtar sökresultat från Redux Store
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // välja antal böcker per sida
  const [query, setQuery] = useState(""); // Sökfråga för att hämta böcker
  const BOOK_URL = import.meta.env.VITE_BOOKS_API_URL;
  // Använder custom hook `useGet` för att hämta böcker från Google Books API
  const { data: bookData, error, loading } = useGet<BookItem>(
    query
      ? `${BOOK_URL}?q=${query}&startIndex=${
          (currentPage - 1) * itemsPerPage
        }&maxResults=${itemsPerPage}`
      : `${BOOK_URL}?q=category:romance&love&action&drama&startIndex=${
          (currentPage - 1) * itemsPerPage
        }&maxResults=${itemsPerPage}`,
    false
  );

  // Effekt för att uppdatera böcker i Redux Store när ny data hämtas
  useEffect(() => {
    if (bookData && bookData.items) {
      const books: Book[] = bookData.items.map((item: Item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        description: item.volumeInfo.description || "",
        image: item.volumeInfo.imageLinks?.smallThumbnail || "",
      }));
      dispatch(setSearchResults(books)); // Uppdaterar Redux Store med böckerna
    }
  }, [bookData, dispatch]);

  // Hanterar sökning genom att uppdatera query
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery); // Uppdaterar query för att trigga useGet och hämta ny data
  };
 
  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <BookList books={searchResults} />
      <Pagination
          isLoading={loading}
          totalItems={bookData.totalItems}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(newItemsPerPage) => {
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1); 
          }}
        />
    </div>
  );
};

export default HomePage;
