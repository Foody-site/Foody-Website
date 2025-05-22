import { useState, useEffect } from "react";
import { TbTrash } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { Pagination } from "../../../components/shared/Pagination/Pagination";

export function RecipesTable() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          const mockData = Array(12)
            .fill(null)
            .map((_, index) => ({
              id: index + 1,
              name: `وصفة ${index + 1}`,
              category: `فئة الوصفة ${index + 1}`,
              difficulty: index % 3 === 0 ? "سهل" : index % 3 === 1 ? "متوسط" : "صعب",
              prepTime: `${15 + (index * 5)} دقيقة`,
              chef: `الشيف ${index + 1}`,
            }));

          setRecipes(mockData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="text-center py-12">جاري تحميل الوصفات...</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="text-right text-gray-500 border-b border-gray-200">
              <th className="px-4 py-2 font-medium">مزيد من التفاصيل</th>
              <th className="px-4 py-2 font-medium">الشيف</th>
              <th className="px-4 py-2 font-medium">وقت التحضير</th>
              <th className="px-4 py-2 font-medium">مستوى الصعوبة</th>
              <th className="px-4 py-2 font-medium">فئة الوصفة</th>
              <th className="px-4 py-2 font-medium">تفاصيل الوصفة</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr
                key={recipe.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center">
                    <button className="text-red-500 hover:bg-red-50 p-1 rounded-md">
                      <TbTrash size={16} />
                    </button>
                    <button className="text-blue-500 hover:bg-blue-50 p-1 rounded-md">
                      <IoEyeOutline size={16} />
                    </button>
                    <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-md">
                      <LuPencilLine size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{recipe.chef}</td>
                <td className="px-4 py-3 text-gray-600">{recipe.prepTime}</td>
                <td className="px-4 py-3 text-gray-600">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    recipe.difficulty === "سهل" 
                      ? "bg-green-100 text-green-600"
                      : recipe.difficulty === "متوسط"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {recipe.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{recipe.category}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs">{recipe.id}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{recipe.name}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
