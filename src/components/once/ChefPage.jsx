import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PageWrapper from "../common/PageWrapper";
import { api_url } from "../../utils/ApiClient";
import { FaHeart, FaShareAlt, FaTwitter, FaStar } from "react-icons/fa";

const ChefPage = () => {
    const { id } = useParams();
    const [chef, setChef] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchChef = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${api_url}/chef/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setChef(response.data);
            } catch (err) {
                setError("فشل تحميل بيانات الشيف.");
            } finally {
                setLoading(false);
            }
        };

        fetchChef();
    }, [id]);

    if (loading) return <PageWrapper><p className="text-center">...جاري التحميل</p></PageWrapper>;
    if (error) return <PageWrapper><p className="text-center text-red-500">{error}</p></PageWrapper>;
    if (!chef) return null;

    // Dummy cards
    const totalCards = 15;
    const cards = Array.from({ length: totalCards }, (_, i) => ({
        title: "مقلوبة الدجاج بالباذنجان",
        description: "وجبة شرقية رائعة بطعم لا يقاوم، تحضر بطريقة سهلة ومميزة.",
        servings: "6 أشخاص",
        prepTime: "45 دقيقة",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
    }));

    const paginatedCards = cards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(cards.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <PageWrapper>
            {/* Cover */}
            <div className="relative">
                <img
                    src={chef.coverPicture || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"}
                    alt="cover"
                    className="w-full h-[300px] object-cover"
                />
<<<<<<< Updated upstream
                <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
                    <img
                        src={
                            chef.profilePicture ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                chef.name
                            )}&background=D71313&color=fff&size=130`
                        }
                        alt={chef.name}
                        className="w-28 h-28 rounded-full border-4 border-white object-cover"
                    />
                </div>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {/* Left Column - Sponsors */}
                <div className="md:col-span-1 text-center">
                    <h2 className="text-lg font-bold mb-4">شركاء النجاح</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img
                                    src="https://via.placeholder.com/70"
                                    alt="sponsor"
                                    className="w-16 h-16 rounded-full border-2 border-gray-300"
                                />
                                <span className="text-xs mt-1 text-gray-600">اسم الراعي الرسمي هنا</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Chef Details */}
                <div className="md:col-span-2 text-right">
                    <h1 className="text-2xl font-bold">{chef.name}</h1>
                    <p className="text-gray-500 mt-1">{chef.description}</p>

                    <div className="flex justify-end gap-3 mt-2 items-center text-gray-600 text-sm">
                        <span>{chef.city}, {chef.country}</span>
                        <span>|</span>
                        <span>{chef.phone}</span>
                    </div>

                    <div className="flex justify-end items-center mt-2 gap-2 text-yellow-500">
                        <FaStar />
                        <span>{chef.averageRating.toFixed(1)} ({chef.totalRatings})</span>
                    </div>

                    <div className="mt-4 flex justify-end gap-4 flex-wrap">
                        <button className="bg-red-600 text-white py-2 px-4 rounded-lg">أريد شيف</button>
                        <button className="bg-red-600 text-white py-2 px-4 rounded-lg">متابعة</button>
                    </div>
                </div>
            </div>

            {/* Recipe Types */}
            <div className="mt-10 px-6">
                <h2 className="text-xl font-bold mb-4">أفضل الأطباق</h2>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {chef.recipeTypes?.map((type) => (
                        <span key={type.id} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                            {type.name.ar}
                        </span>
                    ))}
=======
            </div>

            {/* Main layout */}
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                {/* Left Section */}
                <div className="w-full lg:w-2/3">
                    {/* Sponsors */}
                    <div className="flex items-center gap-3 mb-4">
                        {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="w-14 h-14 rounded-full border overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
                                    alt="Sponsor"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {paginatedCards.map((card, i) => (
                            <div key={i} className="border rounded-lg shadow p-3 bg-white flex flex-col">
                                <img src={card.image} alt="card" className="w-full h-48 object-cover rounded mb-3" />
                                <h3 className="font-bold text-md mb-1">{card.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{card.description}</p>
                                <div className="text-sm text-gray-500">
                                    <p>عدد الأشخاص: {card.servings}</p>
                                    <p>مدة التحضير: {card.prepTime}</p>
                                </div>
                                <div className="mt-3 flex justify-between items-center">
                                    <button className="btn btn-sm bg-primary-1 text-white">عرض التفاصيل</button>
                                    <button className="btn btn-sm btn-outline text-red-500 border-red-500"><FaHeart /></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 gap-2">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="btn btn-sm">«</button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={`btn btn-sm ${currentPage === i + 1 ? "bg-primary-1 text-white" : ""}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-sm">»</button>
                    </div>
                </div>
                
                {/* Right Section */}
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
                        <p className="text-sm text-gray-500">{chef.bio || "أنواع وصفات الطبخ هنا"}</p>
                        <p className="text-sm mt-2 text-gray-600">وصف مختصر عن الشيف هنا</p>
                    </div>

                    <div className="flex justify-center gap-2 mt-4">
                        <button className="btn btn-outline btn-sm text-primary-1">المتابعة</button>
                        <button className="btn btn-primary btn-sm bg-primary-1 border-primary-1 text-white">اريد الشيف</button>
                    </div>

                    <div className="mt-4 space-y-3">
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500">عدد الزوار</p>
                            <p className="font-bold">{chef.visitors || 6002}</p>
                        </div>
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500">عدد المتابعين</p>
                            <p className="font-bold">{chef.followers || 12900}</p>
                        </div>
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500">عدد الوصفات</p>
                            <p className="font-bold">{chef.recipes || 90}</p>
                        </div>
                        <div className="p-3 rounded border text-center">
                            <p className="text-gray-500">رقم التواصل للطلبات</p>
                            <p className="font-bold">{chef.phone || "01023359621"}</p>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded">
                            <p className="text-gray-500">الاعجابات</p>
                            <div className="flex items-center gap-1 text-red-500 font-semibold">
                                <FaHeart /> <span>{chef.likes || "2.6k"}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                            <p className="text-gray-500">المشاركة بواسطة</p>
                            <div className="flex items-center gap-1 text-red-500 font-semibold">
                                <FaShareAlt /> <span>{chef.shares || 120}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-gray-500 mb-2">وسائل التواصل</p>
                        <div className="flex justify-center gap-2">
                            <button className="btn btn-sm btn-circle"><FaTwitter /></button>
                            <button className="btn btn-sm btn-circle"><FaTwitter /></button>
                            <button className="btn btn-sm btn-circle"><FaTwitter /></button>
                        </div>
                    </div>
>>>>>>> Stashed changes
                </div>
            </div>

            {/* Recipes Section */}
            <div className="mt-10 px-6">
                <h2 className="text-xl font-bold mb-4">الوصفات</h2>

                {/* Static Recipe Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
                    <img
                        src="https://images.unsplash.com/photo-1604909053365-196e03b3f67d?auto=format&fit=crop&w=800&q=80"
                        alt="مقلوبة الدجاج"
                        className="w-full h-48 object-cover"
                    />

                    <div className="p-4">
                        <h3 className="text-lg font-bold mb-1">مقلوبة الدجاج بالباذنجان</h3>
                        <p className="text-gray-600 text-sm mb-3">
                            وصفة مقلوبة الدجاج بالباذنجان من الشيف عمر فؤاد، هي تجربة شامية أصلية بطابع منزلي دافئ.
                        </p>

                        <div className="flex justify-between text-xs text-gray-500 border-t border-b py-2 mb-3">
                            <div>
                                <span className="block font-bold text-red-600">1 ساعة و15 دقيقة</span>
                                <span>التحضير</span>
                            </div>
                            <div>
                                <span className="block font-bold text-red-600">20 دقيقة</span>
                                <span>الطهي</span>
                            </div>
                        </div>

                        <p className="text-red-600 text-xs mb-3">⚠ تحتوي هذه الوصفة على أحد مسببات الحساسية</p>

                        <div className="flex justify-between items-center">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:opacity-90">
                                المزيد من التفاصيل
                            </button>
                            <div className="flex gap-2">
                                <button className="border border-red-600 text-red-600 p-2 rounded-md text-sm hover:bg-red-50">
                                    <i className="fas fa-share-alt" />
                                </button>
                                <button className="border border-red-600 text-red-600 p-2 rounded-md text-sm hover:bg-red-50">
                                    <i className="fas fa-heart" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default ChefPage;