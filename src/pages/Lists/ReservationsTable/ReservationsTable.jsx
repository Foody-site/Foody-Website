import React, { useState, useEffect } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Pagination } from "../../../components/shared/Pagination/Pagination";
import apiClient from "../../../utils/ApiClient";
import { useNavigate } from "react-router";
import ReservationDetailsModal from "../../../components/shared/popup/ReservationDetailsModal";
import { formatBookingType, formatDate } from "./../../../utils/Formatters";
import Spinner from "../../../components/shared/Loading/Spinner";

const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return (
        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
          في انتظار رد الشيف{" "}
        </span>
      );
    case "accepted":
      return (
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
          تم الموافقة{" "}
        </span>
      );
    case "rejected":
      return (
        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
          مرفوضة{" "}
        </span>
      );
    default:
      return (
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
          {status || "غير محدد"}
        </span>
      );
  }
};

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Add state for the modal
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get("/chef-booking", {
          params: {
            page: currentPage.toString(),
            take: "10",
          },
        });

        const result = response.data;
        console.log("API Result:", result);

        if (result && result.data) {
          setReservations(result.data);

          if (result.pagination) {
            setTotalPages(result.pagination.totalPages || 1);
          } else {
            setTotalPages(1);
          }
        } else {
          setReservations([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError(error.message || "حدث خطأ أثناء جلب البيانات");
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewReservation = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
  };

  const handleStatusUpdate = (id, newStatus, updatedReservation) => {
    // Update the reservation in the list
    setReservations((prevReservations) =>
      prevReservations.map((res) =>
        res.id === id ? { ...res, status: newStatus } : res
      )
    );
  };

  const handleRetry = () => {
    setCurrentPage(1);
  };

  if (loading) {
    return <Spinner className="py-12" />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="mb-4 text-lg text-gray-700">لا يمكن جلب البيانات</p>
        <p className="mb-4 text-sm text-red-500">{error}</p>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (reservations.length === 0) {
    return <div className="text-center py-12">لا توجد حجوزات متاحة</div>;
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          <thead>
            <tr className="text-right text-gray-700 bg-gray-100">
              <th className="px-4 py-3 font-medium text-center border border-gray-300 w-[120px]">
                مزيد من التفاصيل{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                الحاله{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                عدد المدعوين{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                تاريخ المناسبة{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                نوع المناسبة{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                اسم صاحب الطلب{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr
                key={reservation.id || index}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-3 border border-gray-300">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleViewReservation(reservation)}
                      className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors"
                      title="عرض تفاصيل الحجز"
                    >
                      <IoEyeOutline size={16} />
                    </button>
                  </div>
                </td>

                <td className="px-4 py-3 text-gray-700 text-right border border-gray-300">
                  {formatStatus(reservation.status)}
                </td>

                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                  {reservation.numOfPeople || "غير محدد"}
                </td>

                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                  {formatDate(reservation.bookingDate)}
                </td>

                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                  {formatBookingType(reservation.bookingType)}
                </td>

                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300 font-medium">
                  {reservation.user?.fullName || "غير محدد"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Render the modal when a reservation is selected */}
      {selectedReservation && (
        <ReservationDetailsModal
          reservation={selectedReservation}
          onClose={handleCloseModal}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default ReservationsTable;
