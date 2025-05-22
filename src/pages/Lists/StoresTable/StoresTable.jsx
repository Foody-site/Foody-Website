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
            <tr className="text-right text-gray-500 border-b border-gray-200">
              <th className="px-4 py-2 font-medium">مزيد من التفاصيل</th>
              <th className="px-4 py-2 font-medium">رقم التواصل مع الإدارة</th>
              <th className="px-4 py-2 font-medium">المنطقة</th>
              <th className="px-4 py-2 font-medium">المدينة</th>
              <th className="px-4 py-2 font-medium">نوع المتجر</th>
              <th className="px-4 py-2 font-medium">تفاصيل المتجر</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr
                key={store.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center">
                    <button className="text-red-500 hover:bg-red-50 p-1 rounded-md">
                      <TbTrash size={16} />
                    </button>
                    <button className="text-blue-500 hover:bg-blue-50 p-1 rounded-md">
                      <IoEyeOutline size={16} />
                    </button>
                    <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-md">
                      <LuPencilLine size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{store.manager}</td>
                <td className="px-4 py-3 text-gray-600">{store.location}</td>
                <td className="px-4 py-3 text-gray-600">{store.city}</td>
                <td className="px-4 py-3 text-gray-600">{store.type}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs">{store.id}</span>
                    </div>
                  </div>
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
