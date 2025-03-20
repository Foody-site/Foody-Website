const SelectInput = ({ name, label, options, onChange, value }) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value} 
        onChange={onChange} 
        className="p-2 border border-gray-300 rounded-md bg-white"
      >
        <option value=""> {label} </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
