import React, { useState } from "react";
import { FaReply, FaTimes } from "react-icons/fa";
import axios from "axios";
import { api_url } from "../../../utils/ApiClient";

const ReplyReviewButton = ({ ratingId, onReply }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!response.trim()) {
      alert("يرجى كتابة الرد");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const result = await axios.post(
        `${api_url}/store/${ratingId}/rates/response`,
        { response: response.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (onReply) {
        onReply(ratingId, response.trim());
      }

      setResponse("");
      setShowPopup(false);
    } catch (error) {
      console.error("Failed to send reply:", error);
      alert("فشل في إرسال الرد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-1 text-white rounded-lg hover:bg-hover_primary-1 transition-colors font-medium text-sm"
      >
        الرد
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          dir="rtl"
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">الرد على التعليق</h3>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="اكتب ردك هنا..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-hover_primary-1"
                rows="4"
                disabled={loading}
              />

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={loading || !response.trim()}
                  className="flex-1 bg-primary-1 text-white py-2 rounded-lg hover:bg-hover_primary-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "جاري الإرسال..." : "إرسال الرد"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  disabled={loading}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReplyReviewButton;
