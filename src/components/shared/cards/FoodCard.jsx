import {
    FaHeart,
    FaCog,
    FaMapMarkerAlt,
    FaStar,
    FaInfoCircle,
    FaCheckCircle,
    FaShareAlt,
} from "react-icons/fa";

const FoodCard = ({ store }) => {
    return (
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg font-sans">
            <div className="relative">
                <img
                    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                    alt="Food Banner"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <button className="bg-white p-2 rounded-full shadow text-red-500">
                        <FaCog />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                        <FaCheckCircle className="text-red-600 text-sm" />
                        <h3 className="font-bold text-black text-lg">{store.name || "اسم المتجر"}</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
                        <span className="text-yellow-500 text-sm"><FaStar /></span>
                        <span className="text-sm text-gray-800 font-semibold">{store.averageRating || 2.5}</span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-2">{store.description || "ماكولات سريعة - مشروبات - بيتزا"}</p>

                <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                        <FaInfoCircle />
                        <span>مفتوح الآن</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
                        <FaMapMarkerAlt />
                        <span>{store.distance || "2Km"}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center border rounded-lg text-red-500">
                        <FaShareAlt />
                    </button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm">
                        المزيد من التفاصيل
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center border rounded-lg text-red-500">
                        <FaHeart />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;