import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, request }) => {
  try {
    const title = url.searchParams.get('title') || 'InvisibleText';
    const description = url.searchParams.get('description') || '';
    const type = url.searchParams.get('type') || 'website';

    // Generate SVG OG Image
    const svg = generateOGImage(title, description, type);

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response('Error generating OG image', { status: 500 });
  }
};

function generateOGImage(title: string, description: string, type: string): string {
  // Truncate and wrap text
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const titleText = truncateText(title, 60);
  const descText = truncateText(description, 100);

  // Color schemes based on type
  const colorSchemes: Record<string, { bg: string; accent: string; text: string }> = {
    website: {
      bg: '#121C41',
      accent: '#FFD700',
      text: '#FFFFFF',
    },
    article: {
      bg: '#0F1623',
      accent: '#FFD700',
      text: '#FFFFFF',
    },
    blog: {
      bg: '#1A2E5E',
      accent: '#FFD700',
      text: '#FFFFFF',
    },
  };

  const colors = colorSchemes[type] || colorSchemes.website;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0A0E1A;stop-opacity:1" />
    </linearGradient>
    
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#grad)"/>

  <!-- Decorative elements -->
  <circle cx="100" cy="100" r="80" fill="${colors.accent}" opacity="0.1"/>
  <circle cx="1100" cy="530" r="120" fill="${colors.accent}" opacity="0.08"/>
  <rect x="50" y="50" width="2" height="100" fill="${colors.accent}" opacity="0.3"/>
  <rect x="1150" y="480" width="2" height="120" fill="${colors.accent}" opacity="0.3"/>

  <!-- Border accent -->
  <rect x="0" y="0" width="1200" height="3" fill="${colors.accent}"/>

  <!-- Logo/Brand area -->
  <text x="60" y="100" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${colors.accent}">
    InvisibleText
  </text>

  <!-- Title -->
  <text 
    x="60" 
    y="200" 
    font-family="Arial, sans-serif" 
    font-size="56" 
    font-weight="bold" 
    fill="${colors.text}"
    word-spacing="100%"
  >
    ${escapeXml(titleText)}
  </text>

  <!-- Description -->
  ${descText ? `
    <text 
      x="60" 
      y="320" 
      font-family="Arial, sans-serif" 
      font-size="28" 
      fill="${colors.text}" 
      opacity="0.8"
      word-spacing="100%"
    >
      ${escapeXml(descText)}
    </text>
  ` : ''}

  <!-- Type badge -->
  <rect x="60" y="520" width="150" height="50" rx="25" fill="${colors.accent}" opacity="0.2" stroke="${colors.accent}" stroke-width="2"/>
  <text 
    x="135" 
    y="555" 
    font-family="Arial, sans-serif" 
    font-size="18" 
    fill="${colors.accent}" 
    text-anchor="middle"
    font-weight="bold"
  >
    ${type.toUpperCase()}
  </text>

  <!-- Footer -->
  <text 
    x="1140" 
    y="600" 
    font-family="Arial, sans-serif" 
    font-size="16" 
    fill="${colors.text}" 
    opacity="0.6"
    text-anchor="end"
  >
    invisibletext.me
  </text>
</svg>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}