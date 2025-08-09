import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaUser, FaStore } from "react-icons/fa";
import DeleteReviewButton from "../buttons/DeleteReviewButton";
import ReplyReviewButton from "../buttons/ReplyReviewButton";

const ReviewCard = ({ review, onDelete, onReply, showActions = false }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // النجوم المملوءة
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <AiFillStar key={`full-${i}`} className="w-5 h-5 text-yellow-400" />
      );
    }

    // النجمة النصف باستخدام CSS
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-5 h-5">
          <AiOutlineStar className="w-5 h-5 text-gray-300 absolute" />
          <div className="overflow-hidden w-2.5 absolute">
            <AiFillStar className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      );
    }

    // النجوم الفارغة
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <AiOutlineStar key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // دالة لاستخراج أول حرف من كل كلمة في الاسم
  const getInitials = (fullName) => {
    if (!fullName) return "؟";

    return fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2); // أخذ أول حرفين فقط
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
      dir="rtl"
    >
      {/* Store Info - اسم المتجر وصورته */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center shadow-sm">
          {review.store.profilePicture ? (
            <img
              src={review.store.profilePicture}
              alt={review.store.name}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <FaStore className="w-8 h-8 text-gray-600" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">
            {review.store.name}
          </h3>
        </div>
      </div>

      {/* Divider Line - الخط الفاصل */}
      <hr className="border-gray-300 mb-6" />

      {/* Comment - التعليق */}
      <div className="flex-1 mb-6">
        <p className="text-gray-700 text-base leading-relaxed">
          {review.comment}
        </p>
      </div>

      {/* User Info - معلومات المستخدم */}
      <div className="mt-auto">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
              review.user.profilePicture ? "bg-gray-200" : "bg-red-500"
            }`}
          >
            {review.user.profilePicture ? (
              <img
                src={review.user.profilePicture}
                alt={review.user.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-black text-xl leading-none">
                {getInitials(review.user.fullName)}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {review.user.fullName}
            </p>
            <p className="text-sm text-gray-500">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>

        {/* Rating - النجوم تحت معلومات اليوزر */}
        <div className="flex items-center gap-1">
          {renderStars(review.rating)}
        </div>
      </div>

      {review.storeResponse && (
        <div className="bg-blue-50 rounded-lg p-4 border-r-4 border-primary-1 mt-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FaStore className="w-5 h-5 text-primary-1" />
            </div>
            <span className="text-sm font-semibold text-gray-900">
              رد من {review.store.name}
            </span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {review.storeResponse}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      {showActions && (
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 w-full">
          <ReplyReviewButton ratingId={review.id} onReply={onReply} />
          <DeleteReviewButton rateId={review.id} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
