import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import RecipeFilter from "../filters/RecipeFilter";

const RecipeFilterWrapper = ({ onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="hidden md:block w-80">
                <RecipeFilter onSearch={onSearch} />
            </div>

            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center rounded-full border-2 border-primary-1 text-primary-1 bg-white shadow-lg z-50"
                >
                    <FaFilter size={22} />
                </button>

                {isOpen && (
                    <div className="fixed inset-0 z-40 flex">
                        <div
                            className="fixed inset-0 bg-black bg-opacity-40"
                            onClick={() => setIsOpen(false)}
                        />

                        <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl p-4 overflow-y-auto z-50">
                            <div className="flex flex-row-reverse items-center justify-between mb-4 border-b pb-2">
                                <h2 className="text-lg font-semibold text-gray-800">تصفيه</h2>
                                <button
                                    className="text-gray-600 text-xl"
                                    onClick={() => setIsOpen(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <RecipeFilter onSearch={onSearch} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RecipeFilterWrapper;