import React from "react";

const SocialButton = ({ provider, icon: Icon, onClick }) => {
  const providers = {
    google: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300",
    github: "bg-gray-900 hover:bg-gray-800 text-white",
    facebook: "bg-blue-600 hover:bg-blue-700 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`
                flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 ${providers[provider] || providers.google}`}
    >
      <Icon className="w-5 h-5" />
      <span>
        Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </span>
    </button>
  );
};

export default SocialButton;
