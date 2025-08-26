import { ImFire } from "react-icons/im";
import FavoriteMeal from "../Favourites/FavoriteMeal";

const MealCard2 = ({ meal, onUnfavorite, onFavoriteToggle }) => {
    const handleFavorite = (itemId) => {
        if (onFavoriteToggle) {
            onFavoriteToggle(itemId, true);
        }
    };

    const handleUnfavorite = (itemId) => {
        if (onUnfavorite) {
            onUnfavorite(itemId);
        }
        if (onFavoriteToggle) {
            onFavoriteToggle(itemId, false);
        }
    };

    const afterDiscountPrice =
        meal?.price && meal?.discountRate
            ? (meal.price - (meal.price * meal.discountRate) / 100).toFixed(2)
            : meal?.price;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
            {/* Row 1 - Image */}
            <div className="relative w-full h-48">
                <img
                    src={meal?.photo || "https://via.placeholder.com/200x200?text=وجبة"}
                    alt={meal?.name}
                    className="w-full h-full object-cover"
                />
                {meal?.discountRate && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        %{meal.discountRate}-
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col gap-3">
                {/* Row 2 - Name */}
                <h3 className="text-lg font-bold text-gray-800 text-right">
                    {meal?.name || "اسم الوجبة"}
                </h3>

                {/* Row 3 - Description */}
                <p className="text-sm text-gray-600 text-right leading-relaxed line-clamp-2">
                    {meal?.description || "وصف مختصر عن الوجبة"}
                </p>

                {/* Row 4 - Price + Discount + Favorite */}
                <div className="flex flex-row-reverse items-center justify-between">
                    <div className="flex items-center gap-3">
                        {meal?.discountRate && (
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-500 line-through">
                                    {meal.price || "50"}
                                </span>
                                <img
                                    src="/assets/currency/Saudi_Riyal.webp"
                                    alt="ر.س"
                                    className="w-4 h-4 object-contain opacity-60"
                                />
                            </div>
                        )}

                        <div className="flex items-center gap-1">
                            <span className="text-xl font-bold text-black">
                                {afterDiscountPrice || "42"}
                            </span>
                            <img
                                src="/assets/currency/Saudi_Riyal.webp"
                                alt="ر.س"
                                className="w-5 h-5 object-contain"
                            />
                        </div>
                    </div>

                    <FavoriteMeal
                        itemId={meal._id || meal.id}
                        isInitiallyFavorited={meal?.isFavorite}
                        onFavorite={handleFavorite}
                        onUnfavorite={handleUnfavorite}
                    />
                </div>

                {/* Row 5 - Calories */}
                {meal?.calories && (
                    <div className="w-full flex items-center justify-end gap-1 text-sm text-gray-500 border rounded-full px-3 py-1 self-end">
                        <span>سعر حراري</span>
                        <span>{meal.calories}</span>
                        <ImFire className="text-gray-500 text-base" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MealCard2;