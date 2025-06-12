import React, { useState } from "react";
import SelectInput from "../inputs/SelectInput";
import DeliveryApps from './../inputs/DeliveryApps';

const DeliveryForm = () => {
  const [apps, setApps] = useState([
    { name: "keeta", label: "كيتا", checked: false },
    { name: "jahez", label: "جاهز", checked: false },
    { name: "hungerStation", label: "هنقرستيشن", checked: false },
    { name: "mrsool", label: "مرسول", checked: false },
    { name: "noon", label: "نون", checked: false },
    { name: "toyou", label: "تويو", checked: false },
    { name: "theChefz", label: "ذا شيفز", checked: false },
    { name: "uber", label: "اوبر", checked: false },
    { name: "mrMandoob", label: "مستر مندوب", checked: false },
    { name: "other", label: "أخرى", checked: false },
    { name: "careem", label: "كريم", checked: false },
    { name: "shgardi", label: "شقر دي", checked: false },
  ]);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <DeliveryApps apps={apps} onCheckboxChange={handleCheckboxChange} />

      <div className="md:col-start-1 md:col-span-2 flex justify-end text-right">
        <div className="w-96">
          <SelectInput
            name="mainDeliveryApp"
            label="تطبيق التوصيل الرئيسي"
            className="h-12 px-6 text-xl py-4"
            options={selectedApps}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
