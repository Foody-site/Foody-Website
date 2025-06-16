import React from "react";
import Inputs from "./Inputs";

const DeliveryApps = ({ apps, onCheckboxChange, onInputChange }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-right mb-6">تطبيقات التوصيل</h2>
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div key={app.name} className="flex flex-col items-end">
              <div className="flex items-center mb-2">
                <span className="text-gray-700 text-lg font-medium">
                  {app.label}
                </span>
                <input
                  type="checkbox"
                  checked={app.checked}
                  onChange={() => onCheckboxChange(app.name)}
                  className="w-6 h-6 ml-2 bg-gray-100 border-2 border-primary-1 accent-primary-1 rounded cursor-pointer focus:outline-none"
                />
              </div>

              <Inputs
                type="text"
                name={app.name}
                placeholder={`أدخل الرابط من ${app.label}`}
                value={app.link || ""}
                onChange={(e) => onInputChange(app.name, e.target.value)}
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
