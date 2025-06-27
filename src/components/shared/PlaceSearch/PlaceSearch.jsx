import { useState } from "react";
import { FaMapMarkerAlt, FaCity } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const PlaceSearch = ({
  selectedRegion,
  setSelectedRegion,
  selectedCity,
  setSelectedCity,
}) => {
  const [regionOpen, setRegionOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const regionOptions = [
    { value: "", label: "قم بإختيار المنطقة" },
    { value: "Riyadh", label: "الرياض" },
    { value: "Qasim", label: "القصيم" },
  ];

  const cityOptionsMap = {
    Riyadh: [
      { value: "", label: "قم بإختيار المدينة" },
      { value: "El-kharg", label: "محافظة الخرج" },
    ],
    Qasim: [
      { value: "", label: "قم بإختيار المدينة" },
      { value: "El-Bdaea", label: "محافظة البدائع" },
    ],
  };

  const currentCityOptions = cityOptionsMap[selectedRegion] || [
    { value: "", label: "قم بإختيار المدينة" },
  ];

  return (
    <>
      {/* Region Label */}
      <label className="block mb-2 text-black text-right text-sm font-medium">
        المنطقة
      </label>
      <div className="relative w-full mb-4">
        <button
          type="button"
          onClick={() => setRegionOpen(!regionOpen)}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <IoIosArrowDown className="text-black text-lg" />
          <span
            className={`flex-1 mx-2 text-sm text-right ${
              !selectedRegion ? "text-gray-500" : "text-black"
            }`}
          >
            {
              regionOptions.find((opt) => opt.value === selectedRegion)
                ?.label || "قم بإختيار المنطقة"
            }
          </span>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="border-l h-4 border-gray-300"></span>
            <FaMapMarkerAlt className="text-lg" />
          </div>
        </button>

        {regionOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="p-2 text-right">
              {regionOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setSelectedRegion(option.value);
                    setSelectedCity("");
                    setRegionOpen(false);
                  }}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm text-black"
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* City Label */}
      <label className="block mb-2 text-black text-right text-sm font-medium">
        المدينة
      </label>
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setCityOpen(!cityOpen)}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <IoIosArrowDown className="text-black text-lg" />
          <span
            className={`flex-1 mx-2 text-sm text-right ${
              !selectedCity ? "text-gray-500" : "text-black"
            }`}
          >
            {
              currentCityOptions.find((opt) => opt.value === selectedCity)
                ?.label || "قم بإختيار المدينة"
            }
          </span>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="border-l h-4 border-gray-300"></span>
            <FaCity className="text-lg" />
          </div>
        </button>

        {cityOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="p-2 text-right">
              {currentCityOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setSelectedCity(option.value);
                    setCityOpen(false);
                  }}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm text-black"
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceSearch;