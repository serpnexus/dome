// src/lib/wordpress-free.js
// FREE WordPress integration - NO premium plugins needed!

const WP_API_URL = import.meta.env.WORDPRESS_API_URL || 'https://yoursite.com/wp-json/wp/v2';

// Basic fetch function with error handling
export async function fetchFromWP(endpoint, params = {}) {
  const url = new URL(`${WP_API_URL}/${endpoint}`);
  
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined) {
      url.searchParams.append(key, params[key]);
    }
  });
  
  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      if (response.status === 404) {
        console.warn(`WordPress endpoint not found: ${url.toString()}`);
      }
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('WordPress fetch error:', error);
    console.error('URL attempted:', url.toString());
    return null;
  }
}

// Fetch posts
export async function fetchPosts(params = {}) {
  return await fetchFromWP('posts', {
    _embed: true,
    per_page: 10,
    status: 'publish',
    ...params
  });
}

// Fetch single post by slug
export async function fetchPostBySlug(slug) {
  const posts = await fetchFromWP('posts', { 
    slug, 
    _embed: true,
    status: 'publish'
  });
  return posts && posts.length > 0 ? posts[0] : null;
}

// Fetch pages
export async function fetchPages(params = {}) {
  return await fetchFromWP('pages', {
    _embed: true,
    per_page: 100,
    status: 'publish',
    ...params
  });
}

// Fetch single page by slug
export async function fetchPageBySlug(slug) {
  const pages = await fetchFromWP('pages', { slug, _embed: true });
  return pages && pages.length > 0 ? pages[0] : null;
}

// Fetch categories
export async function fetchCategories(params = {}) {
  return await fetchFromWP('categories', {
    per_page: 100,
    ...params
  });
}

// Fetch single category by slug
export async function fetchCategoryBySlug(slug) {
  const categories = await fetchFromWP('categories', { slug });
  return categories && categories.length > 0 ? categories[0] : null;
}

// Fetch tags
export async function fetchTags(params = {}) {
  return await fetchFromWP('tags', {
    per_page: 100,
    ...params
  });
}

// Fetch single tag by slug
export async function fetchTagBySlug(slug) {
  const tags = await fetchFromWP('tags', { slug });
  return tags && tags.length > 0 ? tags[0] : null;
}

// Fetch posts by category
export async function fetchPostsByCategory(categoryId, params = {}) {
  return await fetchFromWP('posts', {
    _embed: true,
    per_page: 10,
    status: 'publish',
    categories: categoryId,
    ...params
  });
}

// Fetch posts by tag
export async function fetchPostsByTag(tagId, params = {}) {
  return await fetchFromWP('posts', {
    _embed: true,
    per_page: 10,
    status: 'publish',
    tags: tagId,
    ...params
  });
}

// Fetch posts by author
export async function fetchPostsByAuthor(authorId, params = {}) {
  return await fetchFromWP('posts', {
    _embed: true,
    per_page: 10,
    status: 'publish',
    author: authorId,
    ...params
  });
}

// Fetch featured posts
export async function fetchFeaturedPosts(params = {}) {
  return await fetchFromWP('posts', {
    _embed: true,
    per_page: 3,
    status: 'publish',
    sticky: true,
    ...params
  });
}

// Fetch navigation menu
export async function fetchMenu(location = 'primary') {
  return await fetchFromWP(`menus/${location}`);
}

// Search posts
export async function searchPosts(query, postType = 'post') {
  return await fetchFromWP('search/enhanced', { query, post_type: postType });
}

// Helper functions for WordPress data

// Get featured image from post
export function getFeaturedImage(post) {
  // Check for embedded featured media
  if (post._embedded?.['wp:featuredmedia']?.[0]) {
    const media = post._embedded['wp:featuredmedia'][0];
    return {
      id: media.id,
      alt: media.alt_text || '',
      sizes: {
        thumbnail: media.media_details?.sizes?.thumbnail?.source_url || '',
        medium: media.media_details?.sizes?.medium?.source_url || '',
        large: media.media_details?.sizes?.large?.source_url || '',
        full: media.source_url || ''
      }
    };
  }
  
  // Fallback to featured_media if available
  if (post.featured_media) {
    return {
      id: post.featured_media,
      alt: '',
      sizes: {
        thumbnail: '',
        medium: '',
        large: '',
        full: ''
      }
    };
  }
  
  return null;
}

// Get author info from embedded data
export function getAuthor(post) {
  if (post._embedded?.author?.[0]) {
    const author = post._embedded.author[0];
    return {
      id: author.id,
      name: author.name,
      description: author.description,
      avatar: author.avatar_urls?.['96'] || '',
      url: author.url || '',
      slug: author.slug || ''
    };
  }
  return null;
}

// Get categories from post
export function getCategories(post) {
  if (post._embedded?.['wp:term']?.[0]) {
    return post._embedded['wp:term'][0].map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      count: cat.count
    }));
  }
  return post.categories || [];
}

// Get tags from post
export function getTags(post) {
  if (post._embedded?.['wp:term']?.[1]) {
    return post._embedded['wp:term'][1].map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      description: tag.description,
      count: tag.count
    }));
  }
  return post.tags || [];
}

// Get category info
export function getCategoryInfo(category) {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    count: category.count,
    parent: category.parent || 0
  };
}

// Get tag info
export function getTagInfo(tag) {
  return {
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    description: tag.description,
    count: tag.count
  };
}

// Format date
export function formatDate(dateString, locale = 'en-US') {
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Clean WordPress content
export function cleanContent(content) {
  if (typeof content === 'string') return content;
  return content?.rendered || '';
}

// Get SEO data (from our custom implementation)
export function getSEOData(post) {
  const seo = post.seo_data || {};
  return {
    title: seo.title || post.title?.rendered || '',
    description: seo.description || post.excerpt?.rendered || '',
    image: seo.og_image || getFeaturedImage(post)?.sizes?.large || '',
    canonical: seo.canonical || ''
  };
}

// Get hero section data (from our custom fields)
export function getHeroData(page) {
  return page.hero_section || {
    title: '',
    subtitle: '',
    cta_text: '',
    cta_link: ''
  };
}

// Simple cache implementation
class SimpleCache {
  constructor(ttl = 300000) { // 5 minutes
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (item && Date.now() < item.expires) {
      return item.data;
    }
    this.cache.delete(key);
    return null;
  }
  
  set(key, data) {
    this.cache.set(key, {
      data,
      expires: Date.now() + this.ttl
    });
  }
  
  clear() {
    this.cache.clear();
  }
}

const cache = new SimpleCache();

// Cached fetch function
export async function cachedFetch(endpoint, params = {}) {
  const cacheKey = `${endpoint}-${JSON.stringify(params)}`;
  let data = cache.get(cacheKey);
  
  if (!data) {
    data = await fetchFromWP(endpoint, params);
    if (data) cache.set(cacheKey, data);
  }
  
  return data;
}

// Build menu hierarchy from flat array
export function buildMenuHierarchy(menuItems) {
  if (!menuItems || !Array.isArray(menuItems)) return [];
  
  const itemMap = {};
  const rootItems = [];
  
  // Create item map
  menuItems.forEach(item => {
    itemMap[item.id] = { ...item, children: [] };
  });
  
  // Build hierarchy
  menuItems.forEach(item => {
    if (item.parent && itemMap[item.parent]) {
      itemMap[item.parent].children.push(itemMap[item.id]);
    } else {
      rootItems.push(itemMap[item.id]);
    }
  });
  
  return rootItems.sort((a, b) => a.order - b.order);
}