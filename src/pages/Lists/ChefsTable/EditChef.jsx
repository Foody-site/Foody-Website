import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Button from "../../../components/shared/Buttons/Button";
import Inputs from "../../../components/shared/inputs/Inputs";
import { FaSnapchatGhost, FaYoutube, FaTiktok } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";
import { RiTwitterXFill } from "react-icons/ri";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import SelectInput from "../../../components/shared/inputs/SelectInput";
import { api_url } from "../../../utils/ApiClient";
import axios from "axios";
import CheckboxSelectInput from "../../../components/shared/inputs/CheckboxSelectInput";
import countriesData from "../../../assets/countries.json";
import TextAreaInput from "../../../components/shared/inputs/TextAreaInput ";
import Checkbox from "../../../components/shared/inputs/Checkbox";
import Alert from './../../../components/shared/Alert/Alert';

// دالة لإزالة بادئة +966 من رقم الهاتف للعرض
const formatPhoneForDisplay = (phoneNumber) => {
  if (!phoneNumber) return "";

  // إذا كان الرقم يبدأ بـ +966، قم بإزالته
  if (phoneNumber.startsWith("+966")) {
    return phoneNumber.substring(4); // إزالة أول 4 أحرف (+966)
  }

  return phoneNumber; // إرجاع الرقم كما هو إذا لم يكن يبدأ بـ +966
};

// دالة لإضافة بادئة +966 للرقم عند الإرسال
const formatPhoneForSubmit = (phoneNumber) => {
  if (!phoneNumber) return "";

  // تنظيف الرقم من أي مسافات
  const trimmedPhone = phoneNumber.trim();

  // إذا كان الرقم لا يبدأ بـ +966، قم بإضافته
  if (!trimmedPhone.startsWith("+966")) {
    return `+966${trimmedPhone}`;
  }
  return trimmedPhone;
};

