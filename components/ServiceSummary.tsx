"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";

const ServiceSummary = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = titleRefs.current.filter(Boolean);
    if (!rows.length) return;

    const desktopDistances = [20, -30, 100, -100];
    const mobileDistances = [8, -10, 14, -14];
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      rows.forEach((row, index) => {
        gsap.to(row, {
          xPercent: desktopDistances[index] ?? 0,
          scrollTrigger: {
            trigger: row,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      rows.forEach((row, index) => {
        gsap.to(row, {
          xPercent: mobileDistances[index] ?? 0,
          scrollTrigger: {
            trigger: row,
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [], revertOnUpdate: true });

  return (
    <section
      ref={sectionRef}
      className="mt-20 overflow-x-hidden font-light leading-snug text-center mb-42 contact-text-responsive"
    >
      <div
        ref={(el) => {
          titleRefs.current[0] = el;
        }}
      >
        <p>Architecture</p>
      </div>
      <div
        ref={(el) => {
          titleRefs.current[1] = el;
        }}
        className="flex items-center justify-center gap-3 md:translate-x-16"
      >
        <p className="font-normal">Development</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p>Deployment</p>
      </div>
      <div
        ref={(el) => {
          titleRefs.current[2] = el;
        }}
        className="flex items-center justify-center gap-3 md:-translate-x-48"
      >
        <p>APIs</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p className="italic">Frontends</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p>Scalability</p>
      </div>
      <div
        ref={(el) => {
          titleRefs.current[3] = el;
        }}
        className="md:translate-x-48"
      >
        <p>Databases</p>
      </div>
    </section>
  );
};

export default ServiceSummary;
