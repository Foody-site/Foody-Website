import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { TbCameraPlus } from "react-icons/tb";
import Inputs from "../../components/shared/inputs/Inputs";
import SelectInput from "../../components/shared/inputs/SelectInput";
import TextAreaInput from "../../components/shared/inputs/TextAreaInput ";
import { FaSnapchatGhost, FaTiktok } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { PiGlobeThin } from "react-icons/pi";
import MultiCheckBox from "../../components/shared/inputs/MultiCheckBox";
import WorkTimeRange from "../../components/shared/inputs/WorkTimeRange";
import Button from "../../components/shared/Buttons/Button";
import { useNavigate } from "react-router";
import DeliveryForm from "../../components/shared/form/DeliveryForm";
import CheckBoxWorkRange from "../../components/shared/inputs/CheckBoxWorkRange";
import { api_url } from "../../utils/ApiClient";
import Alert from "../../components/shared/Alert/Alert";

// دالة لإضافة مقدمة +966 للرقم عند الإرسال
const formatPhoneForSubmit = (phone) => {
  if (!phone) return "";

  // تنظيف الرقم من أي مسافات
  const trimmedPhone = phone.trim();

  // إذا كان الرقم لا يبدأ بـ +966، قم بإضافته
  if (!trimmedPhone.startsWith("+966")) {
    return `+966${trimmedPhone}`;
  }
  return trimmedPhone;
};

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

// مكون شاشة التأكيد
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full mx-4 relative">
        <h3 className="text-xl font-bold text-center mb-4">تنبيه</h3>
        <p className="text-center text-gray-700 mb-6">
          لو عايز تعمل توثيق للحساب يفضل تضيف كل الداتا
        </p>

        <div className="flex justify-center gap-4">
          <Button
            label="إلغاء"
            className="!text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition px-6 py-2"
            type="button"
            onClick={onClose}
          />
          <Button
            label="إضافة"
            className="bg-primary-1 hover:bg-hover_primary-1 text-white px-6 py-2"
            type="button"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

