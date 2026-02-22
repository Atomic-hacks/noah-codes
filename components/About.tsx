"use client";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import AnimatedHeaderSection from "./ui/AnimatedHeaderSection";
import AnimatedTextLines from "./ui/AnimatedTextLines";
import { gsap } from "@/lib/gsap";

const About = () => {
  const text = "I don’t overcomplicate it — I build, I ship, it slaps.";
  const imgRef = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const aboutText = `I make ideas real — whether that’s shipping code fast or fixing things I definitely didn’t break (👀).
   I’m an intuitive frontend dev who pays attention to the details that matter. 
   I think about how the user feels and experiences the product, then I build it exactly that way. 
   That’s why what I ship doesn’t just work — it meets (and usually beats) expectations.`;
  useGSAP(() => {
    if (!sectionRef.current || !imgRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.to(sectionRef.current, {
        scale: 0.95,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.to(sectionRef.current, {
        scale: 0.985,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 92%",
          end: "bottom 60%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 85%",
        invalidateOnRefresh: true,
      },
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [], revertOnUpdate: true });
  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen bg-black rounded-b-4xl overflow-x-clip"
    >
      <AnimatedHeaderSection
        title="About"
        textColor="text-white"
        text={text}
        subTitle="I Think i've made it clear....i code"
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <img
          ref={imgRef}
          src="/images/man.jpg"
          alt="man"
          className="w-full max-w-md rounded-3xl"
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>{" "}
    </section>
  );
};

export default About;
