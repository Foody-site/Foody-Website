import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ pagination, setPage }) => {
    const totalPages = pagination?.totalPages || 1;
    const currentPage = pagination?.currentPage || 1;

    const getPages = () => {
        const pages = [];
        const range = 2;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - range && i <= currentPage + range)
            ) {
                pages.push(i);
            } else if (
                (i === currentPage - range - 1 && !pages.includes("...")) ||
                (i === currentPage + range + 1 && !pages.includes("..."))
            ) {
                pages.push("...");
            }
        }

        return pages.filter((val, i, arr) => i === 0 || val !== "..." || arr[i - 1] !== "...");
    };

    return (
        <div className="flex justify-center mt-6 gap-2">
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={!pagination?.hasPreviousPage}
                className={`w-10 h-10 border rounded flex items-center justify-center ${pagination?.hasPreviousPage
                    ? "bg-primary-1 text-white"
                    : "border-primary-1 text-primary-1 opacity-50 cursor-not-allowed"
                    }`}
            >
                <FaArrowRight />
            </button>

            {getPages().map((pg, idx) =>
                pg === "..." ? (
                    <span key={idx} className="w-10 h-10 flex items-center justify-center">...</span>
                ) : (
                    <button
                        key={idx}
                        onClick={() => setPage(pg)}
                        className={`w-10 h-10 border rounded flex items-center justify-center ${currentPage === pg
                            ? "bg-primary-1 text-white"
                            : "border-primary-1 text-primary-1 hover:bg-primary-1 hover:text-white"
                            }`}
                    >
                        {String(pg).padStart(2, "0")}
                    </button>
                )
            )}

            <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={!pagination?.hasNextPage}
                className={`w-10 h-10 border rounded flex items-center justify-center ${pagination?.hasNextPage
                    ? "bg-primary-1 text-white"
                    : "border-primary-1 text-primary-1 opacity-50 cursor-not-allowed"
                    }`}
            >
                <FaArrowLeft />
            </button>
        </div>
    );
};

export default Pagination;