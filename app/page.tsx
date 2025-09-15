/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Hero from "@/components/Hero";
import Nav from "@/components/layout/nav";
import ServiceSummary from "@/components/ServiceSummary";
import Services from "@/components/Services";
import About from "@/components/About";
import React, { useEffect, useState } from "react";
import ReactLenis, { LenisRef } from "lenis/react";
import Works from "@/components/Works";
import ContactSummary from "@/components/ContactSummary";
import Contact from "@/components/Contact";
import { useProgress } from "@react-three/drei";
import { useRef } from "react";

const Page = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const lenisRef =  useRef<LenisRef | null>(null);
  
  useEffect(() => {
    function update(time: any) {
      lenisRef.current?.lenis?.raf(time)
    }
  
    const rafId = requestAnimationFrame(update)
  
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
      >
        <Nav />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default Page;
