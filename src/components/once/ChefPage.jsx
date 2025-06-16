import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PageWrapper from "../common/PageWrapper";
import { api_url } from "../../utils/ApiClient";
import { FaHeart, FaShareAlt, FaTwitter, FaStar } from "react-icons/fa";
import RecipeChef from "../shared/RecipeChef/RecipeChef";

const ChefPage = () => {
    const { id } = useParams();
    const [chef, setChef] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchChefData = async (page = 1) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${api_url}/chef/${id}?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const chefData = response.data;
            const paginationData = response.pagination || {};

            if (chefData) {
                setChef(chefData);
                setRecipes(chefData.recipes || []);
                setPagination({
                    totalPages: paginationData.totalPages || 1,
                    currentPage: paginationData.currentPage || 1,
                });
            } else {
                setError("لا يوجد بيانات لهذا الشيف.");
            }
        } catch (err) {
            setError("فشل تحميل بيانات الشيف.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChefData(1);
    }, [id]);

    if (loading) return <PageWrapper><p className="text-center mt-4">...جاري التحميل</p></PageWrapper>;
    if (error) return <PageWrapper><p className="text-center text-red-500 mt-4">{error}</p></PageWrapper>;
    if (!chef) return null;

    return (
        <PageWrapper>
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                {/* Left Panel */}
                <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow p-4">
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border">
                            <img
                                src={chef.profilePicture || "https://via.placeholder.com/150"}
                                alt="Chef Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="mt-3 font-bold text-lg text-gray-800 flex justify-center items-center gap-1">
                            {chef.name}
                            <FaStar className="text-red-500" />
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">{chef.description || "أنواع وصفات الطبخ هنا"}</p>
                        <p className="text-sm text-gray-500 mt-1">وصف مختصر عن الشيف هنا</p>
                    </div>

                    <div className="flex justify-center gap-2 mt-4">
                        <button className="flex-1 py-2 rounded border border-primary-1 text-primary-1 hover:bg-primary-50">
                            المتابعة
                        </button>
                        <button className="flex-1 py-2 rounded bg-primary-1 text-white hover:bg-red-700">
                            اريد الشيف
                        </button>
                    </div>

                    <div className="mt-4 space-y-3">
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500 text-sm">عدد الزوار</p>
                            <p className="font-bold text-lg">{chef.totalViews || 0}</p>
                        </div>
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500 text-sm">عدد المتابعين</p>
                            <p className="font-bold text-lg">{chef.totalFollowers || 0}</p>
                        </div>
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500 text-sm">عدد الوصفات</p>
                            <p className="font-bold text-lg">{chef.totalRecipes || 0}</p>
                        </div>
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500 text-sm">رقم التواصل للطلبات</p>
                            <p className="font-bold text-lg">{chef.phone || "—"}</p>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded">
                            <p className="text-gray-500 text-sm">الاعجابات</p>
                            <div className="flex items-center gap-1 text-red-600 font-semibold">
                                <FaHeart /> <span>{chef.favoritesCount || 0}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                            <p className="text-gray-500 text-sm">المشاركة بواسطة</p>
                            <div className="flex items-center gap-1 text-red-600 font-semibold">
                                <FaShareAlt /> <span>{chef.totalShares || 0}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-gray-500 text-sm mb-2">وسائل التواصل</p>
                        <div className="flex justify-center gap-2">
                            {chef.socialMedia?.x && (
                                <a
                                    href={chef.socialMedia.x}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded border hover:bg-gray-100"
                                >
                                    <FaTwitter className="text-gray-600" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Section - Recipes */}
                <div className="w-full lg:w-2/3">
                    <RecipeChef />
                </div>
            </div>
        </PageWrapper>
    );
};

export default ChefPage;