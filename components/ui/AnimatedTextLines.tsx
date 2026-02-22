"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
const AnimatedTextLines = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const containerRef = useRef(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (lineRefs.current.length > 0) {
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        gsap.from(lineRefs.current, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            invalidateOnRefresh: true,
          },
        });
      });
      mm.add("(min-width: 768px)", () => {
        gsap.from(lineRefs.current, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.3,
          ease: "back.out",
          scrollTrigger: {
            trigger: containerRef.current,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    }
  }, { dependencies: [text], scope: containerRef, revertOnUpdate: true });

  return (
    <div ref={containerRef} className={`${className}`}>
      {lines.map((line, index) => (
        <span
          className="block leading-wide tracking-wide text-pretty"
          key={index}
          ref={(el) => {
            lineRefs.current[index] = el;
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
};

export default AnimatedTextLines;
