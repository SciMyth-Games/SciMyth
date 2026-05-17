"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, initGSAP } from "@/lib/gsap-init";

export function useCubeScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll<HTMLElement>(".cube-section");
    if (sections.length === 0) return;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const rotateAmount = isMobile ? 12 : isTablet ? 35 : 65;
    const xSlide = isMobile ? 30 : isTablet ? 60 : 100;
    const scrubVal = 1.5;

    const ctx = gsap.context(() => {
      sections.forEach((section, i) => {
        if (i === 0) return; // First section doesn't animate in

        // Animate each section with cube-face rotation
        gsap.fromTo(
          section,
          {
            rotateY: rotateAmount,
            x: xSlide,
            opacity: 0.2,
            scale: 0.92,
          },
          {
            rotateY: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 20%",
              scrub: scrubVal,
              toggleActions: "play reverse play reverse",
            },
          }
        );

        // Parallax depth on child elements
        const cards = section.querySelectorAll(".cube-child");
        cards.forEach((card, j) => {
          gsap.fromTo(
            card,
            { y: 40 + j * 10, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 30%",
                scrub: scrubVal,
              },
            }
          );
        });
      });

      // Exit animation for sections as they scroll past
      sections.forEach((section, i) => {
        if (i === sections.length - 1) return; // Last section doesn't animate out
        gsap.to(section, {
          rotateY: -rotateAmount * 0.6,
          x: -xSlide * 0.6,
          opacity: 0.3,
          scale: 0.95,
          ease: "power2.in",
          scrollTrigger: {
            trigger: section,
            start: "bottom 60%",
            end: "bottom 10%",
            scrub: scrubVal,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
