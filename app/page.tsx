import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { supabase } from "@/lib/supabase";
import { ArrowUpRight, Zap, Shield, Sparkles } from "lucide-react";

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
              <span className="text-accent font-mono text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 block">Portfolio</span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">Featured Projects</h2>
            </div>
            <p className="max-w-md text-muted-foreground text-base sm:text-lg leading-relaxed">
              Every project is a unique opportunity to push boundaries and create 
              something meaningful. Here are some of my favorite works.
            </p>
          </div>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
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

      {/* Services/What I Do Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-white/[0.02] -skew-y-2 sm:-skew-y-3 z-0" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 sm:gap-16 lg:grid-cols-2 lg:items-start">
            <div className="lg:sticky lg:top-32">
              <span className="text-accent font-mono text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 block">Capabilities</span>
              <h2 className="mb-6 sm:mb-8 text-4xl sm:text-6xl font-bold tracking-tight">Strategic Design & <br/>Digital Mastery</h2>
              <p className="mb-8 sm:mb-10 text-lg sm:text-xl text-muted-foreground leading-relaxed">
                I don&apos;t just write code. I build digital assets that drive growth, 
                enhance user engagement, and solve complex business challenges.
              </p>
              
              <div className="flex flex-col gap-4 sm:gap-6">
                {[
                  { icon: Zap, title: "High-Performance Apps", desc: "Lightning fast applications built with Next.js and optimized for SEO." },
                  { icon: Shield, title: "Scalable Architecture", desc: "Robust backend systems with Supabase and secure authentication." },
                  { icon: Sparkles, title: "Premium UI/UX", desc: "Bespoke interfaces that leave a lasting impression on your users." },
                ].map((item, index) => (
                  <div key={index} className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl sm:rounded-3xl transition-all hover:bg-white/5">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-accent/10 text-accent transition-all group-hover:scale-110">
                      <item.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 pt-12 lg:pt-0">
              {[
                { label: "React / Next.js", value: "95%", icon: "⚡" },
                { label: "TypeScript", value: "90%", icon: "📘" },
                { label: "Tailwind CSS", value: "98%", icon: "🎨" },
                { label: "PostgreSQL / SQL", value: "85%", icon: "💾" },
                { label: "Node.js", value: "88%", icon: "🟢" },
                { label: "UI Design", value: "92%", icon: "🖋️" },
                { label: "Python", value: "90%", icon: "🐍" },
                { label: "Django / Flask", value: "85%", icon: "🌐" },
                { label: "MongoDB", value: "88%", icon: "🍃" },
                { label: "Express", value: "85%", icon: "⚙️" },
                { label: "AWS", value: "80%", icon: "☁️" },
                { label: "Angular", value: "85%", icon: "🅰️" },
                { label: "React Native", value: "90%", icon: "📱" },
              ].map((skill) => (
                <div key={skill.label} className="glass-card flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center group">
                  <span className="mb-4 sm:mb-6 text-4xl sm:text-5xl transition-transform duration-500 group-hover:scale-125">{skill.icon}</span>
                  <span className="text-lg sm:text-xl font-bold mb-2 tracking-tight">{skill.label}</span>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-accent" style={{ width: skill.value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-20 sm:py-32 text-center">
        <div className="glass-card rounded-[2.5rem] sm:rounded-[4rem] p-10 sm:p-16 lg:p-24 relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] bg-accent/20 blur-[80px] sm:blur-[100px] -z-10 group-hover:bg-accent/30 transition-all" />
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tight">Ready to build <br/>your next vision?</h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
            I&apos;m currently open to freelance opportunities and full-time positions. 
            Let&apos;s create something extraordinary together.
          </p>
          <a href="mailto:hello@example.com">
            <button className="h-14 sm:h-16 px-8 sm:px-12 rounded-xl sm:rounded-2xl bg-white text-black font-bold text-lg sm:text-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto">
              Get in Touch
              <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </a>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-12 sm:py-16">
        <div className="border-t border-white/5 pt-10 sm:pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <span className="text-2xl font-bold tracking-tighter">EVAN<span className="text-accent">.</span></span>
          <div className="flex gap-6 sm:gap-8 text-muted-foreground font-medium text-sm sm:text-base">
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-accent transition-colors">Twitter</a>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm">© {new Date().getFullYear()} Evan Studio. Crafted with Passion.</p>
        </div>
      </footer>
    </main>
  );
}
