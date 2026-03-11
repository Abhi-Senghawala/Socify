import React from "react";
import Layout from "../../components/layout/Layout";
import { useSearch } from "../../hooks/useSearch";
import SearchHeader from "../../components/search/SearchHeader";
import SearchFilters from "../../components/search/SearchFilters";
import SearchResults from "../../components/search/SearchResults";
import SearchTabs from "../../components/search/SearchTabs";
import RecentSearches from "../../components/search/RecentSearches";
import TrendingSection from "../../components/search/TrendingSection";

const Search = () => {
  const {
    searchQuery,
    activeTab,
    results,
    loading,
    recentSearches,
    trending,
    suggestions,
    showFilters,
    filters,
    hasMore,
    loadingMore,
    setShowFilters,
    handleSearch,
    handleTabChange,
    handleFilterChange,
    handleLoadMore,
    clearSearch,
    clearRecentSearches,
    removeRecentSearch,
  } = useSearch();

  return (
    <Layout>
      <div className="min-h-screen">
        <SearchHeader
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onClear={clearSearch}
          suggestions={suggestions}
          onSuggestionClick={handleSearch}
          onToggleFilters={() => setShowFilters(!showFilters)}
          showFilters={showFilters}
        />
        <SearchTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            <div className={`flex-1 ${showFilters ? "lg:mr-80" : ""}`}>
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-pink-500 rounded-full animate-spin animate-delay-150"></div>
                  </div>
                </div>
              ) : searchQuery ? (
                <>
                  <SearchResults
                    activeTab={activeTab}
                    results={results}
                    query={searchQuery}
                  />

                  {hasMore && results[activeTab]?.length > 0 && (
                    <div className="text-center py-8">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all disabled:opacity-50"
                      >
                        {loadingMore ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading...</span>
                          </div>
                        ) : (
                          "Load More"
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="max-w-2xl mx-auto space-y-6">
                  <RecentSearches
                    searches={recentSearches}
                    onRemove={removeRecentSearch}
                    onClear={clearRecentSearches}
                    onSelect={handleSearch}
                  />

                  <TrendingSection
                    trending={trending}
                    onHashtagClick={(tag) => handleSearch(tag)}
                  />
                </div>
              )}
            </div>

            {showFilters && (
              <div className="fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto">
                <div
                  className="fixed inset-0 bg-black/50 lg:hidden"
                  onClick={() => setShowFilters(false)}
                />

                <div className="fixed right-0 top-0 h-full w-80 lg:static lg:h-auto">
                  <SearchFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClose={() => setShowFilters(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
