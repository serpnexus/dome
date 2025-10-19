import React from 'react';
import { ImageResponse } from '@vercel/og';
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    // Get the slug parts from the URL
    const slugParts = (params.slug || '').split('/');
    const type = slugParts[0] || 'website';
    const title = slugParts.slice(1).join('/') || 'Invisible Text';

    // Define styling based on content type
    const styles = {
      website: {
        gradient: 'linear-gradient(135deg, #0f172a, #1e293b)',
        titleSize: '64px',
      },
      article: {
        gradient: 'linear-gradient(135deg, #1e293b, #334155)',
        titleSize: '56px',
      },
      blog: {
        gradient: 'linear-gradient(135deg, #334155, #475569)',
        titleSize: '52px',
      },
    };

    const style = styles[type as keyof typeof styles] || styles.website;

    // Create the element using React.createElement
    const element = React.createElement(
      'div',
      {
        style: {
          background: style.gradient,
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
        },
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
            fontSize: style.titleSize,
            fontWeight: 'bold',
            lineHeight: 1.2,
            maxWidth: '900px',
          },
        },
        decodeURIComponent(title)
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