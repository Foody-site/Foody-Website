import { useState } from "react";
import { FiMenu, FiSearch, FiBell, FiMapPin } from "react-icons/fi";
import { BsGiftFill } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="flex items-center justify-between p-4 border-b shadow-sm bg-white text-sm font-medium">
            {/* Sidebar */}
            {isOpen && (
                <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4">
                    <button className="mb-4" onClick={toggleSidebar}>✖</button>
                    <p className="text-lg font-semibold">مرحبًا بك</p>
                </div>
            )}

            {/* Right: Menu Icon */}
            <button onClick={toggleSidebar} className="text-2xl text-gray-700">
                <FiMenu />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-1 text-red-600 font-bold text-sm">
                <GiKnifeFork className="text-xl" />
                <div className="leading-tight">
                    <div>FOODY</div>
                    <div className="text-xs text-red-500">فودي</div>
                </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-gray-600">
                <FiMapPin className="text-lg" />
                <span>حدد موقعك</span>
            </div>

            {/* Search */}
            <div className="flex items-center border border-red-300 rounded overflow-hidden max-w-xl w-full mx-2">
                <select className="bg-red-600 text-white text-sm p-2 focus:outline-none">
                    <option>الكل</option>
                </select>
                <input
                    type="text"
                    placeholder="ما الذي تريد أن تبحث عنه؟"
                    className="input w-full focus:outline-none text-right px-2"
                />
                <button className="bg-gray-100 px-3 text-gray-600">
                    <FiSearch />
                </button>
            </div>

            {/* Offers */}
            <div className="flex items-center gap-1 text-gray-700">
                <BsGiftFill className="text-red-600 text-xl" />
                <span>عروض/خصومات</span>
            </div>

            {/* Notifications */}
            <div className="relative text-gray-700">
                <FiBell className="text-xl" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">3</span>
            </div>

            {/* User Name */}
            <span className="text-gray-700">تسنيم عماد</span>
        </div>
    );
};

export default Navbar;
