import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import slider_photo from "/assets/home/slider.png";
import slider_photo2 from "/assets/home/slider_2.jpg";
import slider_photo3 from "/assets/home/slider_3.jpg";
import slider_photo4 from "/assets/home/slider_4.jpg";
import slider_photo5 from "/assets/home/slider_5.jpg";

const images = [
  `${slider_photo}?food,1`,
  `${slider_photo2}?food,2`,
  `${slider_photo3}?food,3`,
  `${slider_photo4}?food,4`,
  `${slider_photo5}?food,5`,
  `${slider_photo}?food,1`,
  `${slider_photo2}?food,2`,
  `${slider_photo3}?food,3`,
  `${slider_photo4}?food,4`,
  `${slider_photo5}?food,5`,
  `${slider_photo}?food,1`,
  `${slider_photo2}?food,2`,
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
    <div className="flex items-center justify-center bg-[#D7131305] rounded-md p-6">
      <div className="flex flex-row-reverse items-center gap-6">
        {/* Pagination buttons */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className={`btn btn-circle border-2 rounded-full p-2 text-primary-1 border-primary-1 transition-all duration-300 
                            ${
                              page === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-primary-1 hover:text-white"
                            }`}
          >
            <FaChevronUp />
          </button>
          <div className="w-0.5 h-20 bg-primary-1"></div>
          <button
            onClick={handleNext}
            disabled={page === totalPages - 1}
            className={`btn btn-circle border-2 rounded-full p-2 text-primary-1 border-primary-1 transition-all duration-300 
                            ${
                              page === totalPages - 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-primary-1 hover:text-white"
                            }`}
          >
            <FaChevronDown />
          </button>
        </div>

        {/* Image list */}
        <div className="flex flex-col gap-6">
          {currentImages.map((img, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg border border-gray-200"
            >
              <img
                src={img}
                alt={`food-${index}`}
                className="w-64 h-40 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
