
const CheckBoxWorkRange = ({ name, label, options, selectedValue, onChange }) => {
  return (
    <div className="w-full text-right">
      <label className="block font-semibold text-lg mb-4">{label}</label>

      <div className="flex flex-wrap justify-start md:justify-end gap-x-12 gap-y-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 text-2xl text-gray-800"
          >
            {option.label}
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="w-6 h-6 ml-2 bg-gray-100 border-2 border-primary-1 accent-primary-1 rounded-full cursor-pointer focus:outline-none"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxWorkRange