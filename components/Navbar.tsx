"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Why Us", href: "#why" },
  { label: "Stats", href: "#stats" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 200 && y > lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <nav
      id="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "12px 0" : "20px 0",
        background: scrolled ? "rgba(10, 14, 26, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-glass)" : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.4rem" }}>
            <span className="text-gradient-cyan">SCI</span>
            <span className="text-gradient-gold">MYTH</span>
          </span>
          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.15em", fontWeight: 400 }}>GAMES</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{
              textDecoration: "none",
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              fontWeight: 500,
              transition: "color 0.3s",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-cyan)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {l.label}
            </a>
          ))}
          <a href="#cta" className="btn btn-primary btn-sm">Request a Quote</a>
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
        >
          <span style={{ width: 24, height: 2, background: "var(--text-primary)", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: 24, height: 2, background: "var(--text-primary)", borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 24, height: 2, background: "var(--text-primary)", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "rgba(10, 14, 26, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border-glass)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }} className="nav-mobile-menu">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              textDecoration: "none",
              color: "var(--text-secondary)",
              fontSize: "1rem",
              fontWeight: 500,
              padding: "8px 0",
            }}>
              {l.label}
            </a>
          ))}
          <a href="#cta" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Request a Quote</a>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
