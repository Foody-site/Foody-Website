import { useState } from "react";
import { useParams } from "react-router";
import apiClient from "../../../utils/ApiClient";
import { FaStar } from "react-icons/fa";

const MakeReview = ({
  isUserRated,
  initialRating,
  initialComment,
  onSuccess,
}) => {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
      await apiClient.post(`/store/${id}/rate`, { rating, comment });

      setShowToast(true);
      setVisible(false);
      onSuccess?.();

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
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

      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fadeIn">
          تم إرسال التقييم بنجاح!
        </div>
      )}

      {/* Modal */}
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-right">
            <h3 className="font-bold text-lg mb-4 text-primary-1">
              أضف تقييمك
            </h3>

            <label className="block text-sm text-gray-600 mb-2">التقييم:</label>
            <div className="flex gap-1 justify-end mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                  key={value}
                  className={`cursor-pointer text-xl ${
                    (hoverRating || rating) >= value
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
              className="w-full border border-gray-300 rounded-md p-2 text-sm mb-4 text-right"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

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
