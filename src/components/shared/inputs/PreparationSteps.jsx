import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const PreparationSteps = ({ className = "", onChange }) => {
  const [steps, setSteps] = useState([""]);

  const addStep = () => {
    const newSteps = [...steps, ""];
    setSteps(newSteps);
    onChange(newSteps);
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
    onChange(updatedSteps);
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
