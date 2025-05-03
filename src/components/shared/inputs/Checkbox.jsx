const Checkbox = ({
  name,
  label = "",
  checked,
  onChange,
  value,
  disabled,
  className = "",
}) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={name} className="text-right text-black text-sm">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-8 h-8 rounded-md cursor-pointer border-2 focus:outline-none border-red-500 ${className} `}
      />
    </div>
  );
};

export default Checkbox;
