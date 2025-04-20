import React, { useState } from "react";
import Inputs from "./Inputs";

const DeliveryApps = () => {
  const [apps, setApps] = useState([
    { name: "toyou", label: "تويو", checked: false },
    { name: "talabat", label: "طلبات", checked: false },
    { name: "hungerStation", label: "هنقرستيشن", checked: false },
    { name: "theChefz", label: "ذا شيفز", checked: false },
    { name: "uber", label: "أوبر", checked: false },
    { name: "mrsool", label: "مرسول", checked: false },
    { name: "mrMandoob", label: "مستر مندوب", checked: false },
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
      <h2 className="text-base font-bold text-right mb-6">تطبيقات التوصيل</h2>
      <div className="bg-gray-200 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div key={app.name} className="flex items-center justify-end">
              <Inputs
                type="text"
                name={app.name}
                placeholder={`أدخل الرابط من ${app.label}`}
                disabled={!app.checked}
                className={`flex-1 h-12 px-6 text-xs py-4 text-right transition-opacity duration-300 ${
                  !app.checked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
              <div className="w-24 text-right ml-2">
                <span className="text-gray-700 text-xs font-medium">
                  {app.label}
                </span>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={app.checked}
                  onChange={() => handleCheckboxChange(app.name)}
                  className="w-4 h-4 ml-2 accent-hover_primary-1 rounded cursor-pointer focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryApps;
