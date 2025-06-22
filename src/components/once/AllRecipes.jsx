import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../utils/ApiClient";
import { Link } from "react-router";
import FavouriteRecipe from "../shared/Favourites/FavouriteRecipe";
import RecipeShare from "../shared/Share/RecipeShare";
import Pagination2 from "../common/Pagination2";

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        hasNextPage: false,
        hasPreviousPage: false,
        currentPage: 1,
        totalPages: 1,
    });

    useEffect(() => {
        fetchRecipes();
    }, [page]);

    const fetchRecipes = async () => {
        try {
            const res = await axios.get(`${api_url}/recipe`, {
                params: {
                    page,
                    take: 9,
                },
            });

            const data = res.data?.data || [];
            const pag = res.data?.pagination || {};

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
        }
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={recipe.photo || "https://via.placeholder.com/300x200"}
                                alt="recipe"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-1 line-clamp-1">{recipe.name}</h3>
                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{recipe.description}</p>

                                <div className="flex justify-between text-xs border border-gray-200 rounded p-2 mb-3 text-center">
                                    <div className="flex-1">
                                        <p className="font-semibold">التحضير</p>
                                        <p>{recipe.preparationTime || "-"} دقيقة</p>
                                    </div>
                                    <div className="w-px bg-gray-300 mx-2" />
                                    <div className="flex-1">
                                        <p className="font-semibold">الطهي</p>
                                        <p>{recipe.cookingTime || "-"} دقيقة</p>
                                    </div>
                                    <div className="w-px bg-gray-300 mx-2" />
                                    <div className="flex-1">
                                        <p className="font-semibold">الإجمالي</p>
                                        <p>{recipe.totalTime || "-"} دقيقة</p>
                                    </div>
                                </div>

                                {recipe.isAllergenic && (
                                    <p className="text-[#C7C7C7] border border-[#C7C7C7] p-2 rounded-md text-[16px] my-2">
                                        تحتوي هذه الوصفة على أحد مسببات الحساسية
                                    </p>
                                )}

                                <div className="flex justify-between items-center gap-2">
                                    <FavouriteRecipe itemId={recipe.id} isInitiallyFavorited={recipe.isFavorited} />
                                    <Link to={`/recipe/${recipe.id}`} className="flex-1">
                                        <div className="bg-primary-1 hover:bg-red-700 text-white py-2 rounded-lg text-sm text-center w-full">
                                            المزيد من التفاصيل
                                        </div>
                                    </Link>
                                    <RecipeShare recipeId={recipe.id} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center w-full mt-4">لا توجد وصفات متاحة حاليًا.</p>
                )}
            </div>

            <Pagination2 pagination={pagination} setPage={setPage} />
        </div>
    );
};

export default AllRecipes;