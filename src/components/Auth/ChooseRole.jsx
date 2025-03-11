import React from "react";
import { useNavigate } from "react-router";

const ChooseRole = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    navigate("/register", { state: { role } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">اختر دورك</h2>
      <button
        onClick={() => handleSelectRole("CUSTOMER")}
        className="bg-blue-500 text-white px-6 py-2 rounded-md m-2"
      >
        مستخدم
      </button>
      <button
        onClick={() => handleSelectRole("AGENT")}
        className="bg-green-500 text-white px-6 py-2 rounded-md m-2"
      >
        وكيل
      </button>
    </div>
  );
};

export default ChooseRole;
