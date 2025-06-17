import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { TbTrash } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { Pagination } from "../../../components/shared/Pagination/Pagination";
import { api_url } from "../../../utils/ApiClient";
import { useNavigate } from "react-router";

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

  useImperativeHandle(ref, () => ({
    hasRecipes: () => recipes.length > 0,
  }));

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      if (onLoadingChange) {
        onLoadingChange(true);
      }

      try {
        const token = localStorage.getItem("token");

        // Add pagination parameters to the URL
        const url = new URL(`${api_url}/recipe/chef`);
        url.searchParams.append("page", currentPage.toString());
        url.searchParams.append("take", itemsPerPage.toString());

        const response = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        console.log("API Response Status:", response.status);
        console.log("API Result:", result);
        console.log("Is response OK?", response.ok);

        if (response.ok) {
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
        } else {
          // Handle error response
          console.error("API Error:", result);
          setRecipes([]);
          if (onRecipesChange) {
            onRecipesChange(false);
          }

          // Show error message if available
          if (result.message) {
            const errorMessage = Array.isArray(result.message)
              ? result.message.join(", ")
              : result.message;
            console.error("API Error Message:", errorMessage);
          }
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
        if (onRecipesChange) {
          onRecipesChange(false);
        }
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
      const token = localStorage.getItem("token");

      const response = await fetch(`${api_url}/recipe/${recipeToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
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

        alert("تم حذف الوصفة بنجاح");
      } else {
        const errorData = await response.json().catch(() => null);
        console.error("خطأ في حذف الوصفة:", errorData);
        alert(errorData?.message || "حدث خطأ أثناء حذف الوصفة");
      }
    } catch (error) {
      console.error("خطأ في حذف الوصفة:", error);
      alert("حدث خطأ أثناء حذف الوصفة");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleViewRecipe = (recipe) => {
    navigate(`/recipe/view/${recipe.id}`);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setRecipeToDelete(null);
  };

  if (loading) {
    return <div className="text-center py-12">جاري تحميل الوصفات...</div>;
  }

  if (recipes.length === 0) {
    return <div className="text-center py-12">لا توجد وصفات متاحة</div>;
  }

  console.log("Current recipes state:", recipes);
  console.log("Current loading state:", loading);

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          <thead>
            <tr className="text-right text-gray-700">
              <th className="px-4 py-3 font-medium text-center border border-gray-300">
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
