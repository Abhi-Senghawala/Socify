import React from "react";

const Avatar = ({ src, username, size = 'md', className = '' }) => {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-14 h-14 text-lg',
        xl: 'w-20 h-20 text-xl',
    };

    const getInitials = (name) => {
        return name?.charAt(0).toUpperCase() || '?';
    };

    return (
        <div className={`relative ${sizes[size]} rounded-full overflow-hidden ${className}`}>
            {src ? (<img src={src} alt={username} className="w-full h-full object-cover" />) : (
                <div className="w-full h-full `bg-gradient-to-r` from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">{getInitials(username)}</div>
            )}
        </div>
    );
};

export default Avatar;