import { useState, useEffect } from "react";
import axios from "axios";
import { api_url } from "../../utils/ApiClient";
import CategoryTabsDiscount from "../../components/shared/category/CategoryTabsDiscount";
import MealCard from "../../components/shared/cards/MealCard";
import Alert from "../../components/shared/Alert/Alert";
import { Pagination } from "../../components/shared/Pagination/Pagination";

const Discount = () => {
  const [selectedCategory, setSelectedCategory] = useState("restaurant"); 
  const [allMeals, setAllMeals] = useState([]); 
  const [meals, setMeals] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6; 

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");

  useEffect(() => {
    fetchDiscountMeals();
  }, [selectedCategory]);

  useEffect(() => {
    updateDisplayedMeals();
  }, [allMeals, currentPage]);

  const updateDisplayedMeals = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMeals = allMeals.slice(startIndex, endIndex);
    setMeals(currentMeals);
  };

  const showAlert = (message, subMessage, type = "success") => {
    setAlertMessage(message);
    setAlertSubMessage(subMessage);
    setAlertType(type);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const fetchDiscountMeals = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const params = new URLSearchParams({
        page: "1",
        take: "100", 
      });

      params.append("storeType", selectedCategory);

      const response = await axios.get(`${api_url}/meal/discount?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;
      const mealsData = responseData?.data || responseData || [];

      setAllMeals(Array.isArray(mealsData) ? mealsData : []);

      const totalPagesCalculated = Math.ceil(mealsData.length / itemsPerPage);
      setTotalPages(totalPagesCalculated || 1);
    } catch (error) {
      console.error("Failed to fetch discount meals:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      setError(error.message);

      const errorMessage =
        error.response?.data?.message || "حدث خطأ أثناء جلب الوجبات";
      showAlert("خطأ في تحميل البيانات", errorMessage, "error");

      setAllMeals([]);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (tab) => {
    console.log("Selected tab:", tab);
    console.log("Selected enum:", tab.enum);
    setSelectedCategory(tab.enum || tab.label);
    setCurrentPage(1); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Alert
        message={alertMessage}
        subMessage={alertSubMessage}
        isOpen={alertOpen}
        onClose={handleAlertClose}
        type={alertType}
        autoClose={true}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-right">
            عروض وخصومات
          </h1>
        </div>

        <div className="mb-8">
          <CategoryTabsDiscount
            onCategoryChange={handleCategoryChange}
            activeTabLabel="مطاعم"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-1 mb-4"></div>
              <div className="text-xl text-gray-600">جاري تحميل الوجبات...</div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              حدث خطأ في التحميل
            </h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={fetchDiscountMeals}
              className="bg-primary-1 text-white px-6 py-2 rounded-lg hover:bg-hover_primary-1 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : meals.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              لا توجد عروض متاحة حالياً
            </h3>
            <p className="text-gray-500">
              عذراً، لا توجد وجبات بخصومات متاحة في هذه الفئة حالياً
            </p>
            <button
              onClick={fetchDiscountMeals}
              className="mt-4 bg-primary-1 text-white px-6 py-2 rounded-lg hover:bg-hover_primary-1 transition-colors"
            >
              إعادة التحديث
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discount;
