import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";
import Inputs from "../../components/shared/inputs/Inputs";
import CheckboxSelectInput from "../../components/shared/inputs/CheckboxSelectInput";
import { api_url } from "../../utils/ApiClient";
import axios from "axios";
import PreparationTimePicker from "../../components/shared/inputs/PreparationTimePicker";
import PreparationSteps from "../../components/shared/inputs/PreparationSteps";
import SelectInput from "../../components/shared/inputs/SelectInput";
import Button from "../../components/shared/Buttons/Button";
import allergy from "../../assets/allergy.jpg";

const AddRecipe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [availableRecipeTypes, setAvailableRecipeTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    selectedRecipeTypes: [], // Renamed for clarity
    mainIngredient: "",
  });

  // Fetch recipe types on component mount
  useEffect(() => {
    const fetchRecipeTypes = async () => {
      try {
        const response = await axios.get(`${api_url}/chef/recipe/types`);
        const formattedData = response.data.map((item) => ({
          value: item.id, // Make sure this is the MongoDB ID
          label: item.name.ar,
        }));
        setAvailableRecipeTypes(formattedData);
        console.log("Available recipe types:", formattedData); // Debug
      } catch (error) {
        console.error("Error fetching recipe types:", error);
      }
    };
    fetchRecipeTypes();
  }, []);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
    } else {
      console.error("الرجاء اختيار صورة صحيحة!");
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
      setFormData((prev) => ({
        ...prev,
        selectedRecipeTypes: prev.selectedRecipeTypes.includes(value)
          ? prev.selectedRecipeTypes.filter((id) => id !== value)
          : [...prev.selectedRecipeTypes, value], // إضافة أو إزالة القيم كمصفوفة
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  const handleAddStep = (step) => {
    // Limit to 20 steps as per validation
    if (formData.preparationSteps.length < 20) {
      setFormData((prev) => ({
        ...prev,
        preparationSteps: [...prev.preparationSteps, step],
      }));
    }
  };

  // Separate handlers for preparation and cooking time
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

    // Check required fields
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
    else if (formData.preparationSteps.length > 20)
      newErrors.preparationSteps = "يجب أن لا تتجاوز خطوات التحضير 20 خطوة";

    if (!formData.mainIngredient || formData.mainIngredient.trim() === "")
      newErrors.mainIngredient = "المكون الرئيسي مطلوب";

    // Check ingredients
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

    // Check if selectedRecipeTypes is a valid array of MongoDB IDs
    const validIds =
      Array.isArray(formData.selectedRecipeTypes) &&
      formData.selectedRecipeTypes.every(
        (id) => typeof id === "string" && id.length === 24
      );

    console.log("Are recipe types valid MongoDB IDs?", validIds);

    // Validate form first
    if (!validateForm()) {
      console.error("يرجى تصحيح الأخطاء قبل الإرسال");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("لا يوجد توكن، يرجى تسجيل الدخول.");
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

    // Limit preparationSteps to 20 items as per validation
    const limitedSteps = formData.preparationSteps.slice(0, 20);
    limitedSteps.forEach((step, index) =>
      data.append(`preparationSteps[${index}]`, step)
    );

    formData.ingredients.forEach((ingredient, index) => {
      data.append(`ingredients[${index}][name]`, ingredient.name);
      data.append(`ingredients[${index}][quantity]`, ingredient.quantity);
      data.append(`ingredients[${index}][unit]`, ingredient.unit);
    });

    if (
      formData.selectedRecipeTypes &&
      formData.selectedRecipeTypes.length > 0
    ) {
      formData.selectedRecipeTypes.forEach((typeId) => {
        data.append("recipeTypes[]", typeId);     
      });
    } else {
      data.append("recipeTypes", "[]");      
    }

    if (photo) {
      data.append("photo", photo);
    }

    try {
      const response = await axios.post(`${api_url}/recipe`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("تمت الإضافة بنجاح");
      setFormData({
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
      setPhoto(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "حدث خطأ أثناء الإرسال";
      alert(errorMessage);
      console.error("API Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[70rem] p-16 bg-gray-100 rounded-xl flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-700 mb-10 text-center">
            إضافة وصفة جديدة
          </h2>

          <div className="relative mb-8 w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gray-200 rounded-full border shadow-lg mt-4 mx-auto">
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="Recipe"
                className="w-full h-full object-cover rounded-full"
              />
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
              className="absolute bottom-2 right-2 cursor-pointer p-2 bg-white rounded-full shadow-md"
            >
              <TbCameraPlus className="text-primary-1 text-2xl" />
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <CheckboxSelectInput
                name="selectedRecipeTypes" // Make sure this matches your formData property name
                label="نوع الطعام"
                options={availableRecipeTypes}
                onChange={handleChange}
                error={errors.selectedRecipeTypes}
              />
              <Inputs
                name="description"
                label="وصف مختصر للوصفة"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                maxLength={300}
              />
              <Inputs
                name="name"
                label="اسم الوصفة"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                maxLength={200}
              />
            </div>

            <div className="flex justify-end gap-x-8 col-span-full pt-10">
              <PreparationTimePicker
                label="وقت الطبخ"
                onHourChange={handleCookTimeHourChange}
                onMinuteChange={handleCookTimeMinuteChange}
                className="w-[27%]"
                error={errors.cookingTime}
              />
              <PreparationTimePicker
                label="وقت الإعداد"
                onHourChange={handlePrepTimeHourChange}
                onMinuteChange={handlePrepTimeMinuteChange}
                className="w-[27%]"
                error={errors.preparationTime}
              />
            </div>

            <div className="col-span-full w-full pt-10">
              <PreparationSteps
                onChange={handleAddStep}
                className="w-full"
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

            <div className="pt-8">
              {formData.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right mb-4"
                >
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
                  <Inputs
                    name={`ingredients[${index}].name`}
                    label="المقادير"
                    type="text"
                    className="w-full h-12 px-6 text-xl py-4"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                    error={errors.ingredients?.[index]?.name}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddIngredient}
                className="flex items-center text-primary-1 mt-4"
              >
                <FaPlus className="text-2xl" />
                <span className="ml-2">أضف مكون جديد</span>
              </button>
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
                  />
                </div>
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
              <Button
                type="submit"
                label={loading ? "جاري الاضافه ...." : "إضافة وصفة"}
                disabled={loading}
                className="max-w-[350px] bg-primary-1 hover:bg-hover_primary-1 text-white py-2 rounded-md text-lg font-semibold"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
