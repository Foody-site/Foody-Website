import { FaStar, FaRegStar, FaCheck } from "react-icons/fa";

const RatingFilter = ({ selectedRating, setRatingRange }) => {
  const handleToggle = (rating) => {
    if (selectedRating === rating) {
      setRatingRange(null);
    } else {
      setRatingRange({ min: rating, max: 5 });
    }
  };

  return (
    <div>
      <label className="block mb-2 text-black font-semibold pb-2 text-right">التقييم</label>
      {[5, 4, 3, 2, 1].map((rating) => {
        const isSelected = selectedRating === rating;

        return (
          <div
            key={rating}
            onClick={() => handleToggle(rating)}
            className={`flex items-center justify-between bg-white px-3 py-2 rounded-lg mb-2 cursor-pointer ${
              isSelected ? "text-[#030303]" : "text-[#808080]"
            }`}
          >
            {/* Start checkmark (left) */}
            <div className="w-4">
              {isSelected && <FaCheck className="text-primary-1 text-sm" />}
            </div>

            {/* Stars (center) */}
            <div className="flex-1 flex justify-end gap-1 px-2">
              {Array.from({ length: 5 }).map((_, i) =>
                i < rating ? (
                  <FaStar key={i} className="text-yellow-500 text-sm" />
                ) : (
                  <FaRegStar key={i} className="text-gray-300 text-sm" />
                )
              )}
            </div>

            {/* Checkbox style (right) */}
            <div
              className={`w-4 h-4 flex items-center justify-center rounded-md border ${
                isSelected ? "border-primary-1" : "border-[#808080]"
              }`}
            >
              {isSelected && (
                <div className="bg-primary-1 w-4 h-4 flex items-center justify-center rounded-[4px]">
                  <FaCheck className="text-white text-[10px]" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingFilter;