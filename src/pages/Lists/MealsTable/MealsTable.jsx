import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { TbTrash } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { useNavigate } from "react-router";
import { Pagination } from "../../../components/shared/Pagination/Pagination";
import Alert from "../../../components/shared/Alert/Alert";
import apiClient from "../../../utils/ApiClient";

// Helper functions for formatting
const formatPrice = (price) => {
  if (!price && price !== 0) return "غير محدد";
  return `${price} ريال`;
};

const formatCategory = (category) => {
  if (!category) return "غير محدد";

  const categoryMap = {
    Offers: "العروض",
    News: "جديدنا",
    "Main Meals": "الوجبات الرئيسيه",
    "Side Meals": "الوجبات الفرعيه",
    Drinks: "مشروبات",
    "Oriental Sweets": "حلويات شرقيه",
    "Western Sweets": "حلويات غربيه",
    Other: "اخرى",
    "Baked Goods and Crackers": "المخبوزات والمقرمشات",
    "Diet Meals": "وجبات دايت",
    Juices: "عصائر",
    "Ice Cream": "ايس كريم",
  };

  return categoryMap[category] || category;
};

const formatDescription = (description) => {
  if (!description) return "غير محدد";
  return description.length > 50
    ? `${description.substring(0, 50)}...`
    : description;
};

