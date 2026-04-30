"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, ImageIcon, ArrowRight } from "lucide-react";
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

export function ProjectCard({ project }: { project: Project }) {
  const validImages = [
    ...(project.image_urls || []),
    project.image_url
  ].filter(url => typeof url === 'string' && url.trim() !== '');

  const displayImage = validImages[0];
  const photoCount = validImages.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative flex flex-col rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-4 sm:p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-accent/5"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] border border-white/5 bg-black/50 flex items-center justify-center shadow-lg transition-all">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <ImageIcon className="h-12 w-12 text-muted-foreground/20" />
        )}
        
        {/* Photo Count Badge */}
        {photoCount > 1 && (
          <div className="absolute top-6 right-6 glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {photoCount} Photos
          </div>
        )}
        
        {/* Hover Overlay */}
        <Link href={`/projects/${project.id}`} className="absolute inset-0 z-20 cursor-pointer">
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center backdrop-blur-[2px]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black translate-y-4 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-110 shadow-xl">
              <ArrowUpRight className="h-6 w-6" />
            </div>
          </div>
        </Link>
      </div>
      
      <div className="mt-8 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech_stack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] font-bold uppercase tracking-widest text-accent/80">
              {tech}
            </span>
          ))}
        </div>
        
        <h3 className="text-3xl font-bold mb-3 tracking-tight group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground line-clamp-2 leading-relaxed text-lg mb-8">
          {project.description}
        </p>
        
        <div className="mt-auto">
          <Link href={`/projects/${project.id}`}>
            <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-all group-hover:gap-5">
              View Project
              <ArrowRight className="h-4 w-4 text-accent" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
