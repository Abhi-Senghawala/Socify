import { useState, useEffect, useCallback, act } from "react";
import { resolvePath, useParams } from "react-router";

export const useProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (profile) {
      fetchPosts();
    }
  }, [activeTab, page, profile]);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock Profile Data
      const mockProfile = {
        id: "1",
        username: username || "_unknown",
        fullName: "User",
        bio: "Software Engineer | Frontend Developer",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
        coverImage:
          "https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?w=1200",
        website: "www.unknown.com",
        email: "unknown@gmail.com",
        phone: "1111111111",
        gender: "Male",
        private: false,
        verified: true,
        postsCount: 42,
        followersCount: 1234,
        followingCount: 567,
        isFollowing: false,
        isCurrentUser: username === "current_user",
        joinedDate: "January 2026",
      };

      setProfile(mockProfile);
      setFollowersCount(mockProfile.followersCount);
      setFollowingCount(mockProfile.followingCount);
      setPostsCount(mockProfile.postsCount);
      setIsFollowing(mockProfile.isFollowing);
    } catch (err) {
      setError("Failed to load profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    if (!hasMore && page > 1) return;
    setLoadingMore(page > 1);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockPosts = generateMockPosts(activeTab, page);

      if (page === 1) {
        setPosts(mockPosts);
      } else {
        setPosts((prev) => [...prev, ...mockPosts]);
      }

      setHasMore(mockPosts.length === 9);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const generateMockPosts = (tab, pageNum) => {
    const basePosts = [];
    const count = 9;

    for (let i = 0; i < count; i++) {
      const id = (pageNum - 1) * count + i + 1;
      basePosts.push({
        id: `post-${id}`,
        image: `https://images.unsplash.com/photo-${1500000000 + id}?w=400`,
        type: tab === "reels" ? "video" : "image",
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
        caption: `This is post ${id} #awesome #cool`,
        createdAt: new Date().toISOString(),
        location: id % 2 === 0 ? "New York" : null,
        isLiked: false,
        isSaved: false,
      });
    }

    return basePosts;
  };

  const handleFollow = useCallback(async () => {
    try {
      setIsFollowing((prev) => !prev);
      setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));

      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (err) {
      setIsFollowing((prev) => !prev);
      setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));
      console.error("Error Following User:", err);
    }
  }, [isFollowing]);

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = async (updatedData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProfile((prev) => ({ ...prev, ...updatedData }));
      setShowEditModal(false);
    } catch (err) {
      console.error("Error Updating Profile", err);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
    setHasMore(true);
  };

  return {
    profile,
    posts,
    loading,
    error,
    activeTab,
    isFollowing,
    followersCount,
    followingCount,
    postsCount,
    showEditModal,
    selectedPost,
    hasMore,
    loadingMore,
    setShowEditModal,
    handleFollow,
    handleEditProfile,
    handleSaveProfile,
    handlePostClick,
    handleCloseModal,
    handleLoadMore,
    handleTabChange,
  };
};
