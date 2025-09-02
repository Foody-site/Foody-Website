import { useEffect, useState } from "react";
import apiClient from "../../utils/ApiClient";
import PageWrapper from "../common/PageWrapper";
import FoodCard from "../shared/cards/FoodCard";
import ChefCard from "../shared/cards/ChefCard";
import RecipeCard from "../shared/cards/RecipeCard";
import MealCard from "../shared/cards/MealCard";
import { Pagination } from "../shared/Pagination/Pagination";
import Spinner from "../shared/Loading/Spinner";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("meals");
  const [pagination, setPagination] = useState({
    page: 1,
    take: 6,
    totalPages: 1,
    totalCount: 0,
  });

  useEffect(() => {
    fetchFavorites();
  }, [activeTab, pagination.page]);

  const fetchFavorites = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    let favoriteType;
    switch (activeTab) {
      case "meals":
        favoriteType = "Meal";
        break;
      case "recipes":
        favoriteType = "Recipe";
        break;
      case "chefs":
        favoriteType = "Chef";
        break;
      case "stores":
        favoriteType = "Store";
        break;
      default:
        favoriteType = "Meal";
    }

    try {
      const response = await apiClient.get("/favorite", {
        params: {
          page: pagination.page,
          take: pagination.take,
          favoriteType: favoriteType,
        },
      });

      // Filter out any null or invalid items
      const validItems = (response.data.data || []).filter(
        (item) => item && item.id
      );
      setFavorites(validItems);

      setPagination((prev) => ({
        ...prev,
        totalPages: response.data.pagination?.totalPages || 1,
        totalCount: response.data.pagination?.totalCount || 0,
      }));
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on tab change
  };

  const renderFavorites = () => {
    if (loading) {
      return <Spinner className="h-40" />;
    }

    if (favorites.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">لا توجد عناصر مفضلة</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rtl">
        {activeTab === "meals" &&
          favorites.map((item) =>
            item && item.id ? (
              <MealCard
                key={item.id}
                meal={{ ...item, isFavorite: true }}
                onUnfavorite={(id) =>
                  setFavorites((prev) => prev.filter((f) => f.id !== id))
                }
              />
            ) : null
          )}

        {activeTab === "recipes" &&
          favorites.map((item) =>
            item && item.id ? (
              <RecipeCard
                key={item.id}
                recipe={item}
                onUnfavorite={(id) =>
                  setFavorites((prev) => prev.filter((f) => f.id !== id))
                }
              />
            ) : null
          )}

        {activeTab === "chefs" &&
          favorites.map((item) =>
            item && item.id ? <ChefCard key={item.id} chef={item} /> : null
          )}

        {activeTab === "stores" &&
          favorites.map((item) =>
            item && item.id ? (
              <FoodCard
                key={item.id}
                store={{ ...item, isFavorited: true }}
                onUnfavorite={(id) =>
                  setFavorites((prev) => prev.filter((fav) => fav.id !== id))
                }
              />
            ) : null
          )}
      </div>
    );
  };

  return (
    <PageWrapper>
      <div className="favorites-page">
        <h2 className="text-3xl font-bold mb-8 text-right">المفضلة</h2>

        {/* Tabs */}
        <div className="flex justify-end mb-6 border-b">
          <button
            onClick={() => handleTabChange("meals")}
            className={`px-4 py-2 font-medium ${
              activeTab === "meals"
                ? "text-primary-1 border-b-2 border-primary-1"
                : "text-gray-600 hover:text-primary-1"
            }`}
          >
            الوجبات
          </button>
          <button
            onClick={() => handleTabChange("recipes")}
            className={`px-4 py-2 font-medium ${
              activeTab === "recipes"
                ? "text-primary-1 border-b-2 border-primary-1"
                : "text-gray-600 hover:text-primary-1"
            }`}
          >
            الوصفات
          </button>
          <button
            onClick={() => handleTabChange("chefs")}
            className={`px-4 py-2 font-medium ${
              activeTab === "chefs"
                ? "text-primary-1 border-b-2 border-primary-1"
                : "text-gray-600 hover:text-primary-1"
            }`}
          >
            الشيفات
          </button>
          <button
            onClick={() => handleTabChange("stores")}
            className={`px-4 py-2 font-medium ${
              activeTab === "stores"
                ? "text-primary-1 border-b-2 border-primary-1"
                : "text-gray-600 hover:text-primary-1"
            }`}
          >
            المطاعم
          </button>
        </div>

        {/* Content */}
        {renderFavorites()}

        {/* Pagination */}
        {pagination.totalCount > 0 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default Favorites;
