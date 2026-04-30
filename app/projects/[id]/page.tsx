import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, Globe, Code2, ArrowRight, ImageIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

async function getProject(id: string) {
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  
  return project;
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const allImages = [
    ...(project.image_urls || []),
    project.image_url
  ].filter((url): url is string => typeof url === 'string' && url.trim() !== '');

  return (
    <main className="min-h-screen bg-background pt-24 sm:pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <Link 
          href="/" 
          className="mb-8 sm:mb-12 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent group"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>

        <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr] lg:items-start">
          {/* Gallery Section */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            {allImages.length > 0 ? (
              <>
                <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/5 shadow-2xl bg-white/5">
                  <Image
                    src={allImages[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Additional Images Grid */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {allImages.slice(1).map((url: string, index: number) => (
                      <div key={index} className="relative aspect-video overflow-hidden rounded-[1rem] sm:rounded-[1.5rem] border border-white/5 transition-transform hover:scale-[1.02] shadow-lg bg-white/5">
                        <Image src={url} alt={`${project.title} - ${index + 2}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-white/10 bg-white/5 text-muted-foreground">
                <ImageIcon className="mb-4 h-12 w-12 opacity-20" />
                <p>No images available for this project</p>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="lg:sticky lg:top-32 h-fit order-1 lg:order-2">
            <span className="text-accent font-mono text-xs sm:text-sm tracking-widest uppercase mb-4 block">Project Case Study</span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight leading-tight">{project.title}</h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 sm:mb-10 whitespace-pre-wrap">
              {project.description}
            </p>

            <div className="grid gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="flex flex-col sm:flex-row gap-4 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <Code2 className="h-6 w-6 text-accent shrink-0" />
                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-3 tracking-tight">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack?.map((tech: string) => (
                      <span key={tech} className="text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-accent/10 text-accent border border-accent/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <Globe className="h-6 w-6 text-accent shrink-0" />
                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-3 tracking-tight">Project Links</h3>
                  <div className="flex flex-col gap-3">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group/link">
                        <Github className="h-5 w-5" />
                        <span className="text-sm sm:text-base font-medium underline underline-offset-4">Source Code</span>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group/link">
                        <Globe className="h-5 w-5" />
                        <span className="text-sm sm:text-base font-medium underline underline-offset-4">Live Demonstration</span>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full h-16 sm:h-20 rounded-[1.2rem] sm:rounded-[1.5rem] text-lg sm:text-xl font-bold gap-3 shadow-2xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95">
                  Launch Live Experience
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