const Add_Store = () => {
  const navigate = useNavigate();

  // استخدام useRef لمنع تكرار البيانات من DeliveryForm
  const prevDeliveryDataRef = useRef(null);
  const [deliveryData, setDeliveryData] = useState(null);

  // معالج محسن لبيانات التوصيل
  const handleDeliveryDataChange = (data) => {
    if (!data) return;

    const dataString = JSON.stringify(data);
    if (prevDeliveryDataRef.current !== dataString) {
      setDeliveryData(data);
      prevDeliveryDataRef.current = dataString;
    }
  };

  // Loading state
  const [loading, setLoading] = useState(false);

  // Alert states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");

  // حالة شاشة التأكيد
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formRef = useRef(null);

  // Form states
  const [workTimeType, setWorkTimeType] = useState("");
  const [coverPicture, setCoverPicture] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedMealTimes, setSelectedMealTimes] = useState([]);
  const [selectedAdditionalInfo, setSelectedAdditionalInfo] = useState([]);

  // Work time states
  const [shift1From, setShift1From] = useState("");
  const [shift1To, setShift1To] = useState("");
  const [shift2From, setShift2From] = useState("");
  const [shift2To, setShift2To] = useState("");

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCoverPicture(file);
    } else {
      setAlertMessage("خطأ");
      setAlertSubMessage("الرجاء اختيار صورة صحيحة للغلاف!");
      setAlertType("error");
      setAlertOpen(true);
    }
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePicture(file);
    } else {
      setAlertMessage("خطأ");
      setAlertSubMessage("الرجاء اختيار صورة صحيحة للملف الشخصي!");
      setAlertType("error");
      setAlertOpen(true);
    }
  };

  const handleMealTypeChange = (value) => {
    setSelectedMealTimes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleAdditionalInfoChange = (value) => {
    setSelectedAdditionalInfo((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // دالة مساعدة لاستخراج الإحداثيات من رابط خرائط جوجل
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

  // أولاً، أضف دالة التحقق من صحة رابط خرائط Google
  const isValidGoogleMapsUrl = (url) => {
    // التحقق من أن الرابط ليس فارغًا
    if (!url || url.trim() === "") return true; // نسمح بقيمة فارغة إذا لم يكن الحقل إلزاميًا

    // استخدام تعبير منتظم للتحقق من أن الرابط يبدأ بنطاق Google Maps
    const googleMapsRegex = /^https?:\/\/(www\.)?google\.[a-z]+\/maps\//i;

    // أو التحقق بطريقة أبسط للتأكد من وجود "google" و "maps" في الرابط
    return googleMapsRegex.test(url);
  };

  // ثم في داخل مكون Add_Store، أضف حالة للتحقق من صحة الرابط
  const [mapLinkError, setMapLinkError] = useState("");

  // دالة للتعامل مع تغيير قيمة حقل رابط الخريطة
  const handleMapLinkChange = (e) => {
    const value = e.target.value;

    // التحقق من صحة الرابط عند تغييره
    if (value && !isValidGoogleMapsUrl(value)) {
      setMapLinkError("يرجى إدخال رابط صحيح من خرائط جوجل");
    } else {
      setMapLinkError("");
    }
  };

  // معالج إغلاق التنبيه
  const handleAlertClose = () => {
    setAlertOpen(false);

    // إذا كان التنبيه للنجاح، نقوم بالانتقال إلى صفحة القائمة
    if (alertType === "success") {
      navigate("/list");
    }
  };

  // المعالج الأولي للنموذج - يفتح شاشة التأكيد
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // التحقق من الحقول الإلزامية قبل فتح شاشة التأكيد
    const name = e.target.querySelector('input[name="name"]')?.value || "";
    const description =
      e.target.querySelector('textarea[name="description"]')?.value || "";
    const type = e.target.querySelector('select[name="type"]')?.value || "";
    const contactPhone =
      e.target.querySelector('input[name="contactPhone"]')?.value || "";
    const deliveryPhone =
      e.target.querySelector('input[name="deliveryPhone"]')?.value || "";
    const city = e.target.querySelector('select[name="city"]')?.value || "";
    const region = e.target.querySelector('select[name="region"]')?.value || "";
    // التقاط قيمة رابط الخريطة
    const mapLink =
      e.target.querySelector('input[name="mapLink"]')?.value || "";

    // التحقق من صحة الرابط إذا كان موجودًا
    if (mapLink && !isValidGoogleMapsUrl(mapLink)) {
      setAlertMessage("خطأ في رابط الخريطة");
      setAlertSubMessage("يرجى إدخال رابط صحيح من خرائط جوجل");
      setAlertType("error");
      setAlertOpen(true);
      return;
    }

    const requiredFields = {
      name,
      description,
      type,
      contactPhone,
      deliveryPhone,
      city,
      region,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key, _]) => key);

    if (missingFields.length > 0 || selectedMealTimes.length === 0) {
      let errorMessage = "بيانات ناقصة";
      let subMessage = "";

      if (missingFields.length > 0) {
        subMessage = `يرجى ملء الحقول الإلزامية التالية: ${missingFields.join(
          ", "
        )}`;
      }

      if (selectedMealTimes.length === 0) {
        subMessage += subMessage ? " و " : "";
        subMessage += "يرجى اختيار نوع وجبة واحدة على الأقل";
      }

      setAlertMessage(errorMessage);
      setAlertSubMessage(subMessage);
      setAlertType("error");
      setAlertOpen(true);
      return;
    }

    // حفظ مرجع النموذج وفتح شاشة التأكيد
    formRef.current = e.target;
    setShowConfirmation(true);
  };

  // المعالج الثانوي - يتم تنفيذه بعد تأكيد المستخدم
  const handleSubmit = async () => {
    if (!formRef.current) return;

    setLoading(true);
    setShowConfirmation(false);

    try {
      const e = formRef.current;

      // جمع البيانات من النموذج
      const name = e.querySelector('input[name="name"]')?.value || "";
      const description =
        e.querySelector('textarea[name="description"]')?.value || "";
      const type = e.querySelector('select[name="type"]')?.value || "";
      const contactPhone =
        e.querySelector('input[name="contactPhone"]')?.value || "";
      const deliveryPhone =
        e.querySelector('input[name="deliveryPhone"]')?.value || "";
      const city = e.querySelector('select[name="city"]')?.value || "";
      const region = e.querySelector('select[name="region"]')?.value || "";
      const mapLink = e.querySelector('input[name="mapLink"]')?.value || "";

      // تحويل القيم إلى الأنواع المناسبة
      const taxNumber = e.querySelector('input[name="taxNumber"]')?.value;
      // تحويل since إلى رقم بدلاً من سلسلة نصية
      const sinceValue = e.querySelector('input[name="since"]')?.value;
      const since = sinceValue
        ? parseInt(sinceValue)
        : new Date().getFullYear();

      // إضافة المقدمة +966 لأرقام الهواتف
      const contactPhoneForSubmit = formatPhoneForSubmit(contactPhone);
      const deliveryPhoneForSubmit = formatPhoneForSubmit(deliveryPhone);

      // إنشاء كائن additionalInfo مع قيم بوليان (لأننا سنحول الكائن إلى FormData لاحقًا)
      const additionalInfo = {
        indoorSessions: selectedAdditionalInfo.includes("indoorSessions"),
        hasDelivery: selectedAdditionalInfo.includes("hasDelivery"),
        carRequest: false,
        familySessions: selectedAdditionalInfo.includes("familySessions"),
        outdoorSessions: selectedAdditionalInfo.includes("outdoorSessions"),
        preBooking: selectedAdditionalInfo.includes("preBooking"),
      };

      // دالة للتحقق من صحة الروابط
      const validateAndFixUrl = (url) => {
        if (!url || typeof url !== "string") return "";
        if (url.trim() === "") return "";
        if (!/^https?:\/\//i.test(url)) {
          return `https://${url}`;
        }
        return url;
      };

      // تحليل إحداثيات رابط الخريطة
      const coordinates = parseGoogleMapLink(mapLink);

      // إنشاء كائن FormData
      const formData = new FormData();

      // إضافة البيانات الأساسية
      formData.append("name", name);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("contactPhone", contactPhoneForSubmit); // استخدام الرقم المنسق
      formData.append("deliveryPhone", deliveryPhoneForSubmit); // استخدام الرقم المنسق
      formData.append("city", city);
      formData.append("region", region);
      formData.append("mapLink", mapLink);
      formData.append("since", since);

      // إضافة الملفات إذا كانت متوفرة
      if (coverPicture) formData.append("coverPicture", coverPicture);
      if (profilePicture) formData.append("profilePicture", profilePicture);

      // الحصول على الملفات الأخرى إذا كانت متوفرة
      const licenseFile = e.querySelector('input[name="licenseFile"]')
        ?.files[0];
      const nationalAddressFile = e.querySelector(
        'input[name="nationalAddressFile"]'
      )?.files[0];
      const menuPhoto = e.querySelector('input[name="menuPhoto"]')?.files[0];
      const commercialRegisterPhoto = e.querySelector(
        'input[name="commercialRegisterPhoto"]'
      )?.files[0];

      // إضافة الملفات الأخرى إذا كانت متوفرة
      if (licenseFile) formData.append("licenseFile", licenseFile);
      if (nationalAddressFile)
        formData.append("nationalAddressFile", nationalAddressFile);
      if (menuPhoto) formData.append("menuPhoto", menuPhoto);
      if (commercialRegisterPhoto)
        formData.append("commercialRegisterPhoto", commercialRegisterPhoto);

      // إضافة الرقم الضريبي إذا كان متوفراً
      if (taxNumber) formData.append("taxNumber", taxNumber);

      // إضافة روابط وسائل التواصل الاجتماعي
      const socialInputs = [
        {
          key: "snapchat",
          selector: 'input[name="socialMediaLinks[snapchat]"]',
        },
        {
          key: "facebook",
          selector: 'input[name="socialMediaLinks[facebook]"]',
        },
        {
          key: "whatsappNumber",
          selector: 'input[name="socialMediaLinks[whatsappNumber]"]',
        },
        { key: "tiktok", selector: 'input[name="socialMediaLinks[tiktok]"]' },
        {
          key: "instagram",
          selector: 'input[name="socialMediaLinks[instagram]"]',
        },
        { key: "x", selector: 'input[name="socialMediaLinks[x]"]' },
        { key: "website", selector: 'input[name="socialMediaLinks[website]"]' },
      ];

      socialInputs.forEach(({ key, selector }) => {
        const value = document.querySelector(selector)?.value;
        if (value && value.trim() !== "") {
          // إذا كان الحقل هو رقم واتساب، نضيف المقدمة +966
          const finalValue =
            key === "whatsappNumber"
              ? formatPhoneForSubmit(value)
              : validateAndFixUrl(value);

          formData.append(`socialMediaLinks[${key}]`, finalValue);
        }
      });

      // إضافة روابط تطبيقات التوصيل
      if (deliveryData && deliveryData.deliveryAppLinks) {
        Object.entries(deliveryData.deliveryAppLinks).forEach(
          ([key, value]) => {
            if (value && value.trim() !== "") {
              formData.append(
                `deliveryAppLinks[${key}]`,
                validateAndFixUrl(value)
              );
            }
          }
        );
      }

      // إضافة التطبيق الرئيسي للتوصيل إذا كان متوفراً
      if (deliveryData?.mainDeliveryApp) {
        formData.append("mainDeliveryApp", deliveryData.mainDeliveryApp);
      }

      // إضافة الإحداثيات
      formData.append("location[type]", "Point");
      formData.append("location[coordinates][0]", parseFloat(coordinates[0]));
      formData.append("location[coordinates][1]", parseFloat(coordinates[1]));

      // إضافة مواعيد العمل (shifts)
      if (workTimeType !== "open") {
        if (shift1From && shift1To) {
          formData.append("shifts[0][startTime]", shift1From);
          formData.append("shifts[0][endTime]", shift1To);
        } else {
          formData.append("shifts[0][startTime]", "2025-04-05T00:12:43.000Z");
          formData.append("shifts[0][endTime]", "2025-04-05T22:16:43.000Z");
        }

        if (workTimeType === "double" && shift2From && shift2To) {
          formData.append("shifts[1][startTime]", shift2From);
          formData.append("shifts[1][endTime]", shift2To);
        }
      } else {
        formData.append("shifts[0][startTime]", "2025-04-05T00:12:43.000Z");
        formData.append("shifts[0][endTime]", "2025-04-05T22:16:43.000Z");
      }

      // إضافة أنواع الوجبات
      const validMealTypes = ["breakfast", "lunch", "dinner", "late-breakfast"];
      const mealType =
        selectedMealTimes.length > 0
          ? selectedMealTimes.filter((meal) => validMealTypes.includes(meal))
          : ["dinner"];

      mealType.forEach((meal, index) => {
        formData.append(`mealType[${index}]`, meal);
      });

      // إضافة المعلومات الإضافية
      Object.entries(additionalInfo).forEach(([key, value]) => {
        formData.append(`additionalInfo[${key}]`, value);
      });

      // إرسال البيانات
      const token = localStorage.getItem("token");
      const response = await axios.post(`${api_url}/store`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // مهم لإرسال FormData
          Authorization: `Bearer ${token}`,
        },
      });

      // عرض رسالة النجاح
      setAlertMessage("تم إضافة المتجر");
      setAlertSubMessage(
        "تم إضافة المتجر بنجاح! سيتم توجيهك إلى صفحة القائمة."
      );
      setAlertType("success");
      setAlertOpen(true);

      console.log("تم إرسال البيانات بنجاح:", response.data);
    } catch (error) {
      console.error("خطأ في إرسال البيانات:", error);

      let errorMessage = "خطأ في إضافة المتجر";
      let subMessage = "حدث خطأ أثناء إضافة المتجر، يرجى المحاولة مرة أخرى";

      if (error.response?.data?.message) {
        if (Array.isArray(error.response.data.message)) {
          console.log("رسائل الخطأ الكاملة:", error.response.data.message);
          subMessage = error.response.data.message.join("، ");
        } else {
          subMessage = error.response.data.message;
        }
      } else if (error.message) {
        subMessage = error.message;
      }

      setAlertMessage(errorMessage);
      setAlertSubMessage(subMessage);
      setAlertType("error");
      setAlertOpen(true);

      if (error.response?.data) {
        console.error("بيانات الخطأ من الخادم:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* شاشة التأكيد */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleSubmit}
      />

      {/* مكون التنبيه */}
      <Alert
        message={alertMessage}
        subMessage={alertSubMessage}
        isOpen={alertOpen}
        onClose={handleAlertClose}
        type={alertType}
      />

      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[90rem] p-16 rounded-xl">
          <h2 className="text-3xl font-bold text-right text-gray-700 mb-10">
            اضافة متجر جديد
          </h2>

          <div className="mb-10 relative">
            <div className="relative bg-gray-300 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden">
              {coverPicture && (
                <img
                  src={URL.createObjectURL(coverPicture)}
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
                <TbCameraPlus className="text-primary-1 text-2xl mr-2" /> إضافة
                صورة الغلاف
              </label>
            </div>

            <div className="absolute -bottom-8 right-5 w-40 h-40 bg-gray-100 rounded-full border flex justify-center items-center shadow-lg">
              {profilePicture && (
                <img
                  src={URL.createObjectURL(profilePicture)}
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
            onSubmit={handleFormSubmit}
            className="pt-6 space-y-14 mx-auto max-w-full"
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <Inputs
                name="deliveryPhone"
                label="رقم التواصل للطلبات"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                required
              />
              <div>
                <Inputs
                  name="contactPhone"
                  label="رقم التواصل مع الإدارة"
                  type="text"
                  className="w-full h-12 px-6 text-xl py-4"
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
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <SelectInput
                name="region"
                label="المنطقة"
                className="w-full h-12 px-6 text-xl py-4"
                options={[
                  { value: "Riyadh", label: "الرياض" },
                  { value: "Al-Qassim", label: "القصيم" },
                ]}
                required
              />
              <SelectInput
                name="city"
                label="المدينة"
                className="w-full h-12 px-6 text-xl py-4"
                options={[
                  { value: "Al-Kharj", label: "الخرج" },
                  { value: "Al-Badayea", label: "البدائع" },
                ]}
                required
              />
              <SelectInput
                name="type"
                label="نوع المتجر"
                className="w-full h-12 px-6 text-xl py-4"
                options={[
                  { value: "restaurant", label: "مطعم" },
                  { value: "patisserie", label: "معجنات" },
                  { value: "health", label: "صحي" },
                  { value: "icecream", label: "ايس كريم" },
                ]}
                required
              />
              <Inputs
                name="licenseFile"
                label="رخصة بلدي"
                type="file"
                className="w-full h-12 px-6 text-xl py-4"
                accept="image/*,.pdf"
              />
              <Inputs
                name="nationalAddressFile"
                label="عنوان وطني"
                type="file"
                className="w-full h-12 px-6 text-xl py-4"
                accept="image/*,.pdf"
              />
              <Inputs
                name="since"
                label="تأسس منذ عام"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <Inputs
                name="menuPhoto"
                label="صورة المنيو"
                type="file"
                className="w-full h-12 px-6 text-xl py-4"
                accept="image/*"
              />
              <Inputs
                name="taxNumber"
                label="الرقم الضريبي"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <Inputs
                name="commercialRegisterPhoto"
                label="سجل التجاري"
                type="file"
                className="w-full h-12 px-6 text-xl py-4"
                accept="image/*,.pdf"
              />
              <Inputs
                name="socialMediaLinks[whatsappNumber]"
                Icon_2={IoLogoWhatsapp}
                label="إضافة رقم واتساب"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <Inputs
                name="socialMediaLinks[facebook]"
                Icon_2={TiSocialFacebook}
                label="إضافة رابط فيسبوك"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <Inputs
                name="socialMediaLinks[snapchat]"
                Icon_2={FaSnapchatGhost}
                label="إضافة رابط سناب شات"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <Inputs
                name="socialMediaLinks[x]"
                Icon_2={RiTwitterXFill}
                label="إضافة رابط اكس"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <Inputs
                name="socialMediaLinks[instagram]"
                Icon_2={GrInstagram}
                label="إضافة رابط انستغرام"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <Inputs
                name="socialMediaLinks[tiktok]"
                Icon_2={FaTiktok}
                label="إضافة رابط  تيك توك"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <div className="md:col-start-2 md:col-span-2 flex justify-end space-x-10">
                <div className="w-full">
                  <Inputs
                    name="mapLink"
                    Icon_2={MdOutlineLocationOn}
                    label="رابط المتجر علي خريطة جوجل"
                    type="text"
                    className="w-full h-12 px-6 text-xl py-4"
                    onChange={handleMapLinkChange}
                    required={true}
                  />
                  {mapLinkError && (
                    <p className="text-primary-1 text-sm mt-1 text-right">
                      {mapLinkError}
                    </p>
                  )}
                </div>

                <Inputs
                  name="socialMediaLinks[website]"
                  Icon_2={PiGlobeThin}
                  label="رابط الموقع الإلكتروني"
                  type="text"
                  className="w-full h-12 px-6 text-xl py-4"
                />
              </div>
            </div>

            <DeliveryForm onDataChange={handleDeliveryDataChange} />

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
                  selectedOptions={selectedMealTimes}
                  onChange={handleMealTypeChange}
                  required={true}
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
                  selectedValue={workTimeType}
                  onChange={setWorkTimeType}
                />
              </div>
            </div>

            {workTimeType !== "open" && (
              <div className="flex justify-end gap-8">
                {workTimeType === "double" && (
                  <div className="w-1/2">
                    <WorkTimeRange
                      label="وقت عمل الدوام التاني"
                      fromValue={shift2From}
                      toValue={shift2To}
                      onFromChange={setShift2From}
                      onToChange={setShift2To}
                      options={timeOptions}
                      disabled={false}
                    />
                  </div>
                )}

                <div className="w-1/2">
                  <WorkTimeRange
                    label="وقت عمل الدوام الاول"
                    fromValue={shift1From}
                    toValue={shift1To}
                    onFromChange={setShift1From}
                    onToChange={setShift1To}
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
              selectedOptions={selectedAdditionalInfo}
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
                  label={loading ? "جاري الإضافة..." : "إضافة المتجر"}
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

export default Add_Store;
