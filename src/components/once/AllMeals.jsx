import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../utils/ApiClient";
import Pagination2 from "../common/Pagination2";
import MealCard2 from "../shared/cards/MealCard2";
import MealCategoryTabs from "../shared/category/MealCategoryTabs";

const LoadingCard = () => (
    <div className="bg-white p-4 rounded-lg shadow-md border h-72 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
    </div>
);

const AllMeals = ({ storeId }) => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("main");
    const [pagination, setPagination] = useState({
        hasNextPage: false,
        hasPreviousPage: false,
        currentPage: 1,
        totalPages: 1,
    });

    const pageSize = 12;

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(`${api_url}/meal/store/${storeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page,
                        take: pageSize,
                        category,
                    },
                });

                setMeals(response.data.data || []);
                const pag = response.data.pagination;

                setPagination({
                    hasNextPage: pag?.hasNextPage || false,
                    hasPreviousPage: pag?.hasPreviousPage || false,
                    currentPage: pag?.currentPage || 1,
                    totalPages: pag?.totalPages || 1,
                });
                setError("");
            } catch (err) {
                setError("فشل تحميل الوجبات.");
                setMeals([]);
            } finally {
                setLoading(false);
            }
        };

        if (storeId) fetchMeals();
    }, [page, storeId, category]);

    return (
        <div>
            <MealCategoryTabs
                activeTabLabel="الوجبات الرئيسية"
                onTabChange={(selectedCategory) => {
                    setCategory(selectedCategory);
                    setPage(1);
                }}
            />

            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 mt-4">
                {loading
                    ? Array.from({ length: pageSize }).map((_, i) => (
                        <LoadingCard key={i} />
                    ))
                    : meals.length > 0
                        ? meals.map((meal) => (
                            <MealCard2
                                key={meal.id || meal._id}
                                meal={meal}
                                onFavoriteToggle={(id, isFav) =>
                                    setMeals((prev) =>
                                        prev.map((m) =>
                                            m._id === id ? { ...m, isFavorite: isFav } : m
                                        )
                                    )
                                }
                                onUnfavorite={(id) =>
                                    setMeals((prev) =>
                                        prev.map((m) =>
                                            m._id === id ? { ...m, isFavorite: false } : m
                                        )
                                    )
                                }
                            />
                        ))
                        : (
                            <p className="text-center w-full mt-4">لا توجد نتائج حالياً</p>
                        )}
            </div>

            {!loading && meals.length > 0 && (
                <Pagination2 pagination={pagination} setPage={setPage} />
            )}
        </div>
    );
};

export default AllMeals;