import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PageWrapper from "../common/PageWrapper";
import { api_url } from "../../utils/ApiClient";
import { FaHeart, FaShareAlt, FaTwitter, FaStar } from "react-icons/fa";
import RecipeChef from "../shared/RecipeChef/RecipeChef"

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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const chefData = response.data;
            const paginationData = response.pagination || {};
            console.log(paginationData);


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

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            fetchChefData(page);
        }
    };

    if (loading) return <PageWrapper><p className="text-center">...جاري التحميل</p></PageWrapper>;
    if (error) return <PageWrapper><p className="text-center text-red-500">{error}</p></PageWrapper>;
    if (!chef) return null;

    return (
        <PageWrapper>
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                {/* Left Panel */}
                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-4">
                    <div className="text-center">
                        <div className="avatar">
                            <div className="w-24 h-24 rounded-full mx-auto overflow-hidden">
                                <img
                                    src={chef.profilePicture || "https://via.placeholder.com/150"}
                                    alt="Chef Avatar"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <h2 className="mt-3 font-bold text-lg text-primary-1 flex items-center justify-center gap-1">
                            {chef.name}
                            <FaStar className="text-red-500" />
                        </h2>
                        <p className="text-sm text-gray-500">{chef.description || "أنواع وصفات الطبخ هنا"}</p>
                        <p className="text-sm mt-2 text-gray-600">وصف مختصر عن الشيف هنا</p>
                    </div>

                    <div className="flex justify-center gap-2 mt-4">
                        <button className="btn btn-outline btn-sm text-primary-1">المتابعة</button>
                        <button className="btn btn-primary btn-sm bg-primary-1 border-primary-1 text-white">اريد الشيف</button>
                    </div>

                    <div className="mt-4 space-y-3">
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500">عدد الزوار</p>
                            <p className="font-bold">{chef.totalViews || 0}</p>
                        </div>
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500">عدد المتابعين</p>
                            <p className="font-bold">{chef.totalFollowers || 0}</p>
                        </div>
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500">عدد الوصفات</p>
                            <p className="font-bold">{chef.totalRecipes || 0}</p>
                        </div>
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500">رقم التواصل للطلبات</p>
                            <p className="font-bold">{chef.phone || "—"}</p>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded">
                            <p className="text-gray-500">الاعجابات</p>
                            <div className="flex items-center gap-1 text-red-500 font-semibold">
                                <FaHeart /> <span>{chef.favoritesCount || 0}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                            <p className="text-gray-500">المشاركة بواسطة</p>
                            <div className="flex items-center gap-1 text-red-500 font-semibold">
                                <FaShareAlt /> <span>{chef.totalShares || 0}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-gray-500 mb-2">وسائل التواصل</p>
                        <div className="flex justify-center gap-2">
                            {chef.socialMedia?.x && (
                                <a href={chef.socialMedia.x} target="_blank" rel="noreferrer" className="btn btn-sm btn-circle"><FaTwitter /></a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-2/3">
                    <RecipeChef />
                </div>
            </div>
        </PageWrapper>
    );
};

export default ChefPage;