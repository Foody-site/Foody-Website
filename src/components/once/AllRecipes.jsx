import { useEffect, useState } from "react";
import apiClient from "../../utils/ApiClient";
import { Link } from "react-router";
import FavouriteRecipe from "../shared/Favourites/FavouriteRecipe";
import RecipeShare from "../shared/Share/RecipeShare";
import Pagination2 from "../common/Pagination2";
import NoData from "../shared/NoData/NoData";

const LoadingCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex justify-center items-center h-72">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
  </div>
);

const AllRecipes = ({ searchParams = {} }) => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const res = await apiClient.get("/recipe", {
          params: {
            page,
            take: 9,
            ...searchParams,
          },
        });

        const data = res.data?.data || [];
        const pag = res.data?.pagination || {
          hasNextPage: false,
          hasPreviousPage: false,
          currentPage: 1,
          totalPages: 1,
        };

        setRecipes(data);
        setPagination(pag);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
        setPagination({
          hasNextPage: false,
          hasPreviousPage: false,
          currentPage: 1,
          totalPages: 1,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page, searchParams]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />)
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={recipe.photo || "https://via.placeholder.com/300x200"}
                alt="recipe"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-right">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">
                  {recipe.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {recipe.description}
                </p>

                <div className="flex justify-between text-xs border border-gray-200 rounded p-2 mb-3 text-center">
                  <div className="flex-1">
                    <p className="font-semibold text-[#808080]">التحضير</p>
                    <p>{recipe.preparationTime || "-"} دقيقة</p>
                  </div>
                  <div className="w-px bg-gray-300 mx-2" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#808080]">الطهي</p>
                    <p>{recipe.cookingTime || "-"} دقيقة</p>
                  </div>
                  <div className="w-px bg-gray-300 mx-2" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#808080]">الإجمالي</p>
                    <p>{recipe.totalTime || "-"} دقيقة</p>
                  </div>
                </div>

                <div>
                  <p
                    className={`border p-2 rounded-md text-[16px] my-2 ${
                      recipe.isAllergenic
                        ? "text-primary-1 border-primary-1"
                        : "text-[#969393] border-[#969393]"
                    }`}
                  >
                    {recipe.isAllergenic
                      ? "تحتوي هذه الوصفة علي احد مسببات حساسية"
                      : "لا تحتوي هذه الوصفة علي احد مسببات حساسية"}
                  </p>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <RecipeShare recipeId={recipe.id} />
                  <Link to={`/recipe/${recipe.id}`} className="flex-1">
                    <div className="bg-primary-1 hover:bg-red-700 text-white py-2 rounded-lg text-sm text-center w-full">
                      المزيد من التفاصيل
                    </div>
                  </Link>
                  <FavouriteRecipe
                    itemId={recipe.id}
                    isInitiallyFavorited={!!recipe.isFavorited}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <NoData
              message="لا توجد وصفات متاحة حالياً"
              description="جرب البحث عن وصفات أخرى أو تصفح الفئات المختلفة"
              icon="utensils"
              size="large"
            />
          </div>
        )}
      </div>

      {!loading && <Pagination2 pagination={pagination} setPage={setPage} />}
    </div>
  );
};

export default AllRecipes;
