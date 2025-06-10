import { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const images = [
    'https://dummyimage.com/150?food,1',
    'https://dummyimage.com/150?food,2',
    'https://dummyimage.com/150?food,3',
    'https://dummyimage.com/150?food,4',
    'https://dummyimage.com/150?food,5',
    'https://dummyimage.com/150?food,6',
    'https://dummyimage.com/150?food,7',
    'https://dummyimage.com/150?food,8',
    'https://dummyimage.com/150?food,9',
];

const ITEMS_PER_PAGE = 3;

const Slider = () => {
    const [page, setPage] = useState(0);

    const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);

    const handleNext = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePrev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const currentImages = images.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    return (
        <div className="flex items-center justify-center bg-base-100">
            <div className="flex items-center gap-4">
                {/* Pagination buttons */}
                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={handlePrev}
                        disabled={page === 0}
                        className="btn btn-circle btn-outline text-red-500"
                    >
                        <FaChevronUp />
                    </button>
                    <div className="w-0.5 h-16 bg-red-300"></div>
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages - 1}
                        className="btn btn-circle btn-outline text-red-500"
                    >
                        <FaChevronDown />
                    </button>
                </div>

                {/* Image list */}
                <div className="flex flex-col gap-4">
                    {currentImages.map((img, index) => (
                        <div key={index} className="rounded-box overflow-hidden shadow-lg">
                            <img src={img} alt={`food-${index}`} className="w-64 h-40 object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;