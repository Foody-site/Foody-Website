import { useState } from 'react';

const sponsors = Array(23).fill("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80");

const Sponsors = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(sponsors.length / itemsPerPage);

    const currentItems = sponsors.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
                {currentItems.map((url, i) => (
                    <div key={i} className="w-20 h-20 rounded-full border overflow-hidden">
                        <img
                            src={url}
                            alt={`Sponsor ${i}`}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex gap-2">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="px-2">Page {currentPage + 1} of {totalPages}</span>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Sponsors;
