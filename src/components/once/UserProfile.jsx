import { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaCity } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import PageWrapper from "../common/PageWrapper";
import { api_url } from "../../utils/ApiClient";
import FoodCard from "../shared/cards/FoodCard";
import ChefCard from "./../shared/cards/ChefCard";
import RecipeCard from "./../shared/cards/RecipeCard";
import { Pagination } from "./../shared/Pagination/Pagination";

const UserProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    role: "",
    birthday: "",
  });
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("recipes");
  const [pagination, setPagination] = useState({
    page: 1,
    take: 6,
    totalPages: 1,
    totalCount: 0,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${api_url}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(
          res.data || {
            fullName: "",
            role: "",
            birthday: "",
          }
        );
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

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
        favoriteType = "Recipe";
    }

    try {
      const response = await axios.get(`${api_url}/favorite`, {
        headers: { Authorization: `Bearer ${token}` },
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
      return (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
        </div>
      );
    }

    if (favorites.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">لا توجد عناصر مفضلة</p>
        </div>
      );
    }

    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rtl"
        
      >
        {activeTab === "recipes" &&
          favorites.map((item) =>
            item && item.id ? <RecipeCard key={item.id} recipe={item} /> : null
          )}

        {activeTab === "chefs" &&
          favorites.map((item) =>
            item && item.id ? <ChefCard key={item.id} chef={item} /> : null
          )}

        {activeTab === "stores" &&
          favorites.map((item) =>
            item && item.id ? <FoodCard key={item.id} store={item} /> : null
          )}
      </div>
    );
  };

  return (
    <PageWrapper>
      <div className="profile-info">
        <h2 className="text-3xl font-bold mb-8 text-right">الملف الشخصي</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-right font-medium">الاسم</label>
            <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
              <FaUser className="ml-2 text-gray-500" />
              <input
                type="text"
                value={user.fullName || ""}
                className="flex-grow bg-transparent text-right outline-none"
                readOnly
              />
            </div>
          </div>

          {/* Account Type */}
          <div>
            <label className="block mb-2 text-right font-medium">
              نوع الحساب
            </label>
            <div className="flex flex-row-reverse items-center border rounded px-3 py-2 bg-gray-100">
              <RiUserSettingsLine className="ml-2 text-gray-500" />
              <input
                type="text"
                readOnly
                value={user.role || ""}
                className="flex-grow bg-transparent text-right outline-none"
              />
            </div>
          </div>

          {/* Birth Date */}
          <div>
            <label className="block mb-2 text-right font-medium">
              تاريخ الميلاد
            </label>
            <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
              <MdDateRange className="ml-2 text-gray-500" />
              <input
                type="date"
                value={(user.birthday && user.birthday.split("T")[0]) || ""}
                className="flex-grow bg-transparent text-right outline-none"
                readOnly
              />
            </div>
          </div>

          {/* City - Not present in response, so you can customize if needed */}
          <div>
            <label className="block mb-2 text-right font-medium">المدينة</label>
            <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
              <FaCity className="ml-2 text-gray-500" />
              <select
                className="flex-grow bg-transparent text-right outline-none"
                disabled
                value=""
              >
                <option value="">اختر المدينة</option>
                <option value="القاهرة">القاهرة</option>
                <option value="الجيزة">الجيزة</option>
                <option value="الإسكندرية">الإسكندرية</option>
              </select>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-right">المفضلة</h3>

          {/* Tabs */}
          <div className="flex justify-end mb-6 border-b">
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
              الشيفات{" "}
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

          {/* Pagination - Using the new Pagination component */}
          {pagination.totalCount > 0 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default UserProfile;
