import { useEffect, useState } from "react";
import axios from "axios";
import PageWrapper from "../../components/common/PageWrapper";
import { api_url } from "../../utils/ApiClient";
import { useNavigate, useParams } from "react-router";
import FollowChef from "../../components/shared/FollowChef/FollowChef";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleRequestChef = () => {
    navigate(`/chefneed/${chef.id}`);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${api_url}/recipe/${id}`)
        .then((res) => setRecipe(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!recipe)
    return <div className="p-8 text-center">جاري تحميل الوصفة...</div>;

  const {
    name,
    description,
    photo,
    preparationTime,
    cookingTime,
    totalTime,
    ingredients,
    preparationSteps,
    chef,
  } = recipe;

  return (
    <PageWrapper>
      <div className="bg-white">
        {/* First Section */}
        <div
          dir="rtl"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 items-start text-right"
        >
          {/* Right Column */}
          <div className="space-y-6 pt-10">
            <h2 className="text-3xl font-bold">{name}</h2>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={photo}
                alt={name}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Left Column - Chef Info */}
          <div className="flex flex-col gap-6">
            <p className="text-gray-700 leading-loose text-lg">{description}</p>

            <div className="bg-white border rounded-xl shadow-md p-5 space-y-6">
              {/* Chef Info */}
              <div className="flex items-center gap-4">
                <img
                  src={chef?.profilePicture}
                  alt="الشيف"
                  className="w-16 h-16 rounded-md object-cover border"
                />
                <div className="text-right">
                  <h4 className="text-md font-bold">{chef?.name}</h4>
                  <p className="text-gray-500 text-sm">{chef?.description}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-around text-center text-sm text-gray-600 border-b pb-4">
                <div className="px-2 border-l last:border-l-0">
                  <p className="font-bold text-lg text-[#D71313]">
                    {chef?.totalRecipes}
                  </p>
                  <p>عدد الوصفات</p>
                </div>
                <div className="px-2 border-l last:border-l-0">
                  <p className="font-bold text-lg text-[#D71313]">
                    {chef?.totalFollowers}+
                  </p>
                  <p>عدد المتابعين</p>
                </div>
                <div className="px-2">
                  <p className="font-bold text-lg text-[#D71313]">
                    {chef?.totalViews}
                  </p>
                  <p>عدد الزوار</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between gap-2 mt-2">
                <FollowChef />
                <button
                  className="w-1/2 bg-[#D71313] text-white rounded-md py-2 text-center hover:opacity-90 transition"
                  onClick={handleRequestChef}
                >
                  اريد شيف
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Stats and Tags */}
        <div className="bg-red-50 rounded-xl p-6 mt-6 ">
          <div className="flex flex-col items-end">
            <h2 className="text-xl font-bold text-right w-full pb-4">{name}</h2>
            <div className="flex flex-wrap gap-2 text-sm justify-end mt-1 ">
              <span className="badge badge-outline text-xs py-1 px-2 bg-[#FCFCFC] rounded-full border border-red-300">
                وقت الإعداد: {preparationTime} دقيقة
              </span>
              <span className="badge badge-outline text-xs py-1 px-2 bg-[#FCFCFC] rounded-full border border-red-300">
                وقت الطهي: {cookingTime} دقيقة
              </span>
              <span className="badge badge-outline text-xs py-1 px-2 bg-[#FCFCFC] rounded-full border border-red-300">
                الوقت الكلي: {totalTime} دقيقة
              </span>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mt-4 pt-4 bg-white rounded-xl pb-4">
            <h3 className="font-semibold text-right mb-2 text-lg mr-4">
              المكونات الرئيسية
            </h3>
            <div className="flex flex-wrap gap-2 justify-end mr-4">
              {ingredients.map((item, index) => (
                <span
                  key={index}
                  className="p-2 badge badge-outline text-sm border border-red-300 text-gray-600 bg-[#FCFCFC] rounded-full"
                >
                  {item.name} - {item.quantity} {item.unit}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Preparation Steps */}
        <div className="bg-red-50 rounded-xl p-6 mt-6">
          <div className="bg-white rounded-xl p-4">
            <h2 className="text-xl font-bold text-right mb-2 mt-2">
              خطوات التحضير خطوة بخطوة
            </h2>
            <p className="text-right text-gray-600 mb-4 mt-2">
              قسم مخصص لعرض طريقة عمل مقلوبة الدجاج بالباذنجان بطريقة منظمة
              وسهلة المتابعة. كل خطوة مرقمة مع وصف بسيط لما يجب فعله، مما
              يساعدكم على تطبيق الوصفة بدقة دون تعقيد.
            </p>

            <div
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4"
              style={{ gridAutoFlow: "dense", gridTemplateAreas: '"a a a"' }}
            >
              {preparationSteps.map((step, idx) => {
                const columnFromRight = (idx % 3) + 1;
                const gridColumnStart = 4 - columnFromRight;

                return (
                  <div
                    key={idx}
                    className="border rounded-xl overflow-hidden shadow-sm"
                    style={{ gridColumnStart }}
                  >
                    <div className="bg-primary-1 h-2 w-full" />
                    <div className="p-4 text-right">
                      <h4 className="font-bold text-lg mb-2">
                        الخطوة {idx + 1}
                      </h4>
                      <p className="text-sm text-gray-500">{step}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quantities and Ingredients Section */}
        <div className="bg-red-50 rounded-xl p-6 mt-6">
          <div className="bg-white rounded-xl p-4">
            <h2 className="text-xl font-bold text-right mb-2">
              الكمية و المقادير
            </h2>
            <p className="text-right text-gray-600 mb-4">
              استعرض كل المكونات المطلوبة لتحضير وصفة {name}. كل مكون مكتوب
              بوزنه المناسب ليسهل على المستخدمين تجهيز المقادير قبل البدء.
            </p>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              style={{ direction: "rtl" }}
            >
              {ingredients.map((item, idx) => (
                <div
                  key={idx}
                  className="border rounded-xl overflow-hidden shadow-sm"
                  style={{ direction: "ltr" }}
                >
                  <div className="bg-primary-1 h-2 w-full" />
                  <div className="p-4 text-right">
                    <h4 className="font-bold text-md mb-2">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RecipeDetails;
