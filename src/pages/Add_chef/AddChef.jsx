import { useState } from "react";
import Button from "../../components/shared/Buttons/Button";
import Inputs from "../../components/shared/inputs/Inputs";
import Footer from "../../components/layout/Footer";
import { FaCamera } from "react-icons/fa";

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
      <div className="flex-grow flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-7xl p-10 border border-gray-300 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            إضافة شيف جديد
          </h2>

          <div className="mb-6 relative">
            <div className="relative bg-gray-400 h-64 w-full rounded-lg flex justify-center items-center overflow-hidden">
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
                className="absolute bottom-4 left-4 bg-white px-4 py-2 border rounded-md text-sm flex items-center cursor-pointer"
              >
                <FaCamera className="mr-2" /> إضافة صورة الغلاف
              </label>
            </div>
            <div className="absolute bottom-0 right-4 w-24 h-24 bg-white rounded-full border flex justify-center items-center overflow-hidden">
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
                <FaCamera className="text-red-500" />
              </label>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Inputs name="chef_name" label="اسم الشيف *" type="text" />
              <Inputs
                name="contact_number"
                label="رقم التواصل الخاص *"
                type="text"
              />
              <Inputs
                name="short_description"
                label="وصف مختصر *"
                type="text"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Inputs name="specialty" label="نوع متخصص الطبخ" type="text" />
              <Inputs name="country" label="الدولة" type="text" />
              <Inputs name="city" label="المدينة" type="text" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Inputs name="facebook" label="إضافة رابط فيسبوك" type="text" />
              <Inputs name="x" label="إضافة رابط X" type="text" />
              <Inputs
                name="instagram"
                label="إضافة رابط إنستاجرام"
                type="text"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Inputs name="tiktok" label="إضافة رابط تيك توك" type="text" />
              <Inputs name="youtube" label="إضافة رابط يوتيوب" type="text" />
              <Inputs
                name="website"
                label="إضافة رابط الموقع الشخصي"
                type="text"
              />
            </div>
            <div className="flex space-x-4 mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                رقم التواصل مرئي
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                البريد الإلكتروني
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                رقم الواتساب
              </label>
            </div>
            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                label="إضافة شيف"
                className="w-64 bg-primary-1 hover:bg-hover_primary-1 text-white py-2 rounded-md text-lg font-semibold"
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
