import React from 'react';
import { ImageResponse } from '@vercel/og';
import type { APIRoute } from 'astro';

export const prerender = false;

// Base styles for all OG images
const baseStyles = {
  background: 'linear-gradient(135deg, #0f172a, #1e293b)',
  color: 'white',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '48px 96px',
  textAlign: 'center',
  fontFamily: 'sans-serif',
} as const;

export const GET: APIRoute = async ({ params }) => {
  try {
    const { slug } = params;
    const title = slug?.replace(/-/g, ' ') || 'Blog';

    // Create the element using React.createElement
    const element = React.createElement(
      'div',
      {
        style: baseStyles,
      },
      React.createElement(
        'div',
        {
          style: {
            fontSize: '32px',
            opacity: 0.7,
            marginBottom: '24px',
            fontWeight: 500,
          },
        },
        'Invisible Text'
      ),
      React.createElement(
        'div',
        {
          style: {
            fontSize: '52px',
            fontWeight: 'bold',
            lineHeight: 1.2,
            maxWidth: '900px',
          },
        },
        title
      )
    );

    return new ImageResponse(element, {
      width: 1200,
      height: 630,
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
};