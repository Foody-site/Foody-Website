import { useState, useRef } from "react";
import { PiChefHatLight } from "react-icons/pi";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { CiForkAndKnife } from "react-icons/ci";
import Button from "../../components/shared/Buttons/Button";
import { StoresTable } from "./StoresTable/StoresTable";
import { ChefsTable } from "./ChefsTable/ChefsTable";
import { RecipesTable } from "./RecipesTable/RecipesTable";
import { useNavigate } from "react-router";

export default function List() {
  const [activeTab, setActiveTab] = useState("المتاجر");
  const [hasChefs, setHasChefs] = useState(false);  
  const [chefsLoading, setChefsLoading] = useState(false);    
  const chefsTableRef = useRef();
  const navigate = useNavigate(); 

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
        return (
          <ChefsTable
            ref={chefsTableRef}
            onChefsChange={setHasChefs}
            onLoadingChange={setChefsLoading}
          />
        );
      case "الوصفات":
        return <RecipesTable />;
      default:
        return <StoresTable />;
    }
  };

  const getButtonText = () => {
    if (activeTab === "الشيفات" && chefsLoading) {
      return "جاري التحميل...";
    }

    if (activeTab === "الشيفات" && hasChefs) {
      return "يوجد شيف بالفعل";
    }

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

  const isButtonDisabled = () => {
    return activeTab === "الشيفات" && (hasChefs || chefsLoading);
  };

  const handleAddClick = () => {
    if (isButtonDisabled()) return;

    switch (activeTab) {
      case "المتاجر":
        navigate("/add-store");      
        break;
      case "الشيفات":
        navigate("/add-chef"); 
        break;
      case "الوصفات":
        navigate("/add-recipe");   
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full bg-white p-4 pb-6 rounded-lg shadow-sm">
      <div className="flex flex-row-reverse justify-between mb-6">
        <h1 className="pt-10 text-xl font-bold text-right">حسابات الأعمال</h1>

        <div className="pt-32 flex items-center gap-4">
          <div className="flex items-center border border-gray-300 px-6 py-3 rounded-md gap-[1440px]">
            <Button
              label={getButtonText()}
              disabled={isButtonDisabled()}
              onClick={handleAddClick}   
              className={`py-2 px-4 rounded-md transition-colors ${
                isButtonDisabled()
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            />
            <span className="text-lg font-semibold text-gray-700">
              {activeTab}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-6">
        <div className="w-40 max-w-[160px] max-h-[170px] overflow-auto rounded-lg border p-2 flex flex-col gap-2 bg-white">
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

        <div className="flex-1">{renderTable()}</div>
      </div>
    </div>
  );
}