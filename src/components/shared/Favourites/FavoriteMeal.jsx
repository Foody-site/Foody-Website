import { useState, useEffect } from "react";
import apiClient from "../../../utils/ApiClient";
import { FaHeart } from "react-icons/fa";

const FavoriteMeal = ({
  itemId,
  isInitiallyFavorited,
  onFavorite,
  onUnfavorite,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const token = localStorage.getItem("token");
  const favoriteType = "Meal";

  // Clear favorites cache if user is not logged in
  useEffect(() => {
    if (!token) {
      localStorage.removeItem("favoriteMeals");
      setIsFavorited(false);
    }
  }, [token]);

  // Check actual favorite status on component mount
  useEffect(() => {
    if (!initialized) {
      // First time - use isInitiallyFavorited prop if available
      const initialState = Boolean(isInitiallyFavorited);
      setIsFavorited(initialState);

      if (initialState && itemId) {
        updateLocalStorageCache(itemId, true);
      }

      setInitialized(true);
      return;
    }

    if (token && itemId) {
      checkFavoriteStatus();
    } else {
      setIsFavorited(false);
    }

    // Listen for localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === "favoriteMeals") {
        const favorites = e.newValue ? JSON.parse(e.newValue) : [];
        setIsFavorited(favorites.includes(itemId));
      }
    };

    // Custom event for same-tab updates
    const handleCustomUpdate = (e) => {
      if (e.detail.type === "favoriteMeals") {
        const favorites = e.detail.favorites || [];
        setIsFavorited(favorites.includes(itemId));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favoritesUpdated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoritesUpdated", handleCustomUpdate);
    };
  }, [itemId, token, isInitiallyFavorited, initialized]);

  const checkFavoriteStatus = async () => {
    if (!token || !itemId) {
      setIsFavorited(false);
      return;
    }

    // Only use localStorage cache - no API calls that cause errors
    const cachedFavorites = localStorage.getItem("favoriteMeals");
    if (cachedFavorites) {
      try {
        const favorites = JSON.parse(cachedFavorites);
        setIsFavorited(favorites.includes(itemId));
      } catch (parseError) {
        console.error("Error parsing cached favorites:", parseError);
        setIsFavorited(false);
      }
    } else {
      setIsFavorited(false);
    }

    // Note: We're not making API calls here because they return 400 errors
    // Instead, we'll rely on localStorage and direct add/remove operations
  };

  const updateLocalStorageCache = (itemId, isFavorited) => {
    try {
      const cachedFavorites = localStorage.getItem("favoriteMeals");
      let favorites = cachedFavorites ? JSON.parse(cachedFavorites) : [];

      if (isFavorited) {
        // Add to favorites if not already there
        if (!favorites.includes(itemId)) {
          favorites.push(itemId);
        }
      } else {
        // Remove from favorites
        favorites = favorites.filter((id) => id !== itemId);
      }

      localStorage.setItem("favoriteMeals", JSON.stringify(favorites));

      // Dispatch custom event for same-tab updates
      window.dispatchEvent(
        new CustomEvent("favoritesUpdated", {
          detail: { type: "favoriteMeals", favorites },
        })
      );
    } catch (error) {
      console.error("Error updating localStorage cache:", error);
    }
  };

  const handleFavorite = async () => {
    if (!token) return;

    setIsLoading(true);

    try {
      if (isFavorited) {
        // Remove from favorites
        await apiClient.delete(`/favorite/${itemId}/${favoriteType}`);
        setIsFavorited(false);
        updateLocalStorageCache(itemId, false);
        onUnfavorite?.(itemId);
      } else {
        // Add to favorites
        await apiClient.post("/favorite", { itemId, favoriteType });
        setIsFavorited(true);
        updateLocalStorageCache(itemId, true);
        onFavorite?.(itemId);
      }
    } catch (error) {
      // Handle common errors gracefully
      if (error.response?.status === 400) {
        // Item already favorited/removed
        if (!isFavorited) {
          setIsFavorited(true);
          updateLocalStorageCache(itemId, true);
          onFavorite?.(itemId);
        }
      } else if (error.response?.status === 404 && isFavorited) {
        // Item not found when trying to remove
        setIsFavorited(false);
        updateLocalStorageCache(itemId, false);
        onUnfavorite?.(itemId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleFavorite}
      className={`w-16 h-16 flex items-center justify-center border rounded-lg transition
        ${isFavorited ? "bg-red-500 text-white" : "bg-gray-100 text-red-500"} 
        ${
          isLoading
            ? "opacity-70 cursor-not-allowed"
            : "hover:bg-red-500 hover:text-white"
        }
        `}
    >
      {isLoading ? (
        <div
          className={`animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 ${
            isFavorited ? "border-white" : "border-red-500"
          }`}
        ></div>
      ) : (
        <FaHeart className="w-6 h-6" />
      )}
    </button>
  );
};

export default FavoriteMeal;
