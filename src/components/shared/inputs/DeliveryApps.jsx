import React, { useState } from "react";
import Inputs from "./Inputs";

const DeliveryApps = () => {
  const [apps, setApps] = useState([
    { name: "keeta", label: "كيتا", checked: false },
    { name: "jahez", label: "جاهز", checked: false },
    { name: "hungerStation", label: "هنقرستيشن", checked: false },
    { name: "mrsool", label: "مرسول", checked: false },
    { name: "noon", label: "نون", checked: false },
    { name: "toyou", label: "تويو", checked: false },
    { name: "theChefz", label: "ذا شيفز", checked: false },
    { name: "uber", label: "اوبر", checked: false },
    { name: "mrMandoob", label: "مستر مندوب", checked: false },
    { name: "other", label: "أخرى", checked: false },
    { name: "careem", label: "كريم", checked: false },
    { name: "shgardi", label: "شقر دي", checked: false },
  ]);

  const handleCheckboxChange = (id) => {
    setApps(
      apps.map((app) =>
        app.name === id ? { ...app, checked: !app.checked } : app
      )
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-right mb-6">تطبيقات التوصيل</h2>
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div key={app.name} className="flex flex-col items-end">
              {/* Checkbox and Label */}
              <div className="flex items-center mb-2">
                <span className="text-gray-700 text-lg font-medium">
                  {app.label}
                </span>
                <input
                  type="checkbox"
                  checked={app.checked}
                  onChange={() => handleCheckboxChange(app.name)}
                  className="w-6 h-6 ml-2 bg-gray-100 border-2 border-primary-1 accent-primary-1 rounded cursor-pointer focus:outline-none"
                />
              </div>

              {/* Input Field */}
              <Inputs
                type="text"
                name={app.name}
                placeholder={`أدخل الرابط من ${app.label}`}
                disabled={!app.checked}
                className={`w-full h-12 px-6 text-base py-4 text-right transition-opacity duration-300 ${
                  !app.checked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryApps;
