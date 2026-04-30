"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Globe, Mail, ArrowRight, FileText } from "lucide-react";

export function Hero({ cvUrl }: { cvUrl?: string }) {
  return (
    <section className="relative flex min-h-[90vh] lg:min-h-screen items-center justify-center overflow-hidden px-4 pt-28 pb-12 lg:pt-20">
      <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            Available for new projects
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl"
          >
            Fullstack <br />
            <span className="text-accent">Developer</span> & <br />
            Designer
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10 mx-auto lg:mx-0 max-w-xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            I craft high-performance web experiences that blend technical excellence 
            with pixel-perfect design. Specialized in Next.js, Supabase, and modern UI.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto h-14 rounded-2xl px-8 text-lg font-bold shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95">
              Explore Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            {cvUrl ? (
              <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full h-14 rounded-2xl px-8 text-lg font-bold glass transition-all hover:bg-white/5 active:scale-95 gap-2">
                  <FileText className="h-5 w-5" />
                  Download CV
                </Button>
              </a>
            ) : (
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 rounded-2xl px-8 text-lg font-bold glass transition-all hover:bg-white/5 active:scale-95">
                Let&apos;s Talk
              </Button>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-6 sm:gap-8 text-muted-foreground"
          >
            <a href="#" className="flex items-center gap-2 transition-colors hover:text-accent">
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a href="#" className="flex items-center gap-2 transition-colors hover:text-accent">
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium">Dribbble</span>
            </a>
            <a href="#" className="flex items-center gap-2 transition-colors hover:text-accent">
              <Mail className="h-5 w-5" />
              <span className="text-sm font-medium">Email</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative z-10 aspect-square w-full max-w-[320px] sm:max-w-[380px] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl">
            <Image
              src="/kimse.png"
              alt="Evan Portfolio"
              fill
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
              priority
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          </div>
          
          {/* Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="glass absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 z-20 rounded-3xl p-4 sm:p-6"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                <span className="text-xl sm:text-2xl font-bold">5+</span>
              </div>
              <div>
                <p className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">Years Experience</p>
                <p className="text-sm sm:text-lg font-bold">Top-Tier Quality</p>
              </div>
            </div>
          </motion.div>

          {/* Background Glows */}
          <div className="absolute -top-20 -right-20 -z-10 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-accent/20 blur-[80px] sm:blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 -z-10 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-purple-500/20 blur-[80px] sm:blur-[120px]" />
        </motion.div>
      </div>
    </section>
  );
}
