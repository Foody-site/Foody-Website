import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../utils/ApiClient";
import PageWrapper from "../common/PageWrapper";
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
        <PageWrapper>
            <div>
                {loading && <p className="text-center">...جاري تحميل الطهاة</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
            </div>

            <CategoryTabs />
            <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
                {Array.isArray(chefs) &&
                    chefs.map((chef) => (
                        <div key={chef.id} className="bg-white p-4 rounded-lg shadow-md text-center border">
                            <div className="flex flex-col items-center">
                                <img
                                    src={chef.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(chef.name)}&background=D71313&color=fff&size=130`}
                                    alt={chef.name}
                                    className="w-24 h-24 rounded-full object-cover mb-2"
                                />
                                <h2 className="text-lg font-semibold">{chef.name}</h2>
                                <p className="text-gray-500 text-sm">أنواع وصفات الطبخ هنا</p>
                            </div>

                            <div className="flex justify-between text-center mt-4 text-sm border-t pt-4">
                                <div>
                                    <p className="font-semibold text-lg text-[#D71313]">120</p>
                                    <p className="text-gray-600">عدد الزوار</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg text-[#D71313]">1700+</p>
                                    <p className="text-gray-600">عدد المتابعين</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg text-[#D71313]">90</p>
                                    <p className="text-gray-600">عدد الوصفات</p>
                                </div>
                            </div>

                            <div className="flex justify-between mt-4 gap-2">
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
        </PageWrapper>
    );
};

export default AllChefs;