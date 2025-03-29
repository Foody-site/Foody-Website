import { useState, useEffect } from "react";
import Button from "../../components/shared/Buttons/Button";
import Inputs from "../../components/shared/inputs/Inputs";
import Footer from "../../components/layout/Footer";
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

const AddChef = () => {
  // State for available recipe types from API
  const [availableRecipeTypes, setAvailableRecipeTypes] = useState([]);
  const [cities, setCities] = useState([]);

  // Form images
  const [coverPicture, setCoverPicture] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    selectedRecipeTypes: [], // Renamed for clarity
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

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("لا يوجد توكن، يرجى تسجيل الدخول.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);

    // Handle recipe types properly
    // Important: Add a special field to indicate this is an empty array if no types are selected
    if (
      formData.selectedRecipeTypes &&
      formData.selectedRecipeTypes.length > 0
    ) {
      formData.selectedRecipeTypes.forEach((typeId) => {
        // Make sure we're adding valid IDs
        if (typeId) {
          formDataToSend.append("recipeTypes", typeId);
        }
      });
    } else {
      // This line is crucial - it tells the server we're intentionally sending an empty array
      formDataToSend.append("recipeTypes[]", ""); // The empty bracket notation signals an empty array
    }

    formDataToSend.append("country", formData.country);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("phone", formData.phone);

    // Handle social media fields
    Object.keys(formData.socialMedia).forEach((platform) => {
      if (formData.socialMedia[platform]) {
        formDataToSend.append(
          `socialMedia.${platform}`,
          formData.socialMedia[platform]
        );
      }
    });

    if (coverPicture) formDataToSend.append("coverPicture", coverPicture);
    if (profilePicture) formDataToSend.append("profilePicture", profilePicture);

    // Debug what's being sent
    console.log("Form data being sent:");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post(`${api_url}/chef`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("تمت الإضافة بنجاح:", response.data);
      // Consider adding success message or redirect here
    } catch (error) {
      console.error(
        "حدث خطأ أثناء الإرسال:",
        error.response ? error.response.data : error
      );
      // Consider adding error message UI feedback here
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex justify-center items-center px-8 py-8">
        <div className="w-full max-w-[70rem] p-16 bg-gray-100 rounded-xl ">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-10">
            إضافة شيف جديد
          </h2>

          <div className="mb-10 relative">
            <div className="relative bg-gray-400 h-72 w-full rounded-lg flex justify-center items-center overflow-hidden">
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
                className="absolute bottom-5 left-5 bg-white px-5 py-2 border rounded-md text-sm flex items-center cursor-pointer"
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
                className="absolute bottom-2 left-2 cursor-pointer p-2 rounded-full shadow-md"
              >
                <TbCameraPlus className="text-primary-1 text-2xl " />
              </label>
            </div>
          </div>

          <form
            className="space-y-14 mx-auto max-w-full"
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
                name="description"
                label="وصف مختصر"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                onChange={handleChange}
              />
              <Inputs
                name="name"
                label="اسم الشيف"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
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

              <div>
                <Inputs
                  name="phone"
                  label="رقم التواصل الخاص"
                  type="text"
                  className="w-full h-12 px-6 text-xl py-4"
                  onChange={handleChange}
                />
                <p className="text-primary-1 text-sm mt-2">
                  الرقم لا يتم نشره أو عرضه للمستخدمين و إنما وسيلة للتواصل بين
                  الموقع والشيف{" "}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10 text-right">
              <Inputs
                name="socialMedia.whatsapp"
                label="اضافه رقم واتس اب"
                type="text"
                Icon={IoLogoWhatsapp}
                className="w-full h-12 px-6 text-xl py-4"
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.facebook"
                label="اضافة رابط فيس بوك"
                type="text"
                Icon={TiSocialFacebook}
                className="w-full h-12 px-6 text-xl py-4"
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.x"
                label="اضافة رابط اكس"
                type="text"
                Icon={RiTwitterXFill}
                className="w-full h-12 px-6 text-xl py-4"
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.tiktok"
                label="اضافة رابط تيك توك"
                type="text"
                Icon={FaTiktok}
                className="w-full h-12 px-6 text-xl py-4"
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.youtube"
                label="اضافه رابط يوتيوب"
                type="text"
                Icon={FaYoutube}
                className="w-full h-12 px-6 text-xl py-4"
                onChange={handleChange}
              />
              <Inputs
                name="socialMedia.snapchat"
                label="اضافه رابط سناب شات"
                type="text"
                Icon={FaSnapchatGhost}
                className="w-full h-12 px-6 text-xl py-4"
                onChange={handleChange}
              />
              <div className="md:col-start-3 md:flex md:justify-end">
                <Inputs
                  name="socialMedia.instagram"
                  label="اضافه رابط انستغرام"
                  type="text"
                  Icon={GrInstagram}
                  className="w-full h-12 px-6 text-xl py-4"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Button
                type="submit"
                label="إضافة شيف"
                className="max-w-[350px] bg-primary-1 hover:bg-hover_primary-1 text-white py-2 rounded-md text-lg font-semibold"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddChef;
