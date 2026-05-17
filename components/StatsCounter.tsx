"use client";
import { useEffect, useRef, useState } from "react";

interface StatsCounterProps {
  value: number;
  suffix: string;
  label: string;
  gradient: "cyan" | "gold";
}

export default function StatsCounter({ value, suffix, label, gradient }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const dur = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * value));
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  return (
    <div ref={ref} className="glass cube-child" style={{
      padding: "32px 24px",
      textAlign: "center",
    }}>
      <div className={gradient === "cyan" ? "text-gradient-cyan" : "text-gradient-gold"} style={{
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 800,
        fontFamily: "var(--font-heading)",
        lineHeight: 1,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: "0.85rem",
        color: "var(--text-muted)",
        marginTop: 8,
        fontWeight: 500,
      }}>{label}</div>
    </div>
  );
}
