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
            <div className="relative w-full">
                <button
                    type="button"
                    className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleSearchClick}
                >
                    {/* Left: Empty placeholder for symmetry (optional) */}
                    <span className="text-transparent text-lg">.</span>

                    {/* Center: Placeholder or value */}
                    <span
                        className={`flex-1 mx-2 text-sm text-right ${!value ? "text-gray-500" : "text-black"
                            }`}
                    >
                        {value || "ما الذي تريد أن تبحث عنه؟"}
                    </span>

                    {/* Right: Icon and Divider */}
                    <div className="flex items-center gap-2 text-gray-500 pointer-events-none">
                        <span className="border-l h-4 border-gray-300"></span>
                        <FaSearch className="text-lg" />
                    </div>
                </button>

                {/* Invisible actual input over button for interaction */}
                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-text"
                    aria-label="بحث"
                />
            </div>
        </div>
    );
};

export default SearchFilter;