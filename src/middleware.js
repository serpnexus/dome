import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  if (!response || !response.headers) {
    return response;
  }

  const { pathname } = new URL(context.request.url);
  const lowerPath = pathname.toLowerCase();

  // Set default security headers for all responses
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // For SSG pages (blog and unicode)
  if (lowerPath.startsWith('/blog/') || lowerPath.startsWith('/unicode/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Vary', 'Accept-Encoding');
  }
  // For SSR pages (homepage with languages, but not /en/)
  else if (
    lowerPath === '/' ||
    lowerPath.match(/^\/[a-z]{2}(?:-[A-Z]{2})?\/$/)
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
    );
    response.headers.set('Vary', 'Accept-Encoding, Accept-Language');
  }
  // For other pages
  else {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
    );
    response.headers.set('Vary', 'Accept-Encoding');
  }

  return response;
});