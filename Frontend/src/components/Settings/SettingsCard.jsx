import React from "react";
import { Save, AlertCircle, CheckCircle } from "lucide-react";

const SettingsCard = ({
  title,
  description,
  children,
  onSave,
  loading,
  success,
  error,
}) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        )}
      </div>

      <div className="p-6">{children}</div>

      {(onSave || success || error) && (
        <div className="p-6 border-t border-white/10 bg-white/5">
          {success && (
            <div className="flex items-center gap-2 text-green-400 text-sm mb-4">
              <CheckCircle size={16} />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm mb-4">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {onSave && (
            <div className="flex justify-end">
              <button
                onClick={onSave}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingsCard;
