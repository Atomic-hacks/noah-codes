"use client";

import React from "react";
import { useRef } from "react";
import AnimatedTextLines from "@/components/ui/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface AnimatedHeaderSectionProps {
  subTitle: string;
  title: string;
  text: string;
  textColor: string;
  withScrollTrigger?: boolean;
}

const AnimatedHeaderSection: React.FC<AnimatedHeaderSectionProps> = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const mm = gsap.matchMedia();
    const scrollTrigger = withScrollTrigger
      ? {
          trigger: contextRef.current,
          start: "top 85%",
          invalidateOnRefresh: true,
        }
      : undefined;

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({ scrollTrigger });
      tl.from(contextRef.current, {
        y: "10vh",
        duration: 0.6,
        ease: "power2.out",
      });
      tl.from(
        headerRef.current,
        {
          opacity: 0,
          y: 60,
          duration: 0.6,
          ease: "power2.out",
        },
        "<+0.1"
      );
    });

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({ scrollTrigger });
      tl.from(contextRef.current, {
        y: "50vh",
        duration: 1,
        ease: "circ.out",
      });
      tl.from(
        headerRef.current,
        {
          opacity: 0,
          y: 200,
          duration: 1,
          ease: "circ.out",
        },
        "<+0.2"
      );
    });

    return () => mm.revert();
  }, { scope: contextRef, dependencies: [withScrollTrigger], revertOnUpdate: true });

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p
            className={`text-sm font-light tracking-[0.5rem] uppercase px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              className={`flex flex-col gap-12 uppercase banner-text-responsive sm:gap-16 md:block ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 sm:py-16 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
