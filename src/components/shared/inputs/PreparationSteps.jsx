import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const PreparationSteps = ({ className = "", onChange }) => {
  const [steps, setSteps] = useState([""]);

  const addStep = () => {
    setSteps((prevSteps) => [...prevSteps, ""]);
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const handleBlur = () => {
    // أولاً: إزالة الخطوات الفارغة
    const cleanedSteps = steps.filter(step => step.trim() !== "");
  
    // ثانياً: فصل الخطوات المدموجة بفواصل
    const separatedSteps = cleanedSteps.flatMap(step => step.split(",").map(s => s.trim()));
  
    // ثالثاً: إزالة المكررات (لو فيه نفس الخطوة مكررة)
    const finalSteps = [...new Set(separatedSteps)];
  
    // لو كانت المصفوفة فاضية بعد التنظيف، نضيف خطوة فارغة واحدة
    if (finalSteps.length === 0) {
      setSteps([""]);
      onChange([""]); // إرسال خطوة فارغة فقط
    } else {
      setSteps(finalSteps);
      onChange(finalSteps); // إرسال الخطوات النظيفة والمفصولة
    }
  };
    
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-gray-700 font-medium mb-2 text-right">
        خطوات التحضير للوصفة
      </label>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-2 mb-2 w-full">
          <textarea
            name="preparationSteps"
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
            onBlur={handleBlur} // تحديث الخطوات عند فقدان التركيز فقط
            className="w-full h-24 px-4 py-3 text-lg border border-gray-300 rounded-lg text-right"
            placeholder={`الخطوة ${index + 1}`}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addStep}
        className="flex items-center text-primary-1 mt-3"
      >
        <FaPlus className="text-2xl" />
        <span className="ml-2">أضف خطوة جديدة</span>
      </button>
    </div>
  );
};

export default PreparationSteps;
