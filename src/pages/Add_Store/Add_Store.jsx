import React, { useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import Inputs from "../../components/shared/inputs/Inputs";

const Add_Store = () => {
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
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[70rem] p-16 bg-gray-100 rounded-xl ">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-10">
            إضافة متجر جديد{" "}
          </h2>
          <div className="mb-10 relative">
            <div className="relative bg-gray-400 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden">
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
                className="absolute bottom-5 left-5 bg-white px-5 py-2 border rounded-md text-sm flex items-center cursor-pointer"
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
                className="absolute bottom-2 left-2 cursor-pointer p-2 rounded-full shadow-md"
              >
                <TbCameraPlus className="text-primary-1 text-2xl " />
              </label>
            </div>
          </div>
          <form className="space-y-14 mx-auto max-w-full">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Store;
