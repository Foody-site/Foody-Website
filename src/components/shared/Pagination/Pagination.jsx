import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


export function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 flex items-center justify-center rounded-md bg-white border border-gray-300 text-primary-1 hover:bg-primary-1 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaArrowLeft size={16} />
      </button>
    );

    // First page if not in view
    if (currentPage > 2) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="w-12 h-12 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          01
        </button>
      );
    }

    // Dots before current page
    if (currentPage > 3) {
      pages.push(<span key="dots1" className="px-2">...</span>);
    }

    // Previous page
    if (currentPage > 1) {
      pages.push(
        <button
          key={currentPage - 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-12 h-12 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          {String(currentPage - 1).padStart(2, "0")}
        </button>
      );
    }

    // Current page
    pages.push(
      <button
        key={currentPage}
        className="w-12 h-12 flex items-center justify-center rounded-md bg-red-600 border border-red-600 text-white"
      >
        {String(currentPage).padStart(2, "0")}
      </button>
    );

    // Next page
    if (currentPage < totalPages) {
      pages.push(
        <button
          key={currentPage + 1}
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-12 h-12 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          {String(currentPage + 1).padStart(2, "0")}
        </button>
      );
    }

    // Dots after current page
    if (currentPage < totalPages - 2) {
      pages.push(<span key="dots2" className="px-2">...</span>);
    }

    // Last page if not in view
    if (currentPage < totalPages - 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="w-12 h-12 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          {String(totalPages).padStart(2, "0")}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-12 flex items-center justify-center rounded-md bg-white border border-gray-300 text-primary-1 hover:bg-primary-1 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaArrowRight size={16} />
      </button>
    );

    return pages;
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-1">
        {renderPageNumbers()}
      </div>
    </div>
  );
}

