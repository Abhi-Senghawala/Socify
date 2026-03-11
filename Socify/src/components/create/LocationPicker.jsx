import React from "react";
import { MapPin, Search, X } from "lucide-react";

const LocationPicker = ({
  location,
  setLocation,
  showLocationSearch,
  setShowLocationSearch,
  locationResults,
  selectLocation,
}) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
      <h3 className="text-white font-semibold text-sm mb-3">Location</h3>

      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <MapPin
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setShowLocationSearch(true)}
              placeholder="Add location"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            {location && (
              <button
                onClick={() => setLocation("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X size={16} className="text-gray-400 hover:text-white" />
              </button>
            )}
          </div>
        </div>

        {showLocationSearch && locationResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-xl border border-white/10 shadow-2xl overflow-hidden z-10">
            {locationResults.map((loc) => (
              <button
                key={loc.id}
                onClick={() => selectLocation(loc)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
              >
                <MapPin size={16} className="text-gray-400" />
                <div className="text-left">
                  <p className="text-white text-sm">{loc.name}</p>
                  <p className="text-xs text-gray-400">{loc.country}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPicker;
