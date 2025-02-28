const Input = ({label , type ,className=""}) => {
  return (
    <>
      <label className="block text-gray-600 text-sm mb-2">
       {label}
      </label>
      <input
        type={type}
        className={`w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500  ${className}`}
      />
    </>
  );
};

export default Input;
