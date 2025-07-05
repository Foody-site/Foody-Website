import { useState } from "react";
import { Link } from "react-router";
import FollowChef from "../FollowChef/FollowChef";

const ChefCard = ({ chef }) => {
  const [followersCount, setFollowersCount] = useState(chef.totalFollowers || 0);
  const [isFollowed, setIsFollowed] = useState(chef.isFollowed || false);

  const handleFollowChange = (newState) => {
    setIsFollowed(newState);
    setFollowersCount((prev) => prev + (newState ? 1 : -1));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col gap-4 text-right">
      {/* Header */}
      <div className="flex flex-row-reverse items-center gap-4 border-b pb-4">
        <img
          src={
            chef.profilePicture ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              chef.name
            )}&background=D71313&color=fff&size=130`
          }
          alt={chef.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">{chef.name}</h3>
          <p className="text-sm text-gray-500">
            {chef.recipeTypes?.map((t) => t.name?.ar).join("، ") || "أنواع وصفات الطبخ هنا"}
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
          <p className="font-bold text-gray-900">{followersCount}</p>
          <p>عدد المتابعين</p>
        </div>
        <div className="h-10 w-px bg-gray-300"></div>
        <div className="flex-1">
          <p className="font-bold text-gray-900">{chef.totalViews || 0}</p>
          <p>عدد الزوار</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <FollowChef
          followingId={chef.id}
          isInitiallyFollowing={isFollowed}
          onFollowChange={handleFollowChange}
          className="w-full sm:w-1/2 text-primary-1 border border-primary-1 py-2 rounded-md text-sm font-semibold transition"
        />
        <Link
          to={`/chef/${chef.id}`}
          className="w-full sm:w-1/2 bg-[#D71313] text-white rounded-md py-2 text-center hover:opacity-90 transition text-sm font-semibold"
        >
          المزيد من التفاصيل
        </Link>
      </div>
    </div>
  );
};

export default ChefCard;