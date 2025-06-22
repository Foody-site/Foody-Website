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
        <div className="bg-[#D713130D] text-white p-4 rounded-xl space-y-4 font-sans text-sm">
            <div className="relative">
                <input
                    type="text"
                    placeholder="ما الذي تريد أن تبحث عنه؟"
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-black focus:outline-none"
                />
                <FaSearch
                    onClick={handleSearchClick}
                    className="absolute top-2.5 left-4 text-gray-500 cursor-pointer"
                    size={16}
                    aria-label="بحث"
                />
            </div>
        </div>
    );
};

export default SearchFilter;