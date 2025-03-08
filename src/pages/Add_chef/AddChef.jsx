import { useState } from "react";
import Button from "../../components/shared/Buttons/Button";
import Inputs from "../../components/shared/inputs/Inputs";
import Footer from "../../components/layout/Footer";
import { FaCamera } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import SelectInput from "../../components/shared/inputs/SelectInput";

const AddChef = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[90rem] p-16 border border-gray-300 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-center text-gray-700 mb-10">
            إضافة شيف جديد
          </h2>

          <div className="mb-10 relative">
            <div className="relative bg-gray-400 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden">
              {coverImage && (
                <img
                  src={coverImage}
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
                className="absolute bottom-5 left-5 bg-white px-5 py-2 border rounded-md text-sm flex items-center cursor-pointer"
              >
                <FaCamera className="mr-2" /> إضافة صورة الغلاف
              </label>
            </div>
            <div className="absolute bottom-0 right-5 w-32 h-32 bg-white rounded-full border flex justify-center items-center overflow-hidden">
              {profileImage && (
                <img
                  src={profileImage}
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
                className="absolute cursor-pointer"
              >
                <FaCamera className="text-primary-1 text-xl" />
              </label>
            </div>
          </div>

          <form className="space-y-14 mx-auto max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <SelectInput
                name="specialty"
                label="أنواع وصفات الطبخ"
                className="w-full px-6 text-xl py-4"
                options={[
                  { value: "italian", label: "إيطالي" },
                  { value: "french", label: "فرنسي" },
                  { value: "arabic", label: "عربي" },
                ]}
              />
              <Inputs
                name="short_description"
                label="وصف مختصر"
                type="text"
                className="w-full px-6 text-xl py-4"
              />
              <Inputs
                name="chef_name"
                label="اسم الشيف"
                type="text"
                className="w-full px-6 text-xl py-4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <SelectInput
                name="city"
                label="المدينة"
                className="w-full px-6 text-xl py-4"
                options={[
                  { value: "cairo", label: "القاهرة" },
                  { value: "riyadh", label: "الرياض" },
                  { value: "dubai", label: "دبي" },
                ]}
              />
              <SelectInput
                name="country"
                label="الدولة"
                className="w-full px-6 text-xl py-4"
                options={[
                  { value: "egypt", label: "مصر" },
                  { value: "ksa", label: "السعودية" },
                  { value: "uae", label: "الإمارات" },
                ]}
              />
              <div>
                <Inputs
                  name="contact_number"
                  label="رقم التواصل الخاص"
                  type="text"
                  className="w-full px-6 text-xl py-4"
                />
                <p className="text-primary-1 text-sm mt-2">
                  الرقم لا يتم نشره أو عرضه للمستخدمين و إنما وسيلة للتواصل بين
                  الموقع والشيف{" "}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <Inputs
                name="short_description"
                label="اضافه رقم"
                type="text"
                className="w-full px-6 text-xl py-4"
              />
              <Inputs
                name="short_description"
                label="اضافه رابط"
                type="text"
                className="w-full px-6 text-xl py-4"
              />
              <Inputs
                name="chef_name"
                label="اضافه رابط"
                type="text"
                icon={RiTwitterXFill} 
                className="w-full px-6 text-xl py-4"
              />
            </div>

            <div className="flex justify-center mt-12">
              <Button
                type="submit"
                label="إضافة شيف"
                className="w-64 bg-primary-1 hover:bg-hover_primary-1 text-white py-5 rounded-xl text-xl font-semibold"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddChef;
