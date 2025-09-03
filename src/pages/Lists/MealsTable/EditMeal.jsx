import { TbCameraPlus } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import apiClient from "../../../utils/ApiClient";
import Inputs from "../../../components/shared/inputs/Inputs";
import SelectInput from "../../../components/shared/inputs/SelectInput";
import TextAreaInput from "../../../components/shared/inputs/TextAreaInput ";
import Button from "../../../components/shared/Buttons/Button";
import Alert from "../../../components/shared/Alert/Alert";
import MealCategoryStoreSelector from "../../../components/shared/form/MealCategoryStoreSelector";
import allergy from "../../../assets/allergy.webp";
import Spinner from "../../../components/shared/Loading/Spinner";
import NoData from "../../../components/shared/NoData/NoData";

const EditMeal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  }, [id]);

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

      if (meal.photo && typeof meal.photo === "string") {
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
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const submitData = new FormData();

      // Add all form fields
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
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

      // Only append photo if it's a new file (not a string URL)
      if (formData.photo && typeof formData.photo !== "string") {
        submitData.append("photo", formData.photo);
      }

      await apiClient.patch(`/meal/${id}`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showAlert("تم التحديث", "تم تحديث الوجبة بنجاح", "success");
    } catch (error) {
      console.error("Failed to update meal:", error);
      const errorMessage =
        error.response?.data?.message || "حدث خطأ أثناء تحديث الوجبة";
      showAlert("خطأ في تحديث الوجبة", errorMessage, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Spinner className="min-h-screen" />;
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
            تعديل الوجبة
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
              <TbCameraPlus className="text-primary-1 text-2xl mr-2" /> تعديل
              صورة الوجبة
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            {/* الصف الأول: فئة الوجبة - اسم المتجر - اسم الوجبة */}
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
                        <NoData
                          message="لا توجد صورة"
                          description=""
                          icon="utensils"
                          size="small"
                        />
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
                  label={saving ? "جاري التحديث ...." : "تحديث الوجبة"}
                  disabled={saving}
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

export default EditMeal;
