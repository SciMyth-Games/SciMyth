"use client";

export default function ParallaxBackground() {
  return (
    <div className="parallax-bg" aria-hidden="true">
      {/* Cyan orb */}
      <div
        className="glow-orb"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, var(--accent-cyan), transparent 70%)",
          top: "10%",
          left: "-10%",
          animationDelay: "0s",
        }}
      />
      {/* Gold orb */}
      <div
        className="glow-orb"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, var(--accent-gold), transparent 70%)",
          top: "50%",
          right: "-10%",
          animationDelay: "-7s",
        }}
      />
      {/* Violet orb */}
      <div
        className="glow-orb"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, var(--accent-violet), transparent 70%)",
          bottom: "5%",
          left: "30%",
          animationDelay: "-14s",
          opacity: 0.05,
        }}
      />
      {/* Subtle grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
    </div>
  );
}
