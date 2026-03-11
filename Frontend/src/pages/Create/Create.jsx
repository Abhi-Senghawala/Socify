import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout"
import { useCreate } from "../../hooks/useCreate";
import CreateHeader from "../../components/create/CreateHeader";
import MediaUploader from "../../components/create/MediaUploader";
import CaptionInput from "../../components/create/CaptionInput";
import LocationPicker from "../../components/create/LocationPicker";
import TagPeople from "../../components/create/TagPeople";
import PrivacySelector from "../../components/create/PrivacySelector";
import SchedulePost from "../../components/create/SchedulePost";
import CreateSuccess from "../../components/create/CreateSuccess";

const Create = () => {
  const navigate = useNavigate();
  const {
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
  } = useCreate();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderFiles(result.source.index, result.destination.index);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <CreateHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onClose={() => navigate(-1)}
        />
        <div className="mt-6 space-y-6">
          <MediaUploader
            mediaFiles={mediaFiles}
            onUpload={handleFileUpload}
            onRemove={removeFile}
            onReorder={handleDragEnd}
            activeTab={activeTab}
          />
          <CaptionInput value={caption} onChange={setCaption} />
          <LocationPicker
            location={location}
            setLocation={setLocation}
            showLocationSearch={showLocationSearch}
            setShowLocationSearch={setShowLocationSearch}
            locationResults={locationResults}
            selectLocation={selectLocation}
          />
          <TagPeople
            taggedUsers={taggedUsers}
            onRemoveTag={removeTag}
            showTagModal={showTagModal}
            setShowTagModal={setShowTagModal}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            suggestedUsers={suggestedUsers}
            onTagUser={tagUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PrivacySelector privacy={privacy} onChange={setPrivacy} />

            <SchedulePost
              showSchedule={showSchedule}
              setShowSchedule={setShowSchedule}
              scheduleTime={scheduleTime}
              setScheduleTime={setScheduleTime}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleDiscard}
              className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 font-semibold hover:bg-white/10 transition-all"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || mediaFiles.length === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Publishing...</span>
                </div>
              ) : (
                `Publish ${activeTab === "post" ? "Post" : activeTab === "story" ? "Story" : "Reel"}`
              )}
              {loading && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              )}
            </button>
          </div>
        </div>
        {showSuccess && (
          <CreateSuccess type={activeTab} onClose={() => navigate("/")} />
        )}
      </div>
    </Layout>
  );
};

export default Create;
