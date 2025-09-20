# WordPress Headless CMS Setup

This project is configured to work with WordPress as a headless CMS. Here's how to set it up:

## 1. WordPress Configuration

### Enable REST API
Make sure your WordPress site has the REST API enabled (it's enabled by default in WordPress 4.7+).

### Required WordPress Plugins
- **WP REST API** (included in WordPress core)
- **Custom Post Type UI** (optional, for custom post types)
- **Advanced Custom Fields** (optional, for custom fields)

### WordPress Settings
1. Go to **Settings > Permalinks** in your WordPress admin
2. Select any permalink structure other than "Plain"
3. Save changes

## 2. Environment Configuration

Create a `.env.local` file in the project root:

```env
# WordPress Headless CMS Configuration
WORDPRESS_API_URL=https://yoursite.com/wp-json/wp/v2

# Optional: If you need authentication for private posts
# WORDPRESS_AUTH_TOKEN=your_auth_token_here
```

Replace `https://yoursite.com` with your actual WordPress site URL.

## 3. Test WordPress Connection

You can test if your WordPress API is working by visiting:
`https://yoursite.com/wp-json/wp/v2/posts`

You should see JSON data with your posts.

## 4. Features

### Blog Pages
- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog post pages

### WordPress Integration
- Fetches posts from WordPress REST API
- Displays featured images, titles, excerpts, and content
- Handles author information and publication dates
- Includes fallback content when WordPress is unavailable

### SEO Optimized
- Proper meta tags and Open Graph data
- Structured data for better search engine visibility
- Canonical URLs

## 5. Customization

### Adding Custom Fields
If you want to add custom fields to your WordPress posts:

1. Install the **Advanced Custom Fields** plugin
2. Create custom fields in WordPress admin
3. Update the `getSEOData` and `getHeroData` functions in `src/lib/wordpress.js`

### Styling
- Blog styles are in `src/layouts/Blog.astro`
- Component styles are in individual `.astro` files
- Uses Tailwind CSS for styling

## 6. Troubleshooting

### Common Issues

1. **Posts not showing**: Check if your WordPress API URL is correct
2. **Images not loading**: Ensure featured images are set in WordPress
3. **Build errors**: Make sure all required environment variables are set

### Debug Mode
Set `console.log` statements in `src/lib/wordpress.js` to debug API calls.

## 7. Deployment

Make sure to set the `WORDPRESS_API_URL` environment variable in your deployment platform (Vercel, Netlify, etc.).
