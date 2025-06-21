import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const PreparationSteps = ({
  className = "",
  onChange,
  maxSteps = 20,
  error,
  currentSteps = [],
}) => {
  // استخدام مرجع لمتابعة التحديثات الأولية
  const [steps, setSteps] = useState(
    currentSteps.length > 0 ? currentSteps : [""]
  );
  // إضافة state للخطوة المحددة حالياً
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  // تنفيذ تحديث فقط عند تغير الـ currentSteps من المكون الأب
  useEffect(() => {
    if (
      currentSteps.length > 0 &&
      JSON.stringify(currentSteps) !== JSON.stringify(steps)
    ) {
      setSteps(currentSteps);
    }
  }, [currentSteps]);

  const addStep = () => {
    if (steps.length < maxSteps) {
      const newSteps = [...steps, ""];
      setSteps(newSteps);
      // استدعاء onChange مباشرة بعد تحديث الحالة المحلية
      const validSteps = newSteps.filter((step) => step.trim() !== "");
      onChange(validSteps);
      // تحديد الخطوة الجديدة كخطوة محددة
      setSelectedStepIndex(newSteps.length - 1);
    }
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
    // استدعاء onChange مباشرة بعد تحديث الحالة المحلية
    const validSteps = updatedSteps.filter((step) => step.trim() !== "");
    onChange(validSteps);
  };

  const handleSelectStep = (index) => {
    setSelectedStepIndex(index);
  };

  const handleRemoveStep = () => {
    // استخدام selectedStepIndex للحذف
    let updatedSteps;
    if (steps.length > 1) {
      updatedSteps = steps.filter((_, i) => i !== selectedStepIndex);
    } else {
      updatedSteps = [""];
    }
    setSteps(updatedSteps);

    // تعديل المؤشر المحدد بعد الحذف
    if (selectedStepIndex >= updatedSteps.length) {
      setSelectedStepIndex(updatedSteps.length - 1);
    }

    const validSteps = updatedSteps.filter((step) => step.trim() !== "");
    onChange(validSteps);
  };

  return (
    <div className={`w-full ${className}`}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`mb-2 w-full ${index === selectedStepIndex ? "" : ""}`}
          onClick={() => handleSelectStep(index)}
        >
          <textarea
            name={`preparationStep-${index}`}
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
            className="w-full px-4 py-3 text-lg border bg-gray-100 border-gray-300 rounded-lg text-right"
            placeholder={`الخطوة ${index + 1}`}
          />
        </div>
      ))}

      <div className="flex justify-between mt-3">
        <button
          type="button"
          onClick={handleRemoveStep}
          className="text-primary-1 px-2 flex items-center"
          disabled={steps.length <= 1}
        >
          <FaTrash className="text-xl" />
        </button>
        {steps.length < maxSteps && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={addStep}
              className="flex flex-row-reverse items-center text-primary-1"
            >
              <FaPlus className="text-2xl" />
              <span className="ml-2">اضافة المزيد من الخطوات</span>
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-primary-1 text-sm mt-1 text-right">{error}</p>
      )}
    </div>
  );
};

export default PreparationSteps;
