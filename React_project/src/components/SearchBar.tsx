import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void; 
}

// SearchBa komponenten
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState(""); 
  // Hanterar formulärinlämning
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    onSearch(query); // Anropar onSearch funktionen som skickades som aktuella sökfrågan
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Söka efter böcker..."
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          Söka
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
