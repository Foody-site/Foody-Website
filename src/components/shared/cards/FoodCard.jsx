import { useNavigate } from "react-router";
import {
    BiSolidOffer,
    BiSolidTimer,
} from "react-icons/bi";
import {
    FaMapMarkerAlt,
    FaStar,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import FavoriteButton from "../Favourites/FavouriteStore";
import StoreShare from "../Share/StoreShare";

const FoodCard = ({ store }) => {
    const navigate = useNavigate();

    const handleDetails = () => {
        if (store?.id) navigate(`/store/${store.id}`);
    };

    return (
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg font-sans">
            {/* Banner */}
            <div className="relative">
                <img
                    src={store.coverPicture || "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"}
                    alt="Food Banner"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <button className="text-white p-2 rounded-md shadow bg-primary-1">
                        <BiSolidOffer />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title + Rating */}
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                        <h3 className="font-bold text-black text-lg line-clamp-1">
                            {store.name || "اسم المتجر"}
                        </h3>
                        <MdVerified size={18} className="text-primary-1" />
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
                        <FaStar className="text-yellow-500 text-sm" />
                        <span className="text-sm text-gray-800 font-semibold">
                            {store.averageRating || 2.5}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                    {store.description || "ماكولات سريعة - مشروبات - بيتزا"}
                </p>

                {/* Status + Distance */}
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1 text-[#C7C7C7] border border-[#C7C7C7] px-2 py-0.5 rounded">
                        <BiSolidTimer size={16} />
                        <span>مفتوح الآن</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#C7C7C7] border border-[#C7C7C7] px-2 py-0.5 rounded">
                        <FaMapMarkerAlt />
                        <span>{store.distance || "2Km"}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center gap-2">
                    <FavoriteButton
                        itemId={store.id}
                        isInitiallyFavorited={store.isFavorited === true}
                    />
                    <button
                        onClick={handleDetails}                // ⬅️ 4) ربط الحدث
                        className="flex-1 bg-primary-1 hover:bg-red-700 text-white py-2 rounded-lg text-sm"
                    >
                        المزيد من التفاصيل
                    </button>
                    <StoreShare storeId={store.id} />
                </div>
            </div>
        </div>
    );
};

export default FoodCard;