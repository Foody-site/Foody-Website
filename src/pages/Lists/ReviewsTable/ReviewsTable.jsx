import React, { useState, useEffect } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import apiClient from "../../../utils/ApiClient";
import ReviewCard from "../../../components/shared/cards/ReviewCard";
import { Pagination } from "./../../../components/shared/Pagination/Pagination";
import Spinner from "../../../components/shared/Loading/Spinner";
import NoData from "../../../components/shared/NoData/NoData";

const ReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // غيرت من 10 إلى 8

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const params = {
        page: currentPage.toString(),
        take: pageSize.toString(),
      };

      const response = await apiClient.get("/store/rates", {
        params: params,
      });

      setReviews(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <Spinner className="py-12" />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">خطأ: {error}</p>
        <button
          onClick={fetchReviews}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-6">
      {/* Reviews Grid - 4 كاردات في الصف الواحد، 8 في الصفحة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {reviews.length === 0 ? (
          <div className="col-span-full">
            <NoData
              message="لا توجد تقييمات"
              description="لم يتم العثور على أي تقييمات حتى الآن"
              icon="restaurant"
              size="medium"
            />
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              showActions={true}
              onDelete={(rateId) => {
                // Remove review from state after deletion
                setReviews((prev) => prev.filter((r) => r.id !== rateId));
              }}
              onReply={(ratingId, response) => {
                // Update review with store response
                setReviews((prev) =>
                  prev.map((r) =>
                    r.id === ratingId ? { ...r, storeResponse: response } : r
                  )
                );
              }}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ReviewsTable;
