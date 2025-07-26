import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import Pagination2 from "../../common/Pagination2";
import { api_url } from "../../../utils/ApiClient";

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

    const [showModal, setShowModal] = useState(false);
    const [activeReview, setActiveReview] = useState(null);

    const pageSize = 6;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${api_url}/store/${id}/rates`, {
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
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FFDB43&color=000&size=128`,
                        rating: item.rating,
                        content: item.comment || "",
                        storeResponse: item.storeResponse || "",
                        storeName: item.store?.name || "اسم المتجر",
                        storeImage: item.store?.photo || "https://via.placeholder.com/150",
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
                <p className="text-center text-sm text-gray-500">لا توجد تقييمات حالياً</p>
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

                                {review.storeResponse && (
                                    <div className="py-2">
                                        <button
                                            onClick={() => {
                                                setActiveReview(review);
                                                setShowModal(true);
                                            }}
                                            className="underline text-primary-1 text-sm"
                                        >
                                            رد المتجر
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Pagination2 pagination={pagination} setPage={setPage} />

            {/* Store Response Modal */}
            {showModal && activeReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-right">
                        <h3 className="text-lg font-bold text-primary-1 mb-4">رد المتجر</h3>

                        <div className="flex items-center gap-3 mb-4 justify-end">
                            <img
                                src={activeReview.storeImage}
                                alt="store"
                                className="w-12 h-12 rounded-full border object-cover"
                            />
                            <span className="text-sm font-semibold">{activeReview.storeName}</span>
                        </div>

                        <div className="mb-4 text-sm text-gray-700 leading-loose">
                            {activeReview.storeResponse}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreReview;