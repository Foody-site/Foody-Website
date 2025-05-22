import { useState } from "react";
import { PiChefHatLight } from "react-icons/pi";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { CiForkAndKnife } from "react-icons/ci";
import Button from "../../components/shared/Buttons/Button";
import { StoresTable } from "./StoresTable/StoresTable";
import { ChefsTable } from "./ChefsTable/ChefsTable";
import { RecipesTable } from "./RecipesTable/RecipesTable";

export default function List() {
  const [activeTab, setActiveTab] = useState("المتاجر");

  const menuItems = [
    { label: "المتاجر", icon: <MdOutlineStoreMallDirectory size={20} /> },
    { label: "الشيفات", icon: <PiChefHatLight size={20} /> },
    { label: "الوصفات", icon: <CiForkAndKnife size={20} /> },
  ];

  const renderTable = () => {
    switch (activeTab) {
      case "المتاجر":
        return <StoresTable />;
      case "الشيفات":
        return <ChefsTable />;
      case "الوصفات":
        return <RecipesTable />;
      default:
        return <StoresTable />;
    }
  };

  const getButtonText = () => {
    switch (activeTab) {
      case "المتاجر":
        return "إضافة متجر جديد";
      case "الشيفات":
        return "إضافة شيف جديد";
      case "الوصفات":
        return "إضافة وصفة جديدة";
      default:
        return "إضافة جديد";
    }
  };

  return (
    <div className="w-full bg-white p-4 pb-6 rounded-lg shadow-sm">
      <div className="flex flex-row-reverse justify-between mb-6">
        <h1 className="text-xl font-bold text-right">حسابات الأعمال</h1>
        
        <div className="flex gap-4">
          <Button
            label={getButtonText()}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center"
          />
        </div>
      </div>

      <div className="flex flex-row-reverse gap-6">
        <div className="w-40 rounded-lg border p-2 flex flex-col gap-2 bg-white">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium text-right transition-colors
                ${
                  activeTab === item.label
                    ? "bg-red-100 text-red-600 font-bold"
                    : "text-gray-500"
                }`}
            >
              {item.label}
              <span className="ml-2">{item.icon}</span>
            </button>
          ))}
        </div>
        
        <div className="flex-1">
          {renderTable()}
        </div>
      </div>
    </div>
  );
}