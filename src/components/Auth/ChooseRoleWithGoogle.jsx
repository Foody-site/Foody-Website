import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import apiClient from "../../utils/ApiClient";
import BUSINESS_photo from "/assets/choose_role/BUSINESS_photo.webp";
import CUSTOMER_photo from "/assets/choose_role/CUSTOMER_photo.webp";
import Button from "../shared/Buttons/Button";
import { LuCircleUser } from "react-icons/lu";
import { IoBriefcaseOutline } from "react-icons/io5";
import Alert from "../shared/Alert/Alert";

export default function ChooseRoleWithGoogle() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSubMessage, setAlertSubMessage] = useState("");
  const [error, setError] = useState(null);
  const [isRoleSelected, setIsRoleSelected] = useState(false);

  // تحقق من التاريخ للتأكد من أننا في صفحة اختيار الدور
  useEffect(() => {
    // استخدام تنبيه عند محاولة مغادرة الصفحة
    const handleBeforeUnload = (event) => {
      if (!isRoleSelected) {
        event.preventDefault();
        event.returnValue =
          "هل أنت متأكد من رغبتك في مغادرة هذه الصفحة قبل اختيار دور؟";
        return event.returnValue;
      }
    };

    // إضافة المستمع للنافذة
    window.addEventListener("beforeunload", handleBeforeUnload);

    // التحقق من وجود توكن المستخدم
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No authentication token found, redirecting to login");
      navigate("/login", { replace: true });
      return;
    }

    // محاولة استرداد معلومات المستخدم من التخزين المحلي
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");

      if (userData && userData.id) {
        setUserId(userData.id);
        console.log("User ID found:", userData.id);
      } else {
        // إذا لم يتم العثور على معرف المستخدم، استرداده من الخادم
        fetchUserInfo(token);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      fetchUserInfo(token);
    }

    // إزالة المستمع عند تفكيك المكون
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, isRoleSelected]);

  // منع التنقل للخلف
  useEffect(() => {
    // معالج للتنقل للخلف (back button)
    const handlePopState = () => {
      if (!isRoleSelected) {
        // منع التنقل للخلف إذا لم يتم اختيار الدور
        window.history.pushState(
          null,
          document.title,
          window.location.pathname
        );

        showAlert(
          "warning",
          "يجب اختيار الدور",
          "لا يمكنك مغادرة هذه الصفحة قبل اختيار دور"
        );
      }
    };

    // إعداد تاريخ المتصفح لمنع العودة للخلف
    window.history.pushState(null, document.title, window.location.pathname);

    // إضافة مستمع للتنقل للخلف
    window.addEventListener("popstate", handlePopState);

    // إزالة المستمع عند تفكيك المكون
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isRoleSelected]);

  // رصد تغيرات في URL
  useEffect(() => {
    // إنشاء مراقب للتنقل
    const originalNavigate = navigate;

    // تعديل وظيفة التنقل
    const navigateWrapper = (to, options = {}) => {
      // السماح بالتنقل إلى صفحات محددة فقط إذا لم يتم اختيار الدور
      const allowedPaths = ["/login", "/choose-role"];
      if (isRoleSelected || allowedPaths.includes(to)) {
        originalNavigate(to, options);
      } else {
        showAlert(
          "warning",
          "يجب اختيار الدور",
          "لا يمكنك مغادرة هذه الصفحة قبل اختيار دور"
        );
      }
    };

    // تخصيص وظيفة التنقل الخاصة بنا
    window.myCustomNavigate = navigateWrapper;

    // نحتاج أيضًا رصد تغيرات URL عبر pushState/replaceState
    const handleUrlChange = () => {
      if (!isRoleSelected) {
        const currentPath = window.location.pathname;
        const isChooseRolePath =
          currentPath === location.pathname || currentPath === "/choose-role";
        if (!isChooseRolePath) {
          // إعادة المستخدم إلى صفحة اختيار الدور
          window.history.pushState(null, document.title, location.pathname);

          // إظهار تنبيه للمستخدم
          showAlert(
            "warning",
            "يجب اختيار الدور",
            "لا يمكنك مغادرة هذه الصفحة قبل اختيار دور"
          );
        }
      }
    };

    // اعتراض كائنات history
    const originalPushState = window.history.pushState;
    window.history.pushState = function () {
      const result = originalPushState.apply(this, arguments);
      handleUrlChange();
      return result;
    };

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function () {
      const result = originalReplaceState.apply(this, arguments);
      handleUrlChange();
      return result;
    };

    // استرجاع الدوال الأصلية عند تفكيك المكون
    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [navigate, location.pathname, isRoleSelected]);

  // وظيفة لجلب معلومات المستخدم إذا لم تكن متوفرة
  const fetchUserInfo = async (token) => {
    try {
      const response = await apiClient.get("/auth/me");

      if (response.data && response.data.id) {
        setUserId(response.data.id);

        // تخزين معلومات المستخدم مع التأكد من حفظ الاسم الكامل
        const userData = {
          ...response.data,
          fullName:
            response.data.fullName ||
            response.data.name ||
            response.data.displayName,
        };
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("لم يتم العثور على معرف المستخدم");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      showAlert(
        "error",
        "خطأ في استرداد معلومات المستخدم",
        "يرجى تسجيل الدخول مرة أخرى"
      );

      // تأجيل إعادة التوجيه لتسجيل الدخول للسماح بظهور التنبيه
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    }
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const handleNext = async () => {
    if (selectedRole && userId) {
      try {
        setLoading(true);

        // الحصول على التوكن من التخزين المحلي
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("لم يتم العثور على بيانات تسجيل الدخول");
        }

        console.log(
          `Sending PATCH request to update role to ${selectedRole} for user ${userId}`
        );

        // إرسال الدور إلى الخادم باستخدام طريقة PATCH
        const response = await apiClient.patch(`/user/${userId}/role`, {
          role: selectedRole,
        });

        console.log("Role update response:", response.data);

        // تحديث معلومات المستخدم المخزنة محليًا
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        userData.role = selectedRole;

        // التأكد من حفظ الاسم الكامل إذا كان متوفراً في الاستجابة
        if (response.data.fullName) {
          userData.fullName = response.data.fullName;
        } else if (response.data.name) {
          userData.fullName = response.data.name;
        } else if (response.data.displayName) {
          userData.fullName = response.data.displayName;
        }

        localStorage.setItem("user", JSON.stringify(userData));

        // الآن يمكننا السماح بمغادرة الصفحة
        setIsRoleSelected(true);

        // عرض تنبيه النجاح
        showAlert(
          "success",
          "تم تحديث دورك بنجاح",
          `تم تعيين دورك كـ ${
            selectedRole === "BUSINESS" ? "حساب أعمال" : "حساب عادي"
          }`
        );

        // تحديد مسار إعادة التوجيه بناءً على الدور
        const redirectPath = selectedRole === "BUSINESS" ? "/list" : "/";
        localStorage.setItem("redirectPath", redirectPath);
      } catch (error) {
        console.error("Error updating role:", error);
        setError(error);

        // عرض تنبيه الخطأ
        showAlert(
          "error",
          "خطأ في تحديث الدور",
          error.response?.data?.message || "حدث خطأ أثناء محاولة تحديث دورك"
        );
      } finally {
        setLoading(false);
      }
    } else if (!userId) {
      showAlert(
        "error",
        "معرّف المستخدم غير متوفر",
        "يرجى تسجيل الدخول مرة أخرى"
      );
    } else {
      showAlert(
        "warning",
        "الرجاء اختيار نوع الحساب",
        "يجب اختيار نوع الحساب للمتابعة"
      );
    }
  };

  // وظيفة مساعدة لعرض التنبيهات
  const showAlert = (type, message, subMessage) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertSubMessage(subMessage);
    setAlertOpen(true);
  };

  // معالج إغلاق التنبيه
  const handleAlertClose = () => {
    setAlertOpen(false);

    // فقط إذا كان التنبيه هو نجاح واختار المستخدم دورًا، نقوم بإعادة التوجيه
    if (alertType === "success" && selectedRole) {
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      // استخدام replace: true لاستبدال الصفحة الحالية في تاريخ المتصفح
      navigate(redirectPath, { replace: true });
      localStorage.removeItem("redirectPath");
    } else if (
      alertType === "error" &&
      (error?.response?.status === 401 || error?.response?.status === 403)
    ) {
      // إذا كانت المشكلة متعلقة بالمصادقة، نعود إلى صفحة تسجيل الدخول
      navigate("/login", { replace: true });
    }
    // في جميع الحالات الأخرى لا نقوم بإعادة التوجيه
  };

  const handleLogout = () => {
    // مسح البيانات
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("redirectPath");

    // التوجيه إلى صفحة تسجيل الدخول
    setIsRoleSelected(true); // السماح بالتنقل للخروج
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <Alert
        message={alertMessage}
        subMessage={alertSubMessage}
        isOpen={alertOpen}
        type={alertType}
        onClose={handleAlertClose}
      />

      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          اختيار نوع الحساب{" "}
        </h2>
        <p className="text-gray-600 text-center mb-8 text-sm">
          حدد نوع الحساب المناسب لك للبدء في استخدام منصة فودي ، سواء كنت عميل
          يبحث عن مطاعم و وصفات موثوقة او مقدم خدمة ( صاحب مطعم او شيف ) .{" "}
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          {/* Business Account */}
          <div
            className={`relative rounded-lg border ${
              selectedRole === "BUSINESS"
                ? "border-primary-1"
                : "border-gray-200"
            } p-4 cursor-pointer`}
            onClick={() => handleSelectRole("BUSINESS")}
          >
            <div className="rounded-md mb-4">
              <img
                src={BUSINESS_photo}
                alt="Business Account"
                className="rounded-md w-full"
              />
            </div>
            <div className="flex justify-between items-center">
              <div
                className={`w-5 h-5 border rounded-full ${
                  selectedRole === "BUSINESS"
                    ? "bg-primary-1 border-primary-1"
                    : "border-gray-300"
                }`}
              ></div>
              <h3 className="font-bold text-lg flex items-center gap-2 flex-row-reverse">
                <IoBriefcaseOutline className="text-2xl text-gray-600" />
                حساب أعمال{" "}
              </h3>
            </div>
            <p className="text-gray-600 text-sm text-right mt-2">
              قم بإنشاء وإدارة صفحتك كـ(شيف/متجر) وأيضاً نشر العروض والخصومات
              ومتابعة تقييمات وتعليقات عملائك ومتابعينك والرد عليها.{" "}
            </p>
          </div>

          {/* Regular Account */}
          <div
            className={`relative rounded-lg border ${
              selectedRole === "CUSTOMER"
                ? "border-primary-1"
                : "border-gray-200"
            } p-4 cursor-pointer`}
            onClick={() => handleSelectRole("CUSTOMER")}
          >
            <div className="rounded-md mb-4">
              <img
                src={CUSTOMER_photo}
                alt="Regular Account"
                className="rounded-md w-full"
              />
            </div>
            <div className="flex justify-between items-center">
              <div
                className={`w-5 h-5 border rounded-full ${
                  selectedRole === "CUSTOMER"
                    ? "bg-primary-1 border-primary-1"
                    : "border-gray-300"
                }`}
              ></div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                حساب عادي
                <LuCircleUser className="text-2xl text-gray-600" />
              </h3>
            </div>
            <p className="text-gray-600 text-sm text-right mt-2">
              الدخول لحسابك الشخصي وإدارته ومتابعة وجباتك ووصفاتك المفضلة
              واستعراض ومتابعة أخر العروض والخصومات حسب موقعك وأيضاً للتقييم
              والتعليق والمشاركة مع أحبابك.{" "}
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-12 flex-wrap gap-4">
          <Button
            label={loading ? "جاري الإرسال..." : "التالى"}
            onClick={handleNext}
            disabled={!selectedRole || loading}
            className={`max-w-[300px] w-full py-3 text-white font-bold rounded-md transition ${
              selectedRole && !loading
                ? "bg-primary-1 hover:bg-hover_primary-1"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
