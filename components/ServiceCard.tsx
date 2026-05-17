"use client";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="glass glass-hover cube-child" style={{
      padding: "32px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      height: "100%",
    }}>
      <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>{icon}</div>
      <h3 style={{
        fontSize: "1.15rem",
        fontWeight: 600,
        fontFamily: "var(--font-heading)",
        color: "var(--text-primary)",
      }}>{title}</h3>
      <p style={{
        fontSize: "0.9rem",
        color: "var(--text-secondary)",
        lineHeight: 1.7,
        flex: 1,
      }}>{description}</p>
      <a href="#" style={{
        fontSize: "0.82rem",
        fontWeight: 600,
        color: "var(--accent-cyan)",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        transition: "gap 0.3s",
      }}
      onMouseEnter={e => (e.currentTarget.style.gap = "8px")}
      onMouseLeave={e => (e.currentTarget.style.gap = "4px")}
      >
        Learn More <span>→</span>
      </a>
    </div>
  );
}
