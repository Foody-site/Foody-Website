import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PageWrapper from "../common/PageWrapper";
import { FaStar } from "react-icons/fa";
import { api_url } from "../../utils/ApiClient";

const ChefPage = () => {
    const { id } = useParams();
    const [chef, setChef] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    return (
        <PageWrapper>
            {/* Cover */}
            <div className="relative">
                <img
                    src={
                        chef.coverPicture ||
                        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
                    }
                    alt="cover"
                    className="w-full h-[300px] object-cover"
                />
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