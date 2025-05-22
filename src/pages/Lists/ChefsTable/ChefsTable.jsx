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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chefToDelete, setChefToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchChefs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${api_url}/user/chef`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
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

  const handleDeleteClick = (chef) => {
    setChefToDelete(chef);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!chefToDelete) return;

    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Fixed: استخدام chefToDelete.id بدلاً من chef_id غير المعرف
      const response = await fetch(`${api_url}/chef/${chefToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // إزالة الشيف من القائمة
        setChefs((prevChefs) =>
          prevChefs.filter((chef) => chef.id !== chefToDelete.id)
        );
        setShowDeleteModal(false);
        setChefToDelete(null);

        // إذا كانت هذه آخر عنصر في الصفحة، ارجع للصفحة السابقة
        if (chefs.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }

        // رسالة نجاح
        alert("تم حذف الشيف بنجاح");
      } else {
        // معالجة أخطاء الاستجابة
        const errorData = await response.json().catch(() => null);
        console.error("خطأ في حذف الشيف:", errorData);
        alert(errorData?.message || "حدث خطأ أثناء حذف الشيف");
      }
    } catch (error) {
      console.error("خطأ في حذف الشيف:", error);
      alert("حدث خطأ أثناء حذف الشيف");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setChefToDelete(null);
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
          <thead>
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
                <td className="px-4 py-3 text-yellow-500 text-sm text-right border border-gray-300">
                  {chef.averageRating ? chef.averageRating.toFixed(1) : "0.0"}{" "}
                  <span className="text-gray-400">⭐</span>
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
                      {chef.name || "غير محدد"}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-right">
              تأكيد الحذف
            </h3>
            <p className="text-gray-600 mb-6 text-right">
              هل أنت متأكد من حذف الشيف "{chefToDelete?.name}"؟
              <br />
              لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={deleteLoading}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleteLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري الحذف...
                  </>
                ) : (
                  "حذف"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
