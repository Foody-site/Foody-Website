import NoData from "./NoData";

export default function NoDataExamples() {
  return (
    <div className="space-y-8 p-8">
      {/* مثال 1: الاستخدام الافتراضي */}
      <div className="border rounded-lg">
        <h2 className="text-xl font-bold mb-4 p-4 border-b">
          المثال الافتراضي
        </h2>
        <NoData />
      </div>

      {/* مثال 2: للمطاعم */}
      <div className="border rounded-lg">
        <h2 className="text-xl font-bold mb-4 p-4 border-b">لا توجد مطاعم</h2>
        <NoData
          message="لا توجد مطاعم متاحة"
          description="لم يتم العثور على أي مطاعم في منطقتك حالياً. جرب البحث في منطقة أخرى."
          icon="restaurant"
        />
      </div>

      {/* مثال 3: للوصفات */}
      <div className="border rounded-lg">
        <h2 className="text-xl font-bold mb-4 p-4 border-b">لا توجد وصفات</h2>
        <NoData
          message="لا توجد وصفات"
          description="لم يتم إضافة أي وصفات من قبل الشيفات بعد"
          icon="utensils"
          size="medium"
        />
      </div>

      {/* مثال 4: للطلبات */}
      <div className="border rounded-lg">
        <h2 className="text-xl font-bold mb-4 p-4 border-b">لا توجد طلبات</h2>
        <NoData
          message="لا توجد طلبات"
          description="لم تقم بأي طلبات حتى الآن. ابدأ بتصفح المطاعم واطلب وجبتك المفضلة!"
          icon="menu"
          size="small"
          className="bg-gray-50"
        />
      </div>
    </div>
  );
}
