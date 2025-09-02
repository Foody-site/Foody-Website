const Spinner = ({ size = 12, color = "border-primary-1", className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 ${color}`}
      ></div>
    </div>
  );
};

export default Spinner;
