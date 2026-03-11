import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Film, Image as ImageIcon, Move } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MediaUploader = ({
  mediaFiles,
  onUpload,
  onRemove,
  onReorder,
  activeTab,
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onUpload(acceptedFiles);
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      activeTab === "reel"
        ? { "video/*": [] }
        : { "image/*": [], "video/*": [] },
    maxSize: activeTab === "reel" ? 100 * 1024 * 1024 : 50 * 1024 * 1024, // 100MB for reels, 50MB for others
    multiple: activeTab === "post",
  });

  const getFileIcon = (type) => {
    return type === "video" ? <Film size={20} /> : <ImageIcon size={20} />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (mediaFiles.length === 0) {
    return (
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
          isDragActive
            ? "border-purple-500 bg-purple-500/10"
            : "border-white/10 hover:border-purple-500/50 hover:bg-white/5"
        }`}
      >
        <input {...getInputProps()} />
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-4">
          <Upload size={32} className="text-purple-400" />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">
          {isDragActive ? "Drop files here" : "Upload Media"}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {activeTab === "post" && "Drag & drop up to 10 images or videos"}
          {activeTab === "story" &&
            "Drag & drop a photo or video for your story"}
          {activeTab === "reel" &&
            "Drag & drop a video for your reel (max 100MB)"}
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all">
          Select Files
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activeTab === "post" && mediaFiles.length < 10 && (
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-purple-500/50 hover:bg-white/5 transition-all"
        >
          <input {...getInputProps()} />
          <p className="text-gray-400 text-sm">
            <Upload size={16} className="inline mr-2" />
            Add more files ({mediaFiles.length}/10)
          </p>
        </div>
      )}

      <DragDropContext onDragEnd={onReorder}>
        <Droppable droppableId="media" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`grid gap-4 ${
                activeTab === "post"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {mediaFiles.map((file, index) => (
                <Draggable
                  key={file.id}
                  draggableId={file.id}
                  index={index}
                  isDragDisabled={activeTab !== "post"}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`relative group rounded-xl overflow-hidden border-2 ${
                        snapshot.isDragging
                          ? "border-purple-500"
                          : "border-white/10"
                      }`}
                    >
                      <div className="aspect-square">
                        {file.type === "video" ? (
                          <video
                            src={file.preview}
                            className="w-full h-full object-cover"
                            controls={false}
                          />
                        ) : (
                          <img
                            src={file.preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {file.progress < 100 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                        </div>
                      )}
                      {activeTab === "post" && (
                        <div
                          {...provided.dragHandleProps}
                          className="absolute top-2 left-2 p-1.5 bg-gray-900/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
                        >
                          <Move size={14} className="text-white" />
                        </div>
                      )}
                      <button
                        onClick={() => onRemove(file.id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/80 backdrop-blur-sm rounded-lg hover:bg-red-500 transition-colors"
                      >
                        <X size={14} className="text-white" />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-gray-900/80 backdrop-blur-sm rounded-lg text-xs text-white">
                        {getFileIcon(file.type)}
                        <span className="ml-1">
                          {formatFileSize(file.file.size)}
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MediaUploader;
