const MultiCheckBox = ({
  label,
  options,
  selectedOptions = [],
  onChange,
  required = false,
}) => {
  return (
    <div className="w-full text-right">
      <label className="font-semibold text-lg mb-4 flex justify-end items-center">
        <div className="flex items-center">
          {required && <span className="text-red-600 mr-1 text-lg">*</span>}
          {label}
        </div>
      </label>

      <div className="flex flex-wrap justify-start md:justify-end gap-x-12 gap-y-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 text-2xl text-gray-800"
          >
            {option.label}
            <input
              type="checkbox"
              value={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={() => onChange(option.value)}
              className="w-8 h-8 ml-2 bg-gray-100 border-2 border-primary-1 accent-primary-1 rounded cursor-pointer focus:outline-none"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultiCheckBox;
