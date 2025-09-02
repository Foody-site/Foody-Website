import { useState, useEffect } from "react";

const PriceFilter = ({ minPrice = 0, maxPrice = 5000, onPriceChange }) => {
  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

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

  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-black text-right mb-4 font-medium">السعر</h3>

      {/* Range Sliders - منفصلين */}
      <div className="mb-6">
        {/* الحد الأدنى */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2 text-right">
            الحد الأدنى: {priceRange.min} ريال
          </label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange.min}
            onChange={handleMinChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-min"
          />
        </div>

        {/* الحد الأقصى */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2 text-right">
            الحد الأقصى: {priceRange.max} ريال
          </label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange.max}
            onChange={handleMaxChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-max"
          />
        </div>
      </div>

      {/* Price Labels */}
      <div className="flex justify-between items-center">
        <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm">
          ريال {priceRange.min}
        </div>
        <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm">
          ريال {priceRange.max}
        </div>
      </div>

      <style jsx>{`
        .slider-min::-webkit-slider-thumb,
        .slider-max::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #dc2626;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider-min::-moz-range-thumb,
        .slider-max::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #dc2626;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider-min::-webkit-slider-track,
        .slider-max::-webkit-slider-track {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
        }

        .slider-min::-moz-range-track,
        .slider-max::-moz-range-track {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default PriceFilter;
