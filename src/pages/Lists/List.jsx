import { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { TbTrash } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import Button from "../../components/shared/Buttons/Button";
import { PiChefHatLight } from "react-icons/pi";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { CiForkAndKnife } from "react-icons/ci";

export default function List() {
  // الحالات
  const [activeTab, setActiveTab] = useState("متاجر");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const menuItems = [
    { label: "المتاجر", icon: <MdOutlineStoreMallDirectory size={20} /> },
    { label: "الشيفات", icon: <PiChefHatLight size={20} /> },
    { label: "الوصفات", icon: <CiForkAndKnife size={20} /> },
  ];

  // محاكاة طلب API لجلب البيانات
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        // في بيئة حقيقية، سنستبدل هذا بطلب API فعلي
        // const response = await fetch(`/api/${activeTab}?page=${currentPage}`);
        // const data = await response.json();

        // محاكاة استجابة API
        setTimeout(() => {
          const mockData = Array(10)
            .fill(null)
            .map((_, index) => ({
              id: index + 1,
              name: `الاسم التجاري هنا ${index + 1}`,
              type: `نوع المتجر هنا`,
              city: `المدينه هنا`,
              location: `المنطقة هنا`,
              manager: `رقم التواصل مع الإدارة هنا`,
            }));

          setAccounts(mockData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [activeTab, currentPage]);

  // التعامل مع تغيير الصفحة
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full bg-white p-4 pb-6 rounded-lg shadow-sm">
      <div className="flex flex-row-reverse justify-between mb-6">
        <h1 className="text-xl font-bold text-right">حسابات الأعمال</h1>

        <div className="flex gap-4">
          <Button
            label="إضافة متجر جديد"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center"
          />
        </div>
      </div>

      <div className="flex flex-row-reverse gap-6">
        <div className="w-40 rounded-lg border p-2 flex flex-col gap-2 bg-white">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium text-right transition-colors
          ${
            activeTab === item.label
              ? "bg-red-100 text-red-600 font-bold"
              : "text-gray-500"
          }`}
            >
              {item.label}
              <span className="ml-2">{item.icon}</span>
            </button>
          ))}
        </div>
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12">جاري التحميل...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse table-auto">
                <thead>
                  <tr className="text-right text-gray-500 border-b border-gray-200">
                    <th className="px-4 py-2 font-medium">مزيد من التفاصيل</th>
                    <th className="px-4 py-2 font-medium">رقم التواصل مع الإدارة</th>
                    <th className="px-4 py-2 font-medium">المنطقة </th>
                    <th className="px-4 py-2 font-medium">المدينه</th>
                    <th className="px-4 py-2 font-medium">نوع المتجر</th>
                    <th className="px-4 py-2 font-medium">تفاصيل المتجر</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr
                      key={account.id}
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
                      <td className="px-4 py-3 text-gray-600">
                        {account.manager}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {account.location}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {account.city}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {account.type}
                      </td>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs">{account.id}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{account.name}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>{" "}
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50"
          >
            <IoIosArrowBack size={16} />
          </button>

          {currentPage > 2 && (
            <button
              onClick={() => handlePageChange(1)}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              01
            </button>
          )}

          {currentPage > 3 && <span className="px-2">...</span>}

          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {String(currentPage - 1).padStart(2, "0")}
            </button>
          )}

          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-red-600 border border-red-600 text-white">
            {String(currentPage).padStart(2, "0")}
          </button>

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {String(currentPage + 1).padStart(2, "0")}
            </button>
          )}

          {currentPage < totalPages - 2 && <span className="px-2">...</span>}

          {currentPage < totalPages - 1 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {String(totalPages).padStart(2, "0")}
            </button>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50"
          >
            <IoIosArrowForward size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
