import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const CheckboxSelectInput = ({
  name,
  label,
  options,
  onChange,
  className = "",
  value = [], // إضافة وسيط لقيمة افتراضية
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(value || []);
  const isInitialMount = useRef(true); // مرجع للتحقق من التحميل الأولي

  // تحديث القيم المحددة عندما تتغير القيمة الخارجية
  useEffect(() => {
    // تخطي التحديث الأول لمنع الحلقات اللانهائية عند التحميل
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // التحقق من المساواة العميقة بين المصفوفتين قبل التحديث
    const isSameArray =
      Array.isArray(value) &&
      Array.isArray(selectedOptions) &&
      value.length === selectedOptions.length &&
      value.every((val) => selectedOptions.includes(val));

    // تحديث الحالة فقط إذا كانت القيمة مختلفة فعليًا
    if (!isSameArray && Array.isArray(value)) {
      setSelectedOptions(value);
    }
  }, [value]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // معالج النقر خارج القائمة لإغلاقها
  useEffect(() => {
    const handleClickOutside = (event) => {
      // تحقق إذا كان الضغط خارج القائمة
      if (isOpen && !event.target.closest(`.${name}-dropdown`)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, name]);

  const handleCheckboxChange = (event) => {
    const { value: optionValue, checked } = event.target;
    let updatedSelection = checked
      ? [...selectedOptions, optionValue]
      : selectedOptions.filter((item) => item !== optionValue);

    setSelectedOptions(updatedSelection);

    // استدعاء onChange فقط عند التغيير الفعلي
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: updatedSelection,
        },
      });
    }
  };

  // تنسيق عرض العناصر المحددة
  const displaySelectedOptions = () => {
    if (!selectedOptions || selectedOptions.length === 0) return "اختر";

    if (selectedOptions.length === 1) {
      const selectedOption = options.find(
        (opt) => opt.value === selectedOptions[0]
      );
      return selectedOption ? selectedOption.label : "اختر";
    }

    // إذا تم تحديد أكثر من عنصر، نعرض الأول مع عدد العناصر المتبقية
    const firstOption = options.find((opt) => opt.value === selectedOptions[0]);
    return firstOption
      ? `${firstOption.label} و${selectedOptions.length - 1} أخرى`
      : "اختر";
  };

  return (
    <div className={`relative ${className} ${name}-dropdown`}>
      <label className="block text-gray-700 font-medium mb-1 text-right">
        {label}
      </label>

      <button
        type="button"
        className="w-full text-right border border-gray-300 p-2 bg-white rounded-md flex justify-between items-center"
        onClick={handleToggle}
      >
        <FaChevronDown className="text-gray-500" />
        <span className="text-gray-600 truncate max-w-[90%] overflow-hidden">
          {displaySelectedOptions()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 w-full mt-1 border bg-white shadow-md rounded-md max-h-60 overflow-y-auto z-10">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer text-right"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={handleCheckboxChange}
                className="w-5 h-5 accent-hover_primary-1 ml-2 min-w-[20px] min-h-[20px]"
              />
              <span className="overflow-hidden text-ellipsis">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1 text-right">{error}</p>}
    </div>
  );
};

export default CheckboxSelectInput;
