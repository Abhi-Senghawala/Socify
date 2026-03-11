import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";

export const useSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("top");
  const [results, setResults] = useState({
    top: [],
    users: [],
    posts: [],
    hashtags: [],
    reels: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trending, setTrending] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    users: {
      verified: false,
      followedBy: "anyone",
      location: "",
    },
    posts: {
      date: "any",
      type: "all",
      sortBy: "recent",
    },
    hashtags: {
      sortBy: "popular",
    },
  });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const searchTimeout = useRef(null);
  const abortControllerRef = useRef(null);

  // Get Query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    const tab = params.get("tab");

    if (query) {
      setSearchQuery(query);
      performSearch(query, tab || "top");
    }

    if (tab) {
      setActiveTab(tab);
    }

    loadRecentSearches();
    loadTrending();
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchQuery.trim()) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = setTimeout(() => {
        getSuggestions(searchQuery);
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery]);

  const loadRecentSearches = async () => {
    try {
      // Temporary load from Localstorage
      const saved = localStorage.getItem("recentSearches");
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      } else {
        const mockRecent = [
          {
            id: "1",
            type: "user",
            term: "alexj",
            name: "Alex Johnson",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
          },
          {
            id: "2",
            type: "hashtag",
            term: "photography",
            count: "2.3M posts",
          },
          {
            id: "3",
            type: "user",
            term: "sarahc",
            name: "Sarah Chen",
            avatar:
              "https://images.unsplash.com/photo-1494790108777-296fd3c5c1b2?w=100",
          },
        ];
        setRecentSearches(mockRecent);
      }
    } catch (error) {
      console.error("Error loading recent Searches: ", error);
    }
  };

  const loadTrending = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockTrending = [
        {
          id: "t1",
          type: "hashtag",
          name: "#photography",
          posts: "2.3M",
          category: "Art",
        },
        {
          id: "t2",
          type: "hashtag",
          name: "#travel",
          posts: "1.8M",
          category: "Travel",
        },
        {
          id: "t3",
          type: "hashtag",
          name: "#food",
          posts: "1.5M",
          category: "Food",
        },
        {
          id: "t4",
          type: "hashtag",
          name: "#fashion",
          posts: "1.2M",
          category: "Fashion",
        },
        {
          id: "t5",
          type: "hashtag",
          name: "#fitness",
          posts: "987K",
          category: "Health",
        },
        {
          id: "t6",
          type: "user",
          name: "alexj",
          posts: "2.1M",
          category: "Creator",
        },
        {
          id: "t7",
          type: "user",
          name: "sarahc",
          posts: "1.9M",
          category: "Artist",
        },
      ];
      setTrending(mockTrending);
    } catch (error) {
      console.error("Error Loading Trending:", error);
    }
  };

  const getSuggestions = async (query) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const mockSuggestions = [
        {
          id: "s1",
          type: "user",
          text: query,
          subtext: "User",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50",
        },
        {
          id: "s2",
          type: "hashtag",
          text: `#${query}`,
          subtext: `${Math.floor(Math.random() * 100)}K posts`,
        },
        {
          id: "s3",
          type: "user",
          text: `${query}123`,
          subtext: "Follows you",
          avatar:
            "https://images.unsplash.com/photo-1494790108777-296fd3c5c1b2?w=50",
        },
      ];
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error("Error getting suggestions:", error);
    }
  };

  const performSearch = async (
    query,
    tab = activeTab,
    pageNum = 1,
    newFilters = filters,
  ) => {
    if (!query.trim()) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    if (pageNum === 1) {
      setLoading(true);
      setError(null);
    } else {
      setLoading(true);
    }

    try {
      const params = new URLSearchParams(location.search);
      params.set("q", query);
      params.set("tab", tab);
      navigate(`/search?${params.toString()}`, { replace: true });

      // Simulate API Here
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newResults = generateSearchResults(query, tab, pageNum, newFilters);
      setResults((prev) => {
        if (pageNum === 1) {
          return {
            ...prev,
            [tab]: newResults,
          };
        } else {
          return {
            ...prev,
            [tab]: [...prev[tab], ...newResults],
          };
        }
      });

      setHasMore(newResults.length === 10);
      setPage(pageNum);

      saveToRecentSearches(query);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError("Failed to load results");
        console.error("Search error:", error);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
      abortControllerRef.current = null;
    }
  };

  const generateSearchResults = (query, tab, pageNum, currentFilters) => {
    const baseCount = 10;
    const results = [];

    switch (tab) {
      case "users":
        for (let i = 0; i < baseCount; i++) {
          const id = (pageNum - 1) * baseCount + i;
          results.push({
            id: `user-${id}`,
            username: `${query}user${id}`,
            name: `${query} User ${id}`,
            avatar: `https://images.unsplash.com/photo-${1500000000 + id}?w=200`,
            verified: i % 3 === 0,
            private: i % 5 === 0,
            followersCount: Math.floor(Math.random() * 10000),
            postsCount: Math.floor(Math.random() * 500),
            bio: `This is a sample bio for user ${id}. They love ${query} and creating amazing content.`,
            isFollowing: i % 4 === 0,
            followedBy: i % 4 === 1 ? ["alexj", "sarahc"] : null,
          });
        }
        break;

      case "posts":
        for (let i = 0; i < baseCount; i++) {
          const id = (pageNum - 1) * baseCount + i;
          results.push({
            id: `post-${id}`,
            user: {
              username: `${query}user${id}`,
              name: `${query} User ${id}`,
              avatar: `https://images.unsplash.com/photo-${1500000000 + id}?w=100`,
              verified: i % 3 === 0,
            },
            image: `https://images.unsplash.com/photo-${1600000000 + id}?w=400`,
            caption: `This is a post about ${query} #${query} #awesome`,
            likes: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 100),
            timestamp: new Date(
              Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            location: i % 2 === 0 ? "New York" : null,
            type: i % 10 === 0 ? "video" : "image",
          });
        }
        break;

      case "hashtags":
        for (let i = 0; i < baseCount; i++) {
          const id = (pageNum - 1) * baseCount + i;
          results.push({
            id: `hashtag-${id}`,
            name: `#${query}${id}`,
            postsCount: Math.floor(Math.random() * 1000000),
            topPost: {
              image: `https://images.unsplash.com/photo-${1700000000 + id}?w=100`,
              likes: Math.floor(Math.random() * 10000),
            },
          });
        }
        break;

      case "reels":
        for (let i = 0; i < baseCount; i++) {
          const id = (pageNum - 1) * baseCount + i;
          results.push({
            id: `reel-${id}`,
            user: {
              username: `${query}user${id}`,
              avatar: `https://images.unsplash.com/photo-${1500000000 + id}?w=100`,
            },
            thumbnail: `https://images.unsplash.com/photo-${1800000000 + id}?w=400`,
            views: Math.floor(Math.random() * 100000),
            likes: Math.floor(Math.random() * 10000),
            comments: Math.floor(Math.random() * 1000),
            duration: `${Math.floor(Math.random() * 60)}:${Math.floor(
              Math.random() * 60,
            )
              .toString()
              .padStart(2, "0")}`,
          });
        }
        break;

      default:
        for (let i = 0; i < 5; i++) {
          results.push({
            id: `top-user-${i}`,
            type: "user",
            ...generateSearchResults(query, "users", pageNum, currentFilters)[
              i
            ],
          });
          results.push({
            id: `top-post-${i}`,
            type: "post",
            ...generateSearchResults(query, "posts", pageNum, currentFilters)[
              i
            ],
          });
          results.push({
            id: `top-hashtag-${i}`,
            type: "hashtag",
            ...generateSearchResults(
              query,
              "hashtags",
              pageNum,
              currentFilters,
            )[i],
          });
        }
        break;
    }
    return results;
  };

  const saveToRecentSearches = (query) => {
    try {
      const newSearch = {
        id: Date.now().toString(),
        type: "search",
        term: query,
        timestamp: new Date().toISOString(),
      };

      const updated = [newSearch, ...recentSearches.slice(0, 9)];
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving recent search:", error);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const removeRecentSearches = (id) => {
    const updated = recentSearches.filter((item) => item.id !== id);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      performSearch(query, activeTab, 1, filters);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (searchQuery.trim()) {
      performSearch(searchQuery, tab, 1, filters);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      performSearch(searchQuery, activeTab, page + 1, filters);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults({
      top: [],
      users: [],
      posts: [],
      hashtags: [],
      reels: [],
    });
    setSuggestions([]);
    navigate("/search");
  };

  const handleFilterChanges = (category, key, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));

    if (searchQuery.trim()) {
      performSearch(searchQuery, activeTab, 1, filters);
    }
  };

  return {
    searchQuery,
    activeTab,
    results,
    loading,
    error,
    recentSearches,
    trending,
    suggestions,
    showFilters,
    filters,
    hasMore,
    loadingMore,
    setSearchQuery,
    setActiveTab,
    setShowFilters,
    handleSearch,
    handleTabChange,
    handleFilterChanges,
    handleLoadMore,
    clearSearch,
    clearRecentSearches,
    removeRecentSearches,
  };
};
