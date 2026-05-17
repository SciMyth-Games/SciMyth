"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-screen ${hidden ? "hidden" : ""}`}>
      <div className="loading-logo">
        <span className="text-gradient-cyan">SCI</span>
        <span className="text-gradient-gold">MYTH</span>
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginLeft: 8, fontWeight: 400, fontFamily: "var(--font-body)", letterSpacing: "0.15em" }}>GAMES</span>
      </div>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" />
      </div>
    </div>
  );
}
