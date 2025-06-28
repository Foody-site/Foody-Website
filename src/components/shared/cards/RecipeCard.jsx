import { Link } from "react-router";
import RecipeShare from "../Share/RecipeShare";
import FavouriteRecipe from "../Favourites/FavouriteRecipe";

const RecipeCard = ({ recipe, onUnfavorite }) => {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg font-sans">
      {/* Image */}
      <img
        src={recipe.photo || "https://via.placeholder.com/300x200"}
        alt="recipe"
        className="w-full h-48 object-cover"
      />

      <div className="p-4 text-right">
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
            className={`border p-2 rounded-md text-[16px] my-2 ${recipe.isAllergenic === true
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
            isInitiallyFavorited={true}
            onUnfavorite={onUnfavorite}
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
  );
};

export default RecipeCard;
