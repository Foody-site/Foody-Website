import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { TbTrash } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { Pagination } from "../../../components/shared/Pagination/Pagination";
import apiClient from "../../../utils/ApiClient";
import { useNavigate } from "react-router";
import Alert from "./../../../components/shared/Alert/Alert";
import Spinner from "../../../components/shared/Loading/Spinner";

export const RecipesTable = forwardRef((props, ref) => {
  const { onRecipesChange, onLoadingChange } = props;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [itemsPerPage] = useState(10); // You can make this configurable
  const navigate = useNavigate();

  // حالات التنبيه
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");

  useImperativeHandle(ref, () => ({
    hasRecipes: () => recipes.length > 0,
  }));

  // معالج إغلاق التنبيه
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // دالة لعرض التنبيه
  const showAlert = (message, subMessage, type = "success") => {
    setAlertMessage(message);
    setAlertSubMessage(subMessage);
    setAlertType(type);
    setAlertOpen(true);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      if (onLoadingChange) {
        onLoadingChange(true);
      }

      try {
        // Use apiClient for the API call
        const response = await apiClient.get("/recipe/chef", {
          params: {
            page: currentPage.toString(),
            take: itemsPerPage.toString(),
          },
        });
        const result = response.data;
        console.log("API Result:", result);

        let recipesData = [];

        if (result && typeof result === "object") {
          if (Array.isArray(result.data)) {
            console.log("Setting recipes with result.data:", result.data);
            recipesData = result.data;
          } else if (Array.isArray(result)) {
            console.log("Setting recipes with array:", result);
            recipesData = result;
          } else {
            console.log("Setting recipes with single object:", [result]);
            recipesData = [result];
          }

          // Handle pagination data
          if (result.pagination) {
            setPagination(result.pagination);
            setTotalPages(
              result.pagination.totalPages ||
                Math.ceil(result.pagination.total / itemsPerPage)
            );
          } else if (result.meta) {
            // Some APIs use 'meta' instead of 'pagination'
            setPagination(result.meta);
            setTotalPages(
              result.meta.totalPages ||
                Math.ceil(result.meta.total / itemsPerPage)
            );
          } else {
            // If no pagination info is provided, assume single page
            setTotalPages(1);
          }
        }

        setRecipes(recipesData);

        if (onRecipesChange) {
          onRecipesChange(recipesData.length > 0);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
        if (onRecipesChange) {
          onRecipesChange(false);
        }
        showAlert(
          "خطأ في تحميل البيانات",
          "حدث خطأ أثناء جلب الوصفات",
          "error"
        );
      } finally {
        setLoading(false);
        if (onLoadingChange) {
          onLoadingChange(false);
        }
      }
    };

    fetchRecipes();
  }, [currentPage, itemsPerPage, onRecipesChange, onLoadingChange]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteClick = (recipe) => {
    setRecipeToDelete(recipe);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!recipeToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/recipe/${recipeToDelete.id}`);

      const updatedRecipes = recipes.filter(
        (recipe) => recipe.id !== recipeToDelete.id
      );
      setRecipes(updatedRecipes);

      if (onRecipesChange) {
        onRecipesChange(updatedRecipes.length > 0);
      }

      setShowDeleteModal(false);
      setRecipeToDelete(null);

      // If this was the last item on the current page and we're not on page 1, go back one page
      if (updatedRecipes.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      // استخدام مكون Alert بدلاً من دالة alert
      showAlert(
        "تم الحذف بنجاح",
        `تم حذف الوصفة (${recipeToDelete.name}) بنجاح`,
        "success"
      );
    } catch (error) {
      console.error("خطأ في حذف الوصفة:", error);

      // استخدام مكون Alert بدلاً من دالة alert
      showAlert("خطأ في الحذف", "حدث خطأ أثناء حذف الوصفة", "error");

      setShowDeleteModal(false);
      setRecipeToDelete(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleViewRecipe = (recipe) => {
    navigate(`/recipe/view/${recipe.id}`);
  };

  const handleEditRecipe = (recipe) => {
    navigate(`/recipe/edit/${recipe.id}`);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setRecipeToDelete(null);
  };

  if (loading) {
    return <Spinner className="py-12" />;
  }

  if (recipes.length === 0) {
    return <div className="text-center py-12">لا توجد وصفات متاحة</div>;
  }

  console.log("Current recipes state:", recipes);
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
        autoClose={true}
        autoCloseTime={5000}
      />

      <div className="overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          <thead>
            <tr className="text-right text-gray-700 bg-gray-100">
              <th className="px-4 py-3 font-medium text-center border border-gray-300 w-[120px]">
                مزيد من التفاصيل
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                وصف مختصر للوصفة
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                نوع الطعام
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                اسم الشيف
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                اسم الوصفة
              </th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => {
              console.log("Processing recipe:", recipe);
              return (
                <tr
                  key={recipe.id || index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 border border-gray-300">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleDeleteClick(recipe)}
                        className="text-red-500 bg-red-100 hover:bg-red-300 p-1 rounded-md transition-colors"
                        title="حذف الوصفة"
                      >
                        <TbTrash size={16} />
                      </button>
                      <button
                        onClick={() => handleViewRecipe(recipe)}
                        className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors"
                        title="عرض تفاصيل الوصفة"
                      >
                        <IoEyeOutline size={16} />
                      </button>
                      <button
                        onClick={() => handleEditRecipe(recipe)}
                        className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors"
                        title="تعديل الوصفة"
                      >
                        <LuPencilLine size={16} />
                      </button>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                    {recipe?.description || "لا يوجد وصف"}
                  </td>

                  {/* Recipe Types */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                    {recipe?.recipeTypes &&
                    Array.isArray(recipe.recipeTypes) &&
                    recipe.recipeTypes.length > 0
                      ? recipe.recipeTypes.map((type, index) => (
                          <div key={index}>{type?.name?.ar || "غير محدد"}</div>
                        ))
                      : "غير محدد"}
                  </td>

                  {/* Chef Name */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                    {recipe?.chef?.name || "غير محدد"}
                  </td>

                  {/* Recipe Name */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300 font-medium">
                    {recipe?.name || "غير محدد"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
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
              ؟ ( {recipeToDelete?.name} ) هل أنت متأكد من حذف الوصفة
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
                    <Spinner size={4} color="border-white" className="h-auto" />
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
