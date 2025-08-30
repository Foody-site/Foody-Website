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
    console.log("✅ ApiClient Success:", response.config.url, "| Status:", response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log("❌ ApiClient Error:", error.response?.status, "| URL:", originalRequest?.url);

    // التعامل مع 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          console.log("❌ No refresh token available");
          throw new Error("No refresh token available");
        }

        console.log("🔄 Attempting token refresh...");

        // استخدام axios العادي للـ refresh (بدون interceptors)
        const refreshResponse = await axios.post(`${api_url}/auth/refresh`, {
          refreshToken: refreshToken,
        });

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
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
