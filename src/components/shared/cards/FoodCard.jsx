import {
    FaHeart,
    FaCog,
    FaMapMarkerAlt,
    FaStar,
    FaInfoCircle,
    FaCheckCircle,
} from "react-icons/fa";

const FoodCard = ({ store }) => {
    return (
        <div className="relative w-[300px] bg-white rounded-2xl overflow-hidden shadow-lg font-sans">
            <div className="relative">
                <img
                    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                    alt="Food Banner"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <button className="bg-white p-2 rounded-full shadow text-red-500">
                        <FaHeart />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow text-red-500">
                        <FaCog />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                        <FaCheckCircle className="text-red-600 text-sm" />
                        <h3 className="font-bold text-black text-lg">{store.name}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm text-gray-500 font-semibold">
                            {store.averageRating || 0}
                        </span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-2">{store.description}</p>

                <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
                    <FaInfoCircle />
                    <span>مفتوح الآن</span>
                    <div className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        <span>{store.city}</span>
                    </div>
                </div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm">
                    المزيد من التفاصيل
                </button>
            </div>
        </div>
    );
};

export default FoodCard;