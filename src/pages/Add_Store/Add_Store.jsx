import React, { useState } from "react";
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

const Add_Store = () => {
  const navigate = useNavigate();

  // Loading state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form states
  const [workTimeType, setWorkTimeType] = useState("");
  const [coverPicture, setcoverPicture] = useState(null);
  const [profilePicture, setprofilePicture] = useState(null);
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
      setcoverPicture(file);
    } else {
      setError("الرجاء اختيار صورة صحيحة للغلاف!");
    }
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setprofilePicture(file);
    } else {
      setError("الرجاء اختيار صورة صحيحة للملف الشخصي!");
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

  // دالة إرسال البيانات للباك إند
  const submitStoreData = async (formData) => {
    try {
      const token = localStorage.getItem("token"); // أو sessionStorage أو من context

      if (!token) {
        throw new Error("لم يتم العثور على رمز المصادقة");
      }

      const submitData = new FormData();

      // البيانات الأساسية
      submitData.append("name", formData.get("name") || "");
      submitData.append("type", formData.get("type") || "");
      submitData.append("description", formData.get("description") || "");
      submitData.append("contactPhone", formData.get("contactPhone") || "");
      submitData.append("deliveryPhone", formData.get("deliveryPhone") || "");
      submitData.append("city", formData.get("city") || "");
      submitData.append("region", formData.get("region") || "");
      submitData.append("mapLink", formData.get("mapLink") || "");
      submitData.append(
        "since",
        formData.get("since") || new Date().getFullYear()
      );
      submitData.append("taxNumber", formData.get("taxNumber") || "");

      // الصور
      if (coverPicture) {
        submitData.append("coverPicture", coverPicture);
      }
      if (profilePicture) {
        submitData.append("profilePicture", profilePicture);
      }

      // الملفات
      const licenseFile = formData.get("licenseFile");
      const nationalAddressFile = formData.get("nationalAddressFile");
      const menuPhoto = formData.get("menuPhoto");
      const commercialRegisterPhoto = formData.get("commercialRegisterPhoto");

      if (licenseFile && licenseFile.size > 0) {
        submitData.append("licenseFile", licenseFile);
      }
      if (nationalAddressFile && nationalAddressFile.size > 0) {
        submitData.append("natoinalAddressFiles", nationalAddressFile);
      }
      if (menuPhoto && menuPhoto.size > 0) {
        submitData.append("menuPhoto", menuPhoto);
      }
      if (commercialRegisterPhoto && commercialRegisterPhoto.size > 0) {
        submitData.append("commercialRegisterPhoto", commercialRegisterPhoto);
      }

      // وسائل التواصل الاجتماعي
      const socialMediaLinks = {
        snapchat: formData.get("socialMediaLinks[snapchat]") || null,
        facebook: formData.get("socialMediaLinks[facebook]") || null,
        whatsappNumber:
          formData.get("socialMediaLinks[whatsappNumber]") || null,
        tiktok: formData.get("socialMediaLinks[tiktok]") || null,
        instagram: formData.get("socialMediaLinks[instagram]") || null,
        x: formData.get("socialMediaLinks[x]") || null,
        website: formData.get("socialMediaLinks[website]") || null,
      };
      submitData.append("socialMediaLinks", JSON.stringify(socialMediaLinks));

      // أوقات العمل
      const shifts = [];
      if (workTimeType !== "open") {
        if (shift1From && shift1To) {
          shifts.push({
            startTime: shift1From,
            endTime: shift1To,
          });
        }
        if (workTimeType === "double" && shift2From && shift2To) {
          shifts.push({
            startTime: shift2From,
            endTime: shift2To,
          });
        }
      }
      submitData.append("shifts", JSON.stringify(shifts));

      // أنواع الوجبات
      submitData.append("mealType", JSON.stringify(selectedMealTimes));

      // المعلومات الإضافية
      const additionalInfo = {
        indoorSessions: selectedAdditionalInfo.includes("indoorSessions"),
        hasDelivery: selectedAdditionalInfo.includes("hasDelivery"),
        familySessions: selectedAdditionalInfo.includes("familySessions"),
        outdoorSessions: selectedAdditionalInfo.includes("outdoorSessions"),
        preBooking: selectedAdditionalInfo.includes("preBooking"),
      };
      submitData.append("additionalInfo", JSON.stringify(additionalInfo));

      // تطبيقات التوصيل (من DeliveryForm)
      const deliveryAppLinks = {
        keeta: formData.get("deliveryAppLinks[keeta]") || null,
        hungerStation: formData.get("deliveryAppLinks[hungerStation]") || null,
        toyou: formData.get("deliveryAppLinks[toyou]") || null,
        mrsool: formData.get("deliveryAppLinks[mrsool]") || null,
        theChefz: formData.get("deliveryAppLinks[theChefz]") || null,
        mrMandoob: formData.get("deliveryAppLinks[mrMandoob]") || null,
        shgardi: formData.get("deliveryAppLinks[shgardi]") || null,
        uber: formData.get("deliveryAppLinks[uber]") || null,
        careem: formData.get("deliveryAppLinks[careem]") || null,
        noon: formData.get("deliveryAppLinks[noon]") || null,
        jahez: formData.get("deliveryAppLinks[jahez]") || null,
        other: formData.get("deliveryAppLinks[other]") || null,
      };
      submitData.append("deliveryAppLinks", JSON.stringify(deliveryAppLinks));

      // التطبيق الرئيسي للتوصيل
      const mainDeliveryApp = formData.get("mainDeliveryApp");
      if (mainDeliveryApp) {
        submitData.append("mainDeliveryApp", mainDeliveryApp);
      }

      // إرسال الطلب
      const response = await axios.post(`${api_url}/store`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("خطأ في إرسال البيانات:", error);
      throw error;
    }
  };

  // معالج الإرسال
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData(e.target);
      const result = await submitStoreData(formData);

      setSuccess("تم إضافة المتجر بنجاح!");
      console.log("نجح الإرسال:", result);

      // إعادة توجيه بعد 2 ثانية
      setTimeout(() => {
        navigate("/stores"); // أو أي صفحة تانية
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "حدث خطأ أثناء إضافة المتجر"
      );
      console.error("فشل الإرسال:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[90rem] p-16  rounded-xl ">
          <h2 className="text-3xl font-bold text-right text-gray-700 mb-10">
            اضافة متجر جديد
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
                <TbCameraPlus className="text-white text-2xl " />
              </label>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="pt-6 space-y-14 mx-auto max-w-full"
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
                required
              />
              <SelectInput
                name="city"
                label="المدينة"
                className="w-full h-12 px-6 text-xl py-4"
                options={[{ value: "Mecca", label: "مكة المكرمة" }]}
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
                type="date"
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
              <div className="md:col-start-2 md:col-span-2 flex justify-end space-x-10 ">
                <Inputs
                  name="mapLink"
                  Icon_2={MdOutlineLocationOn}
                  label="رابط المتجر علي خريطة جوجل"
                  type="text"
                  className="w-full h-12 px-6 text-xl py-4 "
                />
                <Inputs
                  name="socialMediaLinks[website]"
                  Icon_2={PiGlobeThin}
                  label="رابط  الموقع  الإلكتروني"
                  type="text"
                  className="w-full h-12 px-6 text-xl py-4 "
                />
              </div>
            </div>

            <DeliveryForm />

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

                <div className="w-1/2 ">
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
