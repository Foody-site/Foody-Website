import React from "react";
import Inputs from "./Inputs";

const DeliveryApps = () => {
  const apps = [
    { id: "mrsool", name: "مرسول" },
    { id: "careem", name: "كريم" },
    { id: "ubereats", name: "أوبر" },
    { id: "jahez", name: "جاهز" },
    { id: "shater", name: "شاطر" },
    { id: "toyou", name: "تويو" },
    { id: "thechefz", name: "ذا شفز" },
    { id: "mandob", name: "مندوب" },
  ];

  return (
    <>
      <h3 className="text-lg font-bold mb-4">تطبيقات التوصيل</h3>
      <div className="bg-gray-200 p-5 rounded-lg text-right">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {apps.map((app) => (
            <div key={app.id} className="flex items-center gap-2">
              <Inputs
                type="text"
                placeholder={`رابط المتجر في ${app.name}`}
                className="flex-1 h-10 rounded px-3 border border-gray-300 text-sm"
              />
              <label className="text-sm">{app.name}</label>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DeliveryApps;
