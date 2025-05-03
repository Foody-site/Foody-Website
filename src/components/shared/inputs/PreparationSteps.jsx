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

  // تنفيذ تحديث فقط عند تغير الـ currentSteps من المكون الأب
  useEffect(() => {
    if (
      currentSteps.length > 0 &&
      JSON.stringify(currentSteps) !== JSON.stringify(steps)
    ) {
      setSteps(currentSteps);
    }
  }, [currentSteps]);

  // لا يوجد useEffect لاستدعاء onChange، بدلاً من ذلك نستدعيها مباشرة بعد كل تغيير

  const addStep = () => {
    if (steps.length < maxSteps) {
      const newSteps = [...steps, ""];
      setSteps(newSteps);
      // استدعاء onChange مباشرة بعد تحديث الحالة المحلية
      const validSteps = newSteps.filter((step) => step.trim() !== "");
      onChange(validSteps);
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

  const handleRemoveStep = (index) => {
    let updatedSteps;
    if (steps.length > 1) {
      updatedSteps = steps.filter((_, i) => i !== index);
    } else {
      updatedSteps = [""];
    }
    setSteps(updatedSteps);
    // استدعاء onChange مباشرة بعد تحديث الحالة المحلية
    const validSteps = updatedSteps.filter((step) => step.trim() !== "");
    onChange(validSteps);
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-gray-700 font-medium mb-2 text-right">
        خطوات التحضير للوصفة
      </label>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-2 mb-2 w-full">
          <textarea
            name={`preparationStep-${index}`}
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
            className="w-full h-24 px-4 py-3 text-lg border border-gray-300 rounded-lg text-right"
            placeholder={`الخطوة ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => handleRemoveStep(index)}
            className="text-primary-1 px-2"
          >
            <FaTrash />
          </button>
        </div>
      ))}
      {steps.length < maxSteps && (
        <button
          type="button"
          onClick={addStep}
          className="flex items-center text-primary-1 mt-3"
        >
          <FaPlus className="text-2xl" />
          <span className="mr-2">أضف خطوة جديدة</span>
        </button>
      )}
      {error && <p className="text-primary-1 text-sm mt-1 text-right">{error}</p>}
    </div>
  );
};

export default PreparationSteps;
