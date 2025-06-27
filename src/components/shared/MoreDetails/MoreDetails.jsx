import { FaCheck } from "react-icons/fa";

const MoreDetails = ({ values, onChange }) => {
  const options = [
    { label: "وصفات اليوم من فودي", key: "todayRecipe" },
    { label: "إمكانية التواصل مع الشيف لحجز موعد مناسبة", key: "canContactChef" },
    { label: "وصفات سريعة التحضير (أقل من 45 دقيقة)", key: "isFastFood" },
    { label: "أطعمة لا تحتوي على مسببات الحساسية", key: "isAllergenic" },
  ];

  const handleCheckboxChange = (key) => {
    onChange({ ...values, [key]: !values[key] });
  };

  return (
    <div>
      <label className="block mb-2 text-black font-semibold pb-2 text-right">
        مزيد من التفاصيل
      </label>
      {options.map((option) => {
        const isSelected = values[option.key] || false;
        return (
          <div
            key={option.key}
            onClick={() => handleCheckboxChange(option.key)}
            className={`flex items-center justify-between bg-white px-3 py-2 rounded-lg mb-2 cursor-pointer ${
              isSelected ? "text-[#030303]" : "text-[#808080]"
            }`}
          >
            {/* Left side: check icon placeholder */}
            <div className="w-4">
              {isSelected && <FaCheck className="text-primary-1 text-sm" />}
            </div>

            {/* Label text */}
            <div
              className={`flex-1 text-right text-sm font-semibold px-2 ${
                isSelected ? "text-[#030303]" : "text-[#808080]"
              }`}
            >
              {option.label}
            </div>

            {/* Custom checkbox styled like MoreChoicesFilter */}
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

export default MoreDetails;