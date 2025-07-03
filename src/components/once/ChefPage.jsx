import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import PageWrapper from "../common/PageWrapper";
import { api_url } from "../../utils/ApiClient";
import {
  FaHeart,
  FaShareAlt,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaSnapchatGhost,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa6";
import RecipeChef from "../shared/RecipeChef/RecipeChef";
import { MdVerified } from "react-icons/md";
import FavouriteChef from "../shared/Favourites/FavouriteChef";
import ChefShare from "../shared/Share/ChefShare";
import FollowChef from "../shared/FollowChef/FollowChef";

const ChefPage = () => {
  const { id } = useParams();
  const [chef, setChef] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRequestChef = () => {
    navigate(`/chefneed/${chef.id}`);
  };

  const fetchChefData = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${api_url}/chef/${id}?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const chefData = response.data;
      const paginationData = response.pagination || {};

      if (chefData) {
        setChef(chefData);
        setRecipes(chefData.recipes || []);
        setPagination({
          totalPages: paginationData.totalPages || 1,
          currentPage: paginationData.currentPage || 1,
        });
      } else {
        setError("لا يوجد بيانات لهذا الشيف.");
      }
    } catch (err) {
      setError("فشل تحميل بيانات الشيف.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChefData(1);
  }, [id]);

  if (loading)
    return (
      <PageWrapper>
        <p className="text-center mt-4">...جاري التحميل</p>
      </PageWrapper>
    );
  if (error)
    return (
      <PageWrapper>
        <p className="text-center text-red-500 mt-4">{error}</p>
      </PageWrapper>
    );
  if (!chef) return null;

  return (
    <PageWrapper>
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Left Section - Recipes */}
        <div className="w-full lg:w-2/3">
          <RecipeChef />
        </div>
        {/* Right Panel */}
        <div className="w-full h-fit lg:w-1/3 ">
          <div className="bg-white rounded-2xl shadow p-2">
            <div className="flex justify-end space-x-3">
              <div className="ms-3">
                <h2 className="mt-3 font-bold text-lg text-gray-800 flex items-center justify-end gap-1">
                  <MdVerified className="text-primary-1" />
                  {chef.name}
                </h2>
                <p className="text-sm text-[#808080] mt-1">
                  {chef.recipeTypes?.length > 0
                    ? chef.recipeTypes.map((type) => type.name.ar).join("، ")
                    : "وصف مختصر عن الشيف هنا"}
                </p>
              </div>
              <div className="w-24 h-24 rounded-md">
                <img
                  src={chef.profilePicture || "https://via.placeholder.com/150"}
                  alt="Chef Avatar"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
            <p className="text-sm text-[#808080] mt-1 p-2 pt-4 text-right">
              {chef.description || "وصف الطباخ هنا"}
            </p>

            <div className="flex justify-center gap-2 mt-4">
              <FollowChef
                followingId={chef.id}
                isInitiallyFollowing={chef.isFollowing}
              />
              <button
                className="flex-1 py-2 rounded bg-primary-1 text-white hover:bg-red-700"
                onClick={handleRequestChef}
              >
                اريد الشيف
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded border ">
                <p className="text-[#808080] text-sm text-right">عدد الزوار</p>
                <p className="font-bold text-lg text-[#030303] text-right">
                  {chef.totalViews || 0}
                </p>
              </div>
              <div className="p-3 rounded border">
                <p className="text-[#808080] text-sm text-right">
                  عدد المتابعين
                </p>
                <p className="font-bold text-lg text-[#030303] text-right">
                  {chef.totalFollowers || 0}
                </p>
              </div>
              <div className="p-3 rounded border">
                <p className="text-[#808080] text-sm text-right">عدد الوصفات</p>
                <p className="font-bold text-lg text-[#030303] text-right">
                  {chef.totalRecipes || 0}
                </p>
              </div>
              <div className="p-3 rounded border">
                <p className="text-[#808080] text-sm text-right">
                  رقم التواصل للطلبات
                </p>
                <p className="font-bold text-lg text-[#030303] text-right">
                  {chef.phone ? chef.phone.replace(/^\+\d{1,3}/, "") : "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 mt-4">
            <div className="space-y-3">
              {/* Likes Section */}
              <div className="flex items-center gap-3">
                <div className="flex flex-row-reverse justify-between items-center flex-1 border rounded-md p-3">
                  <p className="text-[#808080] text-sm">الاعجابات</p>
                  <span className="text-[#808080] font-semibold text-base">
                    {chef.favoritesCount || 0}
                  </span>
                </div>

                <FavouriteChef
                  itemId={chef.id}
                  isInitiallyFavorited={chef.isFavorited}
                />
              </div>

              {/* Shares Section */}
              <div className="flex items-center gap-3">
                <div className="flex flex-row-reverse justify-between items-center flex-1 border rounded-md p-3">
                  <p className="text-[#808080] text-sm">المشاركة بواسطة</p>
                  <span className="text-[#808080] font-semibold text-base">
                    {chef.totalShares || 0}
                  </span>
                </div>
                <ChefShare chefId={chef.id} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 mt-4">
            <p className="text-[#808080] text-sm mb-2 text-right">
              وسائل التواصل
            </p>
            <div className="flex justify-between flex-wrap gap-2">
              {chef.socialMedia?.whatsapp && (
                <a
                  href={`https://wa.me/${chef.socialMedia.whatsapp.replace(
                    /\D/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-green-50"
                  title="WhatsApp"
                >
                  <FaWhatsapp className="text-green-500" />
                </a>
              )}
              {chef.socialMedia?.facebook && (
                <a
                  href={chef.socialMedia.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-blue-50"
                  title="Facebook"
                >
                  <FaFacebook className="text-blue-600" />
                </a>
              )}
              {chef.socialMedia?.x && (
                <a
                  href={chef.socialMedia.x}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-gray-100"
                  title="X (Twitter)"
                >
                  <FaTwitter className="text-gray-600" />
                </a>
              )}
              {chef.socialMedia?.instagram && (
                <a
                  href={chef.socialMedia.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-pink-50"
                  title="Instagram"
                >
                  <FaInstagram className="text-pink-500" />
                </a>
              )}
              {chef.socialMedia?.youtube && (
                <a
                  href={chef.socialMedia.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-red-50"
                  title="YouTube"
                >
                  <FaYoutube className="text-primary-1" />
                </a>
              )}
              {chef.socialMedia?.tiktok && (
                <a
                  href={chef.socialMedia.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border text-black hover:bg-black/70 hover:text-white"
                  title="TikTok"
                >
                  <SiTiktok />
                </a>
              )}
              {chef.socialMedia?.snapchat && (
                <a
                  href={chef.socialMedia.snapchat}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border hover:bg-yellow-100"
                  title="Snapchat"
                >
                  <FaSnapchatGhost className="text-yellow-500" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ChefPage;
