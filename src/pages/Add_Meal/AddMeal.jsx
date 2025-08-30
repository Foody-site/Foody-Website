import { TbCameraPlus } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import apiClient from "../../utils/ApiClient";
import Inputs from "../../components/shared/inputs/Inputs";
import TextAreaInput from "../../components/shared/inputs/TextAreaInput ";
import Button from "../../components/shared/Buttons/Button";
import Alert from "../../components/shared/Alert/Alert";
import MealCategoryStoreSelector from "../../components/shared/form/MealCategoryStoreSelector";
import allergy from "../../assets/allergy.webp";

const AddMeal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  }, []);

  // معالج إغلاق التنبيه
  const handleAlertClose = () => {
    setAlertOpen(false);
    if (alertType === "success") {
      navigate("/list");
    }
  };

  // دالة لعرض التنبيه
  const showAlert = (message, subMessage, type = "success") => {
    setAlertMessage(message);
    setAlertSubMessage(subMessage);
    setAlertType(type);
    setAlertOpen(true);
  };

  const fetchStores = async () => {
    try {
      // Add pagination parameters as shown in the API documentation
      const params = new URLSearchParams({
        page: "1",
        take: "25", // Get more stores to ensure we have all available
      });

      const response = await apiClient.get(`/store/user?${params}`);

      // Convert stores to options format including mealTypes
      // Handle both direct array and paginated response
      const storesData = response.data.data || response.data;
      const storeOptions = storesData.map((store) => ({
        value: store.id,
        label: store.name,
        mealTypes: store.mealTypes || [], // Include meal types for each store
      }));
      setStores(storeOptions);
    } catch (error) {
      console.error("Failed to fetch stores:", error);
      showAlert("خطأ في تحميل البيانات", "حدث خطأ أثناء جلب المتاجر", "error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      setFormData((prev) => ({ ...prev, photo: file }));
    } else if (file) {
      alert("يرجى اختيار ملف صورة صحيح");
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Check if token exists (optional - apiClient will handle this)
      if (!token) {
        showAlert("خطأ في المصادقة", "يرجى تسجيل الدخول أولاً", "error");
        setLoading(false);
        return;
      }

      // Validate required fields
      if (!formData.name) {
        showAlert("خطأ في البيانات", "يرجى إدخال اسم الوجبة", "error");
        setLoading(false);
        return;
      }
      if (!formData.price) {
        showAlert("خطأ في البيانات", "يرجى إدخال سعر الوجبة", "error");
        setLoading(false);
        return;
      }
      if (!formData.category) {
        showAlert("خطأ في البيانات", "يرجى اختيار فئة الوجبة", "error");
        setLoading(false);
        return;
      }
      if (!formData.store) {
        showAlert("خطأ في البيانات", "يرجى اختيار المتجر", "error");
        setLoading(false);
        return;
      }

      const submitData = new FormData();

      // Add all form fields
      submitData.append("name", formData.name);
      submitData.append("description", formData.description || "");
      if (formData.calories) {
        submitData.append("calories", parseInt(formData.calories));
      }
      submitData.append("price", parseFloat(formData.price));
      if (formData.discountRate) {
        submitData.append("discountRate", parseFloat(formData.discountRate));
      }
      submitData.append("category", formData.category);
      submitData.append("isAllergenic", formData.isAllergenic);
      submitData.append("store", formData.store);

      if (formData.photo) {
        submitData.append("photo", formData.photo);
      }

      console.log("Submitting meal data:", {
        name: formData.name,
        description: formData.description,
        calories: formData.calories,
        price: formData.price,
        discountRate: formData.discountRate,
        category: formData.category,
        isAllergenic: formData.isAllergenic,
        store: formData.store,
        hasPhoto: !!formData.photo,
        token: token ? "Token exists" : "No token",
      });

      await apiClient.post("/meal", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showAlert("تمت الإضافة", "تمت إضافة الوجبة بنجاح", "success");

      // Reset form
      setFormData({
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
      setPhoto(null);
    } catch (error) {
      console.error("Failed to add meal:", error);
      const errorMessage =
        error.response?.data?.message || "حدث خطأ أثناء الإرسال";
      showAlert("خطأ في إضافة الوجبة", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

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
            إضافة وجبة جديدة
          </h2>

          <div className="relative bg-gray-300 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden mb-10">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="Meal"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-500 text-lg"> </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="photo"
            />
            <label
              htmlFor="photo"
              className="absolute bottom-5 left-5 px-5 py-2 border border-primary-1 rounded-md text-sm flex items-center cursor-pointer text-primary-1"
            >
              <TbCameraPlus className="text-primary-1 text-2xl mr-2" /> إضافة
              صورة الوجبة
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <MealCategoryStoreSelector
                categoryValue={formData.category}
                storeValue={formData.store}
                stores={stores}
                onCategoryChange={(value) =>
                  handleInputChange("category", value)
                }
                onStoreChange={(value) => handleInputChange("store", value)}
                className="w-full h-12 px-6 text-xl py-4"
              />

              <Inputs
                name="name"
                label="اسم الوجبة"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
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
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
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
                onChange={(e) =>
                  handleInputChange("discountRate", e.target.value)
                }
              />

              <Inputs
                name="price"
                label="سعر الوجبة"
                type="number"
                min="0"
                step="0.01"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                required
              />

              <Inputs
                name="calories"
                label="عدد السعرات الحرارية"
                type="number"
                min="0"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.calories}
                onChange={(e) => handleInputChange("calories", e.target.value)}
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
                onChange={(e) =>
                  handleInputChange("isAllergenic", e.target.checked)
                }
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
                  label="الغاء"
                  className="w-[600px] h-[55px] !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
                  type="button"
                  onClick={() => navigate("/list")}
                />
                <Button
                  type="submit"
                  label={loading ? "جاري الاضافه ...." : "إضافة وجبة"}
                  disabled={loading}
                  className="w-[600px] h-[55px] bg-primary-1 hover:bg-hover_primary-1 text-white rounded-md text-lg font-semibold"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
