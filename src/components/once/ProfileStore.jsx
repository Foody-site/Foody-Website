import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiClient from "../../utils/ApiClient";
import PageWrapper from "../common/PageWrapper";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchatGhost,
  FaStar,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { MdVerified } from "react-icons/md";
import FavoriteButton from "../shared/Favourites/FavouriteStore";
import StoreShare from "../shared/Share/StoreShare";
import careem from "/assets/store/careem.webp";
import chefz from "/assets/store/chefz.webp";
import hungerStation from "/assets/store/hungerStation.webp";
import jahez from "/assets/store/jahez.webp";
import keeta from "/assets/store/keeta.webp";
import mandoob from "/assets/store/mandoob.webp";
import marsool from "/assets/store/marsool.webp";
import noon from "/assets/store/noon.webp";
import shgardi from "/assets/store/shgardi.webp";
import toYou from "/assets/store/toYou.webp";
import uber from "/assets/store/uber.webp";
import StoreReview from "../shared/reviews/StoreReview";
import MakeReview from "../shared/reviews/MakeReview";
import AllMeals from "./AllMeals";

const deliveryAppIcons = {
  keeta,
  hungerStation,
  toYou,
  mrsool: marsool,
  theChefz: chefz,
  mrMandoob: mandoob,
  shgardi,
  uber,
  careem,
  noon,
  jahez,
};

