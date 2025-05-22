import { useState, useEffect } from "react";
import { TbTrash } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { Pagination } from "../../../components/shared/Pagination/Pagination";
import { api_url } from "../../../utils/ApiClient";

export function ChefsTable() {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchChefs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${api_url}/chef?page=${currentPage}&take=15`);
        const result = await response.json();
        
        if (response.ok) {
          if (result.data && Array.isArray(result.data)) {
            setChefs(result.data);
            
            if (result.pagination) {
              setPagination(result.pagination);
              setTotalPages(result.pagination.totalPages);
            }
          } else {
            setChefs([]);
          }
        } else {
          setChefs([]);
        }
      } catch (error) {
        setChefs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="text-center py-12">جاري تحميل الشيفات...</div>;
  }

  if (chefs.length === 0) {
    return <div className="text-center py-12">لا توجد شيفات متاحة</div>;
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          <thead >
            <tr className="text-right text-gray-700">
              <th className="px-4 py-3 font-medium text-center border border-gray-300">
                مزيد من التفاصيل
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                التقييم
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                عدد الزوار
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                عدد المتابعين
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                عدد الوصفات
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                تفاصيل الشيف
              </th>
            </tr>
          </thead>
          <tbody>
            {chefs.map((chef) => (
              <tr
                key={chef.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-3 border border-gray-300">
                  <div className="flex gap-2 justify-center">
                    <button className="text-red-500 bg-red-100 hover:bg-red-300 p-1 rounded-md transition-colors">
                      <TbTrash size={16} />
                    </button>
                    <button className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors">
                      <IoEyeOutline size={16} />
                    </button>
                    <button className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors">
                      <LuPencilLine size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-yellow-500 text-sm text-right border border-gray-300">
                  {chef.averageRating ? chef.averageRating.toFixed(1) : '0.0'} <span className="text-gray-400">⭐</span>
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                  -
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                  -
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                  عدد الوصفات {chef.recipes ? chef.recipes.length : 0}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  <div className="flex items-center gap-2 justify-end">
                      <div className="font-medium text-gray-800 text-right">
                        {chef.name || 'غير محدد'}
                      </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}