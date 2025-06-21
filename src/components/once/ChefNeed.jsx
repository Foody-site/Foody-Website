import { useEffect, useState } from "react";
import {
    FaMapMarkerAlt,
    FaHeart,
    FaUserFriends,
    FaBirthdayCake,
    FaGraduationCap,
    FaEllipsisH,
} from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { useParams, Link } from "react-router";
import PageWrapper from "../common/PageWrapper";
import axios from "axios";
import { api_url } from "../../utils/ApiClient";
import FavouriteRecipe from "../shared/Favourites/FavouriteRecipe";
import FollowChef from "../../components/shared/FollowChef/FollowChef";
import RecipeShare from "../shared/Share/RecipeShare";

const ChefNeed = () => {
    const { id } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [chef, setChef] = useState(null);

    const occasions = [
        { label: "ليلة رومانسية", icon: <FaHeart /> },
        { label: "تجمع عائلي", icon: <BsCalendar2Date /> },
        { label: "حفلة تخرج", icon: <FaGraduationCap /> },
        { label: "تجمع اصدقاء", icon: <FaUserFriends /> },
        { label: "عيد ميلاد", icon: <FaBirthdayCake /> },
        { label: "أخرى", icon: <FaEllipsisH /> },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resChef = await axios.get(`${api_url}/chef/${id}`);
                setChef(resChef.data);

                const resRecipes = await axios.get(`${api_url}/chef/${id}/recipes`, {
                    params: { page: 1, take: 2 },
                });

                const recipeList = Array.isArray(resRecipes.data)
                    ? resRecipes.data
                    : resRecipes.data?.data || [];

                setRecipes(recipeList);
            } catch (error) {
                console.error("Error fetching data:", error);
                setRecipes([]);
            }
        };

        if (id) fetchData();
    }, [id]);

    return (
        <PageWrapper>
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Section - Chef Info */}
                <div className="w-full lg:w-1/2 space-y-6">
                    {chef && (
                        <div className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
                            {/* Header */}
                            <div className="flex flex-row-reverse items-center gap-4 text-right mb-4">
                                <img
                                    src={chef.profilePicture || "/assets/home/chef.png"}
                                    alt="Chef"
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-bold">{chef.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {chef.recipeTypes?.map(t => t.name?.ar).join("، ") || "أنواع وصفات الطبخ هنا"}
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex justify-between items-center text-center border-y py-3 text-sm text-gray-700">
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900">{chef.totalRecipes || 0}</p>
                                    <p>عدد الوصفات</p>
                                </div>
                                <div className="h-10 w-px bg-gray-300"></div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900">{chef.totalFollowers || 0}</p>
                                    <p>عدد المتابعين</p>
                                </div>
                                <div className="h-10 w-px bg-gray-300"></div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900">{chef.totalViews || 0}</p>
                                    <p>عدد الزوار</p>
                                </div>
                            </div>

                            {/* Follow Button */}
                            <div className="mt-4">
                                <FollowChef
                                    followingId={chef.id}
                                    className="w-full bg-primary-1 hover:bg-red-700 text-white py-2 rounded-md text-sm font-semibold transition"
                                />
                            </div>
                        </div>
                    )}

                    {/* Recipes Section */}
                    <div>
                        <div className="flex justify-between items-center my-4">
                            <Link to={`/chef/${id}`}>
                                <button className="text-primary-1 hover:text-red-700 transition font-semibold">
                                    مشاهدة المزيد
                                </button>
                            </Link>
                            <div className="text-lg font-semibold text-black">بعض الوصفات</div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {recipes.map((recipe, i) => (
                                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section - Booking Form */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-6 text-right">المناسبة</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {occasions.map((item, idx) => (
                            <label key={idx} className="flex flex-row-reverse items-center justify-between border border-gray-300 rounded-md px-4 py-3 cursor-pointer text-right">
                                <span className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="text-primary-1">{item.icon}</span>
                                    {item.label}
                                </span>
                                <input type="radio" name="occasion" className="form-radio text-primary-1 w-4 h-4" />
                            </label>
                        ))}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-right font-medium">تاريخ المناسبة</label>
                        <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
                            <BsCalendar2Date className="ml-2 text-gray-500" />
                            <input type="date" className="flex-grow bg-transparent text-right outline-none" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-right font-medium">المدينة</label>
                        <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
                            <FaMapMarkerAlt className="ml-2 text-gray-500" />
                            <select className="flex-grow bg-transparent text-right outline-none">
                                <option value="">اختر المدينة</option>
                                <option>الرياض</option>
                                <option>جدة</option>
                                <option>مكة</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-right font-medium">عدد المدعوين</label>
                        <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
                            <FaUserFriends className="ml-2 text-gray-500" />
                            <input type="number" className="flex-grow bg-transparent text-right outline-none" placeholder="أدخل العدد" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-right font-medium">رقم التواصل</label>
                        <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
                            <FaUserFriends className="ml-2 text-gray-500" />
                            <input type="tel" className="flex-grow bg-transparent text-right outline-none" placeholder="أدخل رقم الهاتف" />
                        </div>
                    </div>

                    <button className="w-full bg-primary-1 hover:bg-red-700 transition text-white py-3 rounded-md text-center font-semibold">
                        حجز الشيف
                    </button>
                </div>
            </div>
        </PageWrapper>
    );
};

export default ChefNeed;