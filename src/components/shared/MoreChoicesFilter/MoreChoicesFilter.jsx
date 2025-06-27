import { FaCheck } from "react-icons/fa";

const options = [
  "مفتوح الآن",
  "الاقرب اليك",
  "جلسات داخلية",
  "جلسات خارجية",
  "يوجد توصيل",
  "جلسات عائلية",
  "يوجد حجز مسبق",
  "أضيف حديثاً",
];

const MoreChoicesFilter = ({
  selectedOptions,
  setSelectedOptions,
  setCoordinates,
}) => {
  const toggleSelection = (value) => {
    const updatedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((item) => item !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updatedOptions);

    if (value === "الاقرب اليك") {
      if (!selectedOptions.includes("الاقرب اليك")) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              console.error("Geolocation error:", error);
              setCoordinates(null);
            }
          );
        } else {
          console.warn("Geolocation not supported.");
          setCoordinates(null);
        }
      } else {
        setCoordinates(null);
      }
    }
  };

  return (
    <div>
      <label className="block mb-2 text-black font-semibold pb-2 text-right">مزيد من الخيارات</label>
      {options.map((opt) => {
        const isSelected = selectedOptions.includes(opt);
        return (
          <div
            key={opt}
            onClick={() => toggleSelection(opt)}
            className={`flex items-center justify-between bg-white px-3 py-2 rounded-lg mb-2 cursor-pointer ${
              isSelected ? "text-[#030303]" : "text-[#808080]"
            }`}
          >
            <div className="w-4">
              {isSelected && <FaCheck className="text-primary-1 text-sm" />}
            </div>

            <div
              className={`flex-1 text-right text-sm font-semibold px-2 ${
                isSelected ? "text-[#030303]" : "text-[#808080]"
              }`}
            >
              {opt}
            </div>

            <div
              className={`w-4 h-4 flex items-center justify-center rounded-md border ${
                isSelected ? "border-primary-1" : "border-[#808080]"
              }`}
            >
              {isSelected && (
                <div className="bg-primary-1 w-4 h-4 flex items-center justify-center rounded-[4px]">
                  <FaCheck className="text-white text-[10px]" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoreChoicesFilter;