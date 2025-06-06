import { useState, useEffect } from "react";
import { TbTrash } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { Pagination } from "../../../components/shared/Pagination/Pagination";

export function StoresTable() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          const mockData = Array(10)
            .fill(null)
            .map((_, index) => ({
              id: index + 1,
              name: `متجر ${index + 1}`,
              type: `نوع المتجر ${index + 1}`,
              city: `المدينة ${index + 1}`,
              location: `المنطقة ${index + 1}`,
              manager: `01234567${index}`,
            }));

          setStores(mockData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching stores:", error);
        setLoading(false);
      }
    };

    fetchStores();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="text-center py-12">جاري تحميل المتاجر...</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="text-right text-gray-700">
              <th className="px-4 py-3 font-medium text-center border border-gray-300">
                مزيد من التفاصيل
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                رقم التواصل مع الإدارة{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                المنطقة{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                المدينة{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                نوع المتجر{" "}
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                تفاصيل المتجر{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr
                key={store.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleDeleteClick(chef)}
                      className="text-red-500 bg-red-100 hover:bg-red-300 p-1 rounded-md transition-colors"
                      title="حذف الشيف"
                    >
                      <TbTrash size={16} />
                    </button>
                    <button
                      className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors"
                      title="عرض تفاصيل الشيف"
                    >
                      <IoEyeOutline size={16} />
                    </button>
                    <button
                      className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors"
                      title="تعديل الشيف"
                    >
                      <LuPencilLine size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700 text-lg font-bold text-right border border-gray-300">
                  {store.manager}
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                  {store.location}
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                  {store.city}
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                  {store.type}
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                  <div className="flex-shrink-0"></div>
                  <div className="text-right">
                    <div className="font-medium">{store.name}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
