import React, { useState } from "react";
import { X, Camera, Link as LinkIcon } from "lucide-react";

const EditProfileModal = ({ profile, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || "",
    username: profile?.username || "",
    bio: profile?.bio || "",
    website: profile?.website || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    gender: profile?.gender || "prefer not to say",
    private: profile?.private || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-gray-900 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-lg">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 max-h-[70vh] overflow-y-auto"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full `bg-gradient-to-r` from-purple-500 to-pink-500"></div>
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Camera size={12} className="text-white" />
              </button>
            </div>
            <div>
              <p className="text-white font-medium">Profile Photo</p>
              <p className="text-xs text-gray-400">
                Recommended: Square JPG/PNG, at least 400x400
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
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
              <label className="block text-sm text-gray-400 mb-1">
                Website
              </label>
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
                  placeholder="https://example.com"
                />
              </div>
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

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="private"
                checked={formData.private}
                onChange={handleChange}
                id="private"
                className="w-4 h-4 rounded border-white/30 bg-white/5 text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="private" className="text-sm text-gray-300">
                Private account
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 `bg-gradient-to-r` from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
