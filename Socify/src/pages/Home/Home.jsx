import React from "react";
import Layout from "../../components/layout/Layout";
import { useFeed, FeedProvider } from "../../context/FeedContext";
import PostCard from "../../components/feed/PostCard";
import StoriesSection from "../../components/feed/StoriesSection";
import SuggestionsSidebar from "../../components/feed/SuggestionSidebar";

const HomeContent = () => {
  const { posts, loading } = useFeed();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-500 rounded-full animate-spin animate-delay-150"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 w-full lg:max-w-2xl lg:mx-0 px-4 sm:px-6 lg:px-0">
          <StoriesSection />
          <div className="space-y-4 sm:space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="text-center py-6 sm:py-8">
            <div className="inline-flex items-center gap-2 text-gray-500">
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse animation-delay-400"></div>
              <span className="text-xs sm:text-sm ml-2">
                Loading more posts...
              </span>
            </div>
          </div>
        </div>
        <SuggestionsSidebar />
      </div>
    </Layout>
  );
};

const Home = () => {
  return (
    <FeedProvider>
      <HomeContent />
    </FeedProvider>
  );
};

export default Home;
