import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../utils/ApiClient";
import { Link } from "react-router";
import FollowChef from "../shared/FollowChef/FollowChef";
import Pagination2 from "../common/Pagination2";

const AllChefs = ({ searchParams = {} }) => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    currentPage: 1,
    totalPages: 1,
  });
  const pageSize = 6;

  useEffect(() => {
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchChefs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${api_url}/chef`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            take: pageSize,
            ...searchParams,
          },
        });

        setChefs(response.data.data || []);
        const pag = response.data.pagination;

        setPagination({
          hasNextPage: pag?.hasNextPage || false,
          hasPreviousPage: pag?.hasPreviousPage || false,
          currentPage: pag?.currentPage || 1,
          totalPages: pag?.totalPages || 1,
        });
      } catch (err) {
        setError("فشل تحميل الطهاة.");
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, [page, searchParams]);

  return (
    <div>
      {loading && <p className="text-center">...جاري تحميل الطهاة</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {chefs.length > 0 ? (
          chefs.map((chef) => (
            <div
              key={chef.id}
              className="bg-white p-4 rounded-lg shadow-md border flex flex-col gap-4"
            >
              <div className="flex items-center border-b pb-4 gap-4">
                <div className="flex-1 text-right">
                  <h2 className="text-lg font-semibold">{chef.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    أنواع وصفات الطبخ هنا
                  </p>
                </div>
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
              </div>

              <div className="flex justify-around text-center text-sm text-[#808080] border-b pb-4">
                <div className="px-2 border-l last:border-l-0">
                  <p className="font-bold text-lg text-[#030303]">
                    {chef.totalRecipes}
                  </p>
                  <p>عدد الوصفات</p>
                </div>
                <div className="px-2 border-l">
                  <p className="font-bold text-lg text-[#030303]">
                    {chef.totalFollowers}
                  </p>
                  <p>عدد المتابعين</p>
                </div>
                <div className="px-2 border-l">
                  <p className="font-bold text-lg text-[#030303]">
                    {chef.totalViews}
                  </p>
                  <p>عدد الزوار</p>
                </div>
              </div>

              <div className="flex justify-between gap-2 mt-2">
                <Link
                  to={`/chef/${chef.id}`}
                  className="w-1/2 bg-[#D71313] text-white rounded-md py-2 text-center hover:opacity-90 transition"
                >
                  المزيد من التفاصيل
                </Link>
                <FollowChef
                  followingId={chef.id}
                  isInitiallyFollowing={chef.isFollowing}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full mt-4">لا توجد نتائج حالياً</p>
        )}
      </div>

      <Pagination2 pagination={pagination} setPage={setPage} />
    </div>
  );
};

export default AllChefs;