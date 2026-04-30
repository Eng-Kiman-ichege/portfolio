"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/app/actions/project";

export function DeleteProjectButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    setIsDeleting(true);
    try {
      await deleteProject(id);
    } catch (err) {
      alert("Failed to delete project");
      setIsDeleting(false);
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleDelete}
      disabled={isDeleting}
      className="h-8 w-8 text-destructive hover:bg-destructive/10"
    >
      {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  );
}
