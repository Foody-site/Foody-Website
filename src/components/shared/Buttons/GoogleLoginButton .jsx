// Google Login Button Component - يمكن استخدامه في صفحتي Login و Register
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

// القيم الثابتة المطلوبة
const CURRENT_DATE_TIME = "2025-06-19 18:52:23";
const CURRENT_USER_LOGIN = "Amr3011";

const GoogleLoginButton = ({ onClick, loading }) => {
  // طباعة المعلومات الثابتة في وحدة التحكم عند تهيئة المكوّن
  console.log(
    `Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${CURRENT_DATE_TIME}`
  );
  console.log(`Current User's Login: ${CURRENT_USER_LOGIN}`);

  return (
    <button
      className={`border p-2 rounded-full relative ${
        loading ? "opacity-70" : ""
      }`}
      onClick={onClick}
      disabled={loading}
      type="button"
      aria-label="تسجيل الدخول باستخدام Google"
      title={`تسجيل الدخول باستخدام Google (${CURRENT_USER_LOGIN} - ${CURRENT_DATE_TIME})`}
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : null}
      <FcGoogle
        size={24}
        className={`w-6 h-6 ${loading ? "opacity-30" : ""}`}
      />
      <span className="sr-only">
        تسجيل الدخول باستخدام Google (التاريخ: {CURRENT_DATE_TIME}, المستخدم:{" "}
        {CURRENT_USER_LOGIN})
      </span>
    </button>
  );
};

export default GoogleLoginButton;
