import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/shared/Buttons/Button";
import Inputs from "../../components/shared/inputs/Inputs";
import { FaSnapchatGhost, FaYoutube, FaTiktok } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";
import { RiTwitterXFill } from "react-icons/ri";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import SelectInput from "../../components/shared/inputs/SelectInput";
import { api_url } from "../../utils/ApiClient";
import axios from "axios";
import CheckboxSelectInput from "../../components/shared/inputs/CheckboxSelectInput";
import countriesData from "../../assets/countries.json";
import TextAreaInput from "../../components/shared/inputs/TextAreaInput ";
import Checkbox from "../../components/shared/inputs/Checkbox";

const AddChef = () => {
  const [noContact, setNoContact] = useState(false);
  const [loading, setLoading] = useState(false);
  // State for available recipe types from API
  const [availableRecipeTypes, setAvailableRecipeTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  // Form images
  const [coverPicture, setCoverPicture] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    selectedRecipeTypes: [],
    description: "",
    name: "",
    city: "",
    country: "",
    phone: "",
    socialMedia: {
      WhatsApp: "",
      facebook: "",
      x: "",
      tiktok: "",
      youtube: "",
      snapchat: "",
      instagram: "",
    },
    favoriteConnection: [],
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

  // Update cities when country changes
  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countriesData.find(
        (c) =>
          c.name.trim().toLowerCase() === formData.country.trim().toLowerCase()
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
      console.error("الرجاء اختيار صورة صحيحة!");
    }
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePicture(file);
    } else {
      console.error("الرجاء اختيار صورة صحيحة!");
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
      console.error("لا يوجد توكن، يرجى تسجيل الدخول.");
      setLoading(false);
      return;
    }

    try {
      const chefData = {
        name: formData.name,
        description: formData.description,
        country: formData.country,
        city: formData.city,
        phone: formData.phone,
        recipeTypes:
          formData.selectedRecipeTypes &&
          formData.selectedRecipeTypes.length > 0
            ? formData.selectedRecipeTypes.filter(
                (id) => id && id.trim() !== ""
              )
            : [],
        socialMedia: {},
      };

      Object.keys(formData.socialMedia).forEach((platform) => {
        if (formData.socialMedia[platform]) {
          chefData.socialMedia[platform] = formData.socialMedia[platform];
        }
      });

      if (!coverPicture && !profilePicture) {
        console.log("إرسال البيانات كـ JSON:", chefData);

        const response = await axios.post(`${api_url}/chef`, chefData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("استجابة الخادم:", response.data);
        alert("تمت الإضافة بنجاح!");
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("phone", formData.phone);

      if (
        formData.selectedRecipeTypes &&
        formData.selectedRecipeTypes.length > 0
      ) {
        formData.selectedRecipeTypes.forEach((typeId) => {
          if (typeId && typeId.trim() !== "") {
            formDataToSend.append("recipeTypes[]", typeId);
          }
        });
      } else {
        formDataToSend.append("recipeTypes", "[]");
      }

      Object.keys(formData.socialMedia).forEach((platform) => {
        if (formData.socialMedia[platform]) {
          formDataToSend.append(
            `socialMedia[${platform}]`,
            formData.socialMedia[platform]
          );
        }
      });

      formData.favoriteConnection.forEach((connection) => {
        formDataToSend.append("favoriteConnection[]", connection);
      });

      if (coverPicture) formDataToSend.append("coverPicture", coverPicture);
      if (profilePicture)
        formDataToSend.append("profilePicture", profilePicture);

      console.log("إرسال البيانات كـ FormData");

      const response = await axios.post(`${api_url}/chef`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("استجابة الخادم:", response.data);
      alert("تمت الإضافة بنجاح!");
    } catch (error) {
      console.error("خطأ كامل:", error);

      let errorMessage = "حدث خطأ أثناء الإرسال";

      if (error.response?.data) {
        const data = error.response.data;

        if (typeof data === "object") {
          if (data.message && Array.isArray(data.message)) {
            errorMessage = data.message.join(", ");
          } else {
            errorMessage = JSON.stringify(data);
          }
        } else {
          errorMessage = data;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error("رسالة الخطأ:", errorMessage);
      alert(`حدث خطأ: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[70rem] p-16 rounded-xl ">
          <h2 className="text-3xl font-bold text-right text-gray-700 mb-10">
            اضافة شيف جديد{" "}
          </h2>

          <div className="mb-10 relative">
            <div className="relative bg-gray-300 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden">
              {coverPicture && (
                <img
                  src={URL.createObjectURL(coverPicture)}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              )}
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
                <TbCameraPlus className="text-primary-1 text-2xl mr-2" /> إضافة
                صورة الغلاف
              </label>
            </div>

            <div className="absolute -bottom-8 right-5 w-40 h-40 bg-gray-100 rounded-full border flex justify-center items-center shadow-lg">
              {profilePicture && (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
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
                onChange={handleChange} // Use the new handler function
              />
              <Inputs
                name="phone"
                label="رقم التواصل الخاص"
                type="text"
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بادخال رقم التواصل الخاص  هنا"
                onChange={handleChange}
              />

              <Inputs
                name="name"
                label="اسم الشيف"
                type="text"
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بادخال اسم الشيف هنا"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-10 gap-y-10 text-right">
              <TextAreaInput
                name="description"
                label="وصف مختصر"
                type="text"
                className="w-full h-36 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بادخال وصف مختصر عن الشيف هنا"
                onChange={handleChange}
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
                onChange={handleChange}
              />
              <SelectInput
                name="city"
                label="المدينة"
                className="w-full px-6 text-xl py-4"
                options={cities}
                onChange={handleChange}
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
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <Inputs
                name="socialMedia.WhatsApp"
                label="إضافة رقم واتساب"
                placeholder="قم بإضافة رقم واتساب هنا"
                type="text"
                Icon_2={IoLogoWhatsapp}
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.youtube"
                label="إضافة رابط يوتيوب"
                placeholder="قم بإضافة رابط يوتيوب هنا"
                type="text"
                Icon_2={FaYoutube}
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.snapchat"
                label="إضافة رابط سناب شات"
                type="text"
                Icon_2={FaSnapchatGhost}
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بإضافة رابط سناب شات هنا"
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.x"
                label="إضافة رابط اكس"
                type="text"
                Icon_2={RiTwitterXFill}
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بإضافة رابط اكس هنا"
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.instagram"
                label="إضافة رابط انستغرام"
                type="text"
                Icon_2={GrInstagram}
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
                placeholder="قم بإضافة رابط انستغرام هنا"
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.tiktok"
                label="إضافة رابط  تيك توك"
                type="text"
                Icon_2={FaTiktok}
                placeholder="قم بادخال إضافة رابط  تيك توك هنا"
                className="w-full h-12 px-6 text-xl py-4 placeholder:text-sm"
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
                  name="WhatsApp"
                  className="accent-primary-1"
                  checked={formData.favoriteConnection.includes("WhatsApp")}
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
                  label="الغاء"
                  className="w-[600px] h-[55px] !text-primary-1 font-medium border border-primary-1 hover:bg-primary-1 hover:!text-white transition"
                  type="button"
                  onClick={() => navigate("/")}
                />
                <Button
                  type="submit"
                  label={loading ? "جاري الإضافة ..." : "إضافة شيف"}
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

export default AddChef;