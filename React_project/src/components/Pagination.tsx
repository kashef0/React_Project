import React from "react";

interface PaginationProps {
  isLoading: boolean;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void; // Funktion för att ändra sida

  onItemsPerPageChange: (itemsPerPage: number) => void; // Funktion för att ändra antal böcker per sida
}

const Pagination: React.FC<PaginationProps> = ({
  isLoading,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Beräknar totala sidor baserat på antal böcker per sida
  const options = [5, 10, 15, 20, 25]; // Alternativ för antal objekt per sida

  const PageNumbers = () => {
    const pages = [];

    const maxVisiblePages = 4 / 2; // Antal synliga sidor
    // visa alltid först sida
    pages.push(1);

    // Beräkna början och slutet
    const start = Math.max(2, currentPage - maxVisiblePages);
    const end = Math.min(totalPages - 1, currentPage);
    console.log(start);
    // lägg punkter om fönstret inte startar från den andra sidan
    if (start > 1) {
      pages.push("...");
    }

    // lägg till sidorna i det skjutbara fönstret
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Visa alltid sista sidan
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">
          Böcker per sida:
        </label>
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
        Visar{" "}
        <span className="font-medium">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        till{" "}
        <span className="font-medium">
          {isNaN(Math.min(currentPage * itemsPerPage, totalItems))
            ? "laddar..."
            : Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        av <span className="font-medium">{totalItems}</span> resultat
      </div>

      {isLoading && (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-700">
            Laddar... Vänligen vänta...
          </span>
        </div>
      )}

      <nav className="flex flex-wrap sm:flex-nowrap space-x-2 ">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-3 py-1 border rounded-md text-gray-700 bg-gray-100 disabled:opacity-50 ${
            Number(currentPage) <= 1
              ? "cursor-not-allowed"
              : "hover:bg-gray-200 duration-300 cursor-pointer "
          }`}
        >
          Föregående
        </button>

        {PageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-1 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              disabled={Number(page) > currentPage}
              className={`px-3 py-1 border rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : Number(page) > currentPage
                  ? "opacity-20 cursor-not-allowed text-grey-100"
                  : "text-gray-700 bg-gray-100 cursor-pointer hover:bg-gray-200 duration-300"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded-md text-gray-700 bg-gray-100 disabled:opacity-50 cursor-pointer hover:bg-gray-200 duration-300"
        >
          Nästa
        </button>
      </nav>
    </div>
  );
};
export default Pagination;
