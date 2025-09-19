// src/components/BlogFilter.jsx - Client-side filtering (React component)
import { useState, useMemo } from 'react';

export default function BlogFilter({ posts, categories, tags }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.categories && post.categories.includes(parseInt(selectedCategory))
      );
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(post => 
        post.tags && post.tags.includes(parseInt(selectedTag))
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'title':
          comparison = a.title.rendered.localeCompare(b.title.rendered);
          break;
        case 'modified':
          comparison = new Date(a.modified) - new Date(b.modified);
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [posts, selectedCategory, selectedTag, sortBy, sortOrder]);

  // Update the posts grid
  useMemo(() => {
    const postsGrid = document.getElementById('posts-grid');
    if (postsGrid && typeof window !== 'undefined') {
      // This would need to be implemented with proper DOM manipulation
      // For now, we'll just log the filtered posts
      console.log('Filtered posts:', filteredPosts);
    }
  }, [filteredPosts]);

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories && categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tag
          </label>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tags</option>
            {tags && tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name} ({tag.count})
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Publish Date</option>
            <option value="modified">Last Modified</option>
            <option value="title">Title</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredPosts.length} of {posts.length} posts
      </div>
    </div>
  );
}