"use client";

import { createProject } from "@/app/actions/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Loader2, AlertCircle, X, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

export default function NewProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Check file size (5MB limit)
    const overSized = files.filter(f => f.size > 5 * 1024 * 1024);
    if (overSized.length > 0) {
      setError("Some images are larger than 5MB. Please choose smaller files.");
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removePreview = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    // Note: This doesn't actually remove from the FileList in the input,
    // but the user can just re-select if they make a mistake, or we can handle it via FormData
  };

  async function handleAction(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createProject(formData);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Make sure your 'images' bucket is created and public in Supabase.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 pt-32 pb-20">
      <Link 
        href="/admin" 
        className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold">New Project</h1>
        <p className="text-muted-foreground text-lg">Add a new masterpiece to your portfolio.</p>
      </div>

      {error && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-red-500">
          <AlertCircle className="h-5 w-5" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <form action={handleAction} className="glass space-y-8 rounded-3xl border border-white/5 p-8">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" name="title" placeholder="e.g. AI SaaS Platform" required className="bg-white/5 border-white/10 h-12 rounded-xl" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            placeholder="What does this project do? What problems does it solve?" 
            className="min-h-[150px] bg-white/5 border-white/10 rounded-xl p-4"
            required 
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="github_url">GitHub URL</Label>
            <Input id="github_url" name="github_url" type="url" placeholder="https://github.com/..." className="bg-white/5 border-white/10 h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="live_url">Live URL</Label>
            <Input id="live_url" name="live_url" type="url" placeholder="https://..." className="bg-white/5 border-white/10 h-12 rounded-xl" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tech_stack">Tech Stack (comma separated)</Label>
          <Input id="tech_stack" name="tech_stack" placeholder="Next.js, Tailwind, Supabase" required className="bg-white/5 border-white/10 h-12 rounded-xl" />
        </div>

        <div className="space-y-4">
          <Label htmlFor="images">Project Images</Label>
          
          {/* Upload Area */}
          <div className="relative group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-12 transition-all hover:bg-white/10 hover:border-accent/40">
            <Upload className="mb-4 h-10 w-10 text-muted-foreground group-hover:text-accent transition-colors" />
            <p className="mb-2 text-base font-bold text-center">Click to select multiple images</p>
            <p className="text-xs text-muted-foreground">PNG, JPG or WebP (max. 5MB each)</p>
            <input 
              ref={fileInputRef}
              id="images" 
              name="images" 
              type="file" 
              accept="image/*" 
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-20" 
              required={previews.length === 0}
            />
          </div>

          {/* Previews Grid */}
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
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ImageIcon className="h-6 w-6 text-muted-foreground mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider">Add More</span>
              </button>
            </div>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-2xl text-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-accent/20">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Creating Project...
            </>
          ) : (
            "Create Project"
          )}
        </Button>
      </form>
    </main>
  );
}
