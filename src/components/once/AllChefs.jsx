import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../utils/ApiClient";
import PageWrapper from "../common/PageWrapper";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

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

            <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
                {Array.isArray(chefs) &&
                    chefs.map((chef) => (
                        <div key={chef.id} className="card text-center">
                            {/* <img
                                src={chef.profilePicture}
                                alt={chef.name}
                                className="mx-auto rounded-full"
                                style={{ width: 130, height: 130, objectFit: "cover" }}
                            /> */}
                            <Link to={`/chef/${chef.id}`} key={chef.id} className="card text-center">
                                <img
                                    src={chef.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(chef.name)}&background=D71313&color=fff&size=130`}
                                    alt={chef.name}
                                    className="mx-auto rounded-full"
                                    style={{ width: 130, height: 130, objectFit: "cover" }}
                                />
                                <p className="mt-2">{chef.name}</p>
                            </Link>
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