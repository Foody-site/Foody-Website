import React, { useState } from "react";
import { FaReply } from "react-icons/fa";
import ViewReplyPopup from "../popup/ViewReplyPopup";

const ViewReplyButton = ({ review }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleViewReply = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <button
        onClick={handleViewReply}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-1 text-white rounded-lg hover:bg-hover_primary-1 transition-colors font-medium text-sm"
      >
        عرض الرد الخاص بي
      </button>

      <ViewReplyPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        review={review}
      />
    </>
  );
};

export default ViewReplyButton;
