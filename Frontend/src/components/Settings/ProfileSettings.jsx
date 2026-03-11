import React, { useState } from "react";
import { Camera, Link as LinkIcon, MapPin, Calendar } from "lucide-react";
import SettingsCard from "./SettingsCard";

const ProfileSettings = ({
  profile,
  onUpdate,
  onSave,
  loading,
  success,
  error,
}) => {
  const [formData, setFormData] = useState(profile);
  const [avatarHover, setAvatarHover] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    onUpdate(name, value);
  };

  return (
    <SettingsCard
      title="Profile Settings"
      description="Manage your public profile information"
      onSave={onSave}
      loading={loading}
      success={success}
      error={error}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div
            className="relative"
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={formData.avatar}
                alt={formData.name}
                className="w-full h-full object-cover"
              />
            </div>

            {avatarHover && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer">
                <Camera size={24} className="text-white" />
              </div>
            )}
          </div>

          <div>
            <h4 className="text-white font-medium">Profile Photo</h4>
            <p className="text-sm text-gray-400 mt-1">
              Recommended: Square JPG/PNG, at least 400x400
            </p>
            <button className="mt-2 text-sm text-purple-400 hover:underline">
              Change Photo
            </button>
          </div>
        </div>

        <div className="relative h-32 rounded-xl overflow-hidden">
          <img
            src={formData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
            <Camera size={24} className="text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
              placeholder="Tell your story..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Website</label>
            <div className="relative">
              <LinkIcon
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Location</label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Birth Date
            </label>
            <div className="relative">
              <Calendar
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
};

export default ProfileSettings;
