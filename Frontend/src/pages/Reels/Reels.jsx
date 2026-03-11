import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useReels } from "../../hooks/useReels";
import ReelPlayer from "../../components/reels/ReelPlayer";
import ReelOverlay from "../../components/reels/ReelOverlay";
import ReelActions from "../../components/reels/ReelActions";
import ReelComments from "../../components/reels/ReelComments";
import ReelUploadModal from "../../components/reels/ReelUploadModal";
import ReelSkeleton from "../../components/reels/ReelSkeleton";
import { ChevronUp, ChevronDown, Upload } from "lucide-react";

const Reels = () => {
  const {
    reels,
    currentIndex,
    loading,
    loadingMore,
    hasMore,
    muted,
    showComments,
    showUploadModal,
    volume,
    isPiPSupported,
    likedReels,
    savedReels,
    followedUsers,
    videoRefs,
    containerRef,
    setShowComments,
    setShowUploadModal,
    handleLike,
    handleSave,
    handleFollow,
    handleShare,
    toggleMute,
    handleVolumeChange,
    loadMore,
    handleWheel,
    navigate,
  } = useReels();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [handleWheel]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sat",
      "env(safe-area-inset-top)",
    );
    document.documentElement.style.setProperty(
      "--sab",
      "env(safe-area-inset-bottom)",
    );
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="h-screen bg-black">
          <ReelSkeleton />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        ref={containerRef}
        className="h-screen bg-black overflow-hidden relative"
      >
        <div className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className="h-screen snap-start snap-always relative"
              data-index={index}
            >
              <ReelPlayer
                reel={reel}
                isActive={index === currentIndex}
                videoRef={(el) => (videoRefs.current[index] = el)}
                muted={muted}
                volume={volume}
                onToggleMute={toggleMute}
                onVolumeChange={handleVolumeChange}
                isPiPSupported={isPiPSupported}
              />

              <ReelOverlay
                reel={reel}
                isFollowing={followedUsers.has(reel.user.id)}
                onFollow={() => handleFollow(reel.user.id)}
                onMoreClick={() => console.log("More options", reel.id)}
              />

              <ReelActions
                reel={reel}
                isLiked={likedReels.has(reel.id)}
                isSaved={savedReels.has(reel.id)}
                onLike={() => handleLike(reel.id)}
                onComment={() => setShowComments(true)}
                onShare={() => handleShare(reel)}
                onSave={() => handleSave(reel.id)}
              />

              {index > 0 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-12">
                  <ChevronUp
                    size={24}
                    className="text-white/60 animate-bounce"
                  />
                </div>
              )}
              {index < reels.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-1/2 translate-y-12">
                  <ChevronDown
                    size={24}
                    className="text-white/60 animate-bounce"
                  />
                </div>
              )}
            </div>
          ))}

          {loadingMore && (
            <div className="h-screen snap-start snap-al relative bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white">Loading more reels...</p>
              </div>
            </div>
          )}

          {!hasMore && reels.length > 0 && (
            <div className="h-screen snap-start snap-al relative bg-gray-900 flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-white text-lg mb-2">You're all caught up!</p>
                <p className="text-gray-400 text-sm">
                  Check back later for more reels
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  Go to Home
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-1 z-10">
          {reels.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-4 sm:h-8 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 h-6 sm:h-10"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {showComments && (
          <ReelComments
            reel={reels[currentIndex]}
            onClose={() => setShowComments(false)}
          />
        )}

        {showUploadModal && (
          <ReelUploadModal onClose={() => setShowUploadModal(false)} />
        )}
      </div>
    </Layout>
  );
};

export default Reels;