import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { api_url } from "../../../utils/ApiClient";

const FavoriteButton = ({ itemId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const token = localStorage.getItem("token");
    const favoriteType = "Store";

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (!token) return;

            try {
                const res = await axios.get(`${api_url}/favorite/${favoriteType}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const isFav = res.data?.some((fav) => fav.itemId === itemId);
                setIsFavorited(isFav);
            } catch (error) {
                console.error("Failed to fetch favorite status", error?.response?.data || error.message);
            }
        };

        checkFavoriteStatus();
    }, [itemId, token]);

    const handleFavorite = async () => {
        try {
            setIsLoading(true);

            if (!token) throw new Error("User is not authenticated");

            if (!isFavorited) {
                await axios.post(
                    `${api_url}/favorite`,
                    {
                        itemId,
                        favoriteType,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsFavorited(true);
            } else {
                await axios.delete(
                    `${api_url}/favorite/${itemId}/${favoriteType}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsFavorited(false);
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
                ${isFavorited ? 'bg-primary-1 text-white' : 'border-primary-1 text-primary-1'} 
                hover:bg-primary-1 hover:text-white transition`}
        >
            <FaHeart />
        </button>
    );
};

export default FavoriteButton;