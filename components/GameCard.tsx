"use client";

interface GameCardProps {
  title: string;
  genre: string;
  category: string;
  description: string;
  gradient: string;
  emoji: string;
  platform: string;
}

export default function GameCard({ title, genre, category, description, gradient, emoji, platform }: GameCardProps) {
  return (
    <div className="glass glass-hover cube-child" style={{
      overflow: "hidden",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Image area */}
      <div style={{
        width: "100%",
        aspectRatio: "16/10",
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <span style={{ fontSize: "3.5rem", position: "relative", zIndex: 1 }}>{emoji}</span>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,14,26,0.8) 0%, transparent 60%)",
        }} />
      </div>

      {/* Body */}
      <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 600, padding: "4px 10px",
            borderRadius: 100, background: "var(--accent-cyan-dim)",
            color: "var(--accent-cyan)", border: "1px solid rgba(34,211,238,0.2)",
          }}>{genre}</span>
          <span style={{
            fontSize: "0.7rem", fontWeight: 600, padding: "4px 10px",
            borderRadius: 100, background: "var(--accent-gold-dim)",
            color: "var(--accent-gold)", border: "1px solid rgba(245,158,11,0.2)",
          }}>{category}</span>
        </div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>{title}</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1 }}>{description}</p>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid var(--border-glass)", paddingTop: 12, marginTop: 4,
        }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{platform}</span>
          <span style={{ color: "var(--accent-cyan)", fontWeight: 600, fontSize: "1.1rem" }}>→</span>
        </div>
      </div>
    </div>
  );
}
