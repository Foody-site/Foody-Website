import { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { api_url } from "../../../utils/ApiClient";
import { FaStar } from "react-icons/fa";

const MakeReview = ({ isUserRated, initialRating, initialComment }) => {
    const { id } = useParams();
    const [visible, setVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const openModal = () => {
        setRating(initialRating || 0);
        setComment(initialComment || "");
        setVisible(true);
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token || !rating || !comment.trim()) return;

        setIsSubmitting(true);
        try {
            await axios.post(
                `${api_url}/store/${id}/rate`,
                { rating, comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccessMessage("تم إرسال التقييم بنجاح!");
            setTimeout(() => {
                setVisible(false);
                setSuccessMessage("");
            }, 2000);
        } catch (err) {
            console.error("فشل إرسال التقييم:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                className="flex-1 py-2 text-sm rounded bg-primary-1 text-white"
                onClick={openModal}
            >
                {isUserRated ? "تعديل التعليق" : "تقييم / تعليق"}
            </button>

            {visible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-right">
                        <h3 className="font-bold text-lg mb-4 text-primary-1">أضف تقييمك</h3>

                        <label className="block text-sm text-gray-600 mb-2">التقييم:</label>
                        <div className="flex gap-1 justify-end mb-4">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <FaStar
                                    key={value}
                                    className={`cursor-pointer text-xl ${(hoverRating || rating) >= value
                                            ? "text-[#FFDB43]"
                                            : "text-gray-300"
                                        }`}
                                    onMouseEnter={() => setHoverRating(value)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(value)}
                                />
                            ))}
                        </div>

                        <label className="block text-sm text-gray-600 mb-2">تعليقك:</label>
                        <textarea
                            className="w-full border border-gray-300 rounded-md p-2 text-sm mb-4"
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        {successMessage && (
                            <p className="text-green-600 text-sm mb-4">{successMessage}</p>
                        )}

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setVisible(false)}
                                className="text-sm text-gray-500 hover:underline"
                            >
                                إغلاق
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !rating || !comment.trim()}
                                className="px-4 py-2 bg-primary-1 text-white rounded-md text-sm hover:bg-primary-1/90 disabled:opacity-50"
                            >
                                {isSubmitting ? "جاري الإرسال..." : "إرسال"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MakeReview;