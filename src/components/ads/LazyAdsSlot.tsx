import { useEffect, useRef } from 'react';

interface AdProps {
  adClient: string;
  adSlot: string;
  format?: string;
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

const LazyAdSlot = ({
  adClient,
  adSlot,
  format = 'auto',
  style = { display: 'block' },
  className = 'adsbygoogle',
  responsive = true,
}: AdProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense error:', e);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef as any}
      className={className}
      style={style}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true'  : 'false'}
    />
  );
};

export default LazyAdSlot;
