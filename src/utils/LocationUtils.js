/**
 * حساب المسافة بين نقطتين جغرافيتين بالكيلومتر
 * يستخدم Haversine formula
 * @param {number} lat1 - خط العرض للنقطة الأولى
 * @param {number} lon1 - خط الطول للنقطة الأولى
 * @param {number} lat2 - خط العرض للنقطة الثانية
 * @param {number} lon2 - خط الطول للنقطة الثانية
 * @returns {number} المسافة بالكيلومتر
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // نصف قطر الأرض بالكيلومتر
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

/**
 * تنسيق المسافة للعرض
 * @param {number} distance - المسافة بالكيلومتر
 * @returns {string} المسافة منسقة
 */
export const formatDistance = (distance) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} م`;
  } else {
    return `${distance.toFixed(1)} كم`;
  }
};

/**
 * الحصول على موقع المستخدم الحالي
 * @param {object} options - خيارات Geolocation
 * @returns {Promise} Promise يحتوي على الموقع أو خطأ
 */
export const getUserLocation = (options = {}) => {
  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000, // 5 دقائق
    ...options,
  };

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        reject(error);
      },
      defaultOptions
    );
  });
};

/**
 * فحص إذا كان المتجر مفتوح الآن بناءً على shifts
 * @param {Array} shifts - مصفوفة أوقات العمل
 * @returns {boolean} true إذا كان المتجر مفتوح الآن
 */
export const isStoreOpen = (shifts) => {
  if (!shifts || !Array.isArray(shifts) || shifts.length === 0) {
    return false;
  }

  const now = new Date();

  return shifts.some((shift) => {
    if (!shift.startTime || !shift.endTime) {
      return false;
    }

    const startTime = new Date(shift.startTime);
    const endTime = new Date(shift.endTime);

    // التحقق من أن الوقت الحالي بين وقت البداية والنهاية
    return now >= startTime && now <= endTime;
  });
};

/**
 * الحصول على نص حالة المتجر
 * @param {Array|null} shifts - مصفوفة أوقات العمل أو null
 * @returns {string|null} نص حالة المتجر أو null إذا كان مغلق
 */
export const getStoreStatus = (shifts) => {
  // إذا كانت shifts = null، فالمتجر مفتوح
  if (shifts === null) {
    return "مفتوح الآن";
  }

  // إذا كانت shifts غير موجودة أو فارغة، نرجع null (مش نظهر حاجة)
  if (!shifts || !Array.isArray(shifts) || shifts.length === 0) {
    return null;
  }

  // إذا كان المتجر مفتوح، نرجع "مفتوح الآن"، وإلا نرجع null
  return isStoreOpen(shifts) ? "مفتوح الآن" : null;
};

/**
 * فحص إذا كان هناك شيفتات متاحة أو null (مفتوح دائماً)
 * @param {Array|null} shifts - مصفوفة أوقات العمل أو null
 * @returns {boolean} true إذا كانت هناك شيفتات صالحة أو null أو مفتوح
 */
export const hasValidShifts = (shifts) => {
  // إذا كانت shifts = null، نعتبرها صالحة (مفتوح دائماً)
  if (shifts === null) {
    return true;
  }

  // إذا كانت shifts غير موجودة أو فارغة، نخفي العنصر
  if (!shifts || !Array.isArray(shifts) || shifts.length === 0) {
    return false;
  }

  // إذا كان المتجر مفتوح، نظهر العنصر
  return isStoreOpen(shifts);
};

/**
 * فحص إذا كان هناك مسافة محسوبة أو متاحة
 * @param {number} calculatedDistance - المسافة المحسوبة
 * @param {string|number} storeDistance - المسافة من بيانات المتجر
 * @returns {boolean} true إذا كانت هناك مسافة متاحة
 */
export const hasValidDistance = (calculatedDistance, storeDistance) => {
  return (
    (calculatedDistance !== null && calculatedDistance !== undefined) ||
    (storeDistance !== null &&
      storeDistance !== undefined &&
      storeDistance !== "")
  );
};

/**
 * الموقع الافتراضي (الرياض، السعودية)
 */
export const DEFAULT_LOCATION = {
  lat: 24.7136,
  lng: 46.6753,
};

export default {
  calculateDistance,
  formatDistance,
  getUserLocation,
  isStoreOpen,
  getStoreStatus,
  hasValidShifts,
  hasValidDistance,
  DEFAULT_LOCATION,
};
