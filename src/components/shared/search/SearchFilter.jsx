import { FaSearch } from "react-icons/fa";

const SearchFilter = ({ value = "", onChange, onSearch }) => {
  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange && onChange(val);
  };

  const handleSearchClick = () => {
    onSearch && onSearch({ name: value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block mb-2 text-black text-right text-sm font-medium">
        البحث
      </label>

      {/* Styled Search Field */}
      <div className="relative w-full bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-between focus-within:border-hover_primary-1 focus-within:ring-2 focus-within:ring-hover_primary-1">
        {/* Left: Empty space */}
        <span className="w-4"></span>

        {/* Center: Input field */}
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="ما الذي تريد أن تبحث عنه؟"
          className="flex-1 mx-2 text-sm text-right bg-transparent border-none outline-none placeholder-gray-500 text-black"
          style={{ caretColor: "black" }}
        />

        {/* Right: Icon and Divider */}
        <div className="flex items-center gap-2 text-gray-500">
          <span className="border-l h-4 border-gray-300"></span>
          <FaSearch
            className="text-lg cursor-pointer hover:text-hover_primary-1"
            onClick={handleSearchClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
