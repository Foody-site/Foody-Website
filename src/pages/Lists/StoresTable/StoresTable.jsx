import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { TbTrash } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { Pagination } from "../../../components/shared/Pagination/Pagination";
import apiClient from "../../../utils/ApiClient";
import { useNavigate } from "react-router";
import Alert from "./../../../components/shared/Alert/Alert";
import Spinner from "../../../components/shared/Loading/Spinner";

// Helper function to format phone number (remove +966 prefix if exists)
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "غير محدد";

  // If the phone number starts with +966, remove it
  if (phoneNumber.startsWith("+966")) {
    return phoneNumber.substring(4);
  }

  return phoneNumber;
};

// دالة لتحويل نوع المتجر إلى النص المناسب بالعربية
const formatStoreType = (type) => {
  switch (type) {
    case "restaurant":
      return "مطعم";
    case "patisserie":
      return "معجنات";
    case "health":
      return "صحي";
    case "icecream":
      return "ايس كريم";
    default:
      return "غير محدد";
  }
};

// دالة لتحويل المدينة إلى النص المناسب بالعربية
const formatCity = (city) => {
  switch (city) {
    case "Al-Kharj":
      return "الخرج";
    case "Al-Badayea":
      return "البدائع";
    default:
      return "غير محدد";
  }
};

// دالة لتحويل المنطقة إلى النص المناسب بالعربية
const formatRegion = (region) => {
  switch (region) {
    case "Riyadh":
      return "الرياض";
    case "Al-Qassim":
      return "القصيم";
    default:
      return "غير محدد";
  }
};

