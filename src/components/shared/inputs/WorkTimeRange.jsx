const WorkTimeRange = ({
  label,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  options = [],
}) => {
  return (
    <div className="w-full text-right">
      <label className="block font-semibold text-lg mb-4">{label}</label>

      <div className="flex flex-row-reverse gap-4">
        <div className="w-1/2">
          <div className="relative w-full">
            <select
              value={fromValue}
              onChange={(e) => onFromChange(e.target.value)}
              className="appearance-none w-full h-12 px-4 pr-4 border border-gray-300 rounded-lg text-right text-sm text-gray-700 focus:outline-none"
            >
              <option value="">من</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <div className="relative w-full">
            <select
              value={toValue}
              onChange={(e) => onToChange(e.target.value)}
              className="appearance-none w-full h-12 px-4 pr-4 border border-gray-300 rounded-lg text-right text-sm text-gray-700 focus:outline-none"
            >
              <option value="">إلى</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkTimeRange;
