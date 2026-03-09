import React from "react";
import { UserPlus, UserCheck } from "lucide-react";

const FollowButton = ({ isFollowing, onFollow, size = 'md' }) => {
    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            onClick={onFollow}
            className={`flex items-center justify-center gap-2 rounded-xl font-semibold transition-all ${isFollowing
                    ? "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    : "`bg-gradient-to-r` from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
                } ${sizes[size]}`}
        >
            {isFollowing ? (
                <>
                    <UserCheck size={16} />
                    <span>Following</span>
                </>
            ) : (
                <>
                    <UserPlus size={16} />
                    <span>Follow</span>
                </>
            )}
        </button>
    );
};

export default FollowButton;