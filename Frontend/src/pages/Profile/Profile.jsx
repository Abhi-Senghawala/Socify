import React from "react";
import Layout from "../../components/layout/Layout";
import { useProfile } from "../../hooks/useProfile";
import ProfileHeader from "../../components/profile/profileHeader";
import ProfileGrid from "../../components/profile/ProfileGrid";
import ProfilePostModal from "../../components/profile/ProfilePostModal";
import EditProfileModal from "../../components/profile/EditProfileModal";

const Profile = () => {
  const {
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
  } = useProfile();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-500 rounded-full animate-spin animate-delay-150"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !profile) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Profile Not Found
            </h2>
            <p className="text-gray-400">
              The profile you are looking for doesn't exists.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <ProfileHeader
          profile={profile}
          isFollowing={isFollowing}
          followersCount={followersCount}
          followingCount={followingCount}
          postsCount={postsCount}
          onFollow={handleFollow}
          onEditProfile={handleEditProfile}
          onMessage={() => console.log("Message")}
          isCurrentUser={profile.isCurrentUser}
        />

        <ProfileTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isCurrentUser={profile.isCurrentUser}
        />

        <div className="mt-4">
          <ProfileGrid
            posts={posts}
            onPostClick={handlePostClick}
            loadingMore={loadingMore}
          />
        </div>

        {hasMore && posts.length > 0 && (
          <div className="text-center py-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all"
            >
              Load More
            </button>
          </div>
        )}

        {selectedPost && (
          <ProfilePostModal post={selectedPost} onClose={handleCloseModal} />
        )}

        {showEditModal && (
          <EditProfileModal
            profile={profile}
            onSave={handleSaveProfile}
            onClose={() => setShowEditModal(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Profile;