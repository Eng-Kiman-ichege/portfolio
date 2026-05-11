"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowRight, FileText, ChevronDown } from "lucide-react";

const ROLES = [
  "Fullstack Developer",
  "AI Engineer",
  "UI/UX Designer",
  "Next.js Specialist",
];

const STATS = [
  { value: "5+", label: "Years Exp." },
  { value: "26+", label: "Projects" },
  { value: "100%", label: "Satisfaction" },
];

export function Hero({ cvUrl }: { cvUrl?: string }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 pb-16">

      {/* ── Background elements ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Mesh gradient */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Blue orb right */}
        <div className="absolute -top-32 right-[-10%] h-[600px] w-[600px] rounded-full bg-accent/15 blur-[120px]" />
        {/* Purple orb left-bottom */}
        <div className="absolute bottom-0 left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        {/* Cyan orb center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="container mx-auto grid gap-16 lg:grid-cols-2 lg:items-center">

        {/* ── Left column ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="z-10 text-center lg:text-left"
        >
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for new projects
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="mb-4 text-5xl font-bold leading-[1.08] tracking-tight sm:text-7xl lg:text-8xl"
          >
            Hi, I&apos;m{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#3b82f6 0%,#a855f7 50%,#06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Evan
            </span>
            .
          </motion.h1>

          {/* Cycling role */}
          <div className="mb-6 h-12 sm:h-14 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-2xl sm:text-3xl font-semibold text-muted-foreground"
              >
                {ROLES[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10 mx-auto lg:mx-0 max-w-xl text-lg text-muted-foreground leading-relaxed"
          >
            I craft high-performance web experiences and AI-powered products that
            blend technical depth with pixel-perfect design. Specialized in
            Next.js, Node.js, and intelligent automation.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
          >
            <button
              onClick={scrollToProjects}
              className="hero-btn-primary group w-full sm:w-auto"
            >
              Explore Projects
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            {cvUrl ? (
              <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <button className="hero-btn-secondary w-full">
                  <FileText className="h-5 w-5" />
                  Download CV
                </button>
              </a>
            ) : (
              <a href="#contact" className="w-full sm:w-auto">
                <button className="hero-btn-secondary w-full">
                  Let&apos;s Talk
                </button>
              </a>
            )}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex items-center justify-center lg:justify-start gap-5 text-muted-foreground"
          >
            <a href="#" className="hero-social-link">
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <span className="h-4 w-px bg-white/10" />
            <a href="#" className="hero-social-link">
              <Linkedin className="h-5 w-5" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <span className="h-4 w-px bg-white/10" />
            <a href="mailto:kimf95023@gmail.com" className="hero-social-link">
              <Mail className="h-5 w-5" />
              <span className="text-sm font-medium">Email</span>
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right column — image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex flex-col items-center justify-center"
        >
          {/* Photo frame */}
          <div className="relative z-10 aspect-square w-full max-w-[300px] sm:max-w-[380px]">
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-[2.5rem] blur-2xl opacity-40"
              style={{
                background: "conic-gradient(from 180deg, #3b82f6, #a855f7, #06b6d4, #3b82f6)",
              }}
            />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl h-full">
              <Image
                src="/kimse.png"
                alt="Evan — Fullstack Developer & AI Engineer"
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                priority
              />
              {/* Bottom gradient fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, x: -24, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="absolute -left-4 top-1/4 z-20"
          >
            <div className="glass rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-accent">5+</span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Years</p>
                  <p className="text-xs font-bold">Experience</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="absolute -right-4 top-1/2 z-20"
          >
            <div className="glass rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-purple-400">26+</span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Apps</p>
                  <p className="text-xs font-bold">Shipped</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
          >
            <div className="glass rounded-2xl px-5 py-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#3b82f6", "#a855f7", "#06b6d4"].map((c, i) => (
                    <div
                      key={i}
                      className="h-6 w-6 rounded-full border-2 border-background"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  <span className="text-foreground font-bold">100%</span> Client Satisfaction
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToProjects}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.button>
    </section>
  );
}
