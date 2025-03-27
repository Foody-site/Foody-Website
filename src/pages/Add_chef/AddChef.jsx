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
  const [specialties, setSpecialties] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setSpecialties([]);
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get(`${api_url}/chef/recipe/types`);
        const formattedData = response.data.map((item) => ({
          value: item.id,
          label: item.name.ar,
        }));
        setSpecialties(formattedData);
      } catch (error) {
        console.error("Error fetching specialties:", error);
      }
    };
    fetchSpecialties();
  }, []);

  const [coverPicture, setcoverPicture] = useState(null);
  const [profilePicture, setprofilePicture] = useState(null);
  const [formData, setFormData] = useState({
    recipeTypes: "",
    description: "",
    name: "",
    city: "",
    country: "",
    contact_number: "",
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
      setcoverPicture(file);
    } else {
      console.error("الرجاء اختيار صورة صحيحة!");
    }
  };

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setprofilePicture(file);
    } else {
      console.error("الرجاء اختيار صورة صحيحة!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      setFormData((prev) => ({
        ...prev,
        country: value.trim(),
        city: "",
      }));
    } else if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        city: value,
      }));
    } else if (name.startsWith("socialMedia.")) {
      const socialKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value,
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
    console.log(token);
    
    if (!token) {
      console.error("لا يوجد توكن، يرجى تسجيل الدخول.");
      return;
    }
  
    // إعداد البيانات بدون FormData
    const formDataToSend = {
      name: formData.name,
      description: formData.description,
      recipeTypes: formData.recipeTypes,
      country: formData.country,
      city: formData.city,
      contact_number: formData.contact_number,
      socialMedia: formData.socialMedia,
      coverPicture: coverPicture, 
      profilePicture: profilePicture,
    };
  
    try {
      const response = await axios.post(`${api_url}/chef`, formDataToSend, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("تمت الإضافة بنجاح:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
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
                name="recipeTypes"
                label="أنواع وصفات الطبخ"
                options={specialties}
                onChange={handleChange}
              />

              <Inputs
                name="description"
                label="وصف مختصر"
                type="text"
                className="w-full h-12 px-6 text-xl py-4"
                onChange={handleChange}
              />
              <Inputs
                name="chef_name"
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
                  name="contact_number"
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
