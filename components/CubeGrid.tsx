"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, initGSAP } from "@/lib/gsap-init";

function getGridSize() {
  if (typeof window === "undefined") return { cols: 30, rows: 18 };
  const w = window.innerWidth;
  if (w < 768) return { cols: 12, rows: 20 };
  if (w < 1024) return { cols: 20, rows: 14 };
  return { cols: 30, rows: 18 };
}

export default function CubeGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState(getGridSize);

  useEffect(() => {
    const onResize = () => setGrid(getGridSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    initGSAP();
    const el = containerRef.current;
    if (!el) return;

    const tiles = el.querySelectorAll<HTMLElement>(".grid-tile");
    if (tiles.length === 0) return;

    const ctx = gsap.context(() => {
      // Main wave: tiles rotate on X-axis, staggered right-to-left
      gsap.to(tiles, {
        rotateX: 360,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.8,
        },
        stagger: {
          each: 0.012,
          from: "end",
          grid: [grid.rows, grid.cols],
          axis: "x",
        },
      });

      // Glow pulse during rotation — border brightens then dims
      gsap.to(tiles, {
        borderColor: "rgba(34, 211, 238, 0.25)",
        boxShadow: "0 0 8px rgba(34, 211, 238, 0.12), inset 0 0 6px rgba(34, 211, 238, 0.06)",
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
        stagger: {
          each: 0.01,
          from: "end",
          grid: [grid.rows, grid.cols],
          axis: "x",
        },
      });

      // Subtle Y rotation wave for 3D depth
      gsap.to(tiles, {
        rotateY: 12,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.5,
        },
        stagger: {
          each: 0.008,
          from: "end",
          grid: [grid.rows, grid.cols],
          axis: "x",
        },
      });
    });

    return () => ctx.revert();
  }, [grid]);

  return (
    <div
      ref={containerRef}
      className="cube-grid-container"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        perspective: "800px",
        perspectiveOrigin: "center center",
        pointerEvents: "none",
      }}
    >
      <div
        className="cube-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          width: "100%",
          height: "100%",
          gap: "1px",
        }}
      >
        {Array.from({ length: grid.rows * grid.cols }).map((_, i) => (
          <div
            key={i}
            className="grid-tile"
            style={{
              background: "rgba(12, 16, 28, 0.5)",
              border: "1px solid rgba(34, 211, 238, 0.08)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "visible",
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </div>
  );
}
