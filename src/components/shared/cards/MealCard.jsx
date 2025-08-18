import { useState, useEffect } from "react";
import { ImFire } from "react-icons/im";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { api_url } from "../../../utils/ApiClient";

const MealCard = ({ meal, onUnfavorite, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(meal?.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);

  // Update isFavorite when meal.isFavorite changes
  useEffect(() => {
    setIsFavorite(meal?.isFavorite || false);
  }, [meal?.isFavorite]);

  const addToFavorites = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      console.log("Meal data:", meal);
      console.log("Sending data:", {
        itemId: meal._id || meal.id,
        favoriteType: "Meal",
      });

      await axios.post(
        `${api_url}/favorite`,
        {
          itemId: meal._id || meal.id,
          favoriteType: "Meal",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsFavorite(true);

      // Call onFavoriteToggle if provided (for other pages)
      if (onFavoriteToggle) {
        onFavoriteToggle(meal._id || meal.id, true);
      }
    } catch (error) {
      console.error("خطأ في إضافة المفضلة:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFavorites = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      await axios.delete(`${api_url}/favorite/${meal._id || meal.id}/Meal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsFavorite(false);

      // Call onUnfavorite if provided (for Favorites page)
      if (onUnfavorite) {
        onUnfavorite(meal._id || meal.id);
      }

      // Call onFavoriteToggle if provided (for other pages)
      if (onFavoriteToggle) {
        onFavoriteToggle(meal._id || meal.id, false);
      }
    } catch (error) {
      console.error("خطأ في إزالة المفضلة:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (isLoading) return;

    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };

  const afterDiscountPrice =
    meal?.price && meal?.discountRate
      ? (meal.price - (meal.price * meal.discountRate) / 100).toFixed(2)
      : meal?.price;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition-shadow">
      <div className="flex ">
        <div className="flex-1 p-4 flex flex-col justify-start space-y-3">
          <h3 className="text-lg font-bold text-gray-800 text-right">
            {meal?.name || "اسم الوجبة"}
          </h3>

          <p className="text-sm text-gray-600 text-right leading-relaxed line-clamp-2 overflow-hidden h-10 min-h-[2.5rem]">
            {meal?.description || "وصف مختصر عن الوجبة"}
          </p>

          <div className="flex items-center justify-end gap-2">
            <span className="text-sm text-gray-700 font-medium">
              {meal?.store?.name || "اسم المتجر"}
            </span>

            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-primary-1 text-white text-sm font-bold">
              {meal?.store?.profilePicture ? (
                <img
                  src={meal.store.profilePicture}
                  alt={meal?.store?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{(meal?.store?.name || "م").charAt(0)}</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              onClick={toggleFavorite}
              disabled={isLoading}
              className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-red-500 hover:bg-red-50"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : isFavorite ? (
                <FaHeart className="w-6 h-6" />
              ) : (
                <FaRegHeart className="w-6 h-6" />
              )}
            </button>

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

          {meal?.calories && (
            <div className="flex items-center justify-end gap-1 text-sm text-gray-500 border rounded-full p-2">
              <span>سعر حراري</span>
              <span>{meal.calories} </span>
              <ImFire className="text-gray-500 text-base" />
            </div>
          )}
        </div>

        <div className="w-1/2 relative">
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
      </div>
    </div>
  );
};

export default MealCard;
