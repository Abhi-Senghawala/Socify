import React from "react";
import UserSearchCard from "./UserSearchCard";
import PostSearchCard from "./PostSearchCard";
import HashtagSearchCard from "./HashtagSearchCard";
import NoResults from "./NoResults";

const SearchResults = ({ activeTab, results, query }) => {
  const renderResults = () => {
    if (!results[activeTab] || results[activeTab].length === 0) {
      return <NoResults query={query} activeTab={activeTab} />;
    }

    switch (activeTab) {
      case "users":
        return results.users.map((user) => (
          <UserSearchCard key={user.id} user={user} />
        ));

      case "posts":
        return results.posts.map((post) => (
          <PostSearchCard key={post.id} post={post} />
        ));

      case "hashtags":
        return results.hashtags.map((hashtag) => (
          <HashtagSearchCard key={hashtag.id} hashtag={hashtag} />
        ));

      case "reels":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {results.reels.map((reel) => (
              <div
                key={reel.id}
                className="relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={reel.thumbnail}
                  alt="Reel"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={reel.user.avatar}
                        alt={reel.user.username}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-white text-xs font-medium">
                        {reel.user.username}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-white text-xs">
                      <span>{reel.views.toLocaleString()} views</span>
                      <span>{reel.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                  {reel.duration}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return results.top.map((result) => {
          if (result.type === "user") {
            return <UserSearchCard key={result.id} user={result} />;
          } else if (result.type === "post") {
            return <PostSearchCard key={result.id} post={result} />;
          } else {
            return <HashtagSearchCard key={result.id} hashtag={result} />;
          }
        });
    }
  };

  return <div className="divide-y divide-white/5">{renderResults()}</div>;
};

export default SearchResults;