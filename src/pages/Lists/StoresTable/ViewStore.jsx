import React, { useState, useEffect } from "react";
import apiClient from "../../../utils/ApiClient";
import { useParams, useNavigate } from "react-router";
import { FaSnapchatGhost, FaTiktok } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { PiGlobeThin } from "react-icons/pi";
import Button from "./../../../components/shared/Buttons/Button";

const timeOptions = [
  { label: "12:00 ص", value: "2025-06-12T00:00:00.000Z" },
  { label: "1:00 ص", value: "2025-06-12T01:00:00.000Z" },
  { label: "2:00 ص", value: "2025-06-12T02:00:00.000Z" },
  { label: "3:00 ص", value: "2025-06-12T03:00:00.000Z" },
  { label: "4:00 ص", value: "2025-06-12T04:00:00.000Z" },
  { label: "5:00 ص", value: "2025-06-12T05:00:00.000Z" },
  { label: "6:00 ص", value: "2025-06-12T06:00:00.000Z" },
  { label: "7:00 ص", value: "2025-06-12T07:00:00.000Z" },
  { label: "8:00 ص", value: "2025-06-12T08:00:00.000Z" },
  { label: "9:00 ص", value: "2025-06-12T09:00:00.000Z" },
  { label: "10:00 ص", value: "2025-06-12T10:00:00.000Z" },
  { label: "11:00 ص", value: "2025-06-12T11:00:00.000Z" },
  { label: "12:00 م", value: "2025-06-12T12:00:00.000Z" },
  { label: "1:00 م", value: "2025-06-12T13:00:00.000Z" },
  { label: "2:00 م", value: "2025-06-12T14:00:00.000Z" },
  { label: "3:00 م", value: "2025-06-12T15:00:00.000Z" },
  { label: "4:00 م", value: "2025-06-12T16:00:00.000Z" },
  { label: "5:00 م", value: "2025-06-12T17:00:00.000Z" },
  { label: "6:00 م", value: "2025-06-12T18:00:00.000Z" },
  { label: "7:00 م", value: "2025-06-12T19:00:00.000Z" },
  { label: "8:00 م", value: "2025-06-12T20:00:00.000Z" },
  { label: "9:00 م", value: "2025-06-12T21:00:00.000Z" },
  { label: "10:00 م", value: "2025-06-12T22:00:00.000Z" },
  { label: "11:00 م", value: "2025-06-12T23:00:00.000Z" },
];

const ViewStore = () => {
  const { id: storeId } = useParams();
  const navigate = useNavigate();

  // Loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [store, setStore] = useState(null);

  // Form states
  const [workTimeType, setWorkTimeType] = useState("");
  const [selectedMealTimes, setSelectedMealTimes] = useState([]);
  const [selectedAdditionalInfo, setSelectedAdditionalInfo] = useState([]);

  // تحميل البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchStoreData = async () => {
      if (!storeId) {
        setError("معرف المتجر غير متوفر");
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching store data for ID: ${storeId}`);
        const token = localStorage.getItem("token");

        if (!token) {
          setError("رمز الدخول غير متوفر، يرجى تسجيل الدخول مرة أخرى");
          setLoading(false);
          return;
        }

        // استخدام واجهة API المخصصة للمتجر الفردي
        const response = await apiClient.get(`/store/${storeId}`);

        if (!response || !response.data) {
          throw new Error("لا توجد بيانات في استجابة الخادم");
        }

        const storeData = response.data;
        console.log("Store data fetched successfully:", storeData);

        setStore(storeData);

        // Set meal types
        if (storeData.mealType && Array.isArray(storeData.mealType)) {
          setSelectedMealTimes([...storeData.mealType]);
        }

        // Set additional info
        if (storeData.additionalInfo) {
          const additionalInfoValues = [];
          if (storeData.additionalInfo.indoorSessions === true)
            additionalInfoValues.push("indoorSessions");
          if (storeData.additionalInfo.hasDelivery === true)
            additionalInfoValues.push("hasDelivery");
          if (storeData.additionalInfo.familySessions === true)
            additionalInfoValues.push("familySessions");
          if (storeData.additionalInfo.outdoorSessions === true)
            additionalInfoValues.push("outdoorSessions");
          if (storeData.additionalInfo.preBooking === true)
            additionalInfoValues.push("preBooking");

          setSelectedAdditionalInfo([...additionalInfoValues]);
        }

        // Set work time type
        if (storeData.shifts && Array.isArray(storeData.shifts)) {
          if (storeData.shifts.length === 0) {
            setWorkTimeType("open");
          } else if (storeData.shifts.length === 1) {
            setWorkTimeType("single");
          } else {
            setWorkTimeType("double");
          }
        }
      } catch (error) {
        console.error("Error fetching store data:", error);

        let errorMessage = "حدث خطأ أثناء تحميل بيانات المتجر";

        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = "لم يتم العثور على المتجر المطلوب";
          } else if (error.response.status === 403) {
            errorMessage = "ليس لديك صلاحية للوصول إلى هذا المتجر";
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          }
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [storeId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-1 rounded-full animate-spin mb-6"></div>
          <div className="text-gray-700 text-xl">
            جاري تحميل بيانات المتجر...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="bg-red-100 text-red-700 p-6 rounded-md max-w-md text-center">
            <h2 className="text-xl font-bold mb-2">خطأ</h2>
            <p>{error}</p>
            <Button
              label="العودة للقائمة"
              className="mt-4 !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
              type="button"
              onClick={() => navigate("/list")}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex justify-center items-center">
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
            لم يتم العثور على بيانات لهذا المتجر
          </div>
        </div>
      </div>
    );
  }

  // Helper function to format time
  const formatTime = (timeString) => {
    if (!timeString) return "غير محدد";

    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString("ar", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return timeString;
    }
  };

  // Helper function to get delivery app name
  const getDeliveryAppName = (key) => {
    const names = {
      keeta: "كيتا",
      hungerStation: "هنقرستيشن",
      toyou: "تو يو",
      mrsool: "مرسول",
      theChefz: "ذا شيفز",
      mrMandoob: "مستر مندوب",
      shgardi: "شقردي",
      uber: "أوبر",
      careem: "كريم",
      noon: "نون",
      jahez: "جاهز",
      other: "أخرى",
    };

    return names[key] || key;
  };

  // Helper function to get meal type name
  const getMealTypeName = (type) => {
    const names = {
      breakfast: "فطار",
      "late-breakfast": "فطور متاخر",
      lunch: "غداء",
      dinner: "عشاء",
    };

    return names[type] || type;
  };

  // Helper function to format phone number (remove +966 prefix if exists)
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "غير محدد";

    // If the phone number starts with +966, remove it
    if (phoneNumber.startsWith("+966")) {
      return phoneNumber.substring(4); // Remove first 4 characters (+966)
    }

    return phoneNumber; // Return as is if not starting with +966
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[90rem] p-16 rounded-xl">
          <div className="flex justify-end items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-700">
              عرض بيانات المتجر
            </h2>
          </div>

          <div className="mb-10 relative">
            <div className="relative bg-gray-300 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden">
              {store.coverPicture ? (
                <img
                  src={store.coverPicture}
                  alt="صورة الغلاف"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500">لا توجد صورة غلاف</div>
              )}
            </div>

            <div className="absolute -bottom-8 right-5 w-40 h-40 bg-gray-100 rounded-full border flex justify-center items-center shadow-lg overflow-hidden">
              {store.profilePicture ? (
                <img
                  src={store.profilePicture}
                  alt="الصورة الشخصية"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500 text-sm text-center">
                  لا توجد صورة شخصية
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 space-y-14 mx-auto max-w-full">
            {/* البيانات الأساسية */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              {/* رقم التواصل للطلبات */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  رقم التواصل للطلبات
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md text-xl">
                  {formatPhoneNumber(store.deliveryPhone)}
                </div>
              </div>

              {/* رقم التواصل مع الإدارة */}
              <div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    رقم التواصل مع الإدارة
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md text-xl">
                    {formatPhoneNumber(store.contactPhone)}
                  </div>
                </div>
                <p className="text-primary-1 text-sm mt-2">
                  الرقم لا يتم نشره أو عرضه للمستخدمين و إنما وسيلة للتواصل بين
                  الموقع والشيف
                </p>
              </div>

              {/* الاسم التجاري */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  الاسم التجاري
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md text-xl">
                  {store.name || "غير محدد"}
                </div>
              </div>
            </div>

            {/* الوصف */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-10 text-right">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  وصف مختصر عن المتجر
                </label>
                <div className="w-full h-36 px-6 py-4 bg-gray-50 border border-gray-300 rounded-md text-xl overflow-auto">
                  {store.description || "غير محدد"}
                </div>
              </div>
            </div>

            {/* المعلومات الإضافية */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              {/* المنطقة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  المنطقة
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                  {store.region === "Riyadh"
                    ? "الرياض"
                    : store.region === "Al-Qassim"
                    ? "القصيم"
                    : store.region || "غير محدد"}{" "}
                </div>
              </div>

              {/* المدينة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  المدينة
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                  {store.city === "Al-Kharj"
                    ? "الخرج"
                    : store.city === "Al-Badayea"
                    ? "البدائع"
                    : store.city || "غير محدد"}{" "}
                </div>
              </div>

              {/* نوع المتجر */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  نوع المتجر
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                  {store.type === "restaurant"
                    ? "مطعم"
                    : store.type === "patisserie"
                    ? "معجنات"
                    : store.type === "health"
                    ? "صحي"
                    : store.type === "icecream"
                    ? "ايس كريم"
                    : store.type || "غير محدد"}
                </div>
              </div>

              {/* رخصة بلدي */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  رخصة بلدي
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                  {store.licenseFile ? (
                    <a
                      href={store.licenseFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      عرض الملف
                    </a>
                  ) : (
                    "لم يتم تحميل ملف"
                  )}
                </div>
              </div>

              {/* عنوان وطني */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  عنوان وطني
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                  {store.nationalAddressFile ? (
                    <a
                      href={store.nationalAddressFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      عرض الملف
                    </a>
                  ) : (
                    "لم يتم تحميل ملف"
                  )}
                </div>
              </div>

              {/* تأسس منذ عام */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  تأسس منذ عام
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                  {store.since || "غير محدد"}
                </div>
              </div>

              {/* صورة المنيو */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  صورة المنيو
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                  {store.menuPhoto ? (
                    <a
                      href={store.menuPhoto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      عرض الملف
                    </a>
                  ) : (
                    "لم يتم تحميل ملف"
                  )}
                </div>
              </div>

              {/* الرقم الضريبي */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  الرقم الضريبي
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                  {store.taxNumber || "غير محدد"}
                </div>
              </div>

              {/* سجل تجاري */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  سجل تجاري
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                  {store.commercialRegisterPhoto ? (
                    <a
                      href={store.commercialRegisterPhoto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      عرض الملف
                    </a>
                  ) : (
                    "لم يتم تحميل ملف"
                  )}
                </div>
              </div>

              {store.socialMediaLinks &&
                Object.keys(store.socialMediaLinks).map((key) => {
                  if (!store.socialMediaLinks[key]) return null;

                  let label, icon;
                  switch (key) {
                    case "whatsappNumber":
                      label = "رقم واتساب";
                      icon = (
                        <IoLogoWhatsapp className="text-gray-700 text-xl mr-2" />
                      );
                      break;
                    case "facebook":
                      label = "رابط فيسبوك";
                      icon = (
                        <TiSocialFacebook className="text-gray-700 text-xl mr-2" />
                      );
                      break;
                    case "snapchat":
                      label = "رابط سناب شات";
                      icon = (
                        <FaSnapchatGhost className="text-gray-700 text-xl mr-2" />
                      );
                      break;
                    case "x":
                      label = "رابط اكس";
                      icon = (
                        <RiTwitterXFill className="text-gray-700 text-xl mr-2" />
                      );
                      break;
                    case "instagram":
                      label = "رابط انستغرام";
                      icon = (
                        <GrInstagram className="text-gray-700 text-xl mr-2" />
                      );
                      break;
                    case "tiktok":
                      label = "رابط تيك توك";
                      icon = (
                        <FaTiktok className="text-gray-700 text-xl mr-2" />
                      );
                      break;
                    case "website":
                      label = "رابط الموقع الإلكتروني";
                      icon = (
                        <PiGlobeThin className="text-gray-700 text-xl mr-2" />
                      );
                      break;
                    default:
                      label = key;
                      icon = null;
                  }

                  return (
                    <div key={`social-${key}`}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                        {label}
                      </label>
                      <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                        <div className="flex justify-between items-center w-full">
                          {key === "whatsappNumber" ? (
                            <span className="text-left pl-4">
                              {formatPhoneNumber(store.socialMediaLinks[key])}
                            </span>
                          ) : (
                            <a
                              href={store.socialMediaLinks[key]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline truncate text-left pl-4"
                            >
                              {store.socialMediaLinks[key]}
                            </a>
                          )}
                          {icon}
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/* رابط المتجر على الخريطة */}
              {store.mapLink && (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    رابط المتجر علي خريطة جوجل
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                    <div className="flex justify-between items-center w-full">
                      <a
                        href={store.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate text-left pl-4"
                      >
                        فتح في خرائط جوجل
                      </a>
                      <MdOutlineLocationOn className="text-gray-700 text-xl mr-2" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* بيانات التوصيل */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold mb-6 text-right">
                تطبيقات التوصيل
              </h3>

              {store.mainDeliveryApp && (
                <div className="mb-4 text-right">
                  <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full mb-2 text-sm">
                    التطبيق الرئيسي: {getDeliveryAppName(store.mainDeliveryApp)}
                  </div>
                </div>
              )}

              {store.deliveryAppLinks &&
              Object.keys(store.deliveryAppLinks).length > 0 ? (
                <div
                  dir="rtl"
                  className="text-right gap-4 md:grid-cols-3 grid-cols-1 grid"
                >
                  {Object.entries(store.deliveryAppLinks).map(
                    ([key, value]) => {
                      if (!value) return null;

                      return (
                        <div key={`delivery-app-${key}`}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                            {getDeliveryAppName(key)}
                          </label>
                          <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                            <a
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline truncate"
                            >
                              {value}
                            </a>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="text-gray-500 text-right">
                  لم يتم تحديد تطبيقات توصيل
                </div>
              )}
            </div>

            {/* نوع الوجبة */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold mb-6 text-right">نوع الوجبة</h3>
              <div className="flex flex-wrap gap-3 justify-end">
                {store.mealType && store.mealType.length > 0 ? (
                  store.mealType.map((meal, index) => (
                    <div
                      key={`meal-${meal}-${index}`}
                      className="bg-primary-1 text-white px-4 py-2 rounded-md text-sm"
                    >
                      {getMealTypeName(meal)}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">
                    لم يتم تحديد أنواع الوجبات
                  </div>
                )}
              </div>
            </div>

            {/* نظام أوقات العمل */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold mb-6 text-right">
                نظام أوقات العمل
              </h3>
              <div className="mb-6 text-right">
                <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md inline-block">
                  {workTimeType === "open"
                    ? "مفتوح 7 / 24"
                    : workTimeType === "double"
                    ? "دوامين"
                    : workTimeType === "single"
                    ? "دوام"
                    : "غير محدد"}
                </div>
              </div>

              {store.shifts && store.shifts.length > 0 && (
                <div className="space-y-6">
                  {store.shifts.map((shift, index) => (
                    <div
                      key={`shift-${index}`}
                      className="bg-gray-50 border border-gray-200 rounded-md p-4"
                    >
                      <h4 className="font-medium text-gray-700 mb-3 text-right">
                        {index === 0
                          ? "وقت عمل الدوام الأول"
                          : "وقت عمل الدوام الثاني"}
                      </h4>
                      <div className="flex justify-end gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">إلى</span>
                          <span className="bg-gray-100 px-3 py-1 rounded-md">
                            {formatTime(shift.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">من</span>
                          <span className="bg-gray-100 px-3 py-1 rounded-md">
                            {formatTime(shift.startTime)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* معلومات أخرى */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold mb-6 text-right">
                معلومات أخرى
              </h3>
              <div className="flex flex-wrap gap-3 justify-end">
                {selectedAdditionalInfo.length > 0 ? (
                  <>
                    {selectedAdditionalInfo.includes("preBooking") && (
                      <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm">
                        يوجد حجز مسبق
                      </div>
                    )}
                    {selectedAdditionalInfo.includes("familySessions") && (
                      <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm">
                        جلسات عائلية
                      </div>
                    )}
                    {selectedAdditionalInfo.includes("hasDelivery") && (
                      <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm">
                        يوجد توصيل
                      </div>
                    )}
                    {selectedAdditionalInfo.includes("outdoorSessions") && (
                      <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm">
                        جلسات خارجية
                      </div>
                    )}
                    {selectedAdditionalInfo.includes("indoorSessions") && (
                      <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm">
                        جلسات داخلية
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-gray-500">
                    لم يتم تحديد معلومات إضافية
                  </div>
                )}
              </div>
            </div>

            {/* زر العودة */}
            <div className="flex justify-center mt-12 pt-12">
              <div className="flex gap-4 w-full max-w-2xl justify-center">
                <Button
                  label="العودة للقائمة"
                  className="flex-1 h-[55px] !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
                  type="button"
                  onClick={() => navigate("/list")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStore;
