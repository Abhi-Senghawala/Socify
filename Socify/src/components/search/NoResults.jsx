import React from "react";
import { SearchX } from "lucide-react";

const NoResults = ({ query, activeTab }) => {
  const getMessage = () => {
    switch (activeTab) {
      case "users":
        return "We couldn't find any users matching your search.";
      case "posts":
        return "No posts found for your search.";
      case "hashtags":
        return "No hashtags found. Try a different keyword.";
      case "reels":
        return "No reels found for your search.";
      default:
        return "No results found for your search.";
    }
  };

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
        <SearchX size={32} className="text-gray-500" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">
        No results for "{query}"
      </h3>
      <p className="text-gray-400 text-sm max-w-md mx-auto">{getMessage()}</p>
      <div className="mt-6">
        <p className="text-gray-500 text-sm">Try:</p>
        <ul className="text-gray-400 text-sm mt-2 space-y-1">
          <li>• Checking your spelling</li>
          <li>• Using more general keywords</li>
          <li>• Trying different filters</li>
        </ul>
      </div>
    </div>
  );
};

export default NoResults;
