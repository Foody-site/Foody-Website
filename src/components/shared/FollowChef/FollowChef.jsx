import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../../utils/ApiClient";

const FollowChef = ({ followingId, isInitiallyFollowing = false }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedFollowStatus = localStorage.getItem(`followed_chef_${followingId}`);
        if (storedFollowStatus !== null) {
            setIsFollowing(storedFollowStatus === "true");
        } else {
            setIsFollowing(isInitiallyFollowing);
        }
    }, [followingId, isInitiallyFollowing]);

    const handleToggleFollow = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            await axios.post(
                `${api_url}/chef/follow`,
                { followingId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const newFollowStatus = !isFollowing;
            setIsFollowing(newFollowStatus);
            localStorage.setItem(`followed_chef_${followingId}`, String(newFollowStatus));
        } catch (err) {
            console.error("Follow/unfollow failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggleFollow}
            disabled={loading}
            className={`flex-1 py-2 rounded border transition ${
                isFollowing
                    ? "bg-primary-1 text-white border-primary-1 hover:bg-red-600"
                    : "border-primary-1 text-primary-1 hover:bg-primary-50"
            }`}
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