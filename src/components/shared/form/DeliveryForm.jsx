import React, { useState, useEffect, useRef } from "react";
import SelectInput from "../inputs/SelectInput";
import DeliveryApps from "./../inputs/DeliveryApps";

const DeliveryForm = ({ onDataChange, initialData }) => {
  const defaultApps = [
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
  ];

  
  const [initialized, setInitialized] = useState(false);

  const [apps, setApps] = useState(defaultApps);
  const [mainDeliveryApp, setMainDeliveryApp] = useState("");


  const prevDataRef = useRef(null);

 
  useEffect(() => {
    
    if (initialData && !initialized) {
    
      setInitialized(true);

      console.log("Initializing DeliveryForm with data:", initialData);

      
      if (initialData.mainDeliveryApp) {
        setMainDeliveryApp(initialData.mainDeliveryApp);
      }

     
      if (initialData.deliveryAppLinks) {
        const updatedApps = defaultApps.map((app) => {
          const appLink = initialData.deliveryAppLinks[app.name];
        
          if (appLink) {
            return {
              ...app,
              checked: true,
              link: appLink,
            };
          }
          return app;
        });

        setApps(updatedApps);
      }
    }
  }, [initialData, initialized]);

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
   
      if (app.checked && app.link) {
        acc[app.name] = app.link;
      }
      return acc;
    }, {});

    return {
      deliveryAppLinks,
      mainDeliveryApp,
      totalSelectedApps: apps.filter((app) => app.checked).length,
    };
  };

  
  useEffect(() => {
    if (!onDataChange) return;

    const currentData = getFormData();
    const currentDataString = JSON.stringify(currentData);

    if (prevDataRef.current !== currentDataString) {
      prevDataRef.current = currentDataString;
      onDataChange(currentData);
    }
  }, [apps, mainDeliveryApp, onDataChange]);

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


export default React.memo(DeliveryForm);
