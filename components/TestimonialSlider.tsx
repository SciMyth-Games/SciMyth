"use client";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote: "SciMyth delivered our RPG project ahead of schedule with exceptional quality. Their team became a seamless extension of ours — communication was flawless and the art direction was outstanding.",
    name: "Alex Morrison",
    role: "Lead Producer, Nexus Interactive",
    avatar: "👨‍💼",
  },
  {
    quote: "We've worked with multiple outsourcing studios, but SciMyth stands out for their technical expertise and commitment to quality. Their Unity developers integrated into our CI/CD pipeline from day one.",
    name: "Sarah Chen",
    role: "CTO, DragonForge Studios",
    avatar: "👩‍💻",
  },
  {
    quote: "From character concepts to fully rigged 3D models, SciMyth's art team is world-class. They understood our creative vision immediately and delivered assets that exceeded expectations.",
    name: "Marcus Rivera",
    role: "Art Director, Polar Bear Games",
    avatar: "👨‍🎨",
  },
];

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[active];

  return (
    <div className="cube-child">
      <div className="glass" style={{
        padding: "clamp(28px, 4vw, 48px)",
        maxWidth: 700,
        margin: "0 auto",
        textAlign: "center",
        transition: "all 0.5s ease",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative quote mark */}
        <div style={{
          position: "absolute", top: 16, left: 24,
          fontSize: "4rem", color: "var(--accent-cyan)",
          opacity: 0.1, fontFamily: "serif", lineHeight: 1,
        }}>"</div>

        <div style={{ color: "var(--accent-gold)", fontSize: "1.1rem", letterSpacing: 2, marginBottom: 16 }}>★★★★★</div>
        <p style={{
          fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
          color: "var(--text-secondary)",
          lineHeight: 1.8,
          fontStyle: "italic",
          marginBottom: 24,
          minHeight: 80,
        }}>{t.quote}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <span style={{ fontSize: "2rem" }}>{t.avatar}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{t.name}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{t.role}</div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} aria-label={`Go to testimonial ${i + 1}`}
            style={{
              width: active === i ? 24 : 8, height: 8,
              borderRadius: 4,
              background: active === i ? "var(--accent-cyan)" : "var(--bg-tertiary)",
              border: "none", cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
