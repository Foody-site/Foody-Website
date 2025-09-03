import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";
import { LuUtensilsCrossed } from "react-icons/lu";

const NoData = ({
  message = "لا توجد بيانات",
  description = "لم يتم العثور على أي عناصر في الوقت الحالي",
  icon = "utensils",
  size = "large",
  className = "",
}) => {
  // اختيار الأيقونة
  const getIcon = () => {
    const iconSize = size === "large" ? 120 : size === "medium" ? 80 : 60;
    const iconClass = "text-gray-300";

    switch (icon) {
      case "utensils":
        return <LuUtensilsCrossed size={iconSize} className={iconClass} />;
      case "restaurant":
        return <IoRestaurantOutline size={iconSize} className={iconClass} />;
      case "menu":
        return (
          <MdOutlineRestaurantMenu size={iconSize} className={iconClass} />
        );
      default:
        return <LuUtensilsCrossed size={iconSize} className={iconClass} />;
    }
  };

  // اختيار حجم النص
  const getTextSize = () => {
    switch (size) {
      case "large":
        return {
          title: "text-2xl font-bold",
          description: "text-lg",
        };
      case "medium":
        return {
          title: "text-xl font-bold",
          description: "text-base",
        };
      case "small":
        return {
          title: "text-lg font-bold",
          description: "text-sm",
        };
      default:
        return {
          title: "text-2xl font-bold",
          description: "text-lg",
        };
    }
  };

  const textSizes = getTextSize();

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-8 text-center ${className}`}
    >
      {/* أيقونة شوكة وسكينة */}
      <div className="mb-6 opacity-60">{getIcon()}</div>

      {/* رسالة "لا توجد بيانات" */}
      <h3 className={`text-gray-600 mb-3 ${textSizes.title}`}>{message}</h3>

      {/* وصف إضافي */}
      <p
        className={`text-gray-400 max-w-md leading-relaxed ${textSizes.description}`}
      >
        {description}
      </p>

      {/* خط زخرفي */}
      <div className="mt-6 w-16 h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full opacity-50"></div>
    </div>
  );
};

export default NoData;
