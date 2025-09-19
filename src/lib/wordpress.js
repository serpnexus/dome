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
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('WordPress fetch error:', error);
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
  const posts = await fetchFromWP('posts', { slug, _embed: true });
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
export async function fetchCategories() {
  return await fetchFromWP('categories');
}

// Fetch tags
export async function fetchTags() {
  return await fetchFromWP('tags');
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
  const imageData = post.featured_image_data;
  if (!imageData) return null;
  
  return {
    id: imageData.id,
    alt: imageData.alt || '',
    sizes: {
      thumbnail: imageData.sizes?.thumbnail?.[0] || '',
      medium: imageData.sizes?.medium?.[0] || '',
      large: imageData.sizes?.large?.[0] || '',
      full: imageData.sizes?.full?.[0] || ''
    }
  };
}

// Get author info from embedded data
export function getAuthor(post) {
  if (post._embedded?.author?.[0]) {
    const author = post._embedded.author[0];
    return {
      name: author.name,
      description: author.description,
      avatar: author.avatar_urls?.['96'] || '',
      url: author.url || ''
    };
  }
  return null;
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