const MealsTable = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState(null); // null instead of boolean
  const [itemsPerPage] = useState(10); // Add items per page like StoresTable

  // Alert state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mealToDelete, setMealToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // useImperativeHandle for parent component access
  useImperativeHandle(ref, () => ({
    refresh: fetchMeals,
    getCurrentPage: () => currentPage,
    setCurrentPage: (page) => setCurrentPage(page),
  }));

  useEffect(() => {
    fetchMeals();
  }, [currentPage]);

  const fetchMeals = async (page = currentPage) => {
    try {
      setLoading(true);

      // Try different URL patterns like other tables
      const token = localStorage.getItem("token");
      console.log(
        "Fetching meals with token:",
        token ? "Token exists" : "No token"
      );

      // Try different endpoints and parameter combinations
      let url;
      let parameterSets = [
        { endpoint: "/meal", params: { page: page, take: itemsPerPage } },
      ];

      for (let { endpoint, params } of parameterSets) {
        try {
          console.log(`Trying: ${endpoint} with params:`, params);

          const response = await apiClient.get(endpoint, { params });

          console.log(
            `Response for ${endpoint} with params ${JSON.stringify(params)}:`,
            response.data
          );

          const data = response.data;
          console.log("Meals response data:", data);

          let mealsData = [];

          if (data && typeof data === "object") {
            if (Array.isArray(data.data)) {
              console.log("Setting meals with data.data:", data.data);
              mealsData = data.data;
            } else if (Array.isArray(data)) {
              console.log("Setting meals with array:", data);
              mealsData = data;
            } else {
              console.log("Setting meals with single object:", [data]);
              mealsData = [data];
            }

            // Handle pagination data like StoresTable
            if (data.pagination) {
              setPagination(data.pagination);
              setTotalPages(
                data.pagination.totalPages ||
                  Math.ceil(data.pagination.total / itemsPerPage)
              );
              setCurrentPage(data.pagination.currentPage || page);
            } else if (data.meta) {
              // Some APIs use 'meta' instead of 'pagination'
              setPagination(data.meta);
              setTotalPages(
                data.meta.totalPages ||
                  Math.ceil(data.meta.total / itemsPerPage)
              );
              setCurrentPage(data.meta.currentPage || page);
            } else {
              // No pagination data, disable pagination
              setPagination(null);
              setTotalPages(1);
            }

            setMeals(mealsData);
          } else {
            console.warn("Unexpected meals data format:", data);
            setMeals([]);
          }

          console.log(
            `Success with ${endpoint} and params ${JSON.stringify(params)}`
          );
          return; // Success, exit the function
        } catch (endpointError) {
          console.error(
            `Error with ${endpoint} and params ${JSON.stringify(params)}:`,
            endpointError
          );
        }
      }

      // If we reach here, all endpoints failed
      throw new Error("All meal endpoints failed");
    } catch (error) {
      console.error("Error fetching meals:", error);
      showAlert("خطأ في تحميل الوجبات", error.message, "error");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, subMessage = "", type = "info") => {
    setAlertMessage(message);
    setAlertSubMessage(subMessage);
    setAlertType(type);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    setAlertMessage("");
    setAlertSubMessage("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMeals(page);
  };

  const handleDeleteClick = (meal) => {
    setMealToDelete(meal);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setMealToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!mealToDelete) return;

    try {
      setDeleteLoading(true);

      await apiClient.delete(`/meal/${mealToDelete.id}`);

      showAlert(
        "تم الحذف بنجاح",
        `تم حذف الوجبة "${mealToDelete.name}" بنجاح`,
        "success"
      );

      // Refresh the table
      await fetchMeals();
    } catch (error) {
      console.error("Error deleting meal:", error);
      showAlert(
        "خطأ في الحذف",
        "حدث خطأ أثناء حذف الوجبة. يرجى المحاولة مرة أخرى",
        "error"
      );
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
      setMealToDelete(null);
    }
  };

  const handleViewMeal = (meal) => {
    console.log("View meal:", meal);
    navigate(`/view-meal/${meal.id}`);
  };

  const handleEditMeal = (meal) => {
    console.log("Edit meal:", meal);
    navigate(`/edit-meal/${meal.id}`);
  };

  if (loading) {
    return <div className="text-center py-12">جاري تحميل الوجبات...</div>;
  }

  if (meals.length === 0) {
    return <div className="text-center py-12">لا توجد وجبات متاحة</div>;
  }

  console.log("Current meals state:", meals);
  console.log("Current loading state:", loading);

  return (
    <div>
      {/* مكون Alert */}
      <Alert
        message={alertMessage}
        subMessage={alertSubMessage}
        isOpen={alertOpen}
        onClose={handleAlertClose}
        type={alertType}
      />

      <div className="overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          <thead>
            <tr className="text-right text-gray-700 bg-gray-100">
              <th className="px-4 py-3 font-medium text-center border border-gray-300 w-[120px]">
                مزيد من التفاصيل
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                وصف مختصر للوجبة{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                نوع الوجبة{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                اسم المتجر{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                اسم الوجبة{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => {
              console.log("Processing meal:", meal);
              return (
                <tr
                  key={meal.id || index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 border border-gray-300">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleDeleteClick(meal)}
                        className="text-red-500 bg-red-100 hover:bg-red-300 p-1 rounded-md transition-colors"
                        title="حذف الوجبة"
                      >
                        <TbTrash size={16} />
                      </button>
                      <button
                        onClick={() => handleViewMeal(meal)}
                        className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors"
                        title="عرض تفاصيل الوجبة"
                      >
                        <IoEyeOutline size={16} />
                      </button>
                      <button
                        onClick={() => handleEditMeal(meal)}
                        className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors"
                        title="تعديل الوجبة"
                      >
                        <LuPencilLine size={16} />
                      </button>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                    {formatDescription(meal?.description)}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                    {formatCategory(meal?.category)}
                  </td>
                  {/* Store Name */}
                  <td className="px-4 py-3 text-gray-700 text-lg font-bold text-right border border-gray-300">
                    {meal?.store?.name || "غير محدد"}
                  </td>
                  {/* Meal Name */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300 font-medium">
                    {meal?.name || "غير محدد"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-right">
              تأكيد الحذف
            </h3>
            <p className="text-gray-600 mb-6 text-right">
              ؟ ( {mealToDelete?.name} ) هل أنت متأكد من حذف الوجبة
              <br />. لا يمكن التراجع عن هذا الإجراء{" "}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={deleteLoading}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleteLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري الحذف...
                  </>
                ) : (
                  "حذف"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default MealsTable;
