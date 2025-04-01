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

const AddRecipe = () => {
  const [photo, setphoto] = useState(null);
  const [availableRecipeTypes, setAvailableRecipeTypes] = useState([]);

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

  const handlephoto = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setphoto(file);
    } else {
      console.error("الرجاء اختيار صورة صحيحة!");
    }
  };

  const [ingredients, setIngredients] = useState([
    { unit: "", quantity: "", name: "" },
  ]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { unit: "", quantity: "", name: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
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
              onChange={handlephoto}
              className="hidden"
              id="RecipeUpload"
            />
            <label
              htmlFor="RecipeUpload"
              className="absolute bottom-2 right-2 cursor-pointer p-2 bg-white rounded-full shadow-md"
            >
              <TbCameraPlus className="text-primary-1 text-2xl" />
            </label>
          </div>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <CheckboxSelectInput
                name="selectedRecipeTypes"
                label="نوع الطعام"
                options={availableRecipeTypes}
              />
              <Inputs
                name="description"
                label="وصف مختصر للوصفة"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <Inputs
                name="name"
                label="اسم الوصفة"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
              <div className="flex justify-end gap-x-8 col-span-full">
                <PreparationTimePicker
                  label="وقت الطبخ"
                  onHourChange={(value) => setHours(value)}
                  onMinuteChange={(value) => setMinutes(value)}
                  className="w-[30%]"
                />
                <PreparationTimePicker
                  label="وقت الإعداد"
                  onHourChange={(value) => setHours(value)}
                  onMinuteChange={(value) => setMinutes(value)}
                  className="w-[30%]"
                />
              </div>

              <div className="col-span-full w-full">
                <PreparationSteps className="w-full" />
              </div>
            </div>
            <div className="pt-8">
              {ingredients.map((ingredient, index) => (
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
                      handleChange(index, "unit", e.target.value)
                    }
                    options={[
                      { value: "Kilogram", label: "كيلوغرام" },
                      { value: "Gram", label: "غرام" },
                      { value: "Liter", label: "لتر" },
                      { value: "Milliliter", label: "ملليلتر" },
                      { value: "Cup", label: "كوب" },
                      { value: "Tablespoon", label: "ملعقة كبيرة" },
                      { value: "Teaspoon", label: "ملعقة صغيرة" },
                    ]}
                  />
                  <SelectInput
                    name={`ingredients[${index}].quantity`}
                    label="الكميه"
                    className="w-full px-6 text-xl py-4"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    options={Array.from({ length: 1024 }, (_, i) => ({
                      value: (i + 1).toString(),
                      label: (i + 1).toString(),
                    }))}
                  />
                  <Inputs
                    name={`ingredients[${index}].name`}
                    label="المقادير"
                    type="text"
                    className="w-full h-12 px-6 text-xl py-4"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
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
            <div className="grid grid-cols-1  md:grid-cols-3 gap-x-10 gap-y-10 text-right mb-4 pt-8">
              <SelectInput
                name="mainIngredient"
                label="المكونات الرئيسية"
                className="w-full px-6 text-xl py-4"
                options={[
                  { value: "meat", label: "لحم" },
                  { value: "chicken", label: "دجاج" },
                  { value: "fish", label: "أسماك" },
                  { value: "vegetable", label: "خضار" },
                  { value: "rice", label: "أرز" },
                  { value: "macaroni", label: "مكرونة" },
                ]}
              />

              <Inputs
                name="youtubeLink"
                label="رابط الفيديو الخاص بالوصفه"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