const ProfileStore = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshReviewsTrigger, setRefreshReviewsTrigger] = useState(0);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await apiClient.get(`/store/${id}`);
        setStore(response.data);
      } catch (err) {
        setError("فشل تحميل بيانات المتجر.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStore();
  }, [id]);

  if (loading)
    return (
      <PageWrapper>
        <p className="text-center mt-4">...جاري التحميل</p>
      </PageWrapper>
    );
  if (error)
    return (
      <PageWrapper>
        <p className="text-center text-red-500 mt-4">{error}</p>
      </PageWrapper>
    );
  if (!store) return null;

  const social = store.socialMediaLinks || {};
  const deliveryApps = store.deliveryAppLinks || {};
  const additionalInfo = store.additionalInfo || {};
  const mainDeliveryAppLink = Object.entries(deliveryApps).find(
    ([_, v]) => v
  )?.[1];
  const mainDeliveryAppName = Object.entries(deliveryApps).find(
    ([_, v]) => v
  )?.[0];

    return (
        <PageWrapper>
            <div className="flex flex-col lg:flex-row gap-6 mt-6">

                {/* Right Panel - Placeholder */}
                <div className="w-full lg:w-2/3">
                    <div className="p-6 border rounded-2xl text-center text-gray-500">
                        لا توجد وجبات لعرضها حالياً
                    </div>

          <StoreReview refreshTrigger={refreshReviewsTrigger} />
        </div>

        {/* Left Panel - Store Info */}
        <div className="w-full lg:w-1/3 h-fit text-right">
          <div className="bg-white rounded-2xl border border-[#C7C7C7] px-4 py-2">
            {/* Logo + Name */}
            <div className="flex flex-row items-center justify-between">
              {/* Store Header */}
              <div className="flex items-center justify-between mb-2">
                {store.averageRating > 0 && (
                  <div className="flex items-center gap-1 border border-[#C7C7C7] text-[#030303] text-xs font-bold px-2 py-1 rounded">
                    <FaStar className="text-[#FFDB43] text-sm" />{" "}
                    {store.averageRating.toFixed(1)}
                  </div>
                )}
              </div>
              <div className="flex flex-row-reverse">
                <img
                  src={
                    store.profilePicture || "https://via.placeholder.com/150"
                  }
                  alt="Store Logo"
                  className="w-24 h-24 rounded object-cover"
                />
                <div className="flex flex-col me-2">
                  <h2 className="mt-3 font-bold text-lg text-gray-800 flex items-center justify-center gap-1">
                    {store.name}
                    {store.isVerified && (
                      <MdVerified className="text-primary-1" />
                    )}
                  </h2>
                  <p className="text-sm text-[#808080]">
                    {store.type || "مطعم"}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#808080] mt-2">
              {store.description || "وصف عن المتجر هنا"}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-row-reverse gap-2 mt-4">
              <MakeReview
                isUserRated={store.isUserRated}
                initialRating={store.userRating}
                initialComment={store.userComment}
                onSuccess={() => setRefreshReviewsTrigger((prev) => prev + 1)}
              />
              {store.mapLink && (
                <a
                  href={store.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 text-sm rounded text-primary-1 border border-primary-1 bg-white text-center"
                >
                  الموقع
                </a>
              )}
            </div>

            {/* Other Delivery Apps */}
            {Object.values(deliveryApps).filter(Boolean).length > 1 && (
              <div className="mt-4 border border-[#C7C7C7] p-4 rounded-md">
                <p className="text-sm text-[#808080] mb-2">تطبيقات التوصيل</p>

                {mainDeliveryAppLink && (
                  <div className="my-4">
                    <a
                      href={mainDeliveryAppLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 text-sm rounded bg-primary-1 text-white block hover:bg-red-700 text-center"
                    >
                      {mainDeliveryAppName || "تطبيق التوصيل"}
                    </a>
                  </div>
                )}

                <div className="grid grid-cols-6 gap-3 justify-end" dir="rtl">
                  {Object.entries(deliveryApps)
                    .filter(([name, link]) => link && deliveryAppIcons[name])
                    .map(([name, link]) => (
                      <a
                        key={name}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 flex items-end justify-between rounded-lg"
                      >
                        <img
                          src={deliveryAppIcons[name]}
                          alt={name}
                          className="w-10 h-10 object-contain rounded-lg"
                        />
                      </a>
                    ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="mt-4 space-y-3">
              <div className="p-3 rounded border border-[#C7C7C7]">
                <p className="text-[#808080] text-sm">رقم التواصل للطلبات</p>
                <p className="font-bold text-lg text-[#030303]">
                  {store.deliveryPhone || "—"}
                </p>
              </div>
              <div className="p-3 rounded border border-[#C7C7C7]">
                <p className="text-[#808080] text-sm">المسافة</p>
                <p className="font-bold text-lg text-[#030303]">12Km</p>
              </div>
              <div className="p-3 rounded border border-[#C7C7C7]">
                <p className="text-[#808080] text-sm">معلومات أخرى</p>
                <p className="font-bold text-sm text-[#030303] whitespace-pre-line">
                  {Object.entries(additionalInfo)
                    .filter(([_, value]) => value)
                    .map(([key]) => {
                      switch (key) {
                        case "indoorSessions":
                          return "جلسات داخلية";
                        case "familySessions":
                          return "جلسات عائلية";
                        case "outdoorSessions":
                          return "جلسات خارجية";
                        case "preBooking":
                          return "يوجد حجز مسبق";
                        case "carRequest":
                          return "طلبات بالسيارة";
                        case "hasDelivery":
                          return "خدمة توصيل";
                        default:
                          return null;
                      }
                    })
                    .filter(Boolean)
                    .join(" - ") || "لا توجد معلومات إضافية"}
                </p>
              </div>
            </div>
          </div>

          {/* Likes & Shares */}
          <div className="mt-4 space-y-3 border border-[#C7C7C7] p-4 rounded-md">
            <div className="flex flex-row-reverse items-center gap-3">
              <FavoriteButton
                itemId={store.id}
                isInitiallyFavorited={store.isFavorited}
                onUnfavorite={() =>
                  setStore((prev) => ({
                    ...prev,
                    isFavorited: false,
                    favoritesCount: Math.max((prev.favoritesCount || 1) - 1, 0),
                  }))
                }
                onFavorite={() =>
                  setStore((prev) => ({
                    ...prev,
                    isFavorited: true,
                    favoritesCount: (prev.favoritesCount || 0) + 1,
                  }))
                }
              />
              <div className="flex flex-row-reverse justify-between items-center flex-1 border border-[#C7C7C7] rounded-md p-3">
                <p className="text-[#808080] text-sm">الاعجابات</p>
                <span className="text-[#808080] font-semibold text-base">
                  {store.favoritesCount || 0}
                </span>
              </div>
            </div>
            <div className="flex flex-row-reverse items-center gap-3">
              <StoreShare
                storeId={store.id}
                onShare={() =>
                  setStore((prev) => ({
                    ...prev,
                    totalShares: (prev.totalShares || 0) + 1,
                  }))
                }
              />
              <div className="flex flex-row-reverse justify-between items-center flex-1 border border-[#C7C7C7] rounded-md p-3">
                <p className="text-[#808080] text-sm">المشاركة بواسطة</p>
                <span className="text-[#808080] font-semibold text-base">
                  {store.totalShares || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Social Media Icons at Bottom */}
          <div className="flex flex-col border border-[#C7C7C7] p-4 rounded-md mt-3">
            <h2 className="text-[#808080] text-sm">تواصل معنا</h2>
            <div className="flex justify-between flex-wrap gap-2 mt-6">
              {social.whatsappNumber && (
                <a
                  href={`https://wa.me/${social.whatsappNumber.replace(
                    /\D/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-green-50"
                >
                  <FaWhatsapp className="text-green-500" />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-blue-50"
                >
                  <FaFacebook className="text-blue-600" />
                </a>
              )}
              {social.x && (
                <a
                  href={social.x}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-gray-100"
                >
                  <FaTwitter className="text-gray-600" />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-pink-50"
                >
                  <FaInstagram className="text-pink-500" />
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-red-50"
                >
                  <FaYoutube className="text-red-600" />
                </a>
              )}
              {social.tiktok && (
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-black text-black hover:text-white"
                >
                  <SiTiktok />
                </a>
              )}
              {social.snapchat && (
                <a
                  href={social.snapchat}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-yellow-100"
                >
                  <FaSnapchatGhost className="text-yellow-500" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfileStore;
