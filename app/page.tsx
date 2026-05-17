"use client";
import { useCubeScroll } from "@/hooks/useCubeScroll";
import { useLenis } from "@/hooks/useLenis";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import GameCard from "@/components/GameCard";
import StatsCounter from "@/components/StatsCounter";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ParallaxBackground from "@/components/ParallaxBackground";

const services = [
  { icon: "🎮", title: "Game Development", description: "Full-cycle game development from concept to launch. Unity, Unreal Engine 5, and custom solutions for PC, mobile, and console." },
  { icon: "🎨", title: "Game Art & Animation", description: "Stunning 2D/3D art, character design, environment art, VFX, and cinematic animations that bring worlds to life." },
  { icon: "🧪", title: "QA & Testing", description: "Comprehensive quality assurance — functional, performance, compatibility, and regression testing for flawless launches." },
  { icon: "✏️", title: "Game Design", description: "Expert game design services including mechanics, level design, UX/UI, balancing, and player experience optimization." },
  { icon: "🤝", title: "Co-Development", description: "Flexible production partnerships to expand your capacity. Embed our specialists directly into your existing pipeline." },
  { icon: "🔧", title: "Live Ops & Support", description: "Post-launch support, content updates, live operations, and ongoing maintenance to keep your game thriving." },
];

const games = [
  { title: "Indra vs Vritrasur", genre: "Action RPG", category: "Mythology", description: "Full-cycle action RPG inspired by Vedic mythology — 3D characters, divine weapons, cinematic battles.", gradient: "linear-gradient(135deg, #bf360c 0%, #ffb300 50%, #ff6f00 100%)", emoji: "⚡", platform: "🖥 PC • Unity" },
  { title: "Realm Rivals", genre: "Strategy", category: "Multiplayer", description: "Competitive real-time strategy with multiplayer netcode, army systems, and alliance mechanics.", gradient: "linear-gradient(135deg, #311b92 0%, #7c4dff 50%, #b388ff 100%)", emoji: "⚔️", platform: "🖥 PC • Unity" },
  { title: "The Lost Cure", genre: "Horror", category: "Survival", description: "Atmospheric survival horror with puzzle mechanics, narrative design, and environmental storytelling.", gradient: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #004d40 100%)", emoji: "🧪", platform: "🖥 PC • Unity" },
];

const features = [
  { icon: "👥", title: "Dedicated Teams", desc: "Hand-picked specialists exclusively focused on your project, fully integrated into your pipeline." },
  { icon: "🏆", title: "AAA Quality", desc: "Industry-standard methodologies and tools delivering polished, production-ready results every time." },
  { icon: "⚡", title: "Rapid Scaling", desc: "Scale your team up or down on demand. From 1 specialist to a full 20-person squad." },
  { icon: "🛡️", title: "100% Transparent", desc: "Real-time progress tracking, milestone-based delivery, and clear communication at every step." },
];

const stats = [
  { value: 60, suffix: "+", label: "Expert Developers", gradient: "cyan" as const },
  { value: 50, suffix: "+", label: "Projects Delivered", gradient: "gold" as const },
  { value: 15, suffix: "+", label: "Years Experience", gradient: "cyan" as const },
  { value: 98, suffix: "%", label: "Client Satisfaction", gradient: "gold" as const },
];

const logos = ["⚡ NEXON", "🎯 EPIC GAMES", "🎮 VALVE", "🏆 UBISOFT", "🌟 RIOT GAMES", "🎲 EA GAMES", "⚔️ BETHESDA", "🔮 SQUARE ENIX"];

export default function Home() {
  const cubeRef = useCubeScroll();
  useLenis();

  return (
    <>
      <LoadingScreen />
      <ParallaxBackground />
      <Navbar />

      <div ref={cubeRef} className="cube-perspective">
        {/* ═══ HERO ═══ */}
        <div className="cube-section">
          <Hero />
        </div>

        {/* ═══ TRUSTED BY ═══ */}
        <div className="cube-section" style={{ padding: "24px 0 40px", overflow: "hidden", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 500 }}>
              Trusted By Studios & Publishers Worldwide
            </span>
          </div>
          <div style={{ display: "flex", gap: 48, animation: "scrollLogos 30s linear infinite", whiteSpace: "nowrap" }}>
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.05em", opacity: 0.5, flexShrink: 0 }}>{logo}</span>
            ))}
          </div>
          <style jsx>{`
            @keyframes scrollLogos {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>

        {/* ═══ SERVICES ═══ */}
        <section className="cube-section" id="services" style={{ padding: "100px 0", position: "relative", zIndex: 1 }}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag">What We Do</span>
              <h2>Game Development <span className="text-gradient-cyan">Services</span></h2>
              <p>End-to-end game development solutions tailored to your vision. From AAA titles to indie gems, we bring your ideas to life.</p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: 24,
            }}>
              {services.map((s, i) => (
                <ServiceCard key={i} {...s} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PORTFOLIO ═══ */}
        <section className="cube-section" id="portfolio" style={{ padding: "100px 0", position: "relative", zIndex: 1 }}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Work</span>
              <h2>Featured <span className="text-gradient-gold">Case Studies</span></h2>
              <p>A selection of our proudest deliveries — from mythological RPGs to multiplayer strategy games.</p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: 24,
            }}>
              {games.map((g, i) => (
                <GameCard key={i} {...g} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHY US ═══ */}
        <section className="cube-section" id="why" style={{ padding: "100px 0", position: "relative", zIndex: 1 }}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Why SciMyth</span>
              <h2>What Sets Us <span className="text-gradient-cyan">Apart</span></h2>
              <p>We don&apos;t just build games — we become an extension of your team.</p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gap: 24,
            }}>
              {features.map((f, i) => (
                <div key={i} className="glass glass-hover cube-child" style={{ padding: "32px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{f.icon}</div>
                  <h4 style={{ fontSize: "1.05rem", fontFamily: "var(--font-heading)", fontWeight: 600, marginBottom: 8 }}>{f.title}</h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ STATS ═══ */}
        <section className="cube-section" id="stats" style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
              gap: 24,
            }}>
              {stats.map((s, i) => (
                <StatsCounter key={i} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section className="cube-section" id="testimonials" style={{ padding: "100px 0", position: "relative", zIndex: 1 }}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Testimonials</span>
              <h2>What Clients Say <span className="text-gradient-gold">About Us</span></h2>
            </div>
            <TestimonialSlider />
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="cube-section" style={{ padding: "60px 0 100px", position: "relative", zIndex: 1 }}>
          <div className="container">
            <CTABanner />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
