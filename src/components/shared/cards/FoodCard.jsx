import { useNavigate } from "react-router";
import { BiSolidOffer, BiSolidTimer } from "react-icons/bi";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import FavoriteButton from "../Favourites/FavouriteStore";
import StoreShare from "../Share/StoreShare";
import { useState, useEffect } from "react";
import {
  calculateDistance,
  formatDistance,
  getUserLocation,
  getStoreStatus,
  hasValidShifts,
  hasValidDistance,
  DEFAULT_LOCATION,
} from "../../../utils/LocationUtils";

const FoodCard = ({ store = {}, loading = false, onUnfavorite }) => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [calculatedDistance, setCalculatedDistance] = useState(null);

  // جلب موقع المستخدم
  useEffect(() => {
    getUserLocation()
      .then((location) => {
        setUserLocation(location);
      })
      .catch((error) => {
        console.log("Error getting user location:", error);
        // استخدام الموقع الافتراضي
        setUserLocation(DEFAULT_LOCATION);
      });
  }, []);

  // حساب المسافة عندما يتوفر موقع المستخدم وموقع المتجر
  useEffect(() => {
    if (
      userLocation &&
      store.location &&
      store.location.coordinates &&
      store.location.coordinates.length === 2
    ) {
      const [storeLng, storeLat] = store.location.coordinates;
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        storeLat,
        storeLng
      );
      setCalculatedDistance(distance);
    }
  }, [userLocation, store.location]);

  const handleDetails = () => {
    if (store?.id) navigate(`/store/${store.id}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg h-72 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg font-sans text-right">
      {/* Banner */}
      <div className="relative">
        <img
          src={
            store.profilePicture ||
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          }
          alt="Food Banner"
          className="w-full h-48 object-cover"
        />
        {store.hasOffer && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <button className="text-white p-2 rounded-md shadow bg-primary-1">
              <BiSolidOffer />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title + Rating */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex flex-row-reverse items-center gap-1 border border-gray-300 px-2 py-0.5 rounded">
            <FaStar className="text-[#FFDB43] text-sm" />
            <span className="text-sm text-[#FFDB43] font-semibold">
              {store.averageRating}
            </span>
          </div>

          <div className="flex items-center gap-1 min-w-0">
            <MdVerified size={18} className="text-primary-1 flex-shrink-0" />
            <h3
              className="font-bold text-black text-lg truncate"
              style={{ maxWidth: "20ch" }}
            >
              {store.name || "اسم المتجر"}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#A3A3A3] text-right text-sm mb-2 line-clamp-2">
          {store.description || "ماكولات سريعة - مشروبات - بيتزا"}
        </p>

        {/* Status + Distance */}
        <div className="flex justify-end items-center gap-3 mb-3 text-xs text-gray-600">
          {hasValidShifts(store.shifts) && getStoreStatus(store.shifts) && (
            <div className="flex flex-row-reverse items-center gap-1 text-[#C7C7C7] border border-[#C7C7C7] px-2 py-0.5 rounded">
              <BiSolidTimer size={16} />
              <span>{getStoreStatus(store.shifts)}</span>
            </div>
          )}
          {hasValidDistance(calculatedDistance, store.distance) && (
            <div className="flex flex-row-reverse items-center gap-1 text-[#C7C7C7] border border-[#C7C7C7] px-2 py-0.5 rounded">
              <FaMapMarkerAlt />
              <span>
                {calculatedDistance !== null
                  ? formatDistance(calculatedDistance)
                  : store.distance
                  ? `${store.distance}`
                  : "..."}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center gap-2">
          <StoreShare storeId={store.id} />
          <button
            onClick={handleDetails}
            className="flex-1 bg-primary-1 hover:bg-red-700 text-white py-2 rounded-lg text-sm"
          >
            المزيد من التفاصيل
          </button>
          <FavoriteButton
            itemId={store.id}
            isInitiallyFavorited={store.isFavorited === true}
            onUnfavorite={onUnfavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
