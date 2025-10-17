import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Process the request through the next middleware
  const response = await next();
  
  const { pathname } = new URL(context.request.url);
  
  // Set default security headers for all responses
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  // For SSG pages (blog and unicode)
  if (pathname.startsWith('/blog/') || pathname.startsWith('/unicode/')) {
    // Strong caching for static content
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
    response.headers.set('Surrogate-Control', 'public, max-age=31536000, immutable');
    response.headers.set('CDN-Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Vary', 'Accept-Encoding');
  } 
  // For SSR pages (homepage with languages)
  else if (pathname === '/' || pathname.match(/^\/[a-z]{2}(-[A-Z]{2})?\/$/)) {
    // More conservative caching for dynamic content
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'); // 5 min client, 1 hour CDN, stale for 1 day
    response.headers.set('Surrogate-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    response.headers.set('CDN-Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    response.headers.set('Vary', 'Accept-Encoding, Accept-Language');
  } 
  // For other pages
  else {
    // Moderate caching for other content
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'); // 1 hour client, 1 day CDN, stale for 1 week
    response.headers.set('Surrogate-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    response.headers.set('CDN-Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    response.headers.set('Vary', 'Accept-Encoding');
  }
  
  return response;
});
