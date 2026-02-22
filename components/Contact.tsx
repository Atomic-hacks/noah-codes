"use client";

import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "@/components/ui/AnimatedHeaderSection";
import Marquee from "@/components/ui/Marquee";
import { socials } from "../constants";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";

interface Social {
  name: string;
  href: string;
}

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const socialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const text: string = `Got a question, how or project Idea?     WE'D love to hear from you and discus further!`;

  const items: string[] = [
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
  ];

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = socialRefs.current.filter(Boolean);
    if (!elements.length) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.from(elements, {
        y: 100,
        opacity: 0,
        delay: 0.3,
        duration: 1,
        stagger: 0.2,
        ease: "back.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, { dependencies: [], scope: sectionRef, revertOnUpdate: true });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black overflow-x-clip"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">
            <div
              ref={(el) => {
                socialRefs.current[0] = el;
              }}
            >
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                Atomicisnoah.code@gmail.com
              </p>
            </div>
            <div
              ref={(el) => {
                socialRefs.current[1] = el;
              }}
            >
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +234 903 524 4873
              </p>
            </div>
            <div
              ref={(el) => {
                socialRefs.current[2] = el;
              }}
            >
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social: Social, index: number) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-xs leading-loose tracking-wides uppercase md:text-sm hover:text-white/80 transition-colors duration-200"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
