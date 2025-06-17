import { FaStar, FaRegStar } from "react-icons/fa";

const RatingFilter = ({ selectedRating, setRatingRange }) => {
    return (
        <div>
            <label className="block mb-2 text-white">التقييم</label>
            {[5, 4, 3, 2, 1].map((rating) => (
                <label
                    key={rating}
                    className="flex justify-between items-center bg-white text-black px-3 py-2 rounded-lg mb-1"
                >
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) =>
                            i < rating ? (
                                <FaStar key={i} className="text-yellow-500" />
                            ) : (
                                <FaRegStar key={i} className="text-gray-300" />
                            )
                        )}
                    </div>
                    <input
                        type="checkbox"
                        checked={selectedRating === rating}
                        onChange={() =>
                            setRatingRange(
                                selectedRating === rating
                                    ? null
                                    : { min: rating, max: 5 }
                            )
                        }
                        className="accent-primary-1"
                    />
                </label>
            ))}
        </div>
    );
};


export default RatingFilter;