import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchFilter = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <div className="bg-[#D713130D] text-white p-4 rounded-xl space-y-4 font-sans text-sm">
            <div className="relative">
                <input
                    type="text"
                    placeholder="ما الذي تريد أن تبحث عنه؟"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-black focus:outline-none"
                />
                <FaSearch
                    onClick={handleSearch}
                    className="absolute top-2.5 left-4 text-gray-500 cursor-pointer"
                    size={16}
                    aria-label="بحث"
                />
            </div>
        </div>
    );
};

export default SearchFilter;