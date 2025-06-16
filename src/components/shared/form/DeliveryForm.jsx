import React, { useState, useEffect, useRef } from "react";
import SelectInput from "../inputs/SelectInput";
import DeliveryApps from "./../inputs/DeliveryApps";

const DeliveryForm = ({ onDataChange }) => {
  const [apps, setApps] = useState([
    { name: "keeta", label: "كيتا", checked: false, link: "" },
    { name: "jahez", label: "جاهز", checked: false, link: "" },
    { name: "hungerStation", label: "هنقرستيشن", checked: false, link: "" },
    { name: "mrsool", label: "مرسول", checked: false, link: "" },
    { name: "noon", label: "نون", checked: false, link: "" },
    { name: "toyou", label: "تويو", checked: false, link: "" },
    { name: "theChefz", label: "ذا شيفز", checked: false, link: "" },
    { name: "uber", label: "اوبر", checked: false, link: "" },
    { name: "mrMandoob", label: "مستر مندوب", checked: false, link: "" },
    { name: "other", label: "أخرى", checked: false, link: "" },
    { name: "careem", label: "كريم", checked: false, link: "" },
    { name: "shgardi", label: "شقر دي", checked: false, link: "" },
  ]);

  const [mainDeliveryApp, setMainDeliveryApp] = useState("");

  // مرجع لتخزين البيانات السابقة لمنع الاستدعاءات المتكررة
  const prevDataRef = useRef(null);

  const handleInputChange = (name, value) => {
    setApps(
      apps.map((app) => (app.name === name ? { ...app, link: value } : app))
    );
  };

  const handleCheckboxChange = (name) => {
    setApps(
      apps.map((app) =>
        app.name === name ? { ...app, checked: !app.checked } : app
      )
    );
  };

  const selectedApps = apps
    .filter((app) => app.checked)
    .map((app) => ({
      value: app.name,
      label: app.label,
    }));

  const getFormData = () => {
    const deliveryAppLinks = apps.reduce((acc, app) => {
      acc[app.name] = app.checked ? app.link : null;
      return acc;
    }, {});

    return {
      deliveryAppLinks,
      mainDeliveryApp,
      totalSelectedApps: apps.filter((app) => app.checked).length,
    };
  };

  // تحسين useEffect لمنع الاستدعاءات المتكررة
  useEffect(() => {
    if (!onDataChange) return;

    const currentData = getFormData();
    const currentDataString = JSON.stringify(currentData);

    // استدعاء onDataChange فقط إذا تغيرت البيانات فعلياً
    if (prevDataRef.current !== currentDataString) {
      prevDataRef.current = currentDataString;
      onDataChange(currentData);
    }
  }, [apps, mainDeliveryApp]); // حذف onDataChange من المصفوفة لمنع إعادة التنفيذ غير الضرورية

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <DeliveryApps
        apps={apps}
        onCheckboxChange={handleCheckboxChange}
        onInputChange={handleInputChange}
      />

      <div className="md:col-start-1 md:col-span-2 flex justify-end text-right">
        <div className="w-96">
          <SelectInput
            name="mainDeliveryApp"
            label="تطبيق التوصيل الرئيسي"
            value={mainDeliveryApp}
            onChange={(e) => setMainDeliveryApp(e.target.value)}
            options={selectedApps}
          />
        </div>
      </div>
    </div>
  );
};

// استخدام React.memo للحد من عمليات إعادة التصيير غير الضرورية
export default React.memo(DeliveryForm);
