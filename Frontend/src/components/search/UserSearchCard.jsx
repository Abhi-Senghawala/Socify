import React, { useState } from "react";
import { Link } from "react-router";
import { UserPlus, UserCheck, Check, MoreHorizontal } from "lucide-react";

const UserSearchCard = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleFollow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };

  return (
    <Link
      to={`/profile/${user.username}`}
      className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors rounded-xl group"
    >
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        {user.verified && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-gray-900">
            <Check size={12} className="text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-white font-semibold">{user.name}</h3>
          <span className="text-gray-400 text-sm">@{user.username}</span>
          {user.private && (
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-400">
              Private
            </span>
          )}
        </div>

        <p className="text-sm text-gray-400 line-clamp-1 mt-1">{user.bio}</p>

        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          <span>{user.followersCount.toLocaleString()} followers</span>
          <span>{user.postsCount} posts</span>
          {user.followedBy && (
            <span className="text-gray-400">
              Followed by {user.followedBy[0]}
              {user.followedBy.length > 1 && ` +${user.followedBy.length - 1}`}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleFollow}
        className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
          isFollowing
            ? "bg-white/5 text-white hover:bg-white/10 border border-white/10"
            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
        }`}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
      <button className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors">
        <MoreHorizontal size={18} className="text-gray-400" />
      </button>
    </Link>
  );
};

export default UserSearchCard;
