import { useState } from "react";
import { FaBiking } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

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
    <div className="relative w-full">
      {/* Label */}
      <label className="block mb-2 text-black text-right text-sm font-medium">
        تطبيقات التوصيل
      </label>

      <div className="w-full">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <IoIosArrowDown className="text-black text-lg" />
          <span
            className={`flex-1 mx-2 text-sm text-right ${
              selectedApps.length === 0 ? "text-gray-500" : "text-black"
            }`}
          >
            {selectedApps.length === 0
              ? "قم بإختيار نوع تطبيقات التوصيل"
              : `تطبيقات مختارة (${selectedApps.length})`}
          </span>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="border-l h-4 border-gray-300"></span>
            <FaBiking className="text-lg" />
          </div>
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