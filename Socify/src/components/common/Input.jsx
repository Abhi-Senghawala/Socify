import React from "react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  error,
  label,
  floating = false,
  focused = false,
  ...props
}) => {
  return (
    <div className="w-full">
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <Icon
              className={`h-5 w-5 transition-colors duration-200 ${
                focused ? "text-purple-400" : "text-gray-400"
              }`}
            />
          </div>
        )}

        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
          >
            <RightIcon
              className={`h-5 w-5 transition-colors duration-200 hover:text-purple-400 ${
                focused ? "text-purple-400" : "text-gray-400"
              }`}
            />
          </button>
        )}

        <input
          type={type}
          placeholder={floating ? " " : placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`
            w-full 
            px-4 py-3.5
            ${Icon ? "pl-10" : "pl-4"}
            ${RightIcon ? "pr-10" : "pr-4"}
            bg-white/5
            backdrop-blur-sm
            border-2
            ${
              error
                ? "border-pink-500/50 focus:border-pink-500"
                : focused
                  ? "border-purple-500/50"
                  : "border-white/10 hover:border-white/20"
            }
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500/20
            transition-all
            duration-300
            placeholder:text-white
            text-white
            text-base
            ${focused ? "bg-white/10" : ""}
          `}
          {...props}
        />

        {floating && label && (
          <label
            className={`
              absolute left-10 transition-all duration-300 pointer-events-none
              ${
                focused || value
                  ? "-top-5 left-9 text-xs text-purple-400"
                  : "top-3.5 left-10 text-white"
              }
            `}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-pink-400 flex items-center gap-1 animate-slideDown">
          <span className="w-1 h-1 bg-pink-400 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
