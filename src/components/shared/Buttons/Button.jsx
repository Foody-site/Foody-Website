const Button = ({ label, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`btn bg-primary-1 hover:bg-hover_primary-1 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;