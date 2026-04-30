import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import EditProjectForm from "./EditProjectForm";

async function getProject(id: string) {
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  
  return project;
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 pt-32 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground text-lg">Update your masterpiece.</p>
      </div>
      
      <EditProjectForm project={project} />
    </main>
  );
}
