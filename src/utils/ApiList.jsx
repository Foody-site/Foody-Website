import { api_url } from "./ApiClient";

// استدعاء الـ API لجلب البيانات مع معالجة الأخطاء
const BASE_URL = api_url;

// دالة مساعدة للتعامل مع الطلبات
const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'حدث خطأ في الطلب');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

// خدمة المتاجر
export const storeService = {
  // جلب قائمة المتاجر
  getStores: (page = 1, filters = {}) => {
    const queryParams = new URLSearchParams({
      page,
      limit: 10,
      ...filters
    }).toString();
    
    return fetchData(`/stores?${queryParams}`);
  },
  
  // إضافة متجر جديد
  addStore: (storeData) => {
    return fetchData('/stores', {
      method: 'POST',
      body: JSON.stringify(storeData)
    });
  },
  
  // تحديث بيانات متجر
  updateStore: (storeId, storeData) => {
    return fetchData(`/stores/${storeId}`, {
      method: 'PUT',
      body: JSON.stringify(storeData)
    });
  },
  
  // حذف متجر
  deleteStore: (storeId) => {
    return fetchData(`/stores/${storeId}`, {
      method: 'DELETE'
    });
  },
  
  // جلب تفاصيل متجر محدد
  getStoreDetails: (storeId) => {
    return fetchData(`/stores/${storeId}`);
  }
};

// خدمة الشيفات
export const chefService = {
  // جلب قائمة الشيفات
  getChefs: (page = 1, filters = {}) => {
    const queryParams = new URLSearchParams({
      page,
      limit: 10,
      ...filters
    }).toString();
    
    return fetchData(`/chefs?${queryParams}`);
  },
  
  // إضافة شيف جديد
  addChef: (chefData) => {
    return fetchData('/chefs', {
      method: 'POST',
      body: JSON.stringify(chefData)
    });
  },
  
  // تحديث بيانات شيف
  updateChef: (chefId, chefData) => {
    return fetchData(`/chefs/${chefId}`, {
      method: 'PUT',
      body: JSON.stringify(chefData)
    });
  },
  
  // حذف شيف
  deleteChef: (chefId) => {
    return fetchData(`/chefs/${chefId}`, {
      method: 'DELETE'
    });
  },
  
  // جلب تفاصيل شيف محدد
  getChefDetails: (chefId) => {
    return fetchData(`/chefs/${chefId}`);
  }
};

// خدمة الوصفات
export const recipeService = {
  // جلب قائمة الوصفات
  getRecipes: (page = 1, filters = {}) => {
    const queryParams = new URLSearchParams({
      page,
      limit: 10,
      ...filters
    }).toString();
    
    return fetchData(`/recipes?${queryParams}`);
  },
  
  // إضافة وصفة جديدة
  addRecipe: (recipeData) => {
    return fetchData('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipeData)
    });
  },
  
  // تحديث بيانات وصفة
  updateRecipe: (recipeId, recipeData) => {
    return fetchData(`/recipes/${recipeId}`, {
      method: 'PUT',
      body: JSON.stringify(recipeData)
    });
  },
  
  // حذف وصفة
  deleteRecipe: (recipeId) => {
    return fetchData(`/recipes/${recipeId}`, {
      method: 'DELETE'
    });
  },
  
  // جلب تفاصيل وصفة محددة
  getRecipeDetails: (recipeId) => {
    return fetchData(`/recipes/${recipeId}`);
  }
};

// خدمة الإشعارات
export const notificationService = {
  // جلب قائمة الإشعارات
  getNotifications: (page = 1) => {
    return fetchData(`/notifications?page=${page}&limit=10`);
  },
  
  // إرسال إشعار جديد
  sendNotification: (notificationData) => {
    return fetchData('/notifications', {
      method: 'POST',
      body: JSON.stringify(notificationData)
    });
  },
  
  // تعليم إشعار كمقروء
  markAsRead: (notificationId) => {
    return fetchData(`/notifications/${notificationId}/read`, {
      method: 'PUT'
    });
  }
};

// خدمة العمليات
export const operationsService = {
  // جلب قائمة العمليات
  getOperations: (page = 1, filters = {}) => {
    const queryParams = new URLSearchParams({
      page,
      limit: 10,
      ...filters
    }).toString();
    
    return fetchData(`/operations?${queryParams}`);
  },
  
  // جلب تفاصيل عملية محددة
  getOperationDetails: (operationId) => {
    return fetchData(`/operations/${operationId}`);
  }
};