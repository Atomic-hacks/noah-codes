"use client";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import AnimatedHeaderSection from "./ui/AnimatedHeaderSection";
import AnimatedTextLines from "./ui/AnimatedTextLines";
import gsap from "gsap";

const About = () => {
  const text = "I don’t overcomplicate it — I build, I ship, it slaps.";
  const imgRef = useRef(null);
  const aboutText = `I make ideas real — whether that’s shipping code fast or fixing things I definitely didn’t break (👀).
   I’m an intuitive frontend dev who pays attention to the details that matter. 
   I think about how the user feels and experiences the product, then I build it exactly that way. 
   That’s why what I ship doesn’t just work — it meets (and usually beats) expectations.`;
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen  bg-black rounded-b-4xl">
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
          className="w-md rounded-3xl"
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>{" "}
    </section>
  );
};

export default About;
