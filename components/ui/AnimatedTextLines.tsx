import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
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
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: { trigger: containerRef.current },
      });
    }
  });

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
