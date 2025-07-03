import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../../utils/ApiClient";

const FollowChef = ({ followingId, isInitiallyFollowing = false, className }) => {
    const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsFollowing(isInitiallyFollowing);
    }, [isInitiallyFollowing]);

    const handleToggleFollow = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            await axios.post(
                `${api_url}/chef/follow`,
                { followingId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsFollowing((prev) => !prev);
        } catch (err) {
            console.error("Follow/unfollow failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const defaultStyle = `flex-1 py-2 rounded border transition ${isFollowing
            ? "bg-primary-1 text-white border-primary-1 hover:bg-red-600"
            : "border-primary-1 text-primary-1 hover:bg-primary-50"
        }`;

    return (
        <button
            onClick={handleToggleFollow}
            disabled={loading}
            className={className || defaultStyle}
        >
            {loading
                ? isFollowing
                    ? "جارٍ الإلغاء..."
                    : "جارٍ المتابعة..."
                : isFollowing
                    ? "إلغاء المتابعة"
                    : "المتابعة"}
        </button>
    );
};

export default FollowChef;