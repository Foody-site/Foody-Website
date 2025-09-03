import { useState, useEffect } from "react";
import apiClient from "../../utils/ApiClient";
import { Link } from "react-router";
import PageWrapper from "./PageWrapper";
import Slider from "./Slider";
import MealCard from "../shared/cards/MealCard";
import NoData from "../shared/NoData/NoData";

const Hero = () => {
  const [discountMeals, setDiscountMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDiscountMeals();
  }, []);

  const fetchDiscountMeals = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/meal/discount", {
        params: {
          page: 1,
          take: 6,
          storeType: "restaurant", // نجيب من المطاعم
        },
      });

      const responseData = response.data;
      const mealsData = responseData?.data || responseData || [];
      setDiscountMeals(Array.isArray(mealsData) ? mealsData : []);
    } catch (error) {
      console.error("Error fetching discount meals:", error);
      // If API fails, don't show error to user, just don't display cards
      setDiscountMeals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero py-10">
      <PageWrapper>
        <div className="flex flex-col lg:flex-row-reverse gap-6 bg-white font-sans">
          {/* Right Side: Slider */}
          <div className="w-full lg:w-1/4 flex justify-center">
            <Slider />
          </div>

          {/* Left Side: Main Content */}
          <div className="w-full lg:w-3/4 flex flex-col justify-center text-right">
            {/* Title and Description */}
            <div className="mb-[120px]">
              <h1 className="text-5xl text-[#030303] font-medium mb-6">
                {" "}
                ! فودي – حيث يبدأ شغف الطعام
              </h1>
              <p className="text-[#808080] leading-relaxed text-lg">
                منصة فودي هي قاعدة بيانات المعلومات الطعام والمشروبات بالمملكة
                العربية السعودية، وهي عبارة عن منصة اجتماعية حيث تقدم بيانات
                تفصيلية وشاملة للمنتجات والخدمات الغذائية والعروض التي تقدمها
                المطاعم والكافيهات وتعريفها، كما أنها تقدم معلومات عن الطهاة
                (شيف) ومهاراتهم، وتسهل المنصة على استكشاف الطعام والمشروبات ونشر
                من نشء الأعمال
              </p>
            </div>

            {/* عروض وخصومات */}
            <div>
              <div className="flex flex-row-reverse justify-between items-center mb-4 px-2">
                <h2 className="text-2xl font-normal">عروض وخصومات</h2>
                <Link to="/discount" className="text-primary-1 hover:underline">
                  مشاهدة المزيد
                </Link>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                {loading ? (
                  // Loading state
                  <>
                    <div className="border-2 border-gray-200 rounded-lg p-4 animate-pulse">
                      <div className="h-32 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="border-2 border-gray-200 rounded-lg p-4 animate-pulse">
                      <div className="h-32 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </>
                ) : discountMeals.length > 0 ? (
                  // Display discount meals using MealCard
                  discountMeals
                    .slice(0, 2)
                    .map((meal) => (
                      <MealCard key={meal._id || meal.id} meal={meal} />
                    ))
                ) : (
                  // No data state
                  <div className="col-span-2">
                    <NoData
                      message="لا توجد عروض متاحة حالياً"
                      description="لا توجد وجبات بخصومات متاحة في الوقت الحالي، تحقق مرة أخرى لاحقاً"
                      icon="utensils"
                      size="medium"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default Hero;
