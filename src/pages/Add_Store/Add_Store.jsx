import React, { useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import Inputs from "../../components/shared/inputs/Inputs";
import SelectInput from "../../components/shared/inputs/SelectInput";
import DeliveryApps from "../../components/shared/inputs/DeliveryApps";
import TextAreaInput from "../../components/shared/inputs/TextAreaInput ";
import { FaSnapchatGhost, FaTiktok } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { PiGlobeThin } from "react-icons/pi";
import MultiCheckBox from "../../components/shared/inputs/MultiCheckBox";
import WorkTimeRange from "../../components/shared/inputs/WorkTimeRange";
import Button from "../../components/shared/Buttons/Button";
import { useNavigate } from "react-router";

const timeOptions = [
  { label: "06:00 ص", value: "06:00" },
  { label: "07:00 ص", value: "07:00" },
  { label: "08:00 ص", value: "08:00" },
  { label: "09:00 ص", value: "09:00" },
  { label: "10:00 ص", value: "10:00" },
  { label: "11:00 ص", value: "11:00" },
  { label: "12:00 م", value: "12:00" },
];
const Add_Store = () => {
  const navigate = useNavigate();

  // const [loading, setLoading] = useState(false);

  // Form images
  const [coverPicture, setcoverPicture] = useState(null);
  const [profilePicture, setprofilePicture] = useState(null);

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setcoverPicture(file);
    } else {
      console.error("الرجاء اختيار صورة صحيحة!");
    }
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setprofilePicture(file);
    } else {
      console.error("الرجاء اختيار صورة صحيحة!");
    }
  };
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleOptionChange = (value) => {
    setSelectedTimes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[90rem] p-16  rounded-xl ">
          <h2 className="text-3xl font-bold text-right text-gray-700 mb-10">
            اضافة متجر جديد{" "}
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
                <TbCameraPlus className="text-white text-2xl " />
              </label>
            </div>
          </div>
          <form className="pt-6 space-y-14 mx-auto max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <Inputs
                name="deliveryPhone"
                label="رقم التواصل للطلبات"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <div>
                <Inputs
                  name="contactPhone"
                  label="رقم التواصل مع الإدارة"
                  type="text"
                  className="w-full h-12 px-6 text-xl py-4"
                />
                <p className="text-primary-1 text-sm mt-2">
                  الرقم لا يتم نشره أو عرضه للمستخدمين و إنما وسيلة للتواصل بين
                  الموقع والشيف{" "}
                </p>
              </div>
              <Inputs
                name="name"
                label="الاسم التجاري"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-10 text-right">
              <TextAreaInput
                name="description"
                label="وصف مختصر عن المتجر"
                type="text"
                className="w-full h-36 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بادخال وصف مختصر عن المتجر هنا"
                //onChange={handleChange}
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
              />
              <SelectInput
                name="city"
                label="المدينة"
                className="w-full h-12 px-6 text-xl py-4"
                options={[{ value: "Mecca", label: "مكة المكرمة" }]}
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
              />
              <Inputs
                name="licenseFile"
                label="رخصة بلدي"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <Inputs
                name="nationalAddressFile"
                label="عنوان وطني"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
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
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
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
                  name="socialMediaLinks[website]"
                  Icon_2={PiGlobeThin}
                  label="رابط  الموقع  الإلكتروني"
                  type="text"
                  className="w-full h-12 px-6 text-xl py-4 "
                />
                <Inputs
                  name="mapLink"
                  Icon_2={PiGlobeThin}
                  label="رابط  الموقع  الإلكتروني"
                  type="text"
                  className="w-full h-12 px-6 text-xl py-4 "
                />
              </div>
            </div>
            <DeliveryApps />
            <div className="md:col-start-1 md:col-span-2 flex justify-end text-right">
              <div className="w-96">
                <SelectInput
                  name="type"
                  label="تطبيق التوصيل الرئيسي"
                  className="h-12 px-6 text-xl py-4"
                  options={[
                    { value: "restaurant", label: "مطعم" },
                    { value: "patisserie", label: "معجنات" },
                    { value: "health", label: "صحي" },
                    { value: "icecream", label: "ايس كريم" },
                  ]}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-1/2">
                <MultiCheckBox
                  label="نوع الوجبة"
                  options={[
                    { label: "عشاء", value: "dinner" },
                    { label: "غداء", value: "lunch" },
                    { label: "فطور متاخر", value: "late-breakfast" },
                    { label: "فطار", value: "breakfast" },
                  ]}
                  selectedOptions={selectedTimes}
                  onChange={handleOptionChange}
                />
              </div>

              <div className="w-1/2">
                <MultiCheckBox
                  label="نظام أوقات العمل"
                  options={[
                    { label: "مفتوح 7 / 24", value: "open" },
                    { label: "دوامين", value: "double" },
                    { label: "دوام", value: "single" },
                  ]}
                  selectedOptions={selectedTimes}
                  onChange={handleOptionChange}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-1/2">
                <WorkTimeRange
                  label="وقت عمل الدوام التاني"
                  fromValue={from}
                  toValue={to}
                  onFromChange={setFrom}
                  onToChange={setTo}
                  options={timeOptions}
                />
              </div>

              <div className="w-1/2">
                <WorkTimeRange
                  label="وقت عمل الدوام الاول"
                  fromValue={from}
                  toValue={to}
                  onFromChange={setFrom}
                  onToChange={setTo}
                  options={timeOptions}
                />
              </div>
            </div>
            <MultiCheckBox
              label="معلومات أخرى"
              options={[
                { label: "يوجد حجز مسبق", value: "preBooking" },
                { label: "جلسات عائلية", value: "familySessions" },
                { label: "يوجد توصيل", value: "hasDelivery" },
                { label: "جلسات خارجية", value: "outdoorSessions" },
                { label: "جلسات داخلية ", value: "indoorSessions" },
              ]}
              selectedOptions={selectedTimes}
              onChange={handleOptionChange}
            />
            <div className="flex justify-center mt-12 pt-12">
              <div className="flex gap-4 w-full max-w-2xl justify-center">
                <Button
                  label="إلغاء"
                  className="flex-1 h-[55px] !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
                  type="button"
                  onClick={() => navigate("/list")}
                />
                <Button
                  type="submit"
                  label="إضافة المتجر"
                  className="flex-1 h-[55px] bg-primary-1 hover:bg-hover_primary-1 text-white rounded-md text-lg font-semibold"
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
