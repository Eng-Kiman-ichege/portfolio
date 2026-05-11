import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { supabase } from "@/lib/supabase";
import { Github, Linkedin, Twitter, Sparkles } from "lucide-react";

async function getProjects() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", JSON.stringify(error, null, 2));
    return [];
  }

  return projects;
}

async function getProfile() {
  const { data: profile } = await supabase
    .from("profile")
    .select("cv_url")
    .limit(1)
    .maybeSingle();
  
  return profile;
}

export default async function Home() {
  const [projects, profile] = await Promise.all([
    getProjects(),
    getProfile()
  ]);

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Hero cvUrl={profile?.cv_url} />
      
      {/* Projects Section */}
      <section id="projects" className="relative z-10 container mx-auto px-4 py-20 sm:py-32">
        <div className="mb-12 sm:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-accent font-mono text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 block">
                Portfolio
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">Featured Projects</h2>
            </div>
            <p className="max-w-md text-muted-foreground text-base sm:text-lg leading-relaxed">
              Every project is a unique opportunity to push boundaries and create 
              something meaningful. Here are some of my favourite works.
            </p>
          </div>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[2rem] sm:rounded-[3rem] border border-dashed border-white/10 bg-white/5 py-20 sm:py-32 text-center backdrop-blur-sm px-6">
            <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-accent/40 mb-6" />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Workspace Empty</h3>
            <p className="text-muted-foreground max-w-sm text-sm sm:text-base">No projects have been added yet. Use the admin dashboard to showcase your work.</p>
          </div>
        )}
      </section>

      {/* Capabilities Section — unchanged */}
      <Capabilities />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 sm:py-16">
        <div className="border-t border-white/5 pt-10 sm:pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-2xl font-bold tracking-tighter">
              EVAN<span className="text-accent">.</span>
            </span>
            <p className="text-xs text-muted-foreground">Fullstack Developer &amp; AI Engineer</p>
          </div>

          <div className="flex gap-6 sm:gap-8 text-muted-foreground font-medium text-sm sm:text-base">
            <a href="/#projects" className="footer-link">Projects</a>
            <a href="/#capabilities" className="footer-link">Capabilities</a>
            <a href="/#contact" className="footer-link">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/8 text-muted-foreground hover:text-white hover:border-white/16 transition-all">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/8 text-muted-foreground hover:text-white hover:border-white/16 transition-all">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/8 text-muted-foreground hover:text-white hover:border-white/16 transition-all">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
        <p className="text-center text-muted-foreground text-xs mt-8">
          © {new Date().getFullYear()} Evan Studio. Crafted with passion &amp; precision.
        </p>
      </footer>
    </main>
  );
}
