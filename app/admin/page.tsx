import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ExternalLink, FileText, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCV } from "@/app/actions/project";
import { DeleteProjectButton } from "@/components/DeleteProjectButton";

async function getProjects() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return projects;
}

export default async function AdminDashboard() {
  const projects = await getProjects();

  return (
    <main className="container mx-auto px-4 pt-32 pb-20">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">Manage your portfolio projects and profile.</p>
        </div>
        <Link href="/admin/new">
          <Button className="gap-2 rounded-full cursor-pointer transition-all hover:bg-accent hover:text-white hover:scale-105 active:scale-95 shadow-lg shadow-accent/20">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      {/* CV Management Section */}
      <div className="glass mb-12 rounded-[2rem] border border-white/5 p-8">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-6 w-6 text-accent" />
          <h2 className="text-2xl font-bold">CV Management</h2>
        </div>
        <form action={updateCV} className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="cv">Upload New CV (PDF)</Label>
            <Input id="cv" name="cv" type="file" accept=".pdf" className="bg-white/5 border-white/10" required />
          </div>
          <Button type="submit" variant="secondary" className="rounded-xl px-8">
            Update CV
          </Button>
        </form>
      </div>

      <div className="glass overflow-hidden rounded-3xl border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px] lg:min-w-0">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 font-semibold">Project</th>
                <th className="px-6 py-4 font-semibold">Tech Stack</th>
                <th className="px-6 py-4 font-semibold">Links</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="transition-colors hover:bg-white/5">
                  <td className="px-6 py-4">
                    <Link href={`/projects/${project.id}`} className="group/title flex items-center gap-4 cursor-pointer">
                      <div className="relative h-12 w-20 overflow-hidden rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover/title:border-accent/40">
                        {project.image_url ? (
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <span className="font-bold group-hover/title:text-accent transition-colors">{project.title}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech_stack?.map((tech: string) => (
                        <span key={tech} className="rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 text-muted-foreground">
                      {project.github_url && <ExternalLink className="h-4 w-4" />}
                      {project.live_url && <ExternalLink className="h-4 w-4" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/edit/${project.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteProjectButton id={project.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-muted-foreground">
                    No projects found. Start by adding your first one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
