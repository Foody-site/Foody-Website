import apiClient from "./ApiClient";

// دالة مساعدة للتعامل مع الطلبات باستخدام apiClient
const fetchData = async (endpoint, options = {}) => {
  try {
    const { method = "GET", data, params } = options;

    let response;
    switch (method.toLowerCase()) {
      case "post":
        response = await apiClient.post(endpoint, data);
        break;
      case "put":
        response = await apiClient.put(endpoint, data);
        break;
      case "patch":
        response = await apiClient.patch(endpoint, data);
        break;
      case "delete":
        response = await apiClient.delete(endpoint);
        break;
      default:
        response = await apiClient.get(endpoint, { params });
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

// خدمة المتاجر
export const storeService = {
  // جلب قائمة المتاجر
  getStores: (page = 1, filters = {}) => {
    const params = {
      page,
      limit: 10,
      ...filters,
    };

    return fetchData("/stores", { params });
  },

  // إضافة متجر جديد
  addStore: (storeData) => {
    return fetchData("/stores", {
      method: "POST",
      data: storeData,
    });
  },

  // تحديث بيانات متجر
  updateStore: (storeId, storeData) => {
    return fetchData(`/stores/${storeId}`, {
      method: "PUT",
      data: storeData,
    });
  },

  // حذف متجر
  deleteStore: (storeId) => {
    return fetchData(`/stores/${storeId}`, {
      method: "DELETE",
    });
  },

  // جلب تفاصيل متجر محدد
  getStoreDetails: (storeId) => {
    return fetchData(`/stores/${storeId}`);
  },
};

// خدمة الشيفات
export const chefService = {
  // جلب قائمة الشيفات
  getChefs: (page = 1, filters = {}) => {
    const params = {
      page,
      limit: 10,
      ...filters,
    };

    return fetchData("/chefs", { params });
  },

  // إضافة شيف جديد
  addChef: (chefData) => {
    return fetchData("/chefs", {
      method: "POST",
      data: chefData,
    });
  },

  // تحديث بيانات شيف
  updateChef: (chefId, chefData) => {
    return fetchData(`/chefs/${chefId}`, {
      method: "PUT",
      data: chefData,
    });
  },

  // حذف شيف
  deleteChef: (chefId) => {
    return fetchData(`/chefs/${chefId}`, {
      method: "DELETE",
    });
  },

  // جلب تفاصيل شيف محدد
  getChefDetails: (chefId) => {
    return fetchData(`/chefs/${chefId}`);
  },
};

// خدمة الوصفات
export const recipeService = {
  // جلب قائمة الوصفات
  getRecipes: (page = 1, filters = {}) => {
    const params = {
      page,
      limit: 10,
      ...filters,
    };

    return fetchData("/recipes", { params });
  },

  // إضافة وصفة جديدة
  addRecipe: (recipeData) => {
    return fetchData("/recipes", {
      method: "POST",
      data: recipeData,
    });
  },

  // تحديث بيانات وصفة
  updateRecipe: (recipeId, recipeData) => {
    return fetchData(`/recipes/${recipeId}`, {
      method: "PUT",
      body: JSON.stringify(recipeData),
    });
  },

  // حذف وصفة
  deleteRecipe: (recipeId) => {
    return fetchData(`/recipes/${recipeId}`, {
      method: "DELETE",
    });
  },

  // جلب تفاصيل وصفة محددة
  getRecipeDetails: (recipeId) => {
    return fetchData(`/recipes/${recipeId}`);
  },
};

// خدمة الإشعارات
export const notificationService = {
  // جلب قائمة الإشعارات
  getNotifications: (page = 1) => {
    return fetchData(`/notifications?page=${page}&limit=10`);
  },

  // إرسال إشعار جديد
  sendNotification: (notificationData) => {
    return fetchData("/notifications", {
      method: "POST",
      body: JSON.stringify(notificationData),
    });
  },

  // تعليم إشعار كمقروء
  markAsRead: (notificationId) => {
    return fetchData(`/notifications/${notificationId}/read`, {
      method: "PUT",
    });
  },
};

// خدمة العمليات
export const operationsService = {
  // جلب قائمة العمليات
  getOperations: (page = 1, filters = {}) => {
    const params = {
      page,
      limit: 10,
      ...filters,
    };

    return fetchData("/operations", { params });
  },

  // جلب تفاصيل عملية محددة
  getOperationDetails: (operationId) => {
    return fetchData(`/operations/${operationId}`);
  },
};
