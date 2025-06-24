import { GrInProgress } from "react-icons/gr";

const UnderConstruction = () => {
  return (
    <>
      {/* إضافة نمط CSS مخصص للدوران البطيء */}
      <style>
        {`
          @keyframes slowRotation {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          .slow-spin {
            animation: slowRotation 5s linear infinite;
          }
        `}
      </style>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 rtl">
        <div className="mb-8">
          <GrInProgress className="w-32 h-32 text-red-500 slow-spin" />
        </div>
        <h1 className="text-5xl font-bold text-gray-800">
          هذه الصفحه تحت التطوير
        </h1>
      </div>
    </>
  );
};

export default UnderConstruction;
