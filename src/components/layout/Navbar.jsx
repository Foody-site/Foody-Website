import { useState } from "react";
import { FiSearch, FiBell, FiMapPin } from "react-icons/fi";
import { BsGiftFill } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="w-full border-b bg-white shadow-sm text-sm font-medium" dir="rtl">
            {/* Top Row */}
            <div className="flex items-center justify-between px-4 py-2">
                {/* Left Icons */}
                <div className="flex items-center gap-2">
                    <div className="relative bg-red-600 text-white p-2 rounded-full">
                        <FiBell className="text-lg" />
                        <span className="absolute -top-1 -right-1 bg-white text-red-600 text-[10px] font-bold px-1 rounded-full">3</span>
                    </div>
                    <div className="bg-red-600 text-white p-2 rounded-full">
                        <FaHeart className="text-lg" />
                    </div>
                    <div className="bg-red-600 text-white p-2 rounded-full">
                        <MdDiscount className="text-lg" />
                    </div>
                    <div className="bg-red-600 text-white p-2 rounded-full">
                        <FiMapPin className="text-lg" />
                    </div>
                </div>

                {/* Logo Center */}
                <div className="flex flex-col items-center text-red-600 font-bold text-sm">
                    <GiKnifeFork className="text-2xl" />
                    <span>FOODY</span>
                    <span className="text-xs text-red-500">فودي</span>
                </div>

                {/* User Dropdown */}
                <div className="flex items-center gap-1">
                    <span className="text-gray-700">تسنيم حسام</span>
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="user"
                        className="w-6 h-6 rounded-full"
                    />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="relative border-t text-gray-700 py-2 px-4">
                {/* Navigation Links Centered */}
                <div className="flex justify-center gap-4 text-sm font-medium">
                    <button className="bg-red-600 text-white px-3 py-1 rounded">الرئيسية</button>
                    <button className="hover:text-red-600">التصنيفات</button>
                    <button className="hover:text-red-600">الشيفات</button>
                    <button className="hover:text-red-600">الوصفات</button>
                </div>

                {/* Offers Button on Right */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <button className="flex items-center border border-red-600 text-red-600 px-3 py-1 rounded gap-1 text-sm">
                        العروض
                        <BsGiftFill />
                    </button>
                </div>

                {/* Search on Left */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-64 max-w-full">
                    <div className="flex items-center border rounded overflow-hidden">
                        <input
                            type="text"
                            placeholder="البحث"
                            className="px-2 py-1 w-full text-sm focus:outline-none text-right"
                        />
                        <FiSearch className="mx-2 text-gray-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;