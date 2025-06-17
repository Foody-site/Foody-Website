import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Button from "./../../../components/shared/Buttons/Button";
import { FaSnapchatGhost, FaYoutube, FaTiktok } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { api_url } from "../../../utils/ApiClient";
import axios from "axios";

// Helper function to format phone number (remove +20 prefix if exists)
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "غير محدد";

  // If the phone number starts with +20, remove it
  if (phoneNumber.startsWith("+20")) {
    return phoneNumber.substring(3); // Remove first 3 characters (+20)
  }

  return phoneNumber; // Return as is if not starting with +20
};

const ViewChef = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chef, setChef] = useState(null);
  const [error, setError] = useState("");

  // Fetch chef data on component mount
  useEffect(() => {
    const fetchChefData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${api_url}/chef/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setChef(response.data);
        console.log("Chef data:", response.data);
      } catch (error) {
        console.error("Error fetching chef details:", error);
        setError("حدث خطأ أثناء جلب بيانات الشيف");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchChefData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex justify-center items-center">
          <div className="text-xl">جاري تحميل بيانات الشيف...</div>
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

  if (!chef) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex justify-center items-center">
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
            لم يتم العثور على بيانات لهذا الشيف
          </div>
        </div>
      </div>
    );
  }

  // Get the preferred contact methods
  const favoriteConnection = chef.favoriteConnection || [];
  const noContact = favoriteConnection.length === 0;

  // Helper function to format phone number (remove +20 prefix if exists)
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "غير محدد";

    // If the phone number starts with +20, remove it
    if (phoneNumber.startsWith("+2")) {
      return phoneNumber.substring(2); // Remove first 3 characters (+20)
    }

    return phoneNumber; // Return as is if not starting with +20
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[70rem] p-16 rounded-xl ">
          <div className="flex justify-end items-center mb-10">
            <h2 className="text-3xl font-bold text-right text-gray-700">
              عرض بيانات الشيف
            </h2>
          </div>

          <div className="mb-10 relative">
            <div className="relative bg-gray-300 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden">
              {chef.coverPicture ? (
                <img
                  src={chef.coverPicture}
                  alt="صورة الغلاف"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500">لا توجد صورة غلاف</div>
              )}
            </div>

            <div className="absolute -bottom-8 right-5 w-40 h-40 bg-gray-100 rounded-full border flex justify-center items-center shadow-lg overflow-hidden">
              {chef.profilePicture ? (
                <img
                  src={chef.profilePicture}
                  alt="الصورة الشخصية"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500 text-sm text-center">
                  لا توجد صورة شخصية
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 space-y-14 mx-auto max-w-full">
            {/* البيانات الأساسية */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              {/* أنواع وصفات الطبخ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  أنواع وصفات الطبخ
                </label>
                <div className="w-full min-h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md text-xl">
                  {chef.recipeTypes && chef.recipeTypes.length > 0 ? (
                    <div className="flex flex-wrap gap-2 justify-end">
                      {chef.recipeTypes.map((type, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                        >
                          {type.name?.ar || type.name || type}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "غير محدد"
                  )}
                </div>
              </div>

              {/* رقم التواصل الخاص */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  رقم التواصل الخاص
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md text-xl">
                  {formatPhoneNumber(chef.phone) || "غير محدد"}
                </div>
              </div>

              {/* اسم الشيف */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  اسم الشيف
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md text-xl">
                  {chef.name || "غير محدد"}
                </div>
              </div>
            </div>

            {/* الوصف */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-10 text-right">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  وصف مختصر
                </label>
                <div className="w-full h-36 px-6 py-4 bg-gray-50 border border-gray-300 rounded-md text-xl overflow-auto">
                  {chef.description || "غير محدد"}
                </div>
              </div>
            </div>

            {/* المعلومات الإضافية */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              {/* رابط فيسبوك */}
              {chef.socialMedia?.facebook && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    رابط فيسبوك
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                    <div className="flex justify-between items-center w-full">
                      <a
                        href={chef.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate text-left pl-4"
                      >
                        {chef.socialMedia.facebook}
                      </a>
                      <TiSocialFacebook className="text-gray-700 text-xl mr-2" />
                    </div>
                  </div>
                </div>
              )}

              {/* المدينة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  المدينة
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                  {chef.city || "غير محدد"}
                </div>
              </div>

              {/* الدولة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  الدولة
                </label>
                <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md">
                  {chef.country || "غير محدد"}
                </div>
              </div>

              {/* رقم واتساب */}
              {chef.socialMedia?.WhatsApp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    رقم واتساب
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-left pl-4">
                        {formatPhoneNumber(chef.socialMedia.WhatsApp)}
                      </span>
                      <IoLogoWhatsapp className="text-gray-700 text-xl mr-2" />
                    </div>
                  </div>
                </div>
              )}

              {/* رابط يوتيوب */}
              {chef.socialMedia?.youtube && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    رابط يوتيوب
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                    <div className="flex justify-between items-center w-full">
                      <a
                        href={chef.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate text-left pl-4"
                      >
                        {chef.socialMedia.youtube}
                      </a>
                      <FaYoutube className="text-gray-700 text-xl mr-2" />
                    </div>
                  </div>
                </div>
              )}

              {/* رابط سناب شات */}
              {chef.socialMedia?.snapchat && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    رابط سناب شات
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                    <div className="flex justify-between items-center w-full">
                      <a
                        href={chef.socialMedia.snapchat}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate text-left pl-4"
                      >
                        {chef.socialMedia.snapchat}
                      </a>
                      <FaSnapchatGhost className="text-gray-700 text-xl mr-2" />
                    </div>
                  </div>
                </div>
              )}

              {/* رابط اكس */}
              {chef.socialMedia?.x && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    رابط اكس
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                    <div className="flex justify-between items-center w-full">
                      <a
                        href={chef.socialMedia.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate text-left pl-4"
                      >
                        {chef.socialMedia.x}
                      </a>
                      <RiTwitterXFill className="text-gray-700 text-xl mr-2" />
                    </div>
                  </div>
                </div>
              )}

              {/* رابط انستغرام */}
              {chef.socialMedia?.instagram && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    رابط انستغرام
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                    <div className="flex justify-between items-center w-full">
                      <a
                        href={chef.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate text-left pl-4"
                      >
                        {chef.socialMedia.instagram}
                      </a>
                      <GrInstagram className="text-gray-700 text-xl mr-2" />
                    </div>
                  </div>
                </div>
              )}

              {/* رابط تيك توك */}
              {chef.socialMedia?.tiktok && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    رابط تيك توك
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                    <div className="flex justify-between items-center w-full">
                      <a
                        href={chef.socialMedia.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate text-left pl-4"
                      >
                        {chef.socialMedia.tiktok}
                      </a>
                      <FaTiktok className="text-gray-700 text-xl mr-2" />
                    </div>
                  </div>
                </div>
              )}
              {/* رقم واتس */}
              {chef.socialMedia?.whatsapp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    رقم واتس
                  </label>
                  <div className="w-full h-12 px-6 py-3 bg-gray-50 border border-gray-300 rounded-md flex items-center">
                    <div className="flex justify-between items-center w-full">
                      <a
                        href={chef.socialMedia.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate text-left pl-4"
                      >
                        {formatPhoneNumber(chef.socialMedia.whatsapp)}
                      </a>
                      <IoLogoWhatsapp className="text-gray-700 text-xl mr-2" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* وسيلة التواصل المفضلة */}
            <div className="w-full">
              <p className="text-right font-bold text-lg text-gray-700 mb-4">
                الوسيلة المفضلة لتواصل العملاء:
              </p>
              <div className="bg-gray-50 border border-gray-300 rounded-md p-4 text-right">
                {noContact ? (
                  <div className="text-gray-700">لا يرغب الشيف بالتواصل</div>
                ) : (
                  <div className="flex flex-wrap gap-3 justify-end">
                    {favoriteConnection.map((method) => (
                      <div
                        key={method}
                        className="bg-primary-1 text-white px-3 py-1 rounded-md"
                      >
                        {method === "Email"
                          ? "البريد الإلكتروني"
                          : method === "WhatsApp"
                          ? "رقم الواتساب"
                          : method === "Phone"
                          ? "رقم الجوال"
                          : method}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* زر العودة */}
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

export default ViewChef;
