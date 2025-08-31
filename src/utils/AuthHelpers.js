import { checkTokenValidity } from "./ApiClient";

// التحقق من حالة المصادقة
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!token || !refreshToken) {
    return false;
  }

  return checkTokenValidity();
};

// الحصول على بيانات المستخدم
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    return JSON.parse(userStr);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

// التحقق من صلاحية المستخدم
export const hasRole = (requiredRole) => {
  const user = getCurrentUser();
  if (!user || !user.role) return false;

  return user.role === requiredRole;
};

// تنظيف بيانات المصادقة
export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  localStorage.removeItem("redirectPath");
};

// التحقق من انتهاء صلاحية التوكن
export const isTokenExpired = () => {
  const token = localStorage.getItem("token");

  if (!token) return true;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp && payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// إعداد البيانات بعد تسجيل الدخول الناجح
export const setAuthData = (token, refreshToken, userData) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(userData));

  console.log("✅ Auth data set successfully");
};

export default {
  isAuthenticated,
  getCurrentUser,
  hasRole,
  clearAuthData,
  isTokenExpired,
  setAuthData,
};
