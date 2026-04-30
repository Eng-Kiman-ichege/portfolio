"use client";

import { updateProject } from "@/app/actions/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Loader2, AlertCircle, ImageIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

export default function EditProjectForm({ project }: { project: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>(project.image_urls || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removePreview = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  async function handleAction(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await updateProject(project.id, formData);
    } catch (err: any) {
      setError(err.message || "Failed to update project");
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleAction} className="glass space-y-8 rounded-3xl border border-white/5 p-8">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input 
          id="title" 
          name="title" 
          defaultValue={project.title}
          required 
          className="bg-white/5 border-white/10 h-12 rounded-xl" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          defaultValue={project.description}
          className="min-h-[150px] bg-white/5 border-white/10 rounded-xl p-4"
          required 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input 
            id="github_url" 
            name="github_url" 
            type="url" 
            defaultValue={project.github_url}
            className="bg-white/5 border-white/10 h-12 rounded-xl" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="live_url">Live URL</Label>
          <Input 
            id="live_url" 
            name="live_url" 
            type="url" 
            defaultValue={project.live_url}
            className="bg-white/5 border-white/10 h-12 rounded-xl" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tech_stack">Tech Stack (comma separated)</Label>
        <Input 
          id="tech_stack" 
          name="tech_stack" 
          defaultValue={project.tech_stack?.join(", ")}
          required 
          className="bg-white/5 border-white/10 h-12 rounded-xl" 
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="images">Project Images (Upload new to replace)</Label>
        
        <div className="relative group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-12 transition-all hover:bg-white/10 hover:border-accent/40">
          <Upload className="mb-4 h-10 w-10 text-muted-foreground group-hover:text-accent transition-colors" />
          <p className="mb-2 text-base font-bold text-center">Click to replace images</p>
          <p className="text-xs text-muted-foreground text-center">Selecting new images will replace existing ones</p>
          <input 
            ref={fileInputRef}
            id="images" 
            name="images" 
            type="file" 
            accept="image/*" 
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-20" 
          />
        </div>

        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-6">
            {previews.map((url, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                <Image src={url} alt={`Preview ${index}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removePreview(index)}
                  className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Link href="/admin" className="flex-1">
          <Button type="button" variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold">
            Cancel
          </Button>
        </Link>
        <Button type="submit" disabled={isSubmitting} className="flex-[2] h-14 rounded-2xl text-lg font-bold shadow-lg shadow-accent/20">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Updating...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
