import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
const FeedContext = createContext();

export const useFeed = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error("useFeed must be used within a FeedProvider");
  }
  return context;
};

export const FeedProvider = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  useEffect(() => {
    fetchFeedData();
  }, []);

  const fetchFeedData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock Data for Temporary Period
      setStories(mockStories);
      setPosts(mockPosts);
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Like/Unlike function
  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });

    // Update post like counts
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + (likedPosts.has(postId) ? -1 : 1) }
          : post,
      ),
    );
  };

  //Save/Unsave function
  const toggleSave = (postId) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  //Add Comment
  const addComment = (postId, comment) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  username: "current_user",
                  userAvatar: "CU",
                  text: comment,
                  timestamp: "Just now",
                },
              ],
            }
          : post,
      ),
    );
  };

  return (
    <FeedContext.Provider
      value={{
        stories,
        posts,
        suggestions,
        loading,
        likedPosts,
        savedPosts,
        toggleLike,
        toggleSave,
        addComment,
        refreshFeed: fetchFeedData,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

// Mock Data
const mockStories = [
  {
    id: 1,
    username: "Your Story",
    avatar: "YS",
    isUser: true,
    seen: true,
    image:
      "https://i.pinimg.com/736x/5e/fe/4a/5efe4a7cbbc03554f7e98cb89e969c2d.jpg",
  },
  {
    id: 2,
    username: "abhi_2_4",
    avatar: "AB",
    seen: false,
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
  },
  {
    id: 3,
    username: "shivi30_",
    avatar: "SH",
    seen: true,
    image:
      "https://i.pinimg.com/1200x/ab/7e/15/ab7e157061e27a92bd57b611d7141162.jpg",
  },
  {
    id: 4,
    username: "princ_y62",
    avatar: "PY",
    seen: true,
    image:
      "https://i.pinimg.com/736x/c2/bb/3b/c2bb3bbe80af08d7e64e8111b4745fc7.jpg",
  },
  {
    id: 5,
    username: "priyawsnh...",
    avatar: "PR",
    seen: false,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
  },
  {
    id: 6,
    username: "im_riya",
    avatar: "SW",
    seen: true,
    image:
      "https://i.pinimg.com/736x/18/79/79/187979a028a4f77d01a4a1232c54f468.jpg",
  },
  {
    id: 7,
    username: "ayuxhi.67",
    avatar: "AY",
    seen: false,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
  },
  {
    id: 8,
    username: "theapex.life",
    avatar: "AP",
    seen: false,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
];

const mockPosts = [
  {
    id: 1,
    user: {
      username: "ayuxhi.67",
      avatar: "AY",
      verified: false,
    },
    location: "Mumbai, India",
    timeAgo: "2 d",
    content: "Beautiful sunset at the beach! 🌅 #beachlife #sunset",
    image:
      "https://i.pinimg.com/736x/6e/1b/49/6e1b499386ce35fc0e3470faadbb1e15.jpg",
    likes: 1234,
    comments: [
      {
        id: 1,
        username: "abhi_2_4",
        userAvatar: "AB",
        text: "Amazing shot! 🔥",
        timestamp: "1d",
      },
      {
        id: 2,
        username: "shivi30",
        userAvatar: "SH",
        text: "Where is this?",
        timestamp: "1d",
      },
    ],
    hasLiked: false,
    hasSaved: false,
  },
  {
    id: 2,
    user: {
      username: "theapex.life",
      avatar: "AP",
      verified: true,
    },
    location: "Dubai, UAE",
    timeAgo: "5 h",
    content: "Premium Side Of Life 🏆✨",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    likes: 8921,
    comments: [
      {
        id: 3,
        username: "priyawsnh...",
        userAvatar: "PR",
        text: "Goals! 🔥",
        timestamp: "4h",
      },
      {
        id: 4,
        username: "im_riya",
        userAvatar: "SW",
        text: "Amazing place",
        timestamp: "3h",
      },
    ],
    hasLiked: false,
    hasSaved: false,
  },
  {
    id: 3,
    user: {
      username: "ayuxiiiii",
      avatar: "AX",
      verified: true,
    },
    location: "At Home",
    timeAgo: "1 d",
    content: "Enjoy Life...",
    image:
      "https://i.pinimg.com/736x/8b/3f/01/8b3f019521e363035da9b2e1537056b4.jpg",
    likes: 15234,
    comments: [
      {
        id: 5,
        username: "parth_8578",
        userAvatar: "PA",
        text: "Can't wait! 🔥",
        timestamp: "20h",
      },
    ],
    hasLiked: false,
    hasSaved: false,
  },
];

const mockSuggestions = [
  {
    id: 1,
    username: "Parth",
    avatar: "PA",
    followedBy: ["parth_8578", "_vinitt_chhatriwv"],
    followersCount: 1234,
  },
  {
    id: 2,
    username: "Tanisha",
    avatar: "TA",
    followedBy: ["_vinitt_chhatriwv", "satyam_ydv_21"],
    followersCount: 2341,
  },
  {
    id: 3,
    username: "Roshan",
    avatar: "RO",
    followedBy: ["kalal_anshu5717"],
    followersCount: 892,
  },
  {
    id: 4,
    username: "Parth Rathod",
    avatar: "PR",
    followedBy: ["satyam_ydv_21"],
    followersCount: 3412,
  },
  {
    id: 5,
    username: "Alex",
    avatar: "AL",
    followedBy: ["johndoe", "janedoe"],
    followersCount: 4567,
  },
];
