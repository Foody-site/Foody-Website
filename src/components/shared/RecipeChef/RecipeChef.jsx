import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight, FaHeart, FaShareAlt } from "react-icons/fa";
import { Link, useParams } from "react-router";
import { api_url } from "../../../utils/ApiClient";
import FavouriteRecipe from "../Favourites/FavouriteRecipe";
import RecipeShare from "./../Share/RecipeShare";

const RecipeChef = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const take = 9;

  const fetchRecipes = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${api_url}/chef/${id}/recipes`, {
        params: {
          page,
          take,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      console.log(data);

      setRecipes(data.data || []);
      setPagination({
        totalPages: data.pagination?.totalPages || 1,
        currentPage: data.pagination?.currentPage || 1,
      });
    } catch (err) {
      setError("فشل تحميل الوصفات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(1);
  }, [id]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchRecipes(page);
    }
  };

  if (loading) return <p className="text-center mt-4">...جاري تحميل الوصفات</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-right">
        {recipes.map((recipe, i) => (
          <div
            key={i}
            className="relative bg-white rounded-2xl overflow-hidden shadow-lg font-sans"
          >
            {/* Image */}
            <img
              src={recipe.photo || "https://via.placeholder.com/300x200"}
              alt="recipe"
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-lg text-black mb-1 line-clamp-1">
                {recipe.name || "اسم الوصفة"}
              </h3>

              <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                {recipe.description || "وصف قصير للوصفة هنا"}
              </p>

              <div className="flex justify-between text-xs text-gray-700 border border-gray-200 rounded p-2 mb-3 text-center">
                <div className="flex-1">
                  <p className="font-semibold">مدة التحضير</p>
                  <p>{recipe.preparationTime || "-"} دقيقة</p>
                </div>
                <div className="w-px bg-gray-300 mx-2" />
                <div className="flex-1">
                  <p className="font-semibold">مدة الطبخ</p>
                  <p>{recipe.cookingTime || "-"} دقيقة</p>
                </div>
                <div className="w-px bg-gray-300 mx-2" />
                <div className="flex-1">
                  <p className="font-semibold">الوقت الكلي</p>
                  <p>{recipe.totalTime || "-"} دقيقة</p>
                </div>
              </div>

              <div>
                <p
                  className={`border p-2 rounded-md text-[16px] my-2 ${
                    recipe.isAllergenic === true
                      ? "text-red-500 border-red-500"
                      : "text-[#969393] border-[#969393]"
                  }`}
                >
                  {recipe.isAllergenic === true
                    ? "تحتوي هذه الوصفة علي احد مسببات حساسية"
                    : "لا تحتوي هذه الوصفة علي احد مسببات حساسية"}
                </p>
              </div>

              <div className="flex justify-between items-center gap-2">
                <FavouriteRecipe
                  itemId={recipe.id}
                  isInitiallyFavorited={recipe.isFavorited}
                />

                {/* Navigate Button */}
                <Link to={`/recipe/${recipe.id}`} className="flex-1">
                  <div className="bg-primary-1 hover:bg-red-700 text-white py-2 rounded-lg text-sm text-center w-full">
                    عرض التفاصيل
                  </div>
                </Link>

                {/* Share Button */}
                <RecipeShare recipeId={recipe.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className={`w-10 h-10 border rounded flex items-center justify-center ${
            pagination.currentPage > 1
              ? "bg-primary-1 text-white"
              : "border-primary-1 text-primary-1 opacity-50 cursor-not-allowed"
          }`}
        >
          <FaArrowLeft />
        </button>

        {[...Array(pagination.totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={i}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 border rounded flex items-center justify-center ${
                pagination.currentPage === page
                  ? "bg-primary-1 text-white"
                  : "border-primary-1 text-primary-1 hover:bg-primary-1 hover:text-white"
              }`}
            >
              {String(page).padStart(2, "0")}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className={`w-10 h-10 border rounded flex items-center justify-center ${
            pagination.currentPage < pagination.totalPages
              ? "bg-primary-1 text-white"
              : "border-primary-1 text-primary-1 opacity-50 cursor-not-allowed"
          }`}
        >
          <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default RecipeChef;
