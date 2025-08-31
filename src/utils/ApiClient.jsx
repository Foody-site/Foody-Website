import axios from "axios";

export const api_url = "https://foody-api-mmiv.onrender.com/api";

// إنشاء axios instance منفصل مع interceptors
const apiClient = axios.create({
  baseURL: api_url,
});

// Request interceptor - يضيف التوكن تلقائياً
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🚀 ApiClient Request:", config.url, "| Token:", !!token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // التأكد من وجود Content-Type
    if (
      !config.headers["Content-Type"] &&
      config.data &&
      !(config.data instanceof FormData)
    ) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - يتعامل مع انتهاء صلاحية التوكن
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      "✅ ApiClient Success:",
      response.config.url,
      "| Status:",
      response.status
    );
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log(
      "❌ ApiClient Error:",
      error.response?.status,
      "| URL:",
      originalRequest?.url,
      "| Error:",
      error.response?.data?.message || error.message
    );

    // التعامل مع 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          console.log("❌ No refresh token available, redirecting to login");
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(new Error("No refresh token available"));
        }

        console.log("🔄 Attempting token refresh...");

        // استخدام axios العادي للـ refresh (بدون interceptors)
        const refreshResponse = await axios.post(
          `${api_url}/auth/refresh`,
          {
            refreshToken: refreshToken,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("✅ Refresh successful:", refreshResponse.status);

        const newToken = refreshResponse.data.accessToken;
        const newRefreshToken = refreshResponse.data.refreshToken;

        if (!newToken) {
          throw new Error("No accessToken in refresh response");
        }

        // تحديث التوكنز
        localStorage.setItem("token", newToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        console.log("🔑 Token updated, retrying request...");

        // إعادة المحاولة بالتوكن الجديد
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);

        // تنظيف البيانات والتوجيه للـ login
        localStorage.clear();

        // تأخير قليل قبل التوجيه للتأكد من تنظيف البيانات
        setTimeout(() => {
          window.location.href = "/login";
        }, 100);

        return Promise.reject(refreshError);
      }
    }

    // إذا كان 401 ولكن العملية فشلت في التحديث، توجيه للـ login
    if (error.response?.status === 401) {
      console.log("❌ Authentication failed, redirecting to login");
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
    }

    return Promise.reject(error);
  }
);

// دالة مساعدة لفحص صحة التوكن
export const checkTokenValidity = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("❌ No token found");
    return false;
  }

  try {
    // فحص بسيط للتوكن (JWT عادة يحتوي على 3 أجزاء مفصولة بنقطة)
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.log("❌ Invalid token format");
      return false;
    }

    // فحص تاريخ انتهاء الصلاحية
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTime) {
      console.log("❌ Token expired");
      return false;
    }

    console.log("✅ Token is valid");
    return true;
  } catch (error) {
    console.log("❌ Error checking token:", error);
    return false;
  }
};

// دالة مساعدة لتسجيل الخروج
export const logout = () => {
  console.log("🚪 Logging out...");
  localStorage.clear();
  window.location.href = "/login";
};

export default apiClient;
