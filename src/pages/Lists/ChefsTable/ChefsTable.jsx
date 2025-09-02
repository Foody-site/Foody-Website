import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { TbTrash } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { Pagination } from "../../../components/shared/Pagination/Pagination";
import apiClient from "../../../utils/ApiClient";
import { useNavigate } from "react-router";
import Alert from "../../../components/shared/Alert/Alert";
import Spinner from "../../../components/shared/Loading/Spinner";

export const ChefsTable = forwardRef((props, ref) => {
  const { onChefsChange, onLoadingChange } = props;
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chefToDelete, setChefToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  // Add these states for the Alert component
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleViewChef = (chef) => {
    // توجيه المستخدم إلى صفحة عرض بيانات الشيف
    navigate(`/chef/view/${chef.id}`);
  };

  useImperativeHandle(ref, () => ({
    hasChefs: () => chefs.length > 0,
  }));

  useEffect(() => {
    const fetchChefs = async () => {
      setLoading(true);
      if (onLoadingChange) {
        onLoadingChange(true);
      }

      try {
        const response = await apiClient.get("/user/chef");
        const result = response.data;
        console.log("API Result:", result);

        let chefsData = [];

        if (result && typeof result === "object") {
          if (Array.isArray(result.data)) {
            console.log("Setting chefs with result.data:", result.data);
            chefsData = result.data;
          } else if (Array.isArray(result)) {
            console.log("Setting chefs with array:", result);
            chefsData = result;
          } else {
            console.log("Setting chefs with single object:", [result]);
            chefsData = [result];
          }

          if (result.pagination) {
            setPagination(result.pagination);
            setTotalPages(result.pagination.totalPages);
          }
        }

        setChefs(chefsData);

        if (onChefsChange) {
          onChefsChange(chefsData.length > 0);
        }
      } catch (error) {
        console.error("Error fetching chefs:", error);
        setChefs([]);
        if (onChefsChange) {
          onChefsChange(false);
        }
      } finally {
        setLoading(false);
        if (onLoadingChange) {
          onLoadingChange(false);
        }
      }
    };

    fetchChefs();
  }, [currentPage, onChefsChange, onLoadingChange]);

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
      const response = await apiClient.delete(`/chef/${chefToDelete.id}`);

      const updatedChefs = chefs.filter((chef) => chef.id !== chefToDelete.id);
      setChefs(updatedChefs);

      if (onChefsChange) {
        onChefsChange(updatedChefs.length > 0);
      }

      setShowDeleteModal(false);
      setChefToDelete(null);

      if (chefs.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      // Replace the alert with the custom Alert component
      setAlertMessage("تم حذف الشيف");
      setAlertSubMessage(`تم حذف الشيف ${chefToDelete?.name} بنجاح`);
      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      console.error("خطأ في حذف الشيف:", error);

      // Show error alert
      setAlertMessage("حدث خطأ");
      setAlertSubMessage("حدث خطأ أثناء حذف الشيف");
      setAlertType("error");
      setShowAlert(true);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setChefToDelete(null);
  };

  if (loading) {
    return <Spinner className="py-12" />;
  }

  if (chefs.length === 0) {
    return <div className="text-center py-12">لا توجد شيفات متاحة</div>;
  }

  console.log("Current chefs state:", chefs);
  console.log("Current loading state:", loading);

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          <thead>
            <tr className="text-right text-gray-700 bg-gray-100">
              <th className="px-4 py-3 font-medium text-center border border-gray-300 w-[120px]">
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
            {chefs.map((chef, index) => (
              <tr
                key={chef.id || index}
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
                      onClick={() => handleViewChef(chef)}
                      className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors"
                      title="عرض تفاصيل الشيف"
                    >
                      <IoEyeOutline size={16} />
                    </button>
                    <button
                      onClick={() => navigate(`/chef/edit/${chef.id}`)}
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
              ؟ ( {chefToDelete?.name} ) هل أنت متأكد من حذف الشيف
              <br />. لا يمكن التراجع عن هذا الإجراء{" "}
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
                    <Spinner size={4} color="border-white" className="h-auto" />
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

      {/* Custom Alert Component */}
      <Alert
        message={alertMessage}
        subMessage={alertSubMessage}
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        autoClose={true}
        autoCloseTime={5000}
        type={alertType}
      />
    </div>
  );
});
