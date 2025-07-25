// utils/formatters.js - formatting utility functions

export const formatBookingType = (type) => {
  switch (type) {
    case "ROMANTIC_NIGHT":
      return "ليلة رومانسية";
    case "FAMILY_GATHERING":
      return "تجمع عائلي";
    case "GRADUATION_PARTY":
      return "حفل تخرج";
    case "FRIENDS_GATHERING":
      return "لقاء أصدقاء";
    case "BIRTHDAY":
      return "عيد ميلاد";
    case "OTHER":
      return "أخرى";
    default:
      return type || "غير محدد";
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return "غير محدد";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "تاريخ غير صالح";

    const saudiDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Riyadh" })
    );

    const year = saudiDate.getFullYear();
    const month = String(saudiDate.getMonth() + 1).padStart(2, "0");
    const day = String(saudiDate.getDate()).padStart(2, "0");

    const timeString = saudiDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${day}/${month}/${year} - ${timeString}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "تاريخ غير صالح";
  }
};
