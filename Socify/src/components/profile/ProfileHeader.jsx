import React, { useState } from "react";
import {
  Settings,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Mail,
  Phone,
  Lock,
  ChevronDown,
  MoreHorizontal,
  MessageCircle,
  Check,
} from "lucide-react";
import Avatar from '../common/Avatar';
import FollowButton from '../common/FollowButton'

const ProfileHeader = ({
  profile,
  isFollowing,
  followersCount,
  followingCount,
  postsCount,
  onFollow,
  onEditProfile,
  onMessage,
  isCurrentUser,
}) => {
  const [showBio, setShowBio] = useState(false);
  const stats = [
    { label: "Posts", value: postsCount },
    { label: "Followers", value: followersCount.toLocaleString() },
    { label: "Following", value: followingCount.toLocaleString() },
  ];

  return (
    <div className="w-full">
      <div className="relative h-32 sm:h-48 md:h-64 w-full rounded-2xl overflow-hidden mb-16 sm:mb-20">
        <img
          src={
            profile?.coverImage ||
            "https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?w=1200"
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 `bg-gradient-to-t` from-gray-900/50 to-transparent"></div>

        {isCurrentUser && (
          <button
            onClick={onEditProfile}
            className="absolute top-4 right-4 p-2 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-gray-800 transition-all group"
          >
            <Settings
              size={20}
              className="text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300"
            />
          </button>
        )}
      </div>

      <div className="relative -mt-20 sm:-mt-24 ml-4 sm:ml-8 mb-4">
        <div className="relative inline-block">
          <Avatar
            src={profile?.avatar}
            username={profile?.username}
            size="xl"
            className="border-4 border-gray-900"
          />
          {profile?.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 `bg-gradient-to-r` from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-gray-900">
              <Check size={14} className="text-white" />
            </div>
          )}
        </div>
      </div>
      
      <div className="px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {profile?.fullName || profile?.username}
              </h1>
              {profile?.private && <Lock size={18} className="text-gray-400" />}
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              @{profile?.username}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isCurrentUser ? (
              <>
                <button
                  onClick={onEditProfile}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-semibold transition-all"
                >
                  Edit Profile
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                  <MoreHorizontal size={18} className="text-white" />
                </button>
              </>
            ) : (
              <>
                <FollowButton isFollowing={isFollowing} onFollow={onFollow} />
                <button
                  onClick={onMessage}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                >
                  <MessageCircle size={18} className="text-white" />
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                  <ChevronDown size={18} className="text-white" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex sm:hidden gap-6 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {stats.map((stat, index) => (
            <div key={index} className="`flex-shrink-0` text-center">
              <span className="block text-white font-bold text-lg">
                {stat.value}
              </span>
              <span className="text-gray-400 text-xs">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="hidden sm:flex gap-8 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center sm:text-left">
              <span className="text-white font-bold text-xl">{stat.value}</span>
              <span className="text-gray-400 text-sm ml-2">{stat.label}</span>
            </div>
          ))}
        </div>

        {profile?.bio && (
          <div className="mb-4">
            <p
              className={`text-gray-300 text-sm sm:text-base ${!showBio ? "line-clamp-2" : ""}`}
            >
              {profile.bio}
            </p>
            {profile.bio.length > 100 && (
              <button
                onClick={() => setShowBio(!showBio)}
                className="text-purple-400 text-sm mt-1 hover:underline"
              >
                {showBio ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400 mb-4">
          {profile?.website && (
            <a
              href={`https://${profile.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-purple-400 transition-colors"
            >
              <LinkIcon size={16} />
              <span className="truncate">{profile.website}</span>
            </a>
          )}

          {profile?.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{profile.location}</span>
            </div>
          )}

          {profile?.email && profile?.email !== profile?.username && (
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span className="truncate">{profile.email}</span>
            </div>
          )}

          {profile?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{profile.phone}</span>
            </div>
          )}

          {profile?.joinedDate && (
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Joined {profile.joinedDate}</span>
            </div>
          )}
        </div>
        
        {!isCurrentUser && profile?.followedBy && (
          <p className="text-sm text-gray-400">
            Followed by{" "}
            <span className="text-white font-semibold">
              {profile.followedBy[0]}
            </span>
            {profile.followedBy.length > 1 &&
              ` +${profile.followedBy.length - 1} more`}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;