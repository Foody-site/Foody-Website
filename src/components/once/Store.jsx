import { useEffect, useState } from "react";
import axios from "axios";
import CategoryTabs from "../shared/category/CategoryTabs";
import FoodCard from "../shared/cards/FoodCard";
import { api_url } from "../../utils/ApiClient";
import Pagination from "../common/Pagination";

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
            const baseParams = {
                page,
                take: 9,
                type,
            };

            if (searchTerm && typeof searchTerm === "object") {
                const {
                    name,
                    rating,
                    city,
                    region,
                    indoorSessions,
                    outdoorSessions,
                    familySessions,
                    hasDelivery,
                    isOpen,
                    newStore,
                    preBooking,
                    breakfast,
                    lateBreakfast,
                    lunch,
                    dinner,
                    meals
                } = searchTerm;

                if (name) baseParams.name = name;
                if (rating) baseParams.rate = rating;
                if (city) baseParams.city = city;
                if (region) baseParams.region = region;

                if (indoorSessions) baseParams.indoorSessions = true;
                if (outdoorSessions) baseParams.outdoorSessions = true;
                if (familySessions) baseParams.familySessions = true;
                if (hasDelivery) baseParams.hasDelivery = true;
                if (isOpen) baseParams.isOpen = true;
                if (newStore) baseParams.newStore = true;
                if (preBooking) baseParams.preBooking = true;

                if (breakfast) baseParams.breakfast = true;
                if (lateBreakfast) baseParams.lateBreakfast = true;
                if (lunch) baseParams.lunch = true;
                if (dinner) baseParams.dinner = true;

                if (Array.isArray(meals) && meals.length > 0) {
                    baseParams.meals = meals.join(",");
                }

                const deliveryAppKeys = [
                    "keeta", "hungerStation", "toyou", "mrsool", "theChefz",
                    "mrMandoob", "shgardi", "uber", "careem", "noon", "jahez", "other"
                ];

                deliveryAppKeys.forEach((app) => {
                    if (searchTerm[app]) baseParams[app] = true;
                });
            }

            const response = await axios.get(`${api_url}/store`, { params: baseParams });
            const data = response?.data?.data || [];
            const pag = response?.data?.pagination || {};

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
                        <FoodCard key={store._id} store={store} />
                    ))
                ) : (
                    <p className="text-center w-full mt-4">
                        لا توجد متاجر متاحة حاليًا.
                    </p>
                )}
            </div>

            <Pagination pagination={pagination} setPage={setPage} />
        </div>
    );
};

export default Store;