export const StoresTable = forwardRef((props, ref) => {
  const { onStoresChange, onLoadingChange } = props;
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  // الحالات الجديدة للتنبيه
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");

  useImperativeHandle(ref, () => ({
    hasStores: () => stores.length > 0,
  }));

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      if (onLoadingChange) {
        onLoadingChange(true);
      }

      try {
        const token = localStorage.getItem("token");

        // Use apiClient for the API call
        const response = await apiClient.get("/store/user", {
          params: {
            page: currentPage.toString(),
            take: itemsPerPage.toString(),
          },
        });
        const result = response.data;
        console.log("API Response Data:", result);

        let storesData = [];

        if (result && typeof result === "object") {
          if (Array.isArray(result.data)) {
            console.log("Setting stores with result.data:", result.data);
            storesData = result.data;
          } else if (Array.isArray(result)) {
            console.log("Setting stores with array:", result);
            storesData = result;
          } else {
            console.log("Setting stores with single object:", [result]);
            storesData = [result];
          }

          // Handle pagination data
          if (result.pagination) {
            setPagination(result.pagination);
            setTotalPages(
              result.pagination.totalPages ||
                Math.ceil(result.pagination.total / itemsPerPage)
            );
          } else if (result.meta) {
            // Some APIs use 'meta' instead of 'pagination'
            setPagination(result.meta);
            setTotalPages(
              result.meta.totalPages ||
                Math.ceil(result.meta.total / itemsPerPage)
            );
          } else {
            // If no pagination info is provided, assume single page
            setTotalPages(1);
          }
        }

        setStores(storesData);

        if (onStoresChange) {
          onStoresChange(storesData.length > 0);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
        setStores([]);
        if (onStoresChange) {
          onStoresChange(false);
        }

        // عرض رسالة الخطأ بتنبيه Alert
        setAlertMessage("خطأ في الاتصال");
        setAlertSubMessage(
          "حدث خطأ أثناء محاولة الاتصال بالخادم. يرجى المحاولة لاحقاً."
        );
        setAlertType("error");
        setAlertOpen(true);
      } finally {
        setLoading(false);
        if (onLoadingChange) {
          onLoadingChange(false);
        }
      }
    };

    fetchStores();
  }, [currentPage, itemsPerPage, onStoresChange, onLoadingChange]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteClick = (store) => {
    setStoreToDelete(store);
    setShowDeleteModal(true);
  };

  const handleViewStore = (store) => {
    navigate(`/store/view/${store.id}`);
  };

  const handleEditStore = (store) => {
    navigate(`/store/edit/${store.id}`);
  };

  // معالج إغلاق التنبيه
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!storeToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/store/${storeToDelete.id}`);

      const updatedStores = stores.filter(
        (store) => store.id !== storeToDelete.id
      );
      setStores(updatedStores);

      if (onStoresChange) {
        onStoresChange(updatedStores.length > 0);
      }

      setShowDeleteModal(false);
      setStoreToDelete(null);

      // If this was the last item on the current page and we're not on page 1, go back one page
      if (updatedStores.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      // استخدام Alert بدلاً من alert
      setAlertMessage("تم حذف المتجر");
      setAlertSubMessage(`تم حذف المتجر (${storeToDelete?.name}) بنجاح`);
      setAlertType("success");
      setAlertOpen(true);
    } catch (error) {
      console.error("خطأ في حذف المتجر:", error);

      // استخدام Alert بدلاً من alert
      setAlertMessage("خطأ في الحذف");
      setAlertSubMessage(
        "حدث خطأ أثناء محاولة حذف المتجر. يرجى المحاولة مرة أخرى."
      );
      setAlertType("error");
      setAlertOpen(true);

      // إغلاق نافذة تأكيد الحذف
      setShowDeleteModal(false);
      setStoreToDelete(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setStoreToDelete(null);
  };

  if (loading) {
    return <Spinner className="py-12" />;
  }

  if (stores.length === 0) {
    return <div className="text-center py-12">لا توجد متاجر متاحة</div>;
  }

  console.log("Current stores state:", stores);
  console.log("Current loading state:", loading);

  return (
    <div>
      {/* مكون Alert */}
      <Alert
        message={alertMessage}
        subMessage={alertSubMessage}
        isOpen={alertOpen}
        onClose={handleAlertClose}
        type={alertType}
      />

      <div className="overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          <thead>
            <tr className="text-right text-gray-700 bg-gray-100">
              <th className="px-4 py-3 font-medium text-center border border-gray-300 w-[120px]">
                مزيد من التفاصيل
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                رقم التواصل مع الإدارة
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                المنطقة
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                المدينة
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                نوع المتجر
              </th>
              <th className="px-4 py-3 font-medium text-right border border-gray-300">
                اسم المتجر
              </th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => {
              console.log("Processing store:", store);
              return (
                <tr
                  key={store.id || index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 border border-gray-300">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleDeleteClick(store)}
                        className="text-red-500 bg-red-100 hover:bg-red-300 p-1 rounded-md transition-colors"
                        title="حذف المتجر"
                      >
                        <TbTrash size={16} />
                      </button>
                      <button
                        onClick={() => handleViewStore(store)}
                        className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors"
                        title="عرض تفاصيل المتجر"
                      >
                        <IoEyeOutline size={16} />
                      </button>
                      <button
                        onClick={() => handleEditStore(store)}
                        className="text-blue-500 bg-blue-100 hover:bg-blue-300 p-1 rounded-md transition-colors"
                        title="تعديل المتجر"
                      >
                        <LuPencilLine size={16} />
                      </button>
                    </div>
                  </td>

                  {/* Manager Contact */}
                  <td className="px-4 py-3 text-gray-700 text-lg font-bold text-right border border-gray-300">
                    {formatPhoneNumber(store?.contactPhone)}
                  </td>

                  {/* Location/Area - تم تعديلها لاستخدام دالة التنسيق للمنطقة */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                    {formatRegion(store?.region)}
                  </td>

                  {/* city - تم تعديلها لاستخدام دالة التنسيق للمدينة */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                    {formatCity(store?.location?.city || store?.city)}
                  </td>

                  {/* Store Type */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                    {formatStoreType(store?.type)}
                  </td>

                  {/* Store Name */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300 font-medium">
                    {store?.name || "غير محدد"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Delete Confirmation Modal - نحتفظ بها للتأكيد الأولي قبل استخدام Alert */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-right">
              تأكيد الحذف
            </h3>
            <p className="text-gray-600 mb-6 text-right">
              ؟ ( {storeToDelete?.name} ) هل أنت متأكد من حذف المتجر
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
    </div>
  );
});
