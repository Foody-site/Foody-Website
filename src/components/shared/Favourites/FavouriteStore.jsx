import { useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { api_url } from "../../../utils/ApiClient";

const FavoriteButton = ({ itemId, isInitiallyFavorited, onUnfavorite }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFavorited, setIsFavorited] = useState(Boolean(isInitiallyFavorited));

    const token = localStorage.getItem("token");
    const favoriteType = "Store";

    const handleFavorite = async () => {
        if (!token) return;

        setIsLoading(true);

        try {
            if (isFavorited) {
                await axios.delete(`${api_url}/favorite/${itemId}/${favoriteType}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsFavorited(false);
                onUnfavorite?.(itemId);
            } else {
                await axios.post(
                    `${api_url}/favorite`,
                    { itemId, favoriteType },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setIsFavorited(true);
            }
        } catch (error) {
            console.error("Favorite action failed", error?.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            disabled={isLoading}
            onClick={handleFavorite}
            className={`w-10 h-10 flex items-center justify-center border rounded-lg 
            ${isFavorited ? "bg-primary-1 text-white" : "border-primary-1 text-primary-1"} 
            hover:bg-primary-1 hover:text-white transition`}
        >
            <FaHeart />
        </button>
    );
};

export default FavoriteButton;