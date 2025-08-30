import React, { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import apiClient from "../../../utils/ApiClient";

const DeleteReviewButton = ({ rateId, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteConfirm = async () => {
    setLoading(true);

    try {
      await apiClient.delete(`/store/rates/${rateId}`);

      if (onDelete) {
        onDelete(rateId);
      }
      setShowConfirm(false);
    } catch (error) {
      console.error("Failed to delete review:", error);
      alert("فشل في حذف التعليق");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-1 rounded-lg hover:bg-hover_primary-1 hover:text-white transition-colors font-medium text-sm border border-primary-1"
      >
        حذف التعليق
      </button>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          dir="rtl"
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-600">
                تأكيد الحذف
              </h3>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-700 mb-6">
              هل أنت متأكد من حذف هذا التعليق؟ لا يمكن التراجع عن هذا الإجراء.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteConfirm}
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "جاري الحذف..." : "حذف"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                disabled={loading}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteReviewButton;
