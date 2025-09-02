import { useState, useEffect, useRef } from "react";

const PriceFilter = ({ minPrice = 0, maxPrice = 2000, onPriceChange }) => {
  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = useRef(null);

  // تحديث القيم عند تغيير props
  useEffect(() => {
    setPriceRange({
      min: minPrice,
      max: maxPrice,
    });
  }, [minPrice, maxPrice]);

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= priceRange.max) {
      const newRange = { ...priceRange, min: newMin };
      setPriceRange(newRange);
      onPriceChange?.(newRange);
    }
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= priceRange.min) {
      const newRange = { ...priceRange, max: newMax };
      setPriceRange(newRange);
      onPriceChange?.(newRange);
    }
  };

  // حساب القيمة من موضع الماوس
  const getValueFromPosition = (clientX) => {
    if (!sliderRef.current) return 0;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = (clientX - rect.left) / rect.width;
    const value = Math.round(minPrice + percent * (maxPrice - minPrice));
    return Math.max(minPrice, Math.min(maxPrice, value));
  };

  // التعامل مع النقر على المسار
  const handleSliderClick = (e) => {
    const newValue = getValueFromPosition(e.clientX);
    const minDiff = Math.abs(newValue - priceRange.min);
    const maxDiff = Math.abs(newValue - priceRange.max);

    if (minDiff < maxDiff) {
      if (newValue <= priceRange.max) {
        const newRange = { ...priceRange, min: newValue };
        setPriceRange(newRange);
        onPriceChange?.(newRange);
      }
    } else {
      if (newValue >= priceRange.min) {
        const newRange = { ...priceRange, max: newValue };
        setPriceRange(newRange);
        onPriceChange?.(newRange);
      }
    }
  };

  // بداية السحب
  const handleMouseDown = (type, e) => {
    e.preventDefault();
    setIsDragging(type);
  };

  // التعامل مع حركة الماوس
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newValue = getValueFromPosition(e.clientX);

    if (isDragging === "min" && newValue <= priceRange.max) {
      const newRange = { ...priceRange, min: newValue };
      setPriceRange(newRange);
      onPriceChange?.(newRange);
    } else if (isDragging === "max" && newValue >= priceRange.min) {
      const newRange = { ...priceRange, max: newValue };
      setPriceRange(newRange);
      onPriceChange?.(newRange);
    }
  };

  // انتهاء السحب
  const handleMouseUp = () => {
    setIsDragging(null);
  };

  // إضافة event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, priceRange]);

  // حساب النسبة المئوية للموضع
  const getMinPercent = () => {
    const totalRange = maxPrice - minPrice;
    return ((priceRange.min - minPrice) / totalRange) * 100;
  };

  const getMaxPercent = () => {
    const totalRange = maxPrice - minPrice;
    return ((priceRange.max - minPrice) / totalRange) * 100;
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-black text-right mb-4 font-medium">السعر</h3>

      {/* Dual Range Slider قابل للتفاعل */}
      <div className="relative mb-6 py-2 pb-6">
        {/* المسار الخلفي */}
        <div
          ref={sliderRef}
          className="h-2 bg-gray-200 rounded-lg relative cursor-pointer"
          onClick={handleSliderClick}
        >
          {/* الجزء المحدد بين القيمتين */}
          <div
            className="h-2 bg-red-600 rounded-lg absolute"
            style={{
              left: `${getMinPercent()}%`,
              width: `${getMaxPercent() - getMinPercent()}%`,
            }}
          />
        </div>
        {/* الدائرة اليسرى (الحد الأدنى) مع السعر بداخلها */}
        <div
          className={`absolute bg-red-600 rounded-lg text-white text-xs font-medium px-2 py-1 transform -translate-y-1 cursor-grab flex items-center justify-center min-w-[50px] ${
            isDragging === "min" ? "cursor-grabbing scale-110" : ""
          }`}
          style={{
            left: `calc(${getMinPercent()}% - 25px)`,
            top: "-5px",
            zIndex: isDragging === "min" ? 40 : 30,
          }}
          onMouseDown={(e) => handleMouseDown("min", e)}
        >
          ريال {priceRange.min}
        </div>
        {/* الدائرة اليمنى (الحد الأقصى) مع السعر بداخلها */}
        <div
          className={`absolute bg-red-600 rounded-lg text-white text-xs font-medium px-2 py-1 transform -translate-y-1 cursor-grab flex items-center justify-center min-w-[50px] ${
            isDragging === "max" ? "cursor-grabbing scale-110" : ""
          }`}
          style={{
            left: `calc(${getMaxPercent()}% - 25px)`,
            top: "-5px",
            zIndex: isDragging === "max" ? 40 : 30,
          }}
          onMouseDown={(e) => handleMouseDown("max", e)}
        >
          ريال {priceRange.max}
        </div>{" "}
        {/* Range inputs خفية للأكسسيبيليتي */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange.min}
          onChange={handleMinChange}
          className="sr-only"
          aria-label="الحد الأدنى للسعر"
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange.max}
          onChange={handleMaxChange}
          className="sr-only"
          aria-label="الحد الأقصى للسعر"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
