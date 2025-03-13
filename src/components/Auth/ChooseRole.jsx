import React from "react";
import { useNavigate } from "react-router";
import { FaBriefcase, FaUserCircle } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ChooseRole = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    navigate("/register", { state: { role } });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen bg-gray-100 px-16">
      <h2 className="absolute top-64 right-80 text-3xl font-bold">
        اختر نوع حسابك
      </h2>

      <div className="flex gap-16 w-full justify-center mt-20">
        <div
          onClick={() => handleSelectRole("BUSINESS")}
          className="relative flex flex-col items-end p-10 w-[600px] h-[350px] bg-white shadow-lg rounded-xl cursor-pointer hover:shadow-xl transition"
        >
          <div className="w-20 h-20 bg-blue-100 flex items-center justify-center rounded-full mt-4 mb-12">
            <FaBriefcase className="text-5xl text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-2 self-end">حساب أعمال</h3>
          <p className="text-md text-primary-1 leading-loose text-right self-end">
            . إنشاء صفحة شيف أو إدارتها <br />. إنشاء صفحة متجر أو إدارتها
          </p>
          <IoArrowBackCircleOutline className="text-6xl absolute left-5 bottom-40 text-gray-400" />
        </div>

        <div
          onClick={() => handleSelectRole("CUSTOMER")}
          className="relative flex flex-col items-end p-10 w-[600px] h-[350px] bg-white shadow-lg rounded-xl cursor-pointer hover:shadow-xl transition"
        >
          <div className="w-20 h-20 bg-black flex items-center justify-center rounded-full mt-4 mb-12">
            <FaUserCircle className="text-5xl text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">الحساب العادي</h3>
          <IoArrowBackCircleOutline className="text-6xl absolute left-5 bottom-40 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
