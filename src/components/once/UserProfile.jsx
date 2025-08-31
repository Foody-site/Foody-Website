import { useEffect, useState } from "react";
import apiClient from "../../utils/ApiClient";
import { FaUser, FaCity } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import PageWrapper from "../common/PageWrapper";

const UserProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    role: "",
    birthday: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await apiClient.get("/auth/me");
        setUser(
          res.data || {
            fullName: "",
            role: "",
            birthday: "",
          }
        );
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <PageWrapper>
      <div className="profile-info">
        <h2 className="text-3xl font-bold mb-8 text-right">الملف الشخصي</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-right font-medium">الاسم</label>
            <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
              <FaUser className="ml-2 text-gray-500" />
              <input
                type="text"
                value={user.fullName || ""}
                className="flex-grow bg-transparent text-right outline-none"
                readOnly
              />
            </div>
          </div>

          {/* Account Type */}
          <div>
            <label className="block mb-2 text-right font-medium">
              نوع الحساب
            </label>
            <div className="flex flex-row-reverse items-center border rounded px-3 py-2 bg-gray-100">
              <RiUserSettingsLine className="ml-2 text-gray-500" />
              <input
                type="text"
                readOnly
                value={user.role || ""}
                className="flex-grow bg-transparent text-right outline-none"
              />
            </div>
          </div>

          {/* Birth Date */}
          <div>
            <label className="block mb-2 text-right font-medium">
              تاريخ الميلاد
            </label>
            <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
              <MdDateRange className="ml-2 text-gray-500" />
              <input
                type="date"
                value={(user.birthday && user.birthday.split("T")[0]) || ""}
                className="flex-grow bg-transparent text-right outline-none"
                readOnly
              />
            </div>
          </div>

          {/* City - Not present in response, so you can customize if needed */}
          <div>
            <label className="block mb-2 text-right font-medium">المدينة</label>
            <div className="flex flex-row-reverse items-center border rounded px-3 py-2">
              <FaCity className="ml-2 text-gray-500" />
              <select
                className="flex-grow bg-transparent text-right outline-none"
                disabled
                value=""
              >
                <option value="">اختر المدينة</option>
                <option value="القاهرة">القاهرة</option>
                <option value="الجيزة">الجيزة</option>
                <option value="الإسكندرية">الإسكندرية</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UserProfile;
