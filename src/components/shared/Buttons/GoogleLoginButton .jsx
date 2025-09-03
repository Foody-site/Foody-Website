// Google Login Button Component - يمكن استخدامه في صفحتي Login و Register
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = ({ onClick, loading }) => {
  return (
    <button
      className={`border p-2 rounded-full relative ${
        loading ? "opacity-70" : ""
      }`}
      onClick={onClick}
      disabled={loading}
      type="button"
      aria-label="تسجيل الدخول باستخدام Google"
      title="تسجيل الدخول باستخدام Google"
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
      <span className="sr-only">تسجيل الدخول باستخدام Google</span>
    </button>
  );
};

export default GoogleLoginButton;
