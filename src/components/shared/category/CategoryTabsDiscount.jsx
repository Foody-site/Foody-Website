import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const tabs = [
  { label: "عصائر/آيسكريم", type: "category", enum: "icecream" },
  { label: "أكلات صحية", type: "category", enum: "health" },
  { label: "حلويات", type: "category", enum: "patisserie" },
  { label: "مطاعم", type: "category", enum: "restaurant" },
];

const CategoryTabsDiscount = ({
  onCategoryChange,
  activeTabLabel,
  enableNavigation = false,
}) => {
  const [active, setActive] = useState(activeTabLabel || "مطاعم");
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTabLabel) {
      setActive(activeTabLabel);
    }
  }, [activeTabLabel]);

  const handleClick = (tab) => {
    setActive(tab.label);

    if (onCategoryChange) {
      onCategoryChange(tab);
    }

    if (tab.type === "component" || tab.type === "category") {
      sessionStorage.setItem("tabState", JSON.stringify(tab));

      if (enableNavigation) {
        navigate("/", { state: tab });
      }
    }
  };

  return (
    <div className="w-full flex flex-wrap p-2 rounded-xl border border-[#808080]">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => handleClick(tab)}
          className={`flex-1 min-w-[100px] m-1 px-4 py-2 rounded-lg text-sm border transition-all duration-200 text-center ${
            active === tab.label
              ? "bg-primary-1 text-white"
              : "text-black border-[#808080]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabsDiscount;
