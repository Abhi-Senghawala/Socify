import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useReels = () => {
  const navigate = useNavigate();
  const [reels, setReels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [likedReels, setLikedReels] = useState(new Set());
  const [savedReels, setSavedReels] = useState(new Set());
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [volume, setVolume] = useState(1);
  const [isPiPSupported, setIsPiPSupported] = useState(false);
  
  const videoRefs = useRef([]);
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if ('pictureInPictureEnabled' in document) {
      setIsPiPSupported(true);
    }
  }, []);

  useEffect(() => {
    fetchReels();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            playReel(index);
          } else {
            const index = parseInt(entry.target.dataset.index);
            pauseReel(index);
          }
        });
      },
      {
        threshold: 0.7,
        rootMargin: '0px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [reels]);

  const fetchReels = async (pageNum = 1) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockReels = generateMockReels(pageNum);
      
      if (pageNum === 1) {
        setReels(mockReels);
      } else {
        setReels(prev => [...prev, ...mockReels]);
      }

      setHasMore(mockReels.length === 5);
      setPage(pageNum);

      setTimeout(() => {
        mockReels.forEach((_, index) => {
          const videoElement = document.querySelector(`#reel-video-${index + (pageNum - 1) * 5}`);
          if (videoElement) {
            videoElement.load();
          }
        });
      }, 100);

    } catch (error) {
      console.error('Error fetching reels:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const generateMockReels = (pageNum) => {
    const reels = [];
    const users = [
      { 
        id: 1, 
        username: 'alexj', 
        name: 'Alex Johnson', 
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        verified: true,
        followers: '2.3M'
      },
      { 
        id: 2, 
        username: 'sarahc', 
        name: 'Sarah Chen', 
        avatar: 'https://images.unsplash.com/photo-1494790108777-296fd3c5c1b2?w=100',
        verified: false,
        followers: '1.2M'
      },
      { 
        id: 3, 
        username: 'miker', 
        name: 'Mike Rivera', 
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100',
        verified: true,
        followers: '5.1M'
      },
      { 
        id: 4, 
        username: 'emmaw', 
        name: 'Emma Wilson', 
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        verified: false,
        followers: '892K'
      },
      { 
        id: 5, 
        username: 'davidk', 
        name: 'David Kim', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        verified: true,
        followers: '3.4M'
      },
    ];

    const songs = [
      'Original Audio - Alex Johnson',
      'Summer Vibes - Sarah Chen',
      'Night Moves - Mike Rivera',
      'Dreamscape - Emma Wilson',
      'City Lights - David Kim',
      'Sunset Drive - Various Artists',
      'Midnight Groove - DJ Kay',
      'Ocean Waves - Relaxing Sounds',
    ];

    const descriptions = [
      'Check out this amazing view! 🌅 #travel #nature',
      'New dance challenge! Who\'s next? 💃 #dance #challenge',
      'Behind the scenes of my latest project 🎬 #BTS #creator',
      'Morning routine with my favorite playlist 🎵 #morning #routine',
      'Trying out this new filter, what do you think? 😄 #fun #filter',
      'Quick tutorial on how I edit my photos 📸 #tutorial #photoediting',
      'My reaction to the latest news 🤯 #reaction #trending',
      'POV: You finally finished all your work 📚 #pov #relatable',
    ];

    for (let i = 0; i < 5; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const index = (pageNum - 1) * 5 + i;
      
      reels.push({
        id: `reel-${index}`,
        videoUrl: `https://assets.mixkit.co/videos/preview/mixkit-${4000 + index}-large.mp4`,
        thumbnail: `https://images.unsplash.com/photo-${1600000000 + index}?w=400`,
        user,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        song: songs[Math.floor(Math.random() * songs.length)],
        likes: Math.floor(Math.random() * 50000) + 10000,
        comments: Math.floor(Math.random() * 5000) + 500,
        shares: Math.floor(Math.random() * 2000) + 100,
        saves: Math.floor(Math.random() * 10000) + 1000,
        isLiked: false,
        isSaved: false,
        isFollowing: Math.random() > 0.7,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return reels;
  };

  const loadMore = () => {
    if (hasMore && !loadingMore) {
      fetchReels(page + 1);
    }
  };

  const playReel = (index) => {
    setCurrentIndex(index);
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch(e => console.log('Playback failed:', e));
    }
  };

  const pauseReel = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
    }
  };

  const handleLike = (reelId) => {
    setLikedReels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });

    setReels(prev => prev.map(reel => 
      reel.id === reelId 
        ? { ...reel, likes: reel.likes + (likedReels.has(reelId) ? -1 : 1) }
        : reel
    ));
  };

  const handleSave = (reelId) => {
    setSavedReels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });

    setReels(prev => prev.map(reel => 
      reel.id === reelId 
        ? { ...reel, saves: reel.saves + (savedReels.has(reelId) ? -1 : 1) }
        : reel
    ));
  };

  const handleFollow = (userId) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleShare = async (reel) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Reel by ${reel.user.username}`,
          text: reel.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
    videoRefs.current.forEach(video => {
      if (video) {
        video.muted = !muted;
      }
    });
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRefs.current.forEach(video => {
      if (video) {
        video.volume = newVolume;
      }
    });
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentIndex > 0) {
        pauseReel(currentIndex);
        setCurrentIndex(prev => prev - 1);
        setTimeout(() => playReel(currentIndex - 1), 100);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentIndex < reels.length - 1) {
        pauseReel(currentIndex);
        setCurrentIndex(prev => prev + 1);
        setTimeout(() => playReel(currentIndex + 1), 100);
      }
    } else if (e.key === ' ' || e.key === 'Space') {
      e.preventDefault();
      const video = videoRefs.current[currentIndex];
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    } else if (e.key === 'm' || e.key === 'M') {
      toggleMute();
    }
  }, [currentIndex, reels.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleWheel = useCallback((e) => {
    if (Math.abs(e.deltaY) > 50) {
      e.preventDefault();
      if (e.deltaY > 0 && currentIndex < reels.length - 1) {
        pauseReel(currentIndex);
        setCurrentIndex(prev => prev + 1);
        setTimeout(() => playReel(currentIndex + 1), 100);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        pauseReel(currentIndex);
        setCurrentIndex(prev => prev - 1);
        setTimeout(() => playReel(currentIndex - 1), 100);
      }
    }
  }, [currentIndex, reels.length]);

  return {
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
    playReel,
    pauseReel,
    handleLike,
    handleSave,
    handleFollow,
    handleShare,
    toggleMute,
    handleVolumeChange,
    loadMore,
    handleWheel,
    navigate
  };
};