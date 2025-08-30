import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import apiClient from "../../../utils/ApiClient";
import Inputs from "../../../components/shared/inputs/Inputs";
import SelectInput from "../../../components/shared/inputs/SelectInput";
import TextAreaInput from "../../../components/shared/inputs/TextAreaInput ";
import Button from "../../../components/shared/Buttons/Button";
import Alert from "../../../components/shared/Alert/Alert";
import allergy from "../../../assets/allergy.webp";

const ViewMeal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // حالات التنبيه
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: null,
    calories: "",
    price: "",
    discountRate: "",
    category: "",
    isAllergenic: false,
    store: "",
  });

  useEffect(() => {
    fetchStores();
    fetchMealData();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  // معالج إغلاق التنبيه
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // دالة لعرض التنبيه
  const showAlert = (message, subMessage, type = "success") => {
    setAlertMessage(message);
    setAlertSubMessage(subMessage);
    setAlertType(type);
    setAlertOpen(true);
  };

  const fetchMealData = async () => {
    try {
      const response = await apiClient.get(`/meal/${id}`);

      const meal = response.data;
      setFormData({
        name: meal.name || "",
        description: meal.description || "",
        photo: meal.photo || null,
        calories: meal.calories || "",
        price: meal.price || "",
        discountRate: meal.discountRate || "",
        category: meal.category || "",
        isAllergenic: meal.isAllergenic || false,
        store: meal.store?.id || "",
      });

      if (meal.photo) {
        setPhoto(meal.photo);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch meal:", error);
      showAlert(
        "خطأ في تحميل البيانات",
        "حدث خطأ أثناء جلب بيانات الوجبة",
        "error"
      );
      setLoading(false);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await apiClient.get("/store/user", {
        params: {
          page: "1",
          take: "25", // Get more stores to ensure we have all available
        },
      });

      // Convert stores to options format for CheckboxSelectInput
      // Handle both direct array and paginated response
      const storesData = response.data.data || response.data;
      const storeOptions = storesData.map((store) => ({
        value: store.id,
        label: store.name,
      }));
      setStores(storeOptions);
    } catch (error) {
      console.error("Failed to fetch stores:", error);
      showAlert("خطأ في تحميل البيانات", "حدث خطأ أثناء جلب المتاجر", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">جاري تحميل بيانات الوجبة...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* مكون Alert */}
      <Alert
        message={alertMessage}
        subMessage={alertSubMessage}
        isOpen={alertOpen}
        onClose={handleAlertClose}
        type={alertType}
        autoClose={false}
      />

      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[90rem] p-16 rounded-xl">
          <h2 className="text-3xl font-bold text-gray-700 mb-10 text-right">
            عرض تفاصيل الوجبة
          </h2>

          <div className="relative bg-gray-300 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden mb-10">
            {photo ? (
              <img
                src={
                  typeof photo === "string" ? photo : URL.createObjectURL(photo)
                }
                alt="Meal"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-500 text-lg"> </div>
            )}
          </div>

          <form>
            {/* الصف الأول: فئة الوجبة - اسم المتجر - اسم الوجبة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <SelectInput
                name="category"
                label="فئه الوجبة"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.category}
                disabled={true}
                options={[
                  { value: "Offers", label: "العروض" },
                  { value: "News", label: "جديدنا" },
                  { value: "Main Meals", label: "الوجبات الرئيسيه" },
                  { value: "Side Meals", label: "الوجبات الفرعيه" },
                  { value: "Drinks", label: "مشروبات" },
                  { value: "Oriental Sweets", label: "حلويات شرقيه" },
                  { value: "Western Sweets", label: "حلويات غربيه" },
                  { value: "Other", label: "اخرى" },
                  {
                    value: "Baked Goods and Crackers",
                    label: "المخبوزات والمقرمشات",
                  },
                  { value: "Diet Meals", label: "وجبات دايت" },
                  { value: "Juices", label: "عصائر" },
                  { value: "Ice Cream", label: "ايس كريم" },
                ]}
              />

              <div>
                {stores.length > 0 ? (
                  <SelectInput
                    name="store"
                    label="اسم المتجر"
                    className="w-full h-12 px-6 text-xl py-4"
                    value={formData.store}
                    disabled={true}
                    options={stores}
                  />
                ) : (
                  <div className="text-gray-500">جاري تحميل المتاجر...</div>
                )}
              </div>

              <Inputs
                name="name"
                label="اسم الوجبة"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.name}
                readOnly={true}
                disabled={true}
              />
            </div>

            {/* TextArea للوصف */}
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 text-right mt-10">
              <TextAreaInput
                name="description"
                label="وصف مختصر عن الوجبة"
                type="text"
                className="w-full h-36 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بادخال وصف مختصر عن الوجبة هنا"
                value={formData.description}
                readOnly={true}
                disabled={true}
              />
            </div>

            {/* الصف الثاني: نسبة الخصم - سعر الوجبة - عدد السعرات */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right mt-10">
              <Inputs
                name="discountRate"
                label="نسبة الخصم الوجبة ( اختياري )"
                type="number"
                min="0"
                max="100"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.discountRate}
                readOnly={true}
                disabled={true}
              />

              <Inputs
                name="price"
                label="سعر الوجبة"
                type="number"
                min="0"
                step="0.01"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.price}
                readOnly={true}
                disabled={true}
              />

              <Inputs
                name="calories"
                label="عدد السعرات الحرارية"
                type="number"
                min="0"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.calories}
                readOnly={true}
                disabled={true}
              />
            </div>

            <div className="flex flex-row-reverse items-center gap-x-2 pt-6 mt-7">
              <label
                htmlFor="isAllergenic"
                className="text-lg font-medium text-gray-700"
              >
                هل الوجبة تحتوي على مسببات الحساسية ؟
              </label>
              <input
                type="checkbox"
                id="isAllergenic"
                name="isAllergenic"
                checked={formData.isAllergenic}
                disabled={true}
                className="w-5 h-5 accent-primary-1"
              />
            </div>

            <div className="text-right">
              <p className="text-gray-500 text-sm mt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="text-primary-1 ml-1 underline"
                >
                  مسببات الحساسية
                </button>
                لمعرفة المذيد عن مسببات الحساسية يرجى الضعط على الرابط التالي{" "}
              </p>

              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[40%] max-w-lg text-center relative">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="absolute top-3 right-4 text-gray-600 text-2xl"
                    >
                      &times;
                    </button>
                    <h2 className="text-xl font-semibold mb-4">
                      مسببات الحساسية
                    </h2>
                    {allergy ? (
                      <img
                        src={allergy}
                        alt="مسببات الحساسية"
                        className="w-[80%] h-auto mx-auto rounded-md"
                      />
                    ) : (
                      <div className="w-[80%] h-40 bg-gray-200 mx-auto rounded-md flex items-center justify-center">
                        <span className="text-gray-500">لا توجد صورة</span>
                      </div>
                    )}
                    <p className="text-gray-600 mt-4">
                      هذه قائمة بمسببات الحساسية الشائعة، يرجى الانتباه عند
                      تحضير الطعام.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-12">
              <div className="flex gap-4 w-full max-w-xs justify-center">
                <Button
                  label="رجوع"
                  className="w-[600px] h-[55px] !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
                  type="button"
                  onClick={() => navigate("/list")}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewMeal;
