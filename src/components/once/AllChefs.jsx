import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../utils/ApiClient";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import CategoryTabs from "../shared/category/CategoryTabs";

const AllChefs = () => {
    const [chefs, setChefs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 6;

    useEffect(() => {
        const fetchChefs = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${api_url}/chef`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page,
                        take: pageSize,
                    },
                });

                setChefs(response.data.data);
                setTotal(response.data.pagination.totalCount);
            } catch (err) {
                setError("فشل تحميل الطهاة.");
            } finally {
                setLoading(false);
            }
        };

        fetchChefs();
    }, [page]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div>
            <div>
                {loading && <p className="text-center">...جاري تحميل الطهاة</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
            </div>

            <CategoryTabs />
            <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
                {Array.isArray(chefs) &&
                    chefs.map((chef) => (
                        <div
                            key={chef.id}
                            className="bg-white p-4 rounded-lg shadow-md border flex flex-col gap-4"
                        >
                            <div className="flex items-center border-b pb-4 gap-4">
                                <img
                                    src={
                                        chef.profilePicture ||
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(chef.name)}&background=D71313&color=fff&size=130`
                                    }
                                    alt={chef.name}
                                    className="w-24 h-24 rounded-md object-cover"
                                />
                                <div className="flex-1 text-right">
                                    <h2 className="text-lg font-semibold">{chef.name}</h2>
                                    <p className="text-gray-500 text-sm mt-1">
                                        أنواع وصفات الطبخ هنا
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-around text-center text-sm text-gray-600 border-b pb-4">
                                <div className="px-2 border-l last:border-l-0">
                                    <p className="font-bold text-lg text-[#D71313]">90</p>
                                    <p>عدد الوصفات</p>
                                </div>
                                <div className="px-2 border-l">
                                    <p className="font-bold text-lg text-[#D71313]">1700+</p>
                                    <p>عدد المتابعين</p>
                                </div>
                                <div className="px-2">
                                    <p className="font-bold text-lg text-[#D71313]">120</p>
                                    <p>عدد الزوار</p>
                                </div>
                            </div>

                            <div className="flex justify-between gap-2 mt-2">
                                <button className="w-1/2 border border-[#D71313] text-[#D71313] rounded-md py-2 hover:bg-[#D71313] hover:text-white transition">
                                    المتابعة
                                </button>
                                <Link
                                    to={`/chef/${chef.id}`}
                                    className="w-1/2 bg-[#D71313] text-white rounded-md py-2 text-center hover:opacity-90 transition"
                                >
                                    المزيد من التفاصيل
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>

            {totalPages > 0 && (
                <div className="flex justify-center mt-8">
                    <div className="flex gap-2 flex-wrap">
                        <button
                            className="p-2 px-3 border border-[#D71313] text-[#D71313] rounded-md hover:bg-[#D71313] hover:text-white transition"
                            onClick={() => setPage((prev) => prev - 1)}
                            disabled={page === 1}
                        >
                            <FaArrowRight />
                        </button>

                        {[...Array(totalPages)].map((_, index) => {
                            const isActive = page === index + 1;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setPage(index + 1)}
                                    className={`p-2 px-4 rounded-md transition ${isActive
                                        ? "bg-[#D71313] text-white"
                                        : "border border-[#D71313] text-[#D71313] hover:bg-[#D71313] hover:text-white"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}

                        <button
                            className="p-2 px-3 border border-[#D71313] text-[#D71313] rounded-md hover:bg-[#D71313] hover:text-white transition"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page === totalPages}
                        >
                            <FaArrowLeft />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllChefs;