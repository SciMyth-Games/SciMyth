"use client";

export default function CTABanner() {
  return (
    <div className="cube-child" id="cta">
      <div className="glass" style={{
        padding: "clamp(40px, 5vw, 72px) clamp(24px, 4vw, 56px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderColor: "rgba(34,211,238,0.15)",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, var(--accent-cyan), transparent 70%)",
        }} />

        <span className="section-tag" style={{ marginBottom: 18, position: "relative" }}>Ready to Scale Your Production?</span>
        <h2 style={{
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          marginBottom: 16,
          position: "relative",
        }}>
          Let&apos;s Build Something<br />
          <span className="text-gradient-mixed">Extraordinary</span>
        </h2>
        <p style={{
          fontSize: "1.05rem",
          color: "var(--text-secondary)",
          maxWidth: 550,
          margin: "0 auto 32px",
          lineHeight: 1.7,
          position: "relative",
        }}>
          Whether you need a dedicated team, co-development support, or full project delivery — we&apos;re ready to bring your vision to life.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <a href="#" className="btn btn-primary btn-lg">Get a Free Estimate</a>
          <a href="#services" className="btn btn-outline btn-lg">Explore Services</a>
        </div>
      </div>
    </div>
  );
}
