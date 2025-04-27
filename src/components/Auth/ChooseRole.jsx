import React, { useState } from "react";
import { useNavigate } from "react-router";
import smile_man from "/assets/choose_role/smile_man.jpg";
import Button from "../shared/Buttons/Button";
import { LuCircleUser } from "react-icons/lu";
import { IoBriefcaseOutline } from "react-icons/io5";

export default function ChooseRole() {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole) {
      navigate("/register", { state: { role: selectedRole } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          اختيار نوع الحساب
        </h2>
        <p className="text-gray-600 text-center mb-8 text-sm">
          حدد نوع الحساب المناسب لك للبدء في استخدام منصة فودي ، سواء كنت عميل
          يبحث عن مطاعم و وصفات موثوقة او مقدم خدمة ( صاحب مطعم او شيف ) .{" "}
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          {/* Business Account */}
          <div
            className={`relative rounded-lg border ${
              selectedRole === "BUSINESS" ? "border-primary-1" : "border-gray-200"
            } p-4 cursor-pointer`}
            onClick={() => handleSelectRole("BUSINESS")}
          >
            <div className="bg-purple-300 rounded-md mb-4">
              <img
                src={smile_man}
                alt="Business Account"
                className="rounded-md w-full"
              />
            </div>
            <div className="flex justify-between items-center">
              <div
                className={`w-5 h-5 border rounded-full ${
                  selectedRole === "BUSINESS"
                    ? "bg-primary-1 border-primary-1"
                    : "border-gray-300"
                }`}
              ></div>
              <h3 className="font-bold text-lg flex items-center gap-2 flex-row-reverse">
                <IoBriefcaseOutline className="text-2xl text-gray-600" />
                حساب أعمال
              </h3>
            </div>
            <p className="text-gray-600 text-sm text-right mt-2">
              إنشاء وصفات ومحتوى مرئي ( للشيف) , إنشاء وإدارة مطعم (للأصحاب) ,
              متابعة تقييمات العملاء و إدارة أكثر من فرع أو مطعم لو عنده سلسلة{" "}
            </p>
          </div>

          {/* Regular Account */}
          <div
            className={`relative rounded-lg border ${
              selectedRole === "CUSTOMER" ? "border-primary-1" : "border-gray-200"
            } p-4 cursor-pointer`}
            onClick={() => handleSelectRole("CUSTOMER")}
          >
            <div className="bg-purple-300 rounded-md mb-4">
              <img
                src={smile_man}
                alt="Regular Account"
                className="rounded-md w-full"
              />
            </div>
            <div className="flex justify-between items-center">
              <div
                className={`w-5 h-5 border rounded-full ${
                  selectedRole === "CUSTOMER"
                    ? "bg-primary-1 border-primary-1"
                    : "border-gray-300"
                }`}
              ></div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                حساب عادي
                <LuCircleUser className="text-2xl text-gray-600" />
              </h3>
            </div>
            <p className="text-gray-600 text-sm text-right mt-2">
              يشمل استكشاف المطاعم حسب الموقع , مشاهدة وصفات شيفات, حفظ مطاعم أو
              وصفات للمفضلة و تقييم/تعليق على المطاعم أو الوصفات{" "}
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            label="التالى"
            onClick={handleNext}
            disabled={!selectedRole}
            className={`max-w-[500px]   w-full py-3 text-white font-bold rounded-md transition ${
              selectedRole
                ? "bg-primary-1 hover:bg-hover_primary-1"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
