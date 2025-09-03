import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiClient from "../../../utils/ApiClient";
import { FaStar, FaRegStar } from "react-icons/fa";
import Pagination2 from "../../common/Pagination2";
import NoData from "../NoData/NoData";

const StoreReview = ({ refreshTrigger }) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [paginatedReviews, setPaginatedReviews] = useState([]);
  const [pagination, setPagination] = useState({
    hasPreviousPage: false,
    hasNextPage: false,
    currentPage: 1,
    totalPages: 1,
  });

  const pageSize = 6;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get(`/store/${id}/rates`, {
          params: {
            page,
            take: pageSize,
          },
        });

        const data = response.data.data || [];

        const transformed = data.map((item) => {
          const name = item.user?.fullName || "مستخدم";
          return {
            id: item.id,
            name: name,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              name
            )}&background=FFDB43&color=000&size=128`,
            rating: item.rating,
            content: item.comment || "",
          };
        });

        setPaginatedReviews(transformed);
        const pag = response.data.pagination;

        setPagination({
          hasPreviousPage: pag?.hasPreviousPage,
          hasNextPage: pag?.hasNextPage,
          currentPage: pag?.currentPage,
          totalPages: pag?.totalPages,
        });
      } catch (error) {
        console.error("Error fetching store reviews:", error);
      }
    };

    if (id) {
      fetchReviews();
    }
  }, [id, page, refreshTrigger]);

  return (
    <div className="my-10 bg-white rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-right">التقييمات</h2>

      {paginatedReviews.length === 0 ? (
        <NoData
          message="لا توجد تقييمات حالياً"
          description="لم يقم أي عميل بتقييم هذا المتجر بعد"
          icon="restaurant"
          size="small"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedReviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-xl p-4 shadow-sm bg-white flex flex-col justify-between"
            >
              <p className="text-sm text-[#808080] leading-loose text-right">
                {review.content}
              </p>

              <div className="flex flex-col items-end justify-between mt-4 space-y-2">
                <div className="flex flex-row-reverse items-center gap-2">
                  <img
                    src={review.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border object-cover"
                  />
                  <span className="text-sm font-semibold">{review.name}</span>
                </div>

                <div className="flex gap-1 text-[#FFDB43]">
                  {Array.from({ length: 5 }).map((_, idx) =>
                    idx < Math.floor(review.rating) ? (
                      <FaStar key={idx} />
                    ) : (
                      <FaRegStar key={idx} />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination2 pagination={pagination} setPage={setPage} />
    </div>
  );
};

export default StoreReview;
