import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaPlus, FaTrash } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";
import Inputs from "../../../components/shared/inputs/Inputs";
import CheckboxSelectInput from "../../../components/shared/inputs/CheckboxSelectInput";
import axios from "axios";
import PreparationTimePicker from "../../../components/shared/inputs/PreparationTimePicker";
import PreparationSteps from "../../../components/shared/inputs/PreparationSteps";
import SelectInput from "../../../components/shared/inputs/SelectInput";
import allergy from "../../../assets/allergy.webp";
import TextAreaInput from "../../../components/shared/inputs/TextAreaInput ";
import { api_url } from "../../../utils/ApiClient";
import Button from "../../../components/shared/Buttons/Button";
import Alert from "../../../components/shared/Alert/Alert";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [availableRecipeTypes, setAvailableRecipeTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // حالات التنبيه
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    youtubeLink: "",
    preparationTime: 0,
    cookingTime: 0,
    totalTime: 0,
    preparationSteps: [],
    ingredients: [{ name: "", quantity: "", unit: "" }],
    isAllergenic: false,
    selectedRecipeTypes: [],
    mainIngredient: "",
  });

  // معالج إغلاق التنبيه
  const handleAlertClose = () => {
    setAlertOpen(false);

    // إذا كان التنبيه من نوع "success" قم بإعادة توجيه المستخدم
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

  useEffect(() => {
    const fetchRecipe = async () => {
      setFetchLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${api_url}/recipe/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const recipeData = response.data;
        console.log("Recipe data:", recipeData);

        let selectedTypeIds = [];
        if (recipeData.recipeTypes && Array.isArray(recipeData.recipeTypes)) {
          selectedTypeIds = recipeData.recipeTypes.map(
            (type) => type.id || type._id || type.value
          );
        }
        console.log("Selected type IDs:", selectedTypeIds);

        setFormData({
          name: recipeData.name || "",
          description: recipeData.description || "",
          youtubeLink: recipeData.youtubeLink || "",
          preparationTime: recipeData.preparationTime || 0,
          cookingTime: recipeData.cookingTime || 0,
          totalTime: recipeData.totalTime || 0,
          preparationSteps: recipeData.preparationSteps || [],
          ingredients:
            recipeData.ingredients && recipeData.ingredients.length > 0
              ? recipeData.ingredients
              : [{ name: "", quantity: "", unit: "" }],
          isAllergenic: recipeData.isAllergenic || false,
          selectedRecipeTypes: selectedTypeIds,
          mainIngredient: recipeData.mainIngredient || "",
        });

        if (recipeData.photo) {
          setCurrentPhoto(recipeData.photo);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        showAlert(
          "خطأ في جلب البيانات",
          "حدث خطأ أثناء جلب بيانات الوصفة",
          "error"
        );
      } finally {
        setFetchLoading(false);
      }
    };

    const fetchRecipeTypes = async () => {
      try {
        const response = await axios.get(`${api_url}/chef/recipe/types`);
        const formattedData = response.data.map((item) => ({
          value: item.id || item._id,
          label: item.name.ar,
        }));
        setAvailableRecipeTypes(formattedData);
        console.log("Available recipe types:", formattedData);
      } catch (error) {
        console.error("Error fetching recipe types:", error);
        showAlert(
          "خطأ في جلب أنواع الطعام",
          "حدث خطأ أثناء جلب أنواع الوصفات",
          "error"
        );
      }
    };

    if (id) {
      fetchRecipe();
      fetchRecipeTypes();
    }
  }, [id]);

  const handleRemoveIngredient = (indexToRemove) => {
    if (formData.ingredients.length <= 1) {
      return;
    }
    const updatedIngredients = formData.ingredients.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
    } else if (file) {
      showAlert(
        "صورة غير صالحة",
        "الرجاء اختيار صورة صحيحة بصيغة مدعومة",
        "error"
      );
    }
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "selectedRecipeTypes") {
      const selectedTypeIds = Array.isArray(value) ? value : [value];

      setFormData((prev) => ({
        ...prev,
        selectedRecipeTypes: selectedTypeIds,
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];

    if (field === "quantity") {
      const numValue = parseInt(value, 10);

      updatedIngredients[index][field] = !isNaN(numValue) ? numValue : "";
    } else {
      updatedIngredients[index][field] = value;
    }

    setFormData((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  const handlePreparationStepsChange = (steps) => {
    if (JSON.stringify(steps) !== JSON.stringify(formData.preparationSteps)) {
      setFormData((prev) => ({
        ...prev,
        preparationSteps: steps,
      }));
    }
  };

  const handlePrepTimeHourChange = (value) => {
    const hours = parseInt(value) || 0;
    setFormData((prev) => {
      const newPrepTime = hours * 60 + (prev.preparationTime % 60);
      return {
        ...prev,
        preparationTime: newPrepTime,
        totalTime: newPrepTime + prev.cookingTime,
      };
    });
  };

  const handlePrepTimeMinuteChange = (value) => {
    const minutes = parseInt(value) || 0;
    setFormData((prev) => {
      const hours = Math.floor(prev.preparationTime / 60);
      const newPrepTime = hours * 60 + minutes;
      return {
        ...prev,
        preparationTime: newPrepTime,
        totalTime: newPrepTime + prev.cookingTime,
      };
    });
  };

  const handleCookTimeHourChange = (value) => {
    const hours = parseInt(value) || 0;
    setFormData((prev) => {
      const newCookTime = hours * 60 + (prev.cookingTime % 60);
      return {
        ...prev,
        cookingTime: newCookTime,
        totalTime: prev.preparationTime + newCookTime,
      };
    });
  };

  const handleCookTimeMinuteChange = (value) => {
    const minutes = parseInt(value) || 0;
    setFormData((prev) => {
      const hours = Math.floor(prev.cookingTime / 60);
      const newCookTime = hours * 60 + minutes;
      return {
        ...prev,
        cookingTime: newCookTime,
        totalTime: prev.preparationTime + newCookTime,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === "")
      newErrors.name = "اسم الوصفة مطلوب";
    else if (formData.name.length > 200)
      newErrors.name = "اسم الوصفة يجب أن لا يتجاوز 200 حرف";

    if (!formData.description || formData.description.trim() === "")
      newErrors.description = "وصف الوصفة مطلوب";
    else if (formData.description.length > 300)
      newErrors.description = "وصف الوصفة يجب أن لا يتجاوز 300 حرف";

    if (!formData.youtubeLink || formData.youtubeLink.trim() === "")
      newErrors.youtubeLink = "رابط الفيديو مطلوب";

    if (!formData.preparationTime || formData.preparationTime <= 0)
      newErrors.preparationTime = "وقت الإعداد مطلوب";

    if (!formData.cookingTime || formData.cookingTime <= 0)
      newErrors.cookingTime = "وقت الطبخ مطلوب";

    if (formData.preparationSteps.length === 0)
      newErrors.preparationSteps = "خطوات التحضير مطلوبة";

    if (!formData.mainIngredient || formData.mainIngredient.trim() === "")
      newErrors.mainIngredient = "المكون الرئيسي مطلوب";

    const ingredientErrors = [];
    formData.ingredients.forEach((ingredient, index) => {
      const itemErrors = {};
      if (!ingredient.name || ingredient.name.trim() === "")
        itemErrors.name = "اسم المكون مطلوب";
      if (!ingredient.quantity) itemErrors.quantity = "كمية المكون مطلوبة";
      if (!ingredient.unit) itemErrors.unit = "وحدة القياس مطلوبة";

      if (Object.keys(itemErrors).length > 0)
        ingredientErrors[index] = itemErrors;
    });

    if (ingredientErrors.length > 0) newErrors.ingredients = ingredientErrors;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submission:", formData);

    if (!validateForm()) {
      showAlert(
        "يرجى تصحيح الأخطاء",
        "يرجى التأكد من تعبئة جميع الحقول المطلوبة",
        "error"
      );
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      showAlert("خطأ في المصادقة", "لا يوجد توكن، يرجى تسجيل الدخول", "error");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("youtubeLink", formData.youtubeLink);
    data.append("preparationTime", formData.preparationTime);
    data.append("cookingTime", formData.cookingTime);
    data.append("totalTime", formData.totalTime);
    data.append("isAllergenic", formData.isAllergenic);
    data.append("mainIngredient", formData.mainIngredient);

    if (
      formData.selectedRecipeTypes &&
      formData.selectedRecipeTypes.length > 0
    ) {
      formData.selectedRecipeTypes.forEach((typeId) => {
        if (typeId) {
          data.append("recipeTypes[]", typeId);
        }
      });
    } else {
      data.append("recipeTypes[]", "");
    }

    const limitedSteps = formData.preparationSteps.slice(0, 20);
    limitedSteps.forEach((step, index) =>
      data.append(`preparationSteps[${index}]`, step)
    );

    formData.ingredients.forEach((ingredient, index) => {
      data.append(`ingredients[${index}][name]`, ingredient.name);

      data.append(
        `ingredients[${index}][quantity]`,
        parseInt(ingredient.quantity, 10)
      );
      data.append(`ingredients[${index}][unit]`, ingredient.unit);
    });

    if (photo) {
      data.append("photo", photo);
    }

    try {
      const response = await axios.patch(`${api_url}/recipe/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showAlert("تم تعديل الوصفة", "تم تعديل الوصفة بنجاح", "success");

      // التنقل سيتم في handleAlertClose عندما يكون نوع التنبيه هو success
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "حدث خطأ أثناء تعديل الوصفة";
      showAlert("خطأ في تعديل الوصفة", errorMessage, "error");
      console.error("API Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex justify-center items-center">
          <div className="text-xl">جاري تحميل بيانات الوصفة...</div>
        </div>
      </div>
    );
  }

  const getPrepTimeHours = () => Math.floor(formData.preparationTime / 60);
  const getPrepTimeMinutes = () => formData.preparationTime % 60;
  const getCookTimeHours = () => Math.floor(formData.cookingTime / 60);
  const getCookTimeMinutes = () => formData.cookingTime % 60;

  return (
    <div className="flex flex-col min-h-screen ">
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
        <div className="w-full max-w-[70rem] p-16 rounded-xl">
          <h2 className="text-3xl font-bold text-gray-700 mb-10 text-right">
            تعديل الوصفة
          </h2>

          <div className="relative bg-gray-300 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden mb-10">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="Recipe"
                className="w-full h-full object-cover"
              />
            ) : currentPhoto ? (
              <img
                src={currentPhoto}
                alt="Current Recipe"
                className="w-full h-full object-cover"
              />
            ) : null}
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
              <TbCameraPlus className="text-primary-1 text-2xl mr-2" /> تغيير
              صورة الوصفة
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 text-right">
              <CheckboxSelectInput
                name="selectedRecipeTypes"
                label="نوع الطعام"
                options={availableRecipeTypes}
                onChange={handleChange}
                value={formData.selectedRecipeTypes}
                required={true}
              />

              <Inputs
                name="name"
                label="اسم الوصفة"
                placeholder="قم بادخال اسم الوصفة هنا"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                maxLength={200}
                required={true}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-10 text-right pt-10">
              <TextAreaInput
                name="description"
                label="وصف مختصر للوصفة"
                placeholder="قم بادخال وصف مختصر عن الوصفة هنا"
                type="text"
                className="w-full h-36 px-6 text-xl py-4 placeholder:text-sm"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                maxLength={300}
                required={true}
              />
            </div>

            <div className="flex justify-end gap-x-8 col-span-full pt-10">
              <PreparationTimePicker
                label="وقت الطبخ"
                onHourChange={handleCookTimeHourChange}
                onMinuteChange={handleCookTimeMinuteChange}
                className="w-[27%]"
                error={errors.cookingTime}
                hourValue={getCookTimeHours()}
                minuteValue={getCookTimeMinutes()}
                required={true}
              />
              <PreparationTimePicker
                label="وقت الإعداد"
                onHourChange={handlePrepTimeHourChange}
                onMinuteChange={handlePrepTimeMinuteChange}
                className="w-[27%]"
                error={errors.preparationTime}
                hourValue={getPrepTimeHours()}
                minuteValue={getPrepTimeMinutes()}
                required={true}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right mb-4 pt-8">
              <div className="md:col-start-2 md:col-span-2 flex justify-end space-x-10">
                <div className="w-[50%]">
                  <SelectInput
                    name="mainIngredient"
                    label="المكونات الرئيسية"
                    className="w-full px-6 text-xl py-4"
                    onChange={handleChange}
                    value={formData.mainIngredient}
                    options={[
                      { value: "meat", label: "لحم" },
                      { value: "chicken", label: "دجاج" },
                      { value: "fish", label: "أسماك" },
                      { value: "vegetable", label: "خضار" },
                      { value: "rice", label: "أرز" },
                      { value: "macaroni", label: "مكرونة" },
                    ]}
                    error={errors.mainIngredient}
                    required={true}
                  />
                </div>
                <div className="w-[50%]">
                  <Inputs
                    name="youtubeLink"
                    label="رابط الفيديو الخاص بالوصفه"
                    type="text"
                    className="w-full h-12 px-6 text-xl py-4"
                    value={formData.youtubeLink}
                    onChange={handleChange}
                    error={errors.youtubeLink}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <label className="flex items-center justify-end text-gray-700 font-medium mb-2 text-right pt-10">
              <div className="flex items-center">
                <span className="text-red-600 mr-1 text-lg">*</span>
                خطوات التحضير للوصفة
              </div>
            </label>
            <div className="col-span-full w-full pt-10 bg-gray-100 rounded-lg ">
              <PreparationSteps
                onChange={handlePreparationStepsChange}
                className="w-full bg-gray-100 rounded-lg p-4"
                maxSteps={20}
                error={errors.preparationSteps}
                currentSteps={formData.preparationSteps}
              />
              {errors.preparationSteps && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.preparationSteps}
                </p>
              )}
            </div>
            <label className="flex items-center justify-end text-gray-700 font-medium mb-2 text-right pt-10">
              <div className="flex items-center">
                <span className="text-red-600 mr-1 text-lg">*</span>
                الكمية و المقادير
              </div>
            </label>
            <div className="pt-8 bg-gray-100 rounded-lg p-4 px-16 mx-[-40px]">
              {formData.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right mb-4 relative"
                >
                  <Inputs
                    name={`ingredients[${index}].name`}
                    placeholder="قم بادخال المقادير هنا"
                    label="المقادير"
                    type="text"
                    className="w-full h-12 px-6 text-xl py-4"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                    error={errors.ingredients?.[index]?.name}
                  />
                  <SelectInput
                    name={`ingredients[${index}].unit`}
                    label="وحده الكميه"
                    className="w-full px-6 text-xl py-4"
                    value={ingredient.unit}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                    options={[
                      { value: "Teaspoon", label: "ملعقة صغيرة" },
                      { value: "Tablespoon", label: "ملعقة كبيرة" },
                      { value: "Cup", label: "كوب" },
                      { value: "Milliliter", label: "ملليلتر" },
                      { value: "Liter", label: "لتر" },
                      { value: "Gram", label: "غرام" },
                      { value: "Kilogram", label: "كيلوغرام" },
                    ]}
                    error={errors.ingredients?.[index]?.unit}
                  />
                  <SelectInput
                    name={`ingredients[${index}].quantity`}
                    label="الكميه"
                    className="w-full px-6 text-xl py-4"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleIngredientChange(index, "quantity", e.target.value)
                    }
                    options={Array.from({ length: 1024 }, (_, i) => ({
                      value: (i + 1).toString(),
                      label: (i + 1).toString(),
                    }))}
                    error={errors.ingredients?.[index]?.quantity}
                  />

                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="absolute left-[-40px] top-[30px] text-primary-1 p-2 hover:text-red-600 transition-colors"
                      aria-label="حذف المكون"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  )}
                </div>
              ))}
              <div className="w-full flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="flex flex-row-reverse items-center text-primary-1"
                >
                  <FaPlus className="text-2xl" />
                  <span className="ml-2">أضف مكون جديد</span>
                </button>
              </div>
            </div>

            <div className="flex flex-row-reverse items-center gap-x-2 pt-6 mt-7">
              <label
                htmlFor="isAllergenic"
                className="text-lg font-medium text-gray-700"
              >
                هل الوصفة تحتوي على مسببات الحساسية ؟
              </label>
              <input
                type="checkbox"
                id="isAllergenic"
                name="isAllergenic"
                checked={formData.isAllergenic}
                onChange={handleChange}
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
                لمعرفة المزيد عن مسببات الحساسية يرجى الضغط على الرابط التالي{" "}
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
                    <img
                      src={allergy}
                      alt="مسببات الحساسية"
                      className="w-[80%] h-auto mx-auto rounded-md"
                    />
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
                  label="إلغاء"
                  className="w-[600px] h-[55px] !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
                  type="button"
                  onClick={() => navigate("/list")}
                />
                <Button
                  type="submit"
                  label={loading ? "جاري التعديل..." : "حفظ التعديلات"}
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

export default EditRecipe;
