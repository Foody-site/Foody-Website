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
                {/* Profile Picture */}
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

            <div className="mt-20 text-center px-4">
                <h1 className="text-2xl font-bold">{chef.name}</h1>
                <p className="text-gray-500 mt-1">{chef.description}</p>
                <div className="flex justify-center gap-3 mt-2 items-center text-gray-600">
                    <span>{chef.city}, {chef.country}</span>
                    <span>|</span>
                    <span>{chef.phone}</span>
                </div>
                <div className="flex justify-center items-center mt-2 gap-2 text-yellow-500">
                    <FaStar />
                    <span>{chef.averageRating.toFixed(1)} ({chef.totalRatings})</span>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-center gap-4 flex-wrap">
                    <button className="bg-red-600 text-white py-2 px-4 rounded-lg">أريد شيف</button>
                    <button className="bg-red-600 text-white py-2 px-4 rounded-lg">متابعة</button>
                </div>
            </div>

            {/* Recipe Types */}
            <div className="mt-10 px-6">
                <h2 className="text-xl font-bold mb-4">أنواع الأطباق</h2>
                <div className="flex flex-wrap gap-3">
                    {chef.recipeTypes?.map((type) => (
                        <span key={type.id} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                            {type.name.ar}
                        </span>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default ChefPage;
