import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useCreate = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("post");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [privacy, setPrivacy] = useState("public");
  const [scheduleTime, setScheduleTime] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [locationResults, setLocationResults] = useState([]);

  const mockUsers = [
    {
      id: 1,
      username: "alexj",
      name: "Alex Johnson",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    },
    {
      id: 2,
      username: "sarahc",
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108777-296fd3c5c1b2?w=100",
    },
    {
      id: 3,
      username: "miker",
      name: "Mike Rivera",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
    },
    {
      id: 4,
      username: "emmaw",
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
  ];

  const mockLocations = [
    { id: 1, name: "New York", country: "USA" },
    { id: 2, name: "Los Angeles", country: "USA" },
    { id: 3, name: "London", country: "UK" },
    { id: 4, name: "Paris", country: "France" },
    { id: 5, name: "Tokyo", country: "Japan" },
    { id: 6, name: "Sydney", country: "Australia" },
  ];

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "video",
      progress: 0,
    }));

    if (activeTab === "post" && newFiles.length + mediaFiles.length > 10) {
      alert("You can only upload up to 10 images per post");
      return;
    }

    if (activeTab === "story" && newFiles.length > 1) {
      alert("You can only upload one story at a time");
      return;
    }

    if (activeTab === "reel" && newFiles.length > 1) {
      alert("You can only upload one reel at a time");
      return;
    }

    setMediaFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setMediaFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, progress } : f)),
        );
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);
    });
  };

  const removeFile = (fileId) => {
    setMediaFiles((prev) => {
      const file = prev.find((f) => f.id === fileId);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const reorderFiles = (startIndex, endIndex) => {
    const result = Array.from(mediaFiles);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setMediaFiles(result);
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSuggestedUsers(filtered);
    } else {
      setSuggestedUsers([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (location.trim()) {
      const filtered = mockLocations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(location.toLowerCase()) ||
          loc.country.toLowerCase().includes(location.toLowerCase()),
      );
      setLocationResults(filtered);
    } else {
      setLocationResults([]);
    }
  }, [location]);

  const tagUser = (user) => {
    if (!taggedUsers.find((u) => u.id === user.id)) {
      setTaggedUsers((prev) => [...prev, user]);
    }
    setShowTagModal(false);
    setSearchQuery("");
  };

  const removeTag = (userId) => {
    setTaggedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const selectLocation = (loc) => {
    setLocation(`${loc.name}, ${loc.country}`);
    setShowLocationSearch(false);
  };
  const handleSubmit = async () => {
    if (mediaFiles.length === 0) {
      alert("Please select at least one media file");
      return;
    }

    setLoading(true);

    try {
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      const postData = {
        id: Date.now(),
        type: activeTab,
        media: mediaFiles.map((f) => ({
          url: f.preview,
          type: f.type,
        })),
        caption,
        location: location || null,
        taggedUsers,
        privacy,
        scheduledFor: scheduleTime,
        createdAt: new Date().toISOString(),
      };

      console.log("Post created:", postData);
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    if (mediaFiles.length > 0 || caption || location) {
      if (window.confirm("Discard this post?")) {
        mediaFiles.forEach((f) => {
          if (f.preview) {
            URL.revokeObjectURL(f.preview);
          }
        });
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    return () => {
      mediaFiles.forEach((f) => {
        if (f.preview) {
          URL.revokeObjectURL(f.preview);
        }
      });
    };
  }, []);

  return {
    activeTab,
    setActiveTab,
    mediaFiles,
    caption,
    setCaption,
    location,
    setLocation,
    taggedUsers,
    privacy,
    setPrivacy,
    scheduleTime,
    setScheduleTime,
    showSchedule,
    setShowSchedule,
    loading,
    uploadProgress,
    showSuccess,
    showTagModal,
    setShowTagModal,
    searchQuery,
    setSearchQuery,
    suggestedUsers,
    showLocationSearch,
    setShowLocationSearch,
    locationResults,
    handleFileUpload,
    removeFile,
    reorderFiles,
    tagUser,
    removeTag,
    selectLocation,
    handleSubmit,
    handleDiscard,
  };
};