const EditChef = () => {
  const { id } = useParams();
  const [noContact, setNoContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [availableRecipeTypes, setAvailableRecipeTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  // Alert states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");

  // Form images
  const [coverPicture, setCoverPicture] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentCoverPicture, setCurrentCoverPicture] = useState(null);
  const [currentProfilePicture, setCurrentProfilePicture] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    selectedRecipeTypes: [],
    description: "",
    name: "",
    city: "",
    country: "",
    phone: "",
    socialMedia: {
      whatsapp: "",
      facebook: "",
      x: "",
      tiktok: "",
      youtube: "",
      snapchat: "",
      instagram: "",
    },
    favoriteConnection: [],
  });

  // معالج إغلاق التنبيه
  const handleAlertClose = () => {
    setAlertOpen(false);

    // إذا كان التنبيه للنجاح، نقوم بالانتقال إلى صفحة القائمة
    if (alertType === "success") {
      navigate("/list");
    }
  };

  useEffect(() => {
    const fetchChefData = async () => {
      setFetchLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${api_url}/chef/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const chefData = response.data;
        console.log("Chef data:", chefData);

        // تحضير قائمة أنواع الوصفات المختارة
        let selectedRecipeTypeIds = [];
        if (chefData.recipeTypes && Array.isArray(chefData.recipeTypes)) {
          selectedRecipeTypeIds = chefData.recipeTypes.map(
            (type) => type.id || type._id
          );
        }

        // تحديد ما إذا كان الشيف يريد التواصل أم لا
        const favoriteConnection = chefData.favoriteConnection || [];
        setNoContact(favoriteConnection.length === 0);

        // تعيين بيانات النموذج من البيانات المجلوبة
        setFormData({
          selectedRecipeTypes: selectedRecipeTypeIds,
          description: chefData.description || "",
          name: chefData.name || "",
          city: chefData.city || "",
          country: chefData.country || "",
          // تنسيق رقم الهاتف للعرض (إزالة +966 إذا وُجدت)
          phone: formatPhoneForDisplay(chefData.phone) || "",
          socialMedia: {
            // تنسيق رقم الواتساب للعرض (إزالة +966 إذا وُجدت)
            whatsapp:
              formatPhoneForDisplay(chefData.socialMedia?.whatsapp) || "",
            facebook: chefData.socialMedia?.facebook || "",
            x: chefData.socialMedia?.x || "",
            tiktok: chefData.socialMedia?.tiktok || "",
            youtube: chefData.socialMedia?.youtube || "",
            snapchat: chefData.socialMedia?.snapchat || "",
            instagram: chefData.socialMedia?.instagram || "",
          },
          favoriteConnection: favoriteConnection,
        });

        // تعيين صور الملف الشخصي والغلاف الحالية
        if (chefData.coverPicture) {
          setCurrentCoverPicture(chefData.coverPicture);
        }
        if (chefData.profilePicture) {
          setCurrentProfilePicture(chefData.profilePicture);
        }

        // تحديث قائمة المدن بناءً على البلد المختار
        if (chefData.country) {
          updateCities(chefData.country);
        }
      } catch (error) {
        console.error("Error fetching chef details:", error);
        // استخدام مكون Alert بدلاً من alert
        setAlertMessage("خطأ في جلب البيانات");
        setAlertSubMessage("حدث خطأ أثناء جلب بيانات الشيف");
        setAlertType("error");
        setAlertOpen(true);
      } finally {
        setFetchLoading(false);
      }
    };

    const fetchRecipeTypes = async () => {
      try {
        const response = await axios.get(`${api_url}/chef/recipe/types`);
        const formattedData = response.data.map((item) => ({
          value: item.id,
          label: item.name.ar,
        }));
        setAvailableRecipeTypes(formattedData);
        console.log("Available recipe types:", formattedData); // Debug
      } catch (error) {
        console.error("Error fetching recipe types:", error);
      }
    };

    if (id) {
      fetchChefData();
      fetchRecipeTypes();
    }
  }, [id]);

  // تحديث قائمة المدن استنادًا إلى البلد المختار
  const updateCities = (countryName) => {
    if (countryName) {
      const selectedCountry = countriesData.find(
        (c) => c.name.trim().toLowerCase() === countryName.trim().toLowerCase()
      );

      setCities(
        selectedCountry && selectedCountry.states
          ? selectedCountry.states.map((state) => ({
              value: state.name,
              label: state.name,
            }))
          : []
      );
    }
  };

  // تحديث المدن عند تغيير البلد
  useEffect(() => {
    updateCities(formData.country);
  }, [formData.country]);

  const handleNoContactChange = () => {
    const newNoContactValue = !noContact;
    setNoContact(newNoContactValue);

    if (newNoContactValue) {
      setFormData((prevState) => ({
        ...prevState,
        favoriteConnection: [],
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prevState) => {
      let updatedFavoriteConnection = [...prevState.favoriteConnection];

      if (checked) {
        if (!updatedFavoriteConnection.includes(name)) {
          updatedFavoriteConnection.push(name);
        }
      } else {
        updatedFavoriteConnection = updatedFavoriteConnection.filter(
          (item) => item !== name
        );
      }

      return {
        ...prevState,
        favoriteConnection: updatedFavoriteConnection,
      };
    });
  };

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCoverPicture(file);
    } else {
      // استخدام مكون Alert بدلاً من console.error
      setAlertMessage("خطأ في تحميل الصورة");
      setAlertSubMessage("الرجاء اختيار صورة صحيحة للغلاف!");
      setAlertType("error");
      setAlertOpen(true);
    }
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePicture(file);
    } else {
      // استخدام مكون Alert بدلاً من console.error
      setAlertMessage("خطأ في تحميل الصورة");
      setAlertSubMessage("الرجاء اختيار صورة صحيحة للملف الشخصي!");
      setAlertType("error");
      setAlertOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "selectedRecipeTypes") {
      const selectedTypeIds = Array.isArray(value) ? value : [value];

      setFormData((prev) => ({
        ...prev,
        selectedRecipeTypes: selectedTypeIds,
      }));
    } else if (name.startsWith("socialMedia.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      // استخدام مكون Alert بدلاً من console.error
      setAlertMessage("خطأ في المصادقة");
      setAlertSubMessage("لا يوجد توكن، يرجى تسجيل الدخول.");
      setAlertType("error");
      setAlertOpen(true);
      setLoading(false);
      return;
    }

    try {
      console.log("Current cover picture URL:", currentCoverPicture);
      console.log("New cover picture selected:", coverPicture ? "Yes" : "No");
      console.log("Current profile picture URL:", currentProfilePicture);
      console.log(
        "New profile picture selected:",
        profilePicture ? "Yes" : "No"
      );

      const formDataToSend = new FormData();

      // إضافة البيانات الأساسية
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("city", formData.city);

      // إضافة رقم الهاتف مع بادئة +966 إذا لم تكن موجودة
      formDataToSend.append("phone", formatPhoneForSubmit(formData.phone));

      // إضافة أنواع الوصفات المختارة
      if (
        formData.selectedRecipeTypes &&
        formData.selectedRecipeTypes.length > 0
      ) {
        formData.selectedRecipeTypes.forEach((typeId) => {
          if (typeId && typeId.toString().trim() !== "") {
            formDataToSend.append("recipeTypes[]", typeId);
          }
        });
      } else {
        formDataToSend.append("recipeTypes", "[]");
      }

      // إضافة بيانات وسائل التواصل الاجتماعي
      Object.keys(formData.socialMedia).forEach((platform) => {
        if (formData.socialMedia[platform]) {
          // إضافة بادئة +966 لرقم الواتساب إذا لم تكن موجودة
          if (platform === "whatsapp") {
            formDataToSend.append(
              `socialMedia[${platform}]`,
              formatPhoneForSubmit(formData.socialMedia[platform])
            );
          } else {
            formDataToSend.append(
              `socialMedia[${platform}]`,
              formData.socialMedia[platform]
            );
          }
        }
      });

      // إضافة وسائل التواصل المفضلة
      formData.favoriteConnection.forEach((connection) => {
        formDataToSend.append("favoriteConnection[]", connection);
      });

      // إضافة الصور إذا تم تحديثها
      if (coverPicture) {
        console.log("Sending new cover picture in request");
        formDataToSend.append("coverPicture", coverPicture);
      } else {
        console.log(
          "NOT sending cover picture in request (keeping existing one)"
        );
      }

      if (profilePicture) {
        console.log("Sending new profile picture in request");
        formDataToSend.append("profilePicture", profilePicture);
      } else {
        console.log(
          "NOT sending profile picture in request (keeping existing one)"
        );
      }

      // إرسال البيانات إلى الخادم
      const response = await axios.patch(
        `${api_url}/chef/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("استجابة الخادم:", response.data);
      // استخدام مكون Alert بدلاً من alert
      setAlertMessage("تم تعديل البيانات");
      setAlertSubMessage("تم تعديل بيانات الشيف بنجاح!");
      setAlertType("success");
      setAlertOpen(true);
    } catch (error) {
      console.error("Error updating chef:", error);

      let errorMessage = "حدث خطأ أثناء تعديل البيانات، يرجى المحاولة مرة أخرى";

      if (error.response?.data?.message) {
        if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message.join(", ");
        } else {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      // استخدام مكون Alert بدلاً من alert
      setAlertMessage("خطأ في تعديل البيانات");
      setAlertSubMessage(errorMessage);
      setAlertType("error");
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex justify-center items-center">
          <div className="text-xl">جاري تحميل بيانات الشيف...</div>
        </div>
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
      />

      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[70rem] p-16 rounded-xl ">
          <h2 className="text-3xl font-bold text-right text-gray-700 mb-10">
            تعديل بيانات الشيف{" "}
          </h2>

          <div className="mb-10 relative">
            <div className="relative bg-gray-300 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden">
              {coverPicture ? (
                <img
                  src={URL.createObjectURL(coverPicture)}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : currentCoverPicture ? (
                <img
                  src={currentCoverPicture}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : null}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
                id="coverUpload"
              />
              <label
                htmlFor="coverUpload"
                className="absolute bottom-5 left-5 px-5 py-2 border border-primary-1 rounded-md text-sm flex items-center cursor-pointer text-primary-1"
              >
                <TbCameraPlus className="text-primary-1 text-2xl mr-2" />
                {currentCoverPicture
                  ? "تغيير صورة الغلاف"
                  : "إضافة صورة الغلاف"}
              </label>
            </div>

            <div className="absolute -bottom-8 right-5 w-40 h-40 bg-gray-100 rounded-full border flex justify-center items-center shadow-lg">
              {profilePicture ? (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : currentProfilePicture ? (
                <img
                  src={currentProfilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : null}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                className="hidden"
                id="profileUpload"
              />
              <label
                htmlFor="profileUpload"
                className="absolute bottom-2 right-2 cursor-pointer p-2 rounded-full shadow-md bg-primary-1"
              >
                <TbCameraPlus className="text-white text-2xl " />
              </label>
            </div>
          </div>

          <form
            className="space-y-14 mx-auto max-w-full pt-7"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <CheckboxSelectInput
                name="selectedRecipeTypes"
                label="أنواع وصفات الطبخ"
                options={availableRecipeTypes}
                onChange={handleChange}
                value={formData.selectedRecipeTypes}
              />
              <Inputs
                name="phone"
                label="رقم التواصل الخاص"
                type="text"
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بادخال رقم التواصل الخاص هنا"
                value={formData.phone}
                onChange={handleChange}
                required={true}
              />

              <Inputs
                name="name"
                label="اسم الشيف"
                type="text"
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بادخال اسم الشيف هنا"
                value={formData.name}
                onChange={handleChange}
                required={true}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-10 text-right">
              <TextAreaInput
                name="description"
                label="وصف مختصر"
                type="text"
                className="w-full h-36 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بادخال وصف مختصر عن الشيف هنا"
                value={formData.description}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <Inputs
                name="socialMedia.facebook"
                label="إضافة رابط فيسبوك"
                type="text"
                Icon_2={TiSocialFacebook}
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بإضافة رابط فيسبوك هنا"
                value={formData.socialMedia.facebook}
                onChange={handleChange}
              />
              <SelectInput
                name="city"
                label="المدينة"
                className="w-full px-6 text-xl py-4"
                options={cities}
                onChange={handleChange}
                value={formData.city}
                disabled={!formData.country}
              />
              <SelectInput
                name="country"
                label="الدولة"
                className="w-full px-6 text-xl py-4"
                options={countriesData.map((c) => ({
                  value: c.name,
                  label: `${c.name} (${c.iso2})`,
                }))}
                onChange={handleChange}
                value={formData.country}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <Inputs
                name="socialMedia.whatsapp"
                label="إضافة رقم واتساب"
                placeholder="قم بإضافة رقم واتساب هنا"
                type="text"
                Icon_2={IoLogoWhatsapp}
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                value={formData.socialMedia.whatsapp}
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.youtube"
                label="إضافة رابط يوتيوب"
                placeholder="قم بإضافة رابط يوتيوب هنا"
                type="text"
                Icon_2={FaYoutube}
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                value={formData.socialMedia.youtube}
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.snapchat"
                label="إضافة رابط سناب شات"
                type="text"
                Icon_2={FaSnapchatGhost}
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بإضافة رابط سناب شات هنا"
                value={formData.socialMedia.snapchat}
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.x"
                label="إضافة رابط اكس"
                type="text"
                Icon_2={RiTwitterXFill}
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بإضافة رابط اكس هنا"
                value={formData.socialMedia.x}
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.instagram"
                label="إضافة رابط انستغرام"
                type="text"
                Icon_2={GrInstagram}
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بإضافة رابط انستغرام هنا"
                value={formData.socialMedia.instagram}
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.tiktok"
                label="إضافة رابط تيك توك"
                type="text"
                Icon_2={FaTiktok}
                placeholder="قم بادخال إضافة رابط تيك توك هنا"
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                value={formData.socialMedia.tiktok}
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <p className="text-right font-bold text-lg text-gray-700">
                : الرجاء اختيار الوسيلة المفضلة لتواصل العملاء معك من خلال{" "}
              </p>
              <div className="flex flex-col items-end gap-4 sm:flex-row sm:flex-wrap sm:justify-between sm:items-start sm:gap-x-12 sm:gap-y-6">
                <Checkbox
                  label="لا اريد التواصل معي"
                  name="noContact"
                  className="accent-primary-1"
                  checked={noContact}
                  onChange={handleNoContactChange}
                />
                <Checkbox
                  label="البريد الألكتروني"
                  name="Email"
                  className="accent-primary-1"
                  checked={formData.favoriteConnection.includes("Email")}
                  onChange={handleCheckboxChange}
                  disabled={noContact}
                />
                <Checkbox
                  label="رقم الواتساب"
                  name="whatsapp"
                  className="accent-primary-1"
                  checked={formData.favoriteConnection.includes("whatsapp")}
                  onChange={handleCheckboxChange}
                  disabled={noContact}
                />
                <Checkbox
                  label="رقم الجوال"
                  name="Phone"
                  className="accent-primary-1"
                  checked={formData.favoriteConnection.includes("Phone")}
                  onChange={handleCheckboxChange}
                  disabled={noContact}
                />
              </div>
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
                  label={loading ? "جاري الحفظ..." : "حفظ التعديلات"}
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

export default EditChef;
