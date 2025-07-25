import { useState, useRef } from "react";
import { PiChefHatLight } from "react-icons/pi";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { CiForkAndKnife } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { HiOutlineCreditCard } from "react-icons/hi2";
import Button from "../../components/shared/Buttons/Button";
import { StoresTable } from "./StoresTable/StoresTable";
import { ChefsTable } from "./ChefsTable/ChefsTable";
import { RecipesTable } from "./RecipesTable/RecipesTable";
import ReviewsTable from "./ReviewsTable/ReviewsTable";
import  ReservationsTable  from "./ReservationsTable/ReservationsTable";
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
    { label: "التقييمات", icon: <FaStar size={20} /> },
    { label: "الحجوزات", icon: <HiOutlineCreditCard size={20} /> },
  ];

  const tabTitles = {
    المتاجر: "المتاجر الخاصة بك",
    الشيفات: "الشيفات",
    الوصفات: "الوصفات الخاصة بالشفات",
    التقييمات: "التقيمات الخاصه بالمتجر",
    الحجوزات: "الحجوزات الخاصه بالمتجر",
  };

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
      case "التقييمات":
        return <ReviewsTable />;
      case "الحجوزات":
        return <ReservationsTable />;
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
      case "التقييمات":
        return "إدارة التقييمات";
      case "الحجوزات":
        return "إضافة حجز جديد";
      default:
        return "إضافة جديد";
    }
  };

  const isButtonDisabled = () => {
    return activeTab === "الشيفات" && (hasChefs || chefsLoading);
  };

  const shouldShowButton = () => {
    return activeTab !== "التقييمات" && activeTab !== "الحجوزات";
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
      case "التقييمات":
        navigate("/manage-reviews");
        break;
      case "الحجوزات":
        navigate("/add-reservation");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="w-full bg-white p-4 pb-6 rounded-lg shadow-sm flex-grow">
        <h1 className="pt-10 pb-10 text-xl font-bold text-right">
          حسابات الأعمال
        </h1>
        <div className="w-full max-w-[91%] mr-auto flex flex-col sm:flex-row items-center border border-gray-300 px-4 py-3 rounded-md gap-2 sm:gap-6 relative">
          {shouldShowButton() && (
            <Button
              label={getButtonText()}
              disabled={isButtonDisabled()}
              onClick={handleAddClick}
              className={`w-full sm:w-auto py-2 px-4 rounded-md transition-colors ${
                isButtonDisabled()
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            />
          )}

          <span
            className={`${
              shouldShowButton()
                ? "absolute right-4 sm:static sm:ml-auto"
                : "ml-auto"
            } text-base font-semibold text-gray-700 text-right`}
          >
            {tabTitles[activeTab]}
          </span>
        </div>

        <div className="pt-3 flex flex-col lg:flex-row-reverse gap-4">
          <div className="w-full lg:w-40 max-w-full lg:max-w-[160px] max-h-72 overflow-auto rounded-lg border p-2 flex flex-row lg:flex-col gap-2 bg-white">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-md text-sm font-medium text-right transition-colors
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
    </div>
  );
}
