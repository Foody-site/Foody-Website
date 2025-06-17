import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { TbCameraPlus } from "react-icons/tb";
import Inputs from "../../../components/shared/inputs/Inputs";
import SelectInput from "../../../components/shared/inputs/SelectInput";
import TextAreaInput from "../../../components/shared/inputs/TextAreaInput ";
import { FaSnapchatGhost, FaTiktok } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { PiGlobeThin } from "react-icons/pi";
import MultiCheckBox from "../../../components/shared/inputs/MultiCheckBox";
import WorkTimeRange from "../../../components/shared/inputs/WorkTimeRange";
import Button from "../../../components/shared/Buttons/Button";
import { useNavigate, useParams, useLocation } from "react-router";
import DeliveryForm from "../../../components/shared/form/DeliveryForm";
import CheckBoxWorkRange from "../../../components/shared/inputs/CheckBoxWorkRange";
import { api_url } from "../../../utils/ApiClient";

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

const EditStore = () => {
  // استخدام كل من useParams و useLocation للحصول على معرّف المتجر بعدة طرق
  const { storeId: paramStoreId, id } = useParams();
  const location = useLocation();
  const [storeId, setStoreId] = useState(null);

  const navigate = useNavigate();
  const prevDeliveryDataRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cities, setCities] = useState([]);

  // حالات الصور
  const [coverPicture, setCoverPicture] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentCoverPicture, setCurrentCoverPicture] = useState(null);
  const [currentProfilePicture, setCurrentProfilePicture] = useState(null);

  // حالة بيانات النموذج المنظمة
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    contactPhone: "",
    deliveryPhone: "",
    city: "",
    region: "",
    mapLink: "",
    taxNumber: "",
    since: new Date().getFullYear(),
    selectedMealTimes: [],
    workTimeType: "",
    shift1From: "",
    shift1To: "",
    shift2From: "",
    shift2To: "",
    additionalInfo: [],
    socialMediaLinks: {
      whatsappNumber: "",
      facebook: "",
      snapchat: "",
      x: "",
      instagram: "",
      tiktok: "",
      website: "",
    },
    deliveryData: null,
  });

  // تحديد معرف المتجر من المعلمات المختلفة المتاحة
  useEffect(() => {
    // محاولة الحصول على معرف المتجر من مصادر متعددة
    const searchParams = new URLSearchParams(location.search);
    const urlParamId = searchParams.get("id") || searchParams.get("storeId");

    // استخدم أول معرف صالح تجده
    const validId = paramStoreId || id || urlParamId || location.state?.storeId;

    if (validId) {
      console.log("Store ID found:", validId);
      setStoreId(validId);
    } else {
      console.error("No store ID found in URL parameters or location state!");
      setError("معرف المتجر غير متوفر! يرجى التأكد من الرابط الصحيح.");
      setFetchLoading(false);
    }
  }, [paramStoreId, id, location]);

  // جلب بيانات المتجر بعد تحديد المعرف
  useEffect(() => {
    if (!storeId) return;

    const fetchStoreData = async () => {
      setFetchLoading(true);
      setError("");

      try {
        console.log(`Fetching store data for ID: ${storeId}`);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("لم يتم العثور على رمز المصادقة!");
        }

        // طباعة الـ URL الكامل للتحقق
        const fullUrl = `${api_url}/store/${storeId}`;
        console.log("Fetching from URL:", fullUrl);

        // إرسال طلب GET للحصول على بيانات المتجر
        const response = await axios.get(fullUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response || !response.data) {
          throw new Error("لم يتم استلام بيانات من الخادم!");
        }

        const storeData = response.data;
        console.log("Store data fetched successfully:", storeData);

        // استخراج المعلومات الإضافية إلى مصفوفة
        let additionalInfoArray = [];
        if (storeData.additionalInfo) {
          Object.entries(storeData.additionalInfo).forEach(([key, value]) => {
            if (value === true) {
              additionalInfoArray.push(key);
            }
          });
        }

        // تحديد نوع أوقات العمل
        let workTimeType = "open";
        if (storeData.shifts && storeData.shifts.length > 0) {
          if (storeData.shifts.length === 1) {
            workTimeType = "single";
          } else if (storeData.shifts.length >= 2) {
            workTimeType = "double";
          }
        }

        // إعداد بيانات التوصيل
        const deliveryData = {
          deliveryAppLinks: storeData.deliveryAppLinks || {},
          mainDeliveryApp: storeData.mainDeliveryApp || "",
        };

        // تعيين حالة النموذج
        setFormData({
          name: storeData.name || "",
          description: storeData.description || "",
          type: storeData.type || "",
          contactPhone: storeData.contactPhone || "",
          deliveryPhone: storeData.deliveryPhone || "",
          city: storeData.city || "",
          region: storeData.region || "",
          mapLink: storeData.mapLink || "",
          taxNumber: storeData.taxNumber || "",
          since: storeData.since || new Date().getFullYear(),
          selectedMealTimes: storeData.mealType || [],
          workTimeType: workTimeType,
          shift1From:
            storeData.shifts && storeData.shifts[0]
              ? storeData.shifts[0].startTime
              : "",
          shift1To:
            storeData.shifts && storeData.shifts[0]
              ? storeData.shifts[0].endTime
              : "",
          shift2From:
            storeData.shifts && storeData.shifts[1]
              ? storeData.shifts[1].startTime
              : "",
          shift2To:
            storeData.shifts && storeData.shifts[1]
              ? storeData.shifts[1].endTime
              : "",
          additionalInfo: additionalInfoArray,
          socialMediaLinks: storeData.socialMediaLinks || {
            whatsappNumber: "",
            facebook: "",
            snapchat: "",
            x: "",
            instagram: "",
            tiktok: "",
            website: "",
          },
          deliveryData: deliveryData,
        });

        // تعيين بيانات DeliveryForm
        prevDeliveryDataRef.current = JSON.stringify(deliveryData);

        // تعيين روابط الصور
        if (storeData.coverPicture) {
          setCurrentCoverPicture(storeData.coverPicture);
        }

        if (storeData.profilePicture) {
          setCurrentProfilePicture(storeData.profilePicture);
        }

        // إذا كانت المنطقة موجودة، قم بتحديث المدن
        if (storeData.region) {
          updateCities(storeData.region);
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
        setError(
          `فشل في جلب بيانات المتجر: ${error.message || "خطأ غير معروف"}`
        );
      } finally {
        setFetchLoading(false);
      }
    };

    fetchStoreData();
  }, [storeId]);

  // وظيفة تحديث المدن استنادًا إلى المنطقة
  const updateCities = (region) => {
    switch (region) {
      case "Riyadh":
        setCities([{ value: "Riyadh", label: "الرياض" }]);
        break;
      case "Mecca":
        setCities([{ value: "Mecca", label: "مكة المكرمة" }]);
        break;
      case "Eastern":
        setCities([
          { value: "Dammam", label: "الدمام" },
          { value: "Khobar", label: "الخبر" },
        ]);
        break;
      default:
        setCities([]);
    }
  };

  // معالجة التغييرات في المنطقة
  useEffect(() => {
    if (formData.region) {
      updateCities(formData.region);
    }
  }, [formData.region]);

  // معالجة تحميل صورة الغلاف
  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCoverPicture(file);
      setCurrentCoverPicture(URL.createObjectURL(file));
    } else {
      setError("الرجاء اختيار صورة صحيحة للغلاف!");
    }
  };

  // معالجة تحميل الصورة الشخصية
  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePicture(file);
      setCurrentProfilePicture(URL.createObjectURL(file));
    } else {
      setError("الرجاء اختيار صورة صحيحة للملف الشخصي!");
    }
  };

  // معالجة تغييرات الإدخال
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "region") {
      setFormData((prev) => ({ ...prev, region: value, city: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // معالجة التغيير في أنواع الوجبات
  const handleMealTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      selectedMealTimes: prev.selectedMealTimes.includes(value)
        ? prev.selectedMealTimes.filter((item) => item !== value)
        : [...prev.selectedMealTimes, value],
    }));
  };

  // معالجة التغيير في معلومات إضافية
  const handleAdditionalInfoChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      additionalInfo: prev.additionalInfo.includes(value)
        ? prev.additionalInfo.filter((item) => item !== value)
        : [...prev.additionalInfo, value],
    }));
  };

  // معالجة تغيير نوع وقت العمل
  const handleWorkTimeTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      workTimeType: value,
    }));
  };

  // معالجة تغيير أوقات العمل
  const handleShift1FromChange = (value) => {
    setFormData((prev) => ({ ...prev, shift1From: value }));
  };

  const handleShift1ToChange = (value) => {
    setFormData((prev) => ({ ...prev, shift1To: value }));
  };

  const handleShift2FromChange = (value) => {
    setFormData((prev) => ({ ...prev, shift2From: value }));
  };

  const handleShift2ToChange = (value) => {
    setFormData((prev) => ({ ...prev, shift2To: value }));
  };

  // معالجة بيانات التوصيل من DeliveryForm
  const handleDeliveryDataChange = (data) => {
    if (!data) return;

    const dataString = JSON.stringify(data);
    if (prevDeliveryDataRef.current !== dataString) {
      setFormData((prev) => ({ ...prev, deliveryData: data }));
      prevDeliveryDataRef.current = dataString;
    }
  };

  // دالة parseGoogleMapLink
  function parseGoogleMapLink(link) {
    try {
      if (!link) return [31.0999884, 29.9699776];

      // محاولة استخراج الإحداثيات من الرابط
      const regex = /@([-0-9.]+),([-0-9.]+)/;
      const match = link.match(regex);

      if (match && match.length >= 3) {
        // الإحداثيات من الرابط [خط الطول، خط العرض]
        return [parseFloat(match[2]), parseFloat(match[1])];
      }

      // قيم افتراضية إذا لم يتم العثور على إحداثيات
      return [31.0999884, 29.9699776];
    } catch (error) {
      console.error("خطأ في استخراج الإحداثيات:", error);
      return [31.0999884, 29.9699776];
    }
  }

  // دالة للتحقق من صحة الروابط
  const validateAndFixUrl = (url) => {
    if (!url || typeof url !== "string") return "";
    if (url.trim() === "") return "";
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  // معالج النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storeId) {
      setError("معرف المتجر غير متوفر، لا يمكن إكمال عملية التحديث!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // التحقق من الحقول الإلزامية
      const requiredFields = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        contactPhone: formData.contactPhone,
        deliveryPhone: formData.deliveryPhone,
        city: formData.city,
        region: formData.region,
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key, _]) => key);

      if (missingFields.length > 0 || formData.selectedMealTimes.length === 0) {
        let errorMessage = "";

        if (missingFields.length > 0) {
          errorMessage = `يرجى ملء الحقول الإلزامية التالية: ${missingFields.join(
            ", "
          )}`;
        }

        if (formData.selectedMealTimes.length === 0) {
          errorMessage += errorMessage ? " و " : "";
          errorMessage += "يرجى اختيار نوع وجبة واحدة على الأقل";
        }

        setError(errorMessage);
        setLoading(false);
        return;
      }

      // إنشاء كائن additionalInfo
      const additionalInfo = {
        indoorSessions: formData.additionalInfo.includes("indoorSessions"),
        hasDelivery: formData.additionalInfo.includes("hasDelivery"),
        carRequest: false,
        familySessions: formData.additionalInfo.includes("familySessions"),
        outdoorSessions: formData.additionalInfo.includes("outdoorSessions"),
        preBooking: formData.additionalInfo.includes("preBooking"),
      };

      // تحليل إحداثيات رابط الخريطة
      const coordinates = parseGoogleMapLink(formData.mapLink);

      // إنشاء كائن FormData
      const formDataToSend = new FormData();

      // إضافة البيانات الأساسية
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("contactPhone", formData.contactPhone);
      formDataToSend.append("deliveryPhone", formData.deliveryPhone);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("region", formData.region);
      formDataToSend.append("mapLink", formData.mapLink);
      formDataToSend.append("since", formData.since);

      // إضافة الملفات إذا كانت متوفرة
      if (coverPicture) {
        console.log("Sending new cover picture in request");
        formDataToSend.append("coverPicture", coverPicture);
      }

      if (profilePicture) {
        console.log("Sending new profile picture in request");
        formDataToSend.append("profilePicture", profilePicture);
      }

      // إضافة الرقم الضريبي إذا كان متوفراً
      if (formData.taxNumber)
        formDataToSend.append("taxNumber", formData.taxNumber);

      // إضافة روابط وسائل التواصل الاجتماعي
      Object.entries(formData.socialMediaLinks).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          const finalValue =
            key === "whatsappNumber" ? value : validateAndFixUrl(value);
          formDataToSend.append(`socialMediaLinks[${key}]`, finalValue);
        }
      });

      // إضافة روابط تطبيقات التوصيل
      if (formData.deliveryData && formData.deliveryData.deliveryAppLinks) {
        Object.entries(formData.deliveryData.deliveryAppLinks).forEach(
          ([key, value]) => {
            if (value && value.trim() !== "") {
              formDataToSend.append(
                `deliveryAppLinks[${key}]`,
                validateAndFixUrl(value)
              );
            }
          }
        );
      }

      // إضافة التطبيق الرئيسي للتوصيل إذا كان متوفراً
      if (formData.deliveryData?.mainDeliveryApp) {
        formDataToSend.append(
          "mainDeliveryApp",
          formData.deliveryData.mainDeliveryApp
        );
      }

      // إضافة الإحداثيات
      formDataToSend.append("location[type]", "Point");
      formDataToSend.append(
        "location[coordinates][0]",
        parseFloat(coordinates[0])
      );
      formDataToSend.append(
        "location[coordinates][1]",
        parseFloat(coordinates[1])
      );

      // إضافة مواعيد العمل (shifts)
      if (formData.workTimeType !== "open") {
        if (formData.shift1From && formData.shift1To) {
          formDataToSend.append("shifts[0][startTime]", formData.shift1From);
          formDataToSend.append("shifts[0][endTime]", formData.shift1To);
        } else {
          formDataToSend.append(
            "shifts[0][startTime]",
            "2025-04-05T00:12:43.000Z"
          );
          formDataToSend.append(
            "shifts[0][endTime]",
            "2025-04-05T22:16:43.000Z"
          );
        }

        if (
          formData.workTimeType === "double" &&
          formData.shift2From &&
          formData.shift2To
        ) {
          formDataToSend.append("shifts[1][startTime]", formData.shift2From);
          formDataToSend.append("shifts[1][endTime]", formData.shift2To);
        }
      } else {
        formDataToSend.append(
          "shifts[0][startTime]",
          "2025-04-05T00:12:43.000Z"
        );
        formDataToSend.append("shifts[0][endTime]", "2025-04-05T22:16:43.000Z");
      }

      // إضافة أنواع الوجبات
      const validMealTypes = ["breakfast", "lunch", "dinner", "late-breakfast"];
      const mealType =
        formData.selectedMealTimes.length > 0
          ? formData.selectedMealTimes.filter((meal) =>
              validMealTypes.includes(meal)
            )
          : ["dinner"];

      mealType.forEach((meal, index) => {
        formDataToSend.append(`mealType[${index}]`, meal);
      });

      // إضافة المعلومات الإضافية
      Object.entries(additionalInfo).forEach(([key, value]) => {
        formDataToSend.append(`additionalInfo[${key}]`, value);
      });

      // طباعة البيانات للتحقق (اختياري)
      console.log("FormData being sent for update to store ID:", storeId);
      console.log("API URL:", `${api_url}/store/${storeId}`);

      // إرسال البيانات
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${api_url}/store/${storeId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("تم تعديل المتجر بنجاح!");
      console.log("استجابة الخادم:", response.data);

      // إعادة التوجيه بعد النجاح
      setTimeout(() => {
        navigate("/list");
      }, 2000);
    } catch (error) {
      console.error("خطأ في تحديث البيانات:", error);

      let errorMessage = "حدث خطأ أثناء تعديل المتجر، يرجى المحاولة مرة أخرى";

      if (error.response?.data?.message) {
        if (Array.isArray(error.response.data.message)) {
          console.log("رسائل الخطأ الكاملة:", error.response.data.message);
          errorMessage = error.response.data.message.join("\n");
        } else {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // عرض شاشة التحميل
  if (fetchLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-1 rounded-full animate-spin mb-6"></div>
          <div className="text-gray-700 text-xl font-medium">
            جاري تحميل بيانات المتجر
          </div>
          <div className="text-gray-500 text-sm mt-2">
            يرجى الانتظار قليلاً...
          </div>
        </div>
      </div>
    );
  }

  // عرض شاشة الخطأ إذا لم يتم العثور على معرف المتجر
  if (!storeId) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col justify-center items-center p-6">
          <div className="bg-red-100 text-red-700 p-6 rounded-lg text-center max-w-md">
            <h2 className="text-xl font-bold mb-2">خطأ في معرف المتجر</h2>
            <p>
              {error ||
                "معرف المتجر غير متوفر أو غير صالح. يرجى التحقق من الرابط."}
            </p>
            <button
              onClick={() => navigate("/list")}
              className="mt-4 px-6 py-2 bg-primary-1 text-white rounded-md hover:bg-red-600"
            >
              العودة إلى القائمة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[90rem] p-16 rounded-xl">
          <h2 className="text-3xl font-bold text-right text-gray-700 mb-10">
            تعديل المتجر
          </h2>

          {/* رسائل النجاح والخطأ */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-right">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-right">
              {success}
            </div>
          )}

          <div className="mb-10 relative">
            <div className="relative bg-gray-300 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden">
              {currentCoverPicture && (
                <img
                  src={currentCoverPicture}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
                id="coverUpload"
              />
              <label
                htmlFor="coverUpload"
                className="absolute bottom-5 left-5 px-5 py-2 border border-primary-1 rounded-md text-sm flex items-center cursor-pointer text-primary-1"
              >
                <TbCameraPlus className="text-primary-1 text-2xl mr-2" />
                {currentCoverPicture
                  ? "تغيير صورة الغلاف"
                  : "إضافة صورة الغلاف"}
              </label>
            </div>

            <div className="absolute -bottom-8 right-5 w-40 h-40 bg-gray-100 rounded-full border flex justify-center items-center shadow-lg">
              {currentProfilePicture && (
                <img
                  src={currentProfilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                className="hidden"
                id="profileUpload"
              />
              <label
                htmlFor="profileUpload"
                className="absolute bottom-2 right-2 cursor-pointer p-2 rounded-full shadow-md bg-primary-1"
              >
                <TbCameraPlus className="text-white text-2xl" />
              </label>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="pt-6 space-y-14 mx-auto max-w-full"
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <Inputs
                name="deliveryPhone"
                label="رقم التواصل للطلبات"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.deliveryPhone}
                onChange={handleChange}
                required
              />
              <div>
                <Inputs
                  name="contactPhone"
                  label="رقم التواصل مع الإدارة"
                  type="text"
                  className="w-full h-12 px-6 text-xl py-4"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
                />
                <p className="text-primary-1 text-sm mt-2">
                  الرقم لا يتم نشره أو عرضه للمستخدمين و إنما وسيلة للتواصل بين
                  الموقع والشيف
                </p>
              </div>
              <Inputs
                name="name"
                label="الاسم التجاري"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-10 text-right">
              <TextAreaInput
                name="description"
                label="وصف مختصر عن المتجر"
                type="text"
                className="w-full h-36 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بادخال وصف مختصر عن المتجر هنا"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <SelectInput
                name="region"
                label="المنطقة"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.region}
                options={[
                  { value: "Riyadh", label: "الرياض" },
                  { value: "Mecca", label: "مكة المكرمة" },
                  { value: "Eastern", label: "الشرقية" },
                  { value: "Medina", label: "المدينة المنورة" },
                  { value: "Asir", label: "عسير" },
                  { value: "Al-Qassim", label: "القصيم" },
                  { value: "Tabuk", label: "تبوك" },
                  { value: "Hail", label: "حائل" },
                  { value: "Northern Borders", label: "الحدود الشمالية" },
                  { value: "Jizan", label: "جازان" },
                  { value: "Najran", label: "نجران" },
                  { value: "Al-Bahah", label: "الباحة" },
                  { value: "Al-Jouf", label: "الجوف" },
                ]}
                onChange={handleChange}
                required
              />
              <SelectInput
                name="city"
                label="المدينة"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.city}
                options={
                  cities.length > 0
                    ? cities
                    : [
                        {
                          value: formData.city || "",
                          label: formData.city || "اختر المدينة",
                        },
                      ]
                }
                onChange={handleChange}
                required
                disabled={!formData.region}
              />
              <SelectInput
                name="type"
                label="نوع المتجر"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.type}
                options={[
                  { value: "restaurant", label: "مطعم" },
                  { value: "patisserie", label: "معجنات" },
                  { value: "health", label: "صحي" },
                  { value: "icecream", label: "ايس كريم" },
                ]}
                onChange={handleChange}
                required
              />
              <Inputs
                name="licenseFile"
                label="رخصة بلدي (تحميل ملف جديد)"
                type="file"
                className="w-full h-12 px-6 text-xl py-4"
                accept="image/*,.pdf"
              />
              <Inputs
                name="nationalAddressFile"
                label="عنوان وطني (تحميل ملف جديد)"
                type="file"
                className="w-full h-12 px-6 text-xl py-4"
                accept="image/*,.pdf"
              />
              <Inputs
                name="since"
                label="تأسس منذ عام"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.since}
                onChange={handleChange}
              />
              <Inputs
                name="menuPhoto"
                label="صورة المنيو (تحميل صورة جديدة)"
                type="file"
                className="w-full h-12 px-6 text-xl py-4"
                accept="image/*"
              />
              <Inputs
                name="taxNumber"
                label="الرقم الضريبي"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.taxNumber}
                onChange={handleChange}
              />
              <Inputs
                name="commercialRegisterPhoto"
                label="سجل التجاري (تحميل ملف جديد)"
                type="file"
                className="w-full h-12 px-6 text-xl py-4"
                accept="image/*,.pdf"
              />
              <Inputs
                name="socialMediaLinks.whatsappNumber"
                Icon_2={IoLogoWhatsapp}
                label="رقم واتساب"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.socialMediaLinks.whatsappNumber}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    socialMediaLinks: {
                      ...prev.socialMediaLinks,
                      whatsappNumber: value,
                    },
                  }));
                }}
              />
              <Inputs
                name="socialMediaLinks.facebook"
                Icon_2={TiSocialFacebook}
                label="رابط فيسبوك"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.socialMediaLinks.facebook}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    socialMediaLinks: {
                      ...prev.socialMediaLinks,
                      facebook: value,
                    },
                  }));
                }}
              />
              <Inputs
                name="socialMediaLinks.snapchat"
                Icon_2={FaSnapchatGhost}
                label="رابط سناب شات"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.socialMediaLinks.snapchat}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    socialMediaLinks: {
                      ...prev.socialMediaLinks,
                      snapchat: value,
                    },
                  }));
                }}
              />
              <Inputs
                name="socialMediaLinks.x"
                Icon_2={RiTwitterXFill}
                label="رابط اكس"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.socialMediaLinks.x}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    socialMediaLinks: {
                      ...prev.socialMediaLinks,
                      x: value,
                    },
                  }));
                }}
              />
              <Inputs
                name="socialMediaLinks.instagram"
                Icon_2={GrInstagram}
                label="رابط انستغرام"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.socialMediaLinks.instagram}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    socialMediaLinks: {
                      ...prev.socialMediaLinks,
                      instagram: value,
                    },
                  }));
                }}
              />
              <Inputs
                name="socialMediaLinks.tiktok"
                Icon_2={FaTiktok}
                label="رابط تيك توك"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.socialMediaLinks.tiktok}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    socialMediaLinks: {
                      ...prev.socialMediaLinks,
                      tiktok: value,
                    },
                  }));
                }}
              />
              <div className="md:col-start-2 md:col-span-2 flex justify-end space-x-10">
                <Inputs
                  name="mapLink"
                  Icon_2={MdOutlineLocationOn}
                  label="رابط المتجر علي خريطة جوجل"
                  type="text"
                  className="w-full h-12 px-6 text-xl py-4"
                  value={formData.mapLink}
                  onChange={handleChange}
                />
                <Inputs
                  name="socialMediaLinks.website"
                  Icon_2={PiGlobeThin}
                  label="رابط الموقع الإلكتروني"
                  type="text"
                  className="w-full h-12 px-6 text-xl py-4"
                  value={formData.socialMediaLinks.website}
                  onChange={(e) => {
                    const { value } = e.target;
                    setFormData((prev) => ({
                      ...prev,
                      socialMediaLinks: {
                        ...prev.socialMediaLinks,
                        website: value,
                      },
                    }));
                  }}
                />
              </div>
            </div>

            <DeliveryForm
              onDataChange={handleDeliveryDataChange}
              initialData={formData.deliveryData}
            />

            <div className="flex gap-8">
              <div className="w-1/2">
                <MultiCheckBox
                  name="mealType"
                  label="نوع الوجبة"
                  options={[
                    { label: "عشاء", value: "dinner" },
                    { label: "غداء", value: "lunch" },
                    { label: "فطور متاخر", value: "late-breakfast" },
                    { label: "فطار", value: "breakfast" },
                  ]}
                  selectedOptions={formData.selectedMealTimes}
                  onChange={handleMealTypeChange}
                />
              </div>

              <div className="w-1/2">
                <CheckBoxWorkRange
                  name="workTimeType"
                  label="نظام أوقات العمل"
                  options={[
                    { label: "مفتوح 7 / 24", value: "open" },
                    { label: "دوامين", value: "double" },
                    { label: "دوام", value: "single" },
                  ]}
                  selectedValue={formData.workTimeType}
                  onChange={handleWorkTimeTypeChange}
                />
              </div>
            </div>

            {formData.workTimeType !== "open" && (
              <div className="flex justify-end gap-8">
                {formData.workTimeType === "double" && (
                  <div className="w-1/2">
                    <WorkTimeRange
                      label="وقت عمل الدوام التاني"
                      fromValue={formData.shift2From}
                      toValue={formData.shift2To}
                      onFromChange={handleShift2FromChange}
                      onToChange={handleShift2ToChange}
                      options={timeOptions}
                      disabled={false}
                    />
                  </div>
                )}

                <div className="w-1/2">
                  <WorkTimeRange
                    label="وقت عمل الدوام الاول"
                    fromValue={formData.shift1From}
                    toValue={formData.shift1To}
                    onFromChange={handleShift1FromChange}
                    onToChange={handleShift1ToChange}
                    options={timeOptions}
                    disabled={false}
                  />
                </div>
              </div>
            )}

            <MultiCheckBox
              label="معلومات أخرى"
              options={[
                { label: "يوجد حجز مسبق", value: "preBooking" },
                { label: "جلسات عائلية", value: "familySessions" },
                { label: "يوجد توصيل", value: "hasDelivery" },
                { label: "جلسات خارجية", value: "outdoorSessions" },
                { label: "جلسات داخلية ", value: "indoorSessions" },
              ]}
              selectedOptions={formData.additionalInfo}
              onChange={handleAdditionalInfoChange}
            />

            <div className="flex justify-center mt-12 pt-12">
              <div className="flex gap-4 w-full max-w-2xl justify-center">
                <Button
                  label="إلغاء"
                  className="flex-1 h-[55px] !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
                  type="button"
                  onClick={() => navigate("/list")}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  label={loading ? "جاري التحديث..." : "تحديث المتجر"}
                  className="flex-1 h-[55px] bg-primary-1 hover:bg-hover_primary-1 text-white rounded-md text-lg font-semibold disabled:opacity-50"
                  disabled={loading}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStore;
