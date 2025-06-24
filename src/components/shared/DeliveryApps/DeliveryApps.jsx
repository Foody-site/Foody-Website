import React, { useState } from "react";
import { FaBiking } from "react-icons/fa";

const DELIVERY_APPS = [
  { key: "keeta", label: "Keeta" },
  { key: "hungerStation", label: "HungerStation" },
  { key: "toyou", label: "ToYou" },
  { key: "mrsool", label: "Mrsool" },
  { key: "theChefz", label: "The Chefz" },
  { key: "mrMandoob", label: "Mr Mandoob" },
  { key: "shgardi", label: "Shgardi" },
  { key: "uber", label: "Uber" },
  { key: "careem", label: "Careem" },
  { key: "noon", label: "Noon" },
  { key: "jahez", label: "Jahez" },
  { key: "other", label: "Other" },
];

const DeliveryApps = ({ selectedApps, setSelectedApps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (appKey) => {
    if (selectedApps.includes(appKey)) {
      setSelectedApps(selectedApps.filter((key) => key !== appKey));
    } else {
      setSelectedApps([...selectedApps, appKey]);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute left-4 top-3 text-gray-500">
          <FaBiking />
        </div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full text-right appearance-none pl-10 pr-4 py-2 bg-white text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
        >
          <span
            className={`${
              selectedApps.length === 0 ? "text-gray-500" : "text-black"
            } text-right w-full`}
          >
            {selectedApps.length === 0
              ? "قم بإختيار نوع تطبيقات التوصيل"
              : `تطبيقات مختارة (${selectedApps.length})`}
          </span>
          <span className="ml-2">▼</span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2">
            {DELIVERY_APPS.map((app) => (
              <div
                key={app.key}
                className="flex items-center p-2 hover:bg-gray-100 flex-row-reverse"
              >
                <label
                  htmlFor={`app-${app.key}`}
                  className="pr-2 block text-sm text-gray-900 cursor-pointer w-full text-right"
                >
                  {app.label}
                </label>
                <input
                  type="checkbox"
                  id={`app-${app.key}`}
                  checked={selectedApps.includes(app.key)}
                  onChange={() => handleCheckboxChange(app.key)}
                  className="h-4 w-4 accent-red-600 border-gray-300 rounded"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedApps.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 justify-end">
          {selectedApps.map((appKey) => {
            const app = DELIVERY_APPS.find((a) => a.key === appKey);
            return app ? (
              <span
                key={app.key}
                className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center"
              >
                {app.label}
                <button
                  type="button"
                  className="mr-1.5 text-red-800 hover:text-red-900 order-first"
                  onClick={() => handleCheckboxChange(app.key)}
                >
                  ×
                </button>
              </span>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default DeliveryApps;
