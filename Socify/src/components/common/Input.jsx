import React from "react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  label,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400"></Icon>
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 ${Icon ? "pl-10" : "pl-4"}
                    bg-gray-50 dark:bg-gray-800
                    border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-700"}
                    rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                    transition-all duration-200
                    placeholder:text-gray-400
                    dark:text-white`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
