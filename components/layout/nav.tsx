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
    { name: "Work", id: "gallery" },
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
        currentScrollY <= lastScrollY.current || currentScrollY < 10
      );
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className="fixed z-50 flex flex-col justify-between w-full h-full px-16 uppercase bg-black text-white/80 py-28 space-y-10 md:w-1/2 md:left-1/2"
      >
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl">
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
                className="transition-all duration-100 cursor-pointer hover:text-white"
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
            <p className="text-xl tracking-widest lowercase">
              Atomicisnoah.code@gmail.com
            </p>
          </div>

          <div className="font-light">
            <p className="tracking-wider text-white/50">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
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
        <div
          className="z-50 fixed flex transition-[clip-path] duration-300 flex-col items-center justify-center gap-1 wwill-change-transform bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10"
          onClick={toggleMenu}
          style={
            showBurger
              ? { clipPath: "circle(50% at 50% 50%)" }
              : { clipPath: "circle(0 at 50% 50%)" }
          }
        >
          <span
            ref={topLineRef}
            className="block w-8 h-0.5 bg-white rounded-full origin-center"
          ></span>
          <span
            ref={bottomLineRef}
            className="block w-8 h-0.5 bg-white rounded-full origin-center"
          ></span>
        </div>
      </Magnetic>
    </>
  );
};

export default Nav;
