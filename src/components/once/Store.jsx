import { useEffect, useState } from "react";
import axios from "axios";
import CategoryTabs from "../shared/category/CategoryTabs";
import FoodCard from "../shared/cards/FoodCard";
import { api_url } from "../../utils/ApiClient";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Store = ({ searchTerm }) => {
    const [stores, setStores] = useState([]);
    const [page, setPage] = useState(1);
    const [type, setType] = useState("restaurant");
    const [pagination, setPagination] = useState({
        hasNextPage: false,
        hasPreviousPage: false,
        currentPage: 1,
        totalPages: 1,
    });

    useEffect(() => {
        fetchStores();
    }, [type, page, searchTerm]);

    const fetchStores = async () => {
        try {
            const response = await axios.get(`${api_url}/store`, {
                params: {
                    page,
                    take: 10,
                    type,
                    ...(typeof searchTerm === "string"
                        ? { name: searchTerm }
                        : {
                            name: searchTerm?.name || "",
                            rating: searchTerm?.rating ?? 0,
                        }),
                }
            });

            const data = response?.data?.data || [];
            const pag = response?.data?.pagination || {
                hasNextPage: false,
                hasPreviousPage: false,
                currentPage: 1,
                totalPages: 1,
            };

            setStores(data);
            setPagination(pag);
        } catch (error) {
            console.error("Error fetching stores", error);
            setStores([]);
            setPagination({
                hasNextPage: false,
                hasPreviousPage: false,
                currentPage: 1,
                totalPages: 1,
            });
        }
    };

    const handleCategoryChange = (newType) => {
        setType(newType);
        setPage(1);
    };

    return (
        <div className="p-4">
            <CategoryTabs onCategoryChange={handleCategoryChange} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {stores.length > 0 ? (
                    stores.map((store) => (
                        <FoodCard key={store.id} store={store} />
                    ))
                ) : (
                    <p className="text-center w-full mt-4">
                        لا توجد متاجر متاحة حاليًا.
                    </p>
                )}
            </div>

            <div className="flex justify-center mt-6 gap-2">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={!pagination?.hasPreviousPage}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    <IoIosArrowDropleft />
                </button>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!pagination?.hasNextPage}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    <IoIosArrowDropright />
                </button>
            </div>
        </div>
    );
};

export default Store;