import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = "",
  ...props
}) => {
  const baseClasses =
    "relative font-semibold rounded-xl transition-all duration-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white focus:ring-purple-500 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40",
    secondary:
      "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 focus:ring-white/50",
    outline:
      "border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 focus:ring-purple-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 `bg-gradient-to-r` from-transparent via-white/20 to-transparent" />

      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="animate-pulse">Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
