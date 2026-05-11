"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const categories = [
  {
    id: "frontend",
    label: "01",
    title: "Frontend",
    subtitle: "Interfaces that Inspire",
    description:
      "Pixel-perfect, performant UIs built with cutting-edge frameworks. Every interaction is intentional, every animation purposeful.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="14" y="10" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.25)",
    borderGlow: "rgba(59,130,246,0.4)",
    skills: [
      "Next.js", "React", "React Native", "Angular",
      "Tailwind CSS", "Framer Motion", "shadcn/ui",
      "Responsive UI Design", "Component-Based Architecture",
      "Dynamic Forms & Interactive Interfaces",
    ],
  },
  {
    id: "backend",
    label: "02",
    title: "Backend",
    subtitle: "Systems That Scale",
    description:
      "Architecting robust, secure server-side solutions. From API design to database optimization — built for real-world production loads.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="5" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="2" y="11" width="20" height="5" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="6" cy="5.5" r="1" fill="currentColor" />
        <circle cx="6" cy="13.5" r="1" fill="currentColor" />
        <path d="M10 19h10M2 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    color: "#a855f7",
    glow: "rgba(168,85,247,0.25)",
    borderGlow: "rgba(168,85,247,0.4)",
    skills: [
      "Node.js", "Python Django", "Express",
      "REST APIs", "Authentication Systems",
      "Database-Driven Applications", "API Integrations",
      "Full-Stack Architecture",
    ],
  },
  {
    id: "ai",
    label: "03",
    title: "AI & Automation",
    subtitle: "Intelligence, Engineered",
    description:
      "Integrating large language models and autonomous AI agents into production-grade applications. The future is agentic — and I'm building it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="2" />
        <circle cx="9" cy="9" r="1" fill="currentColor" />
        <circle cx="15" cy="9" r="1" fill="currentColor" />
        <path d="M9 14s1 1.5 3 1.5 3-1.5 3-1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.25)",
    borderGlow: "rgba(6,182,212,0.4)",
    skills: [
      "AI-Powered Web Apps", "Prompt Engineering",
      "LLM Integrations", "AI Workflow Automation",
      "Voice AI Systems", "Conversational AI Agents",
      "AI Video Generation", "SaaS Automation Tools",
    ],
  },
];

/* ─── Animation variants ─────────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.35, ease: "easeOut" },
  }),
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Sub-components ────────────────────────────────────────────────────── */

function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof categories)[0];
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="capabilities-card group relative flex flex-col rounded-3xl overflow-hidden"
      style={{ "--card-glow": cat.glow, "--card-border": cat.borderGlow } as React.CSSProperties}
    >
      {/* Ambient glow blob */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700"
        style={{ background: cat.glow }}
      />

      {/* Top accent bar */}
      <div
        className="h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`,
        }}
      />

      {/* Card body */}
      <div className="relative z-10 flex flex-col flex-1 p-7 lg:p-8">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-2xl transition-transform duration-500 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${cat.color}22, ${cat.color}11)`,
              border: `1px solid ${cat.color}33`,
              color: cat.color,
            }}
          >
            {cat.icon}
          </div>
          <span
            className="font-mono text-xs tracking-widest opacity-30 group-hover:opacity-60 transition-opacity pt-1"
            style={{ color: cat.color }}
          >
            {cat.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">{cat.title}</h3>
        <p
          className="text-xs font-mono tracking-widest uppercase mb-4 opacity-60"
          style={{ color: cat.color }}
        >
          {cat.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground mb-7">
          {cat.description}
        </p>

        {/* Skill badges */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {cat.skills.map((skill, i) => (
            <motion.span
              key={skill}
              custom={i + index * 4}
              variants={badgeVariants}
              className="skill-badge"
              style={{
                "--badge-color": cat.color,
                "--badge-bg": `${cat.color}14`,
                "--badge-border": `${cat.color}30`,
              } as React.CSSProperties}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Bottom glow line on hover */}
      <div
        className="h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out opacity-50"
        style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
      />
    </motion.div>
  );
}

/* ─── Floating decoration orbs ─────────────────────────────────────────── */
function Orb({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="pointer-events-none absolute rounded-full blur-[120px] opacity-[0.07]"
      style={style}
    />
  );
}

/* ─── Main export ───────────────────────────────────────────────────────── */
export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative py-24 sm:py-36 overflow-hidden"
    >
      {/* Background orbs */}
      <Orb style={{ width: 600, height: 600, background: "#3b82f6", top: -100, left: -200 }} />
      <Orb style={{ width: 500, height: 500, background: "#a855f7", bottom: -100, right: -150 }} />
      <Orb style={{ width: 350, height: 350, background: "#06b6d4", top: "40%", left: "50%", transform: "translate(-50%,-50%)" }} />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section heading */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto text-center mb-16 sm:mb-24"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent font-mono text-[11px] tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Technical Capabilities
          </span>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-5">
            Built to ship.{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#3b82f6,#a855f7,#06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              End to End.
            </span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            From pixel-perfect interfaces to production-ready AI pipelines — I engineer
            the full stack with a relentless focus on quality.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 lg:grid-cols-3"
        >
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-3xl overflow-hidden capabilities-stats-wrap"
        >
          {[
            { value: "3+", label: "Years Building" },
            { value: "26+", label: "Projects Shipped" },
            { value: "3", label: "Skill Domains" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="capabilities-stat-item flex flex-col items-center justify-center py-8 px-4 text-center group"
            >
              <span className="text-3xl sm:text-4xl font-bold tracking-tight mb-1 capabilities-stat-value">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
