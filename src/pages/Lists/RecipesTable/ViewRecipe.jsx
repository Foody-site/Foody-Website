import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import apiClient from "../../../utils/ApiClient";
import Button from "../../../components/shared/Buttons/Button";

const ViewRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/recipe/${id}`);

        setRecipe(response.data);
        console.log("Recipe data:", response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError("حدث خطأ أثناء جلب بيانات الوصفة");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex justify-center items-center">
          <div className="text-xl">جاري تحميل بيانات الوصفة...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex justify-center items-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex justify-center items-center">
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
            لم يتم العثور على بيانات لهذه الوصفة
          </div>
        </div>
      </div>
    );
  }

  const getTimeDisplay = (timeInMinutes) => {
    if (!timeInMinutes) return { hours: 0, minutes: 0 };

    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return { hours, minutes };
  };

  const preparationTime = getTimeDisplay(recipe.preparationTime);
  const cookingTime = getTimeDisplay(recipe.cookingTime);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[70rem] p-16 rounded-xl">
          <div className="flex justify-end items-center mb-10">
            <h2 className="text-3xl font-bold text-right text-gray-700">
              عرض بيانات الوصفة
            </h2>
          </div>

          <div className="relative bg-gray-300 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden mb-10">
            {recipe.photo ? (
              <img
                src={recipe.photo}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-500">لا توجد صورة للوصفة</div>
            )}
          </div>

          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 text-right">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  نوع الطعام
                </label>
                <div className="w-full min-h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                  {recipe.recipeTypes && recipe.recipeTypes.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-end">
                      {recipe.recipeTypes.map((type, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                        >
                          {type.name?.ar || type.name || "غير محدد"}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "غير محدد"
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  اسم الوصفة
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                  {recipe.name || "غير محدد"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-10 text-right">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  وصف مختصر للوصفة
                </label>
                <div className="w-full min-h-36 px-6 py-4 bg-gray-50 border border-gray-300 rounded-md">
                  {recipe.description || "غير محدد"}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-x-8 col-span-full">
              <div className="w-[27%]">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  وقت الطبخ
                </label>
                <div className="flex gap-2 w-full">
                  <div className="w-1/2 border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-center">
                    {cookingTime.minutes} دقيقة
                  </div>
                  <div className="w-1/2 border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-center">
                    {cookingTime.hours} ساعة
                  </div>
                </div>
              </div>

              <div className="w-[27%]">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  وقت الإعداد
                </label>
                <div className="flex gap-2 w-full">
                  <div className="w-1/2 border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-center">
                    {preparationTime.minutes} دقيقة
                  </div>
                  <div className="w-1/2 border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-center">
                    {preparationTime.hours} ساعة
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right mb-4">
              <div className="md:col-start-2 md:col-span-2 flex justify-end space-x-10">
                <div className="w-[50%]">
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    المكونات الرئيسية
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                    {recipe.mainIngredient === "meat"
                      ? "لحم"
                      : recipe.mainIngredient === "chicken"
                      ? "دجاج"
                      : recipe.mainIngredient === "fish"
                      ? "أسماك"
                      : recipe.mainIngredient === "vegetable"
                      ? "خضار"
                      : recipe.mainIngredient === "rice"
                      ? "أرز"
                      : recipe.mainIngredient === "macaroni"
                      ? "مكرونة"
                      : recipe.mainIngredient || "غير محدد"}
                  </div>
                </div>

                <div className="w-[50%]">
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    رابط الفيديو الخاص بالوصفة
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                    {recipe.youtubeLink ? (
                      <a
                        href={recipe.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {recipe.youtubeLink}
                      </a>
                    ) : (
                      "غير محدد"
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-gray-700 font-medium text-right mb-2">
                خطوات التحضير للوصفة
              </h3>
              <div className="bg-gray-100 rounded-lg p-4">
                {recipe.preparationSteps &&
                recipe.preparationSteps.length > 0 ? (
                  recipe.preparationSteps.map((step, index) => (
                    <div key={index} className="mb-2 w-full">
                      <div className="w-full h-auto min-h-24 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-right">
                        <span className="font-semibold">
                          الخطوة {index + 1}:{" "}
                        </span>
                        {step}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center p-4">
                    لا توجد خطوات تحضير مسجلة
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-gray-700 font-medium text-right mb-2">
                الكمية و المقادير
              </h3>
              <div className="bg-gray-100 rounded-lg p-4">
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                  recipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-5 text-right mb-4"
                    >
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1 text-right">
                          المقادير
                        </label>
                        <div className="w-full h-12 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md">
                          {ingredient.name || "غير محدد"}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1 text-right">
                          وحدة الكمية
                        </label>
                        <div className="w-full h-12 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md">
                          {ingredient.unit === "Teaspoon"
                            ? "ملعقة صغيرة"
                            : ingredient.unit === "Tablespoon"
                            ? "ملعقة كبيرة"
                            : ingredient.unit === "Cup"
                            ? "كوب"
                            : ingredient.unit === "Milliliter"
                            ? "ملليلتر"
                            : ingredient.unit === "Liter"
                            ? "لتر"
                            : ingredient.unit === "Gram"
                            ? "غرام"
                            : ingredient.unit === "Kilogram"
                            ? "كيلوغرام"
                            : ingredient.unit || "غير محدد"}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1 text-right">
                          الكمية
                        </label>
                        <div className="w-full h-12 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md">
                          {ingredient.quantity || "غير محدد"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center p-4">
                    لا توجد مكونات مسجلة
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-row-reverse items-center gap-x-2 pt-6">
              <label className="text-lg font-medium text-gray-700">
                هل الوصفة تحتوي على مسببات الحساسية؟
              </label>
              <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center bg-gray-50">
                {recipe.isAllergenic && (
                  <div className="w-3 h-3 bg-primary-1 rounded-sm"></div>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <div className="flex gap-4 w-full max-w-xs justify-center">
                <Button
                  label="العودة للقائمة"
                  className="w-[600px] h-[55px] !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
                  type="button"
                  onClick={() => navigate("/list")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;
