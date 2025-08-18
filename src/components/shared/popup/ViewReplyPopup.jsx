import React from "react";
import { FaStore } from "react-icons/fa";

const ViewReplyPopup = ({ isOpen, onClose, review }) => {
  if (!isOpen || !review || !review.storeResponse) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">رد المتجر</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FaStore className="w-5 h-5 text-primary-1" />
            </div>
            <span className="text-sm font-semibold text-gray-900">
              رد من {review.store.name}
            </span>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border-r-4 border-primary-1">
            <p className="text-gray-700 text-sm leading-relaxed">
              {review.storeResponse}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewReplyPopup;
