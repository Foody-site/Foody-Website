const Button = ({ label, onClick, className = "", type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full p-3 text-white font-semibold rounded-md  ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
