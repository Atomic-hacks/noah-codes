/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "@/components/ui/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

const Works = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef<any>(null);
  const moveY = useRef<any>(null);

  useGSAP(() => {
    if (!previewRef.current || !sectionRef.current) return;

    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const projectsList = projectRefs.current.filter(Boolean);
    if (!projectsList.length) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.from(projectsList, {
        y: 100,
        opacity: 0,
        delay: 0.2,
        duration: 1,
        stagger: 0.2,
        ease: "back.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(projectsList, {
        y: 45,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, { dependencies: [], scope: sectionRef, revertOnUpdate: true });

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="flex flex-col min-h-screen overflow-x-clip"
    >
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="group relative flex flex-col gap-1 py-5 md:gap-0"
            ref={(el) => {
              projectRefs.current[index] = el;
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />

            {/* title */}
            <div className="flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className="lg:text-[32px] text-[26px] leading-none">
                {project.name}
              </h2>
              {project.href ? <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" /> : null}
            </div>
            {/* divider */}
            <div className="w-full h-0.5 bg-black/80" />
            {/* framework */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 px-5 text-xs leading-loose uppercase transition-all duration-500 sm:px-10 md:text-sm md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black transition-colors duration-500 md:group-hover:text-white"
                >
                  {framework.name}
                </p>
              ))}
            </div>
            <p className="max-w-4xl px-5 pt-2 text-sm leading-relaxed text-black/70 transition-all duration-500 text-pretty sm:px-10 md:group-hover:px-12 md:group-hover:text-white/75">
              {project.description}
            </p>
            {/* mobile preview image */}
            <div className="relative flex h-[min(72vw,400px)] items-center justify-center px-5 sm:px-10 md:hidden">
              {project.image && project.bgImage ? (
                <>
                  <Image
                    src={project.bgImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 90vw, 0px"
                    className="rounded-md object-cover brightness-50"
                  />
                  <Image
                    src={project.image}
                    alt={`${project.name} project preview`}
                    fill
                    sizes="(max-width: 768px) 90vw, 0px"
                    className="absolute bg-center object-contain px-10 sm:px-14"
                  />
                </>
              ) : (
                <div className="absolute inset-x-5 flex h-full flex-col items-center justify-center gap-2 rounded-md bg-black text-white sm:inset-x-10">
                  <span className="text-4xl tracking-[0.35em]">{project.name}</span>
                  <span className="text-xs uppercase tracking-widest text-white/50">
                    Preview coming soon
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* desktop Flaoting preview image */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 hidden aspect-video w-[min(60vw,960px)] overflow-hidden border-8 border-black pointer-events-none opacity-0 md:block"
        >
          {currentIndex !== null &&
            (projects[currentIndex].image ? (
              <Image
                src={projects[currentIndex].image}
                alt={`${projects[currentIndex].name} project preview`}
                fill
                sizes="60vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-black text-white">
                <span className="text-6xl tracking-[0.35em]">
                  {projects[currentIndex].name}
                </span>
                <span className="text-sm uppercase tracking-widest text-white/50">
                  Preview coming soon
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
