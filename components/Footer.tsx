"use client";

const footerLinks = {
  Services: ["Game Development", "Game Art & Animation", "QA & Testing", "Co-Development"],
  Company: ["About Us", "How We Work", "Careers", "Blog"],
  Resources: ["Portfolio", "Tech Stack", "Pricing Models", "Contact"],
};

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border-glass)",
      padding: "64px 0 32px",
      position: "relative",
      zIndex: 1,
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem" }}>
                <span className="text-gradient-cyan">SCI</span>
                <span className="text-gradient-gold">MYTH</span>
              </span>
              <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.15em" }}>GAMES</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
              Full-cycle game development outsourcing studio. From concept to launch, we deliver AAA-quality games.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {["𝕏", "in", "💬", "⌨"].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "var(--bg-tertiary)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  textDecoration: "none", fontSize: "0.85rem",
                  color: "var(--text-muted)", transition: "all 0.3s",
                  border: "1px solid var(--border-glass)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-cyan)"; e.currentTarget.style.color = "var(--accent-cyan)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-glass)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 600, marginBottom: 16 }}>{title}</h4>
              {links.map((link) => (
                <a key={link} href="#" style={{
                  display: "block", fontSize: "0.85rem", color: "var(--text-muted)",
                  textDecoration: "none", padding: "4px 0", transition: "color 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                >{link}</a>
              ))}
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 600, marginBottom: 16 }}>Stay Updated</h4>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: 12, lineHeight: 1.6 }}>Get industry insights and studio news.</p>
            <form style={{ display: "flex", gap: 8 }} onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email" style={{
                flex: 1, padding: "10px 14px", background: "var(--bg-tertiary)",
                border: "1px solid var(--border-glass)", borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)", fontSize: "0.85rem", outline: "none",
                fontFamily: "var(--font-body)",
              }} />
              <button type="submit" className="btn btn-primary btn-sm">→</button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: "1px solid var(--border-glass)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 16,
        }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>© 2024 SciMyth Games. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
