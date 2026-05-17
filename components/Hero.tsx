"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Hero badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="section-tag"
        style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
      >
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#22c55e",
          boxShadow: "0 0 12px rgba(34,197,94,0.6)",
          animation: "pulse 2s infinite",
        }} />
        Now Accepting Projects • 2024
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          marginTop: 24,
          marginBottom: 24,
          maxWidth: 800,
        }}
      >
        Full-Cycle<br />
        <span className="text-gradient-cyan">Game Development</span><br />
        <span className="text-gradient-gold">Outsourcing</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.9, duration: 0.7 }}
        style={{
          fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
          color: "var(--text-secondary)",
          maxWidth: 600,
          lineHeight: 1.7,
          marginBottom: 40,
        }}
      >
        From concept to launch — we deliver AAA-quality game development, stunning art, and rigorous QA. Scale your team with our dedicated experts.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.6 }}
        style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}
      >
        <a href="#cta" className="btn btn-primary btn-lg">🚀 Request a Quote</a>
        <a href="#portfolio" className="btn btn-secondary btn-lg">🎮 View Our Work</a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{
          width: 24, height: 40, border: "2px solid var(--text-muted)",
          borderRadius: 12, position: "relative",
        }}>
          <div style={{
            width: 4, height: 8, background: "var(--accent-cyan)",
            borderRadius: 2, position: "absolute", top: 6, left: "50%",
            transform: "translateX(-50%)",
            animation: "float 2s ease-in-out infinite",
          }} />
        </div>
        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
      </motion.div>
    </section>
  );
}
