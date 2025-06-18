import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { TbTrash } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { Pagination } from "../../../components/shared/Pagination/Pagination";
import { api_url } from "../../../utils/ApiClient";
import { useNavigate } from "react-router";

// Helper function to format phone number (remove +966 prefix if exists)
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "غير محدد";

  // If the phone number starts with +966, remove it
  if (phoneNumber.startsWith("+966")) {
    return phoneNumber.substring(4); 
  }

  return phoneNumber; 
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

        // Add pagination parameters to the URL
        const url = new URL(`${api_url}/store/user`);
        url.searchParams.append("page", currentPage.toString());
        url.searchParams.append("take", itemsPerPage.toString());

        const response = await fetch(url.toString(), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        console.log("API Response Status:", response.status);
        console.log("API Result:", result);
        console.log("Is response OK?", response.ok);

        if (response.ok) {
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
        } else {
          // Handle error response
          console.error("API Error:", result);
          setStores([]);
          if (onStoresChange) {
            onStoresChange(false);
          }

          // Show error message if available
          if (result.message) {
            const errorMessage = Array.isArray(result.message)
              ? result.message.join(", ")
              : result.message;
            console.error("API Error Message:", errorMessage);
          }
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
        setStores([]);
        if (onStoresChange) {
          onStoresChange(false);
        }
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

  const handleDeleteConfirm = async () => {
    if (!storeToDelete) return;

    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${api_url}/store/${storeToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
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

        alert("تم حذف المتجر بنجاح");
      } else {
        const errorData = await response.json().catch(() => null);
        console.error("خطأ في حذف المتجر:", errorData);
        alert(errorData?.message || "حدث خطأ أثناء حذف المتجر");
      }
    } catch (error) {
      console.error("خطأ في حذف المتجر:", error);
      alert("حدث خطأ أثناء حذف المتجر");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setStoreToDelete(null);
  };

  if (loading) {
    return <div className="text-center py-12">جاري تحميل المتاجر...</div>;
  }

  if (stores.length === 0) {
    return <div className="text-center py-12">لا توجد متاجر متاحة</div>;
  }

  console.log("Current stores state:", stores);
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

                  {/* Location/Area */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                    {store?.region || "غير محدد"}
                  </td>

                  {/* city */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                    {store?.location?.city || store?.city || "غير محدد"}
                  </td>

                  {/* Store Type */}
                  <td className="px-4 py-3 text-gray-700 text-sm text-right border border-gray-300">
                    {store?.type || "غير محدد"}
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

      {/* Delete Confirmation Modal */}
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
});
