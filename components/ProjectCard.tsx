"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  image_urls?: string[];
  github_url?: string;
  live_url?: string;
  tech_stack: string[];
}

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  "next.js":     { bg: "rgba(255,255,255,0.06)", color: "#fff" },
  react:         { bg: "rgba(97,218,251,0.12)",  color: "#61dafb" },
  "react native":{ bg: "rgba(97,218,251,0.12)",  color: "#61dafb" },
  typescript:    { bg: "rgba(49,120,198,0.15)",  color: "#4a90d9" },
  "tailwind css":{ bg: "rgba(56,189,248,0.12)",  color: "#38bdf8" },
  tailwind:      { bg: "rgba(56,189,248,0.12)",  color: "#38bdf8" },
  "node.js":     { bg: "rgba(104,185,88,0.12)",  color: "#68b958" },
  node:          { bg: "rgba(104,185,88,0.12)",  color: "#68b958" },
  python:        { bg: "rgba(255,213,0,0.12)",   color: "#f5c518" },
  django:        { bg: "rgba(9,133,75,0.15)",    color: "#09854b" },
  supabase:      { bg: "rgba(62,207,142,0.12)",  color: "#3ecf8e" },
  mongodb:       { bg: "rgba(77,179,61,0.12)",   color: "#4db33d" },
  express:       { bg: "rgba(255,255,255,0.06)", color: "#ccc" },
  angular:       { bg: "rgba(221,0,49,0.12)",    color: "#dd0031" },
  aws:           { bg: "rgba(255,153,0,0.12)",   color: "#ff9900" },
};

function getBadgeStyle(tech: string) {
  return BADGE_COLORS[tech.toLowerCase()] ?? { bg: "rgba(168,85,247,0.1)", color: "#a855f7" };
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const validImages = [
    ...(project.image_urls || []),
    project.image_url,
  ].filter((url) => typeof url === "string" && url.trim() !== "");

  const displayImage = validImages[0];
  const photoCount = validImages.length;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="project-card group relative flex flex-col rounded-3xl overflow-hidden"
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ImageIcon className="h-12 w-12 text-white/10" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/55 opacity-0 transition-opacity duration-400 group-hover:opacity-100 backdrop-blur-[2px]" />

        {/* Action buttons on hover */}
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-3 opacity-0 translate-y-4 transition-all duration-350 group-hover:opacity-100 group-hover:translate-y-0">
          <Link href={`/projects/${project.id}`}>
            <button className="project-action-btn">
              <ArrowUpRight className="h-5 w-5" />
              View
            </button>
          </Link>
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
              <button className="project-action-btn project-action-btn--accent">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </button>
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
              <button className="project-action-btn">
                <Github className="h-4 w-4" />
                Code
              </button>
            </a>
          )}
        </div>

        {/* Index */}
        <div className="absolute top-4 left-4 z-10 font-mono text-[10px] tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
          {num}
        </div>

        {/* Photo count */}
        {photoCount > 1 && (
          <div className="absolute top-4 right-4 z-10 glass px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/70">
            {photoCount} photos
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech_stack.slice(0, 5).map((tech) => {
            const s = getBadgeStyle(tech);
            return (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border"
                style={{ background: s.bg, color: s.color, borderColor: `${s.color}30` }}
              >
                {tech}
              </span>
            );
          })}
          {project.tech_stack.length > 5 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border border-white/10 bg-white/5 text-white/40">
              +{project.tech_stack.length - 5}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <Link href={`/projects/${project.id}`}>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-accent transition-all duration-300 group/btn">
              View Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </Link>
          <div className="flex items-center gap-2">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <button className="flex items-center justify-center w-8 h-8 rounded-full border border-white/8 text-white/30 hover:text-white hover:border-white/20 transition-all">
                  <Github className="h-3.5 w-3.5" />
                </button>
              </a>
            )}
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <button className="flex items-center justify-center w-8 h-8 rounded-full border border-white/8 text-white/30 hover:text-accent hover:border-accent/30 transition-all">
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
