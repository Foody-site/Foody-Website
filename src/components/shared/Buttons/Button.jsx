const Button = ({ label, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 text-white font-semibold rounded-md  ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;