import React, { useState, useRef, useEffect } from "react";
import { Search, X, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const SearchHeader = ({
  searchQuery,
  onSearch,
  onClear,
  suggestions,
  onSuggestionClick,
  onToggleFilters,
  showFilters,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearch(value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setShowSuggestions(false);
      onSearch(searchQuery);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    if (suggestion.type === "user") {
      onSearch(suggestion.text);
    } else if (suggestion.type === "hashtag") {
      onSearch(suggestion.text);
    }
    setShowSuggestions(false);
  };

  return (
    <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-xl border-b border-white/10 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
          <div className="flex-1 max-w-2xl mx-auto relative">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />

              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search people, posts, hashtags..."
                className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  onClick={onClear}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50"
              >
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors"
                  >
                    {suggestion.avatar ? (
                      <img
                        src={suggestion.avatar}
                        alt={suggestion.text}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                        #
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-white text-sm font-medium">
                        {suggestion.text}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {suggestion.subtext}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={onToggleFilters}
            className={`p-3 rounded-xl transition-all ${
              showFilters
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
