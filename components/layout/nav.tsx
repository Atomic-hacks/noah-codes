"use client";
import { socials } from "@/constants";
import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useEffect } from "react";
import { Link } from "react-scroll";
import Magnetic from "../ui/Magnetic";

const Nav = () => {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  const lastScrollY = useRef(0);

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "About", id: "about" },
    { name: "Work", id: "work" },
    { name: "Contact", id: "contact" },
  ];

  // timeline reference with proper typing
  const tl = useRef<gsap.core.Timeline | null>(null);
  const iconTL = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Initial setup
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], { autoAlpha: 0, x: -20 });

    // Create timeline
    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, { xPercent: 0, duration: 2, ease: "power3.out" })
      .to(
        linksRef.current,
        { autoAlpha: 1, x: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" },
        "<"
      )
      .to(contactRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      });

    iconTL.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        { rotate: -45, y: 3.3, duration: 0.3, ease: "power2.inOut" },
        "<"
      );
    return () => {
      tl.current?.kill();
      iconTL.current?.kill();
    };
  }, { scope: navRef, dependencies: [], revertOnUpdate: true });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(
        currentScrollY <= lastScrollY.current || currentScrollY < 10 || isOpen
      );
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const closeMenu = () => {
    if (!isOpen || !tl.current || !iconTL.current) return;
    tl.current.reverse();
    iconTL.current.reverse();
    setIsOpen(false);
  };

  const toggleMenu = () => {
    if (tl.current && iconTL.current) {
      if (isOpen) {
        tl.current.reverse();
        iconTL.current.reverse();
      } else {
        tl.current.play();
        iconTL.current.play();
      }
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-6 uppercase bg-black text-white/80 py-24 space-y-10 sm:px-10 sm:py-28 md:w-1/2 md:left-1/2 md:px-16"
      >
        <div className="flex flex-col text-4xl gap-y-2 sm:text-5xl md:text-6xl">
          {menuItems.map((section, index) => (
            <div
              key={index}
              ref={(el) => {
                linksRef.current[index] = el;
              }}
            >
              <Link
                smooth
                offset={0}
                duration={2000}
                to={section.id}
                onClick={closeMenu}
                className="inline-block transition-all duration-100 cursor-pointer hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {section.name}
              </Link>
            </div>
          ))}
        </div>

        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50">Email</p>
            <a href="mailto:Atomicisnoah.code@gmail.com" className="block break-all text-sm tracking-wider lowercase sm:text-xl sm:tracking-widest">
              Atomicisnoah.code@gmail.com
            </a>
          </div>

          <div className="font-light">
            <p className="tracking-wider text-white/50">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Toggle Button */}
      <Magnetic>
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={toggleMenu}
          onFocus={() => setShowBurger(true)}
          style={{
            clipPath:
              showBurger || isOpen
                ? "circle(50% at 50% 50%)"
                : "circle(0 at 50% 50%)",
          }}
          className="fixed top-4 right-4 z-[60] flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-full bg-black transition-[clip-path] duration-300 will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:right-10 md:h-20 md:w-20"
        >
          <span
            ref={topLineRef}
            className="block w-8 h-0.5 bg-white rounded-full origin-center"
          ></span>
          <span
            ref={bottomLineRef}
            className="block w-8 h-0.5 bg-white rounded-full origin-center"
          ></span>
        </button>
      </Magnetic>
    </>
  );
};

export default Nav;
