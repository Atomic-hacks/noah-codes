"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef } from "react";

interface MarqueeProps {
  items: string[];
  className?: string;
  icon?: string;
  iconClassName?: string;
  reverse?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({
  items,
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add CSS variables for dynamic control
    const content = container.querySelector('.marquee-content') as HTMLElement;
    if (content) {
      const contentWidth = content.scrollWidth;
      container.style.setProperty('--content-width', `${contentWidth}px`);
      container.style.setProperty('--animation-direction', reverse ? 'reverse' : 'normal');
    }
  }, [items, reverse]);

  const MarqueeContent = () => (
    <div className="marquee-content flex items-center shrink-0 whitespace-nowrap">
      {items.map((text, index) => (
        <span 
          key={index} 
          className="flex items-center gap-x-3 sm:gap-x-6 md:gap-x-12 lg:gap-x-16 px-3 sm:px-6 md:px-10 lg:px-16 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light uppercase"
        >
          {text}
          <Icon 
            icon={icon} 
            className={`flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ${iconClassName}`} 
          />
        </span>
      ))}
    </div>
  );

  return (
    <>
     
      
      <div 
        ref={containerRef}
        className={`marquee-container relative w-full h-20 md:h-[100px] ${className}`}
      >
        <div className="absolute inset-0">
          <div className="marquee-track flex items-center h-full">
            {/* First instance */}
            <MarqueeContent />
            {/* Second instance for seamless loop */}
            <MarqueeContent />
            {/* Third instance to ensure no gaps */}
            <MarqueeContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Marquee;