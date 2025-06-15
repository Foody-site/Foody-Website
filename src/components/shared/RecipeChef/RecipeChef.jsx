import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router";
import { api_url } from "../../../utils/ApiClient";

const RecipeChef = () => {
    const { id } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const take = 9;

    const fetchRecipes = async (page = 1) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${api_url}/recipe`, {
                params: {
                    page,
                    take,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            setRecipes(data.data || []);
            setPagination({
                totalPages: data.pagination?.totalPages || 1,
                currentPage: data.pagination?.currentPage || 1,
            });
        } catch (err) {
            setError("فشل تحميل الوصفات.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes(1);
    }, [id]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            fetchRecipes(page);
        }
    };

    if (loading) return <p className="text-center mt-4">...جاري تحميل الوصفات</p>;
    if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recipes.map((recipe, i) => (
                    <div key={i} className="border rounded-lg shadow p-3 bg-white flex flex-col">
                        <img
                            src={recipe.photo || "https://via.placeholder.com/300x200"}
                            alt="recipe"
                            className="w-full h-48 object-cover rounded mb-3"
                        />
                        <h3 className="font-bold text-md mb-1">{recipe.name || "اسم الوصفة"}</h3>
                        <p className="text-sm text-gray-600 mb-2">{recipe.description || "وصف الوصفة هنا"}</p>
                        <div className="text-sm text-gray-500">
                            <p>مدة التحضير: {recipe.preparationTime || "-"} دقيقة</p>
                            <p>مدة الطبخ: {recipe.cookingTime || "-"} دقيقة</p>
                            <p>الوقت الكلي: {recipe.totalTime || "-"} دقيقة</p>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                            <button className="btn btn-sm bg-primary-1 text-white">عرض التفاصيل</button>
                            <button className="btn btn-sm btn-outline text-red-500 border-red-500">
                                <FaHeart />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2">
                <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="btn btn-sm"
                >
                    «
                </button>
                {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`btn btn-sm ${
                            pagination.currentPage === i + 1 ? "bg-primary-1 text-white" : ""
                        }`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="btn btn-sm"
                >
                    »
                </button>
            </div>
        </>
    );
};

export default RecipeChef;