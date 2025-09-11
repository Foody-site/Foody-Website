import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaUserFriends,
  FaHeart,
  FaBirthdayCake,
  FaGraduationCap,
  FaEllipsisH,
  FaPhoneAlt,
} from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import apiClient from "../../../utils/ApiClient";

const BookingType = {
  ROMANTIC_NIGHT: "ROMANTIC_NIGHT",
  FAMILY_GATHERING: "FAMILY_GATHERING",
  GRADUATION_PARTY: "GRADUATION_PARTY",
  FRIENDS_GATHERING: "FRIENDS_GATHERING",
  BIRTHDAY: "BIRTHDAY",
  OTHER: "OTHER",
};

const occasions = [
  {
    label: "ليلة رومانسية",
    icon: <FaHeart />,
    value: BookingType.ROMANTIC_NIGHT,
  },
  {
    label: "تجمع عائلي",
    icon: <FaUserFriends />,
    value: BookingType.FAMILY_GATHERING,
  },
  {
    label: "حفلة تخرج",
    icon: <FaGraduationCap />,
    value: BookingType.GRADUATION_PARTY,
  },
  {
    label: "تجمع أصدقاء",
    icon: <BsCalendar2Date />,
    value: BookingType.FRIENDS_GATHERING,
  },
  { label: "عيد ميلاد", icon: <FaBirthdayCake />, value: BookingType.BIRTHDAY },
  { label: "أخرى", icon: <FaEllipsisH />, value: BookingType.OTHER },
];

const ChefBookingForm = ({ chefId }) => {
  const [bookingType, setBookingType] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [city, setCity] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);

  const inputWrapper =
    "flex flex-row-reverse items-center justify-between bg-white border border-gray-300 rounded-lg py-2 px-4 focus-within:border-hover_primary-1 focus-within:ring-2 focus-within:ring-hover_primary-1";
  const inputStyle =
    "flex-grow bg-transparent text-right text-sm border-none outline-none placeholder-gray-500 text-black";

  const iconWithDivider = (IconComponent) => (
    <div className="flex items-center gap-2 pr-3 text-gray-500 min-w-[40px]">
      <span className="border-l h-4 border-gray-300"></span>
      {IconComponent}
    </div>
  );

  const validateForm = () => {
    if (!bookingType) return "يرجى اختيار نوع المناسبة";
    if (!bookingDate) return "يرجى تحديد تاريخ المناسبة";

    const today = new Date();
    const selectedDate = new Date(bookingDate);
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      return "لا يمكن اختيار تاريخ سابق";
    }

    if (!city) return "يرجى اختيار المدينة";

    if (!numOfPeople || isNaN(numOfPeople) || parseInt(numOfPeople) <= 0) {
      return "يرجى إدخال عدد مدعوين صحيح";
    }

    if (!phoneNumber) return "يرجى إدخال رقم التواصل";

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setModal({ message: validationError, isError: true });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // إضافة +966 إذا لم يكن موجوداً
      let formattedPhoneNumber = phoneNumber;
      if (!phoneNumber.startsWith("+966") && phoneNumber.startsWith("05")) {
        formattedPhoneNumber = "+966" + phoneNumber.substring(1);
      }

      const body = {
        bookingType,
        bookingDate,
        city,
        numOfPeople: parseInt(numOfPeople),
        phoneNumber: formattedPhoneNumber,
        chef: chefId,
      };

      await apiClient.post("/chef-booking", body);

      setModal({ message: "تم إرسال الحجز بنجاح", isError: false });
      setBookingType("");
      setBookingDate("");
      setCity("");
      setNumOfPeople("");
      setPhoneNumber("");
    } catch (error) {
      setModal({ message: "فشل في إرسال الحجز", isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 relative">
      <h2 className="text-2xl font-bold mb-6 text-right">المناسبة</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {occasions.map((item, idx) => (
          <label
            key={idx}
            className={`flex flex-row-reverse items-center justify-between border rounded-md px-4 py-3 cursor-pointer text-right ${
              bookingType === item.value
                ? "border-primary-1"
                : "border-gray-300"
            }`}
            onClick={() => setBookingType(item.value)}
          >
            <span className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-primary-1">{item.icon}</span>
              {item.label}
            </span>
            <input
              type="radio"
              name="occasion"
              checked={bookingType === item.value}
              onChange={() => setBookingType(item.value)}
              className="form-radio text-primary-1 w-4 h-4"
            />
          </label>
        ))}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-right font-medium">
          تاريخ المناسبة
        </label>
        <div className={inputWrapper}>
          {iconWithDivider(<BsCalendar2Date className="text-gray-500" />)}
          <input
            type="date"
            className={inputStyle}
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-right font-medium">المدينة</label>
        <div className={inputWrapper}>
          {iconWithDivider(<FaMapMarkerAlt className="text-gray-500" />)}
          <select
            className={inputStyle}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">اختر المدينة</option>
            <option value="riyadh">الرياض</option>
            <option value="jeddah">جدة</option>
            <option value="mecca">مكة</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-right font-medium">
          عدد المدعوين
        </label>
        <div className={inputWrapper}>
          {iconWithDivider(<FaUserFriends className="text-gray-500" />)}
          <input
            type="number"
            className={inputStyle}
            placeholder="أدخل العدد"
            value={numOfPeople}
            onChange={(e) => setNumOfPeople(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-right font-medium">رقم التواصل</label>
        <div className={inputWrapper}>
          {iconWithDivider(<FaPhoneAlt className="text-gray-500" />)}
          <input
            type="tel"
            className={inputStyle}
            placeholder="أدخل رقم الهاتف"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary-1 hover:bg-red-700 transition text-white py-3 rounded-md text-center font-semibold"
      >
        {loading ? "جاري الحجز..." : "حجز الشيف"}
      </button>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-80 text-center px-6 py-8">
            <h2
              className={`text-xl font-bold mb-4 ${
                modal.isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {modal.isError ? "خطأ" : "نجاح"}
            </h2>
            <p className="mb-6 text-gray-700">{modal.message}</p>
            <button
              onClick={() => setModal(null)}
              className="w-full bg-primary-1 hover:bg-red-700 text-white py-2 rounded font-semibold"
            >
              موافق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefBookingForm;
