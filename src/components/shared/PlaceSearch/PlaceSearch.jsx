import { FaMapMarkerAlt, FaCity } from "react-icons/fa";
import SelectInput from "../../../components/shared/inputs/SelectInput";

const PlaceSearch = ({
  selectedRegion,
  setSelectedRegion,
  selectedCity,
  setSelectedCity,
}) => {
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

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setSelectedCity("");
  };

  return (
    <>
      <div className="relative">
        <div className="absolute left-4 top-3 text-gray-500">
          <FaMapMarkerAlt />
        </div>
        <SelectInput
          name="region"
          placeholder="قم بإختيار المنطقة"
          label=""
          value={selectedRegion}
          onChange={handleRegionChange}
          className="w-full pl-10 pr-4 py-2 bg-white text-black rounded-lg"
          options={regionOptions}
        />
      </div>

      <div className="relative mt-4">
        <div className="absolute left-4 top-3 text-gray-500">
          <FaCity />
        </div>
        <SelectInput
          name="city"
          placeholder="قم بإختيار المدينة"
          label=""
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white text-black rounded-lg"
          options={currentCityOptions}
        />
      </div>
    </>
  );
};

export default PlaceSearch;
