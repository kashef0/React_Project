import React from "react";

interface PaginationProps {
  totalItems: number; 
  currentPage: number; 
  itemsPerPage: number; 
  onPageChange: (page: number) => void; // Funktion för att ändra sida
  onItemsPerPageChange: (itemsPerPage: number) => void; // Funktion för att ändra antal böcker per sida
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Beräknar totala sidor baserat på antal böcker per sida
  const options = [5, 10, 15, 20, 25]; // Alternativ för antal objekt per sida

  const pageNumbers = [];
  // Skapar en array med sidnummer
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">Böcker per sida:</label> {/* Text för "Items per page" */}
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-1"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} 
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-700">
        Visar <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> till{" "}
        <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> av{" "}
        <span className="font-medium">{totalItems}</span> resultat 
      </div>

      <nav className="flex space-x-2">
        <button
          disabled={currentPage === 1} 
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded-md text-gray-700 bg-gray-100 disabled:opacity-50"
        >
          Föregående 
        </button>

        <select
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="px-3 py-1 border rounded-md"
        >
          {pageNumbers.map((page) => (
            <option key={page} value={page}>
              Sida {page} 
            </option>
          ))}
        </select>

        <button
          disabled={currentPage === totalPages} 
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded-md text-gray-700 bg-gray-100 disabled:opacity-50"
        >
          Nästa 
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
