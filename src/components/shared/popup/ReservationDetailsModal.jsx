import React, { useState } from "react";
import { api_url } from "../../../utils/ApiClient";
import { formatBookingType, formatDate } from "./../../../utils/Formatters";
import Button from "../Buttons/Button";

const ReservationDetailsModal = ({ reservation, onClose, onStatusUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  if (!reservation) return null;

  const handleUpdateStatus = async (newStatus) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("لم يتم العثور على رمز المصادقة");
      }

      const response = await fetch(
        `${api_url}/chef-booking/${reservation.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData && errorData.message
            ? Array.isArray(errorData.message)
              ? errorData.message.join(", ")
              : errorData.message
            : `فشل في تحديث الحالة (${response.status})`;

        throw new Error(errorMessage);
      }

      const result = await response.json();

      if (onStatusUpdate) {
        onStatusUpdate(reservation.id, newStatus, result);
      }

      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
      setUpdateError(error.message || "حدث خطأ أثناء تحديث الحالة");
    } finally {
      setIsUpdating(false);
    }
  };

  const isPending = reservation.status === "pending";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 text-right">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-center mb-6">تفاصيل الحجز</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              اسم صاحب الطلب
            </label>
            <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
              {reservation.user?.fullName || "غير محدد"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              نوع المناسبة
            </label>
            <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
              {formatBookingType(reservation.bookingType)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              تاريخ المناسبة
            </label>
            <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
              {formatDate(reservation.bookingDate)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              عدد المدعوين
            </label>
            <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
              {reservation.numOfPeople || "غير محدد"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              رقم التواصل
            </label>
            <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
              {reservation.phoneNumber || "غير محدد"}
            </div>
          </div>

          {reservation.notes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                ملاحظات
              </label>
              <div className="w-full min-h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                {reservation.notes}
              </div>
            </div>
          )}

          {updateError && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
              {updateError}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6 gap-3">
          {isPending ? (
            <>
              <Button
                label={isUpdating ? "جاري التحديث..." : "رفض"}
                onClick={() => handleUpdateStatus("rejected")}
                className="bg-white border-2 border-primary-1 hover:bg-hover_primary-1 hover:text-white disabled:opacity-70 disabled:cursor-not-allowed [&]:text-primary-1"
                disabled={isUpdating}
              />
              <Button
                label={isUpdating ? "جاري التحديث..." : "قبول"}
                onClick={() => handleUpdateStatus("accepted")}
                className="bg-primary-1 hover:bg-hover_primary-1 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isUpdating}
              />
            </>
          ) : (
            <Button
              label="إغلاق"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsModal;
