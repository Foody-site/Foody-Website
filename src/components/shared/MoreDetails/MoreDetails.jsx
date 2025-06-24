const MoreDetails = ({ values, onChange }) => {
  const options = [
    { label: "وصفات اليوم من فودي", key: "todayRecipe" },
    {
      label: "إمكانية التواصل مع الشيف لحجز موعد مناسبة",
      key: "canContactChef",
    },
    { label: "وصفات سريعة التحضير (أقل من 45 دقيقة)", key: "isFastFood" },
    { label: "أطعمة لا تحتوي على مسببات الحساسية", key: "isAllergenic" },
  ];

  const handleCheckboxChange = (key) => {
    onChange({ ...values, [key]: !values[key] });
  };

  return (
    <div>
      <h2 className="font-bold text-md text-gray-800 mt-4">مزيد من التفاصيل</h2>
      <div className="space-y-3 text-gray-700">
        {options.map((option) => (
          <label
            key={option.key}
            className="flex items-center justify-between bg-white px-3 py-2 rounded-md border border-gray-200 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={values[option.key] || false}
              onChange={() => handleCheckboxChange(option.key)}
              className="form-checkbox text-primary-1 accent-primary-1 w-4 h-4"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MoreDetails;
