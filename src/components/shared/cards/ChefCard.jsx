import { Link } from "react-router";
import FollowChef from "../FollowChef/FollowChef";

const ChefCard = ({ chef }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col gap-4">
      <div className="flex items-center border-b pb-4 gap-4">
        <img
          src={
            chef.profilePicture ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              chef.name
            )}&background=D71313&color=fff&size=130`
          }
          alt={chef.name}
          className="w-24 h-24 rounded-md object-cover"
        />
        <div className="flex-1 text-right">
          <h2 className="text-lg font-semibold">{chef.name}</h2>
          <p className="text-gray-500 text-sm mt-1">أنواع وصفات الطبخ هنا</p>
        </div>
      </div>

      <div className="flex justify-around text-center text-sm text-gray-600 border-b pb-4">
        <div className="px-2 border-l last:border-l-0">
          <p className="font-bold text-lg text-[#D71313]">90</p>
          <p>عدد الوصفات</p>
        </div>
        <div className="px-2 border-l">
          <p className="font-bold text-lg text-[#D71313]">1700+</p>
          <p>عدد المتابعين</p>
        </div>
        <div className="px-2">
          <p className="font-bold text-lg text-[#D71313]">120</p>
          <p>عدد الزوار</p>
        </div>
      </div>

      <div className="flex justify-between gap-2 mt-2">
        <FollowChef
          followingId={chef.id}
          isInitiallyFollowing={chef.isFollowing}
        />
        <Link
          to={`/chef/${chef.id}`}
          className="w-1/2 bg-[#D71313] text-white rounded-md py-2 text-center hover:opacity-90 transition"
        >
          المزيد من التفاصيل
        </Link>
      </div>
    </div>
  );
};

export default ChefCard;