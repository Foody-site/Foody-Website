const Inputs = ({ label, type, className = "", icon }) => {
  return (
    <div className="w-full">
      <label className="block text-gray-600 text-sm mb-2">{label}</label>
      <div className="relative">
        <input
          type={type}
          className={`w-full px-4 py-3 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-hover_primary-1 ${className}`}
        />
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <i className={`fas fa-${icon}`}></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default Inputs;
