import React from "react";

const ReviewsTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-right">رقم الحجز</th>
            <th className="px-4 py-2 border-b text-right">اسم العميل</th>
            <th className="px-4 py-2 border-b text-right">الخدمة</th>
            <th className="px-4 py-2 border-b text-right">التاريخ</th>
            <th className="px-4 py-2 border-b text-right">الوقت</th>
            <th className="px-4 py-2 border-b text-right">الحالة</th>
            <th className="px-4 py-2 border-b text-right">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {/* يمكن إضافة بيانات الحجوزات هنا */}
          <tr>
            <td className="px-4 py-2 border-b text-right">1001</td>
            <td className="px-4 py-2 border-b text-right">أحمد محمد</td>
            <td className="px-4 py-2 border-b text-right">حجز شيف</td>
            <td className="px-4 py-2 border-b text-right">25/07/2025</td>
            <td className="px-4 py-2 border-b text-right">14:00</td>
            <td className="px-4 py-2 border-b text-right">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                مؤكد
              </span>
            </td>
            <td className="px-4 py-2 border-b text-right">
              <button className="text-blue-600 hover:text-blue-800 ml-2">
                عرض
              </button>
              <button className="text-red-600 hover:text-red-800">إلغاء</button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b text-right">1002</td>
            <td className="px-4 py-2 border-b text-right">ليلى أحمد</td>
            <td className="px-4 py-2 border-b text-right">طلب وصفة</td>
            <td className="px-4 py-2 border-b text-right">26/07/2025</td>
            <td className="px-4 py-2 border-b text-right">16:30</td>
            <td className="px-4 py-2 border-b text-right">
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                قيد الانتظار
              </span>
            </td>
            <td className="px-4 py-2 border-b text-right">
              <button className="text-blue-600 hover:text-blue-800 ml-2">
                عرض
              </button>
              <button className="text-red-600 hover:text-red-800">إلغاء</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReviewsTable;
