"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  console.log("Starting project creation...");
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const github_url = formData.get("github_url") as string;
  const live_url = formData.get("live_url") as string;
  const tech_stack_raw = formData.get("tech_stack") as string;
  const image_files = formData.getAll("images") as File[];

  console.log(`Received ${image_files.length} images`);

  const tech_stack = tech_stack_raw.split(",").map((s) => s.trim());
  const image_urls: string[] = [];

  for (const file of image_files) {
    if (file && file.size > 0) {
      console.log(`Uploading file: ${file.name} (${file.size} bytes)`);
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Upload error for file:", file.name, uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);
      
      console.log(`Generated Public URL: ${publicUrl}`);
      image_urls.push(publicUrl);
    } else {
      console.log("Skipping empty file entry");
    }
  }

  console.log("Inserting into database...");
  const { data: insertData, error: insertError } = await supabase.from("projects").insert([
    {
      title,
      description,
      github_url,
      live_url,
      tech_stack,
      image_url: image_urls[0] || "",
      image_urls,
    },
  ]).select();

  if (insertError) {
    console.error("Database Insert error:", insertError);
    throw new Error(`Database error: ${insertError.message}`);
  }

  console.log("Project created successfully:", insertData?.[0]?.id);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProject(id: string, formData: FormData) {
  console.log(`Updating project: ${id}`);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const github_url = formData.get("github_url") as string;
  const live_url = formData.get("live_url") as string;
  const tech_stack_raw = formData.get("tech_stack") as string;
  const image_files = formData.getAll("images") as File[];

  const tech_stack = tech_stack_raw.split(",").map((s) => s.trim());

  let updateData: any = {
    title,
    description,
    github_url,
    live_url,
    tech_stack,
  };

  if (image_files.length > 0 && image_files[0].size > 0) {
    console.log(`Updating images for project ${id}`);
    const image_urls: string[] = [];
    for (const file of image_files) {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage.from("images").upload(fileName, file);
      
      if (uploadError) {
        console.error("Update upload error:", uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(fileName);
      image_urls.push(publicUrl);
    }
    updateData.image_urls = image_urls;
    updateData.image_url = image_urls[0];
  }

  const { error } = await supabase.from("projects").update(updateData).eq("id", id);
  
  if (error) {
    console.error("Update error:", error);
    throw new Error("Failed to update project");
  }

  console.log("Project updated successfully");
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/projects/${id}`);
  redirect("/admin");
}

export async function deleteProject(id: string) {
  console.log(`Deleting project: ${id}`);
  const { error } = await supabase.from("projects").delete().eq("id", id);
  
  if (error) {
    console.error("Delete error:", error);
    throw new Error("Failed to delete project");
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateCV(formData: FormData) {
  console.log("Updating CV...");
  const cv_file = formData.get("cv") as File;

  if (!cv_file || cv_file.size === 0) {
    throw new Error("Please select a PDF file");
  }

  const fileName = `cv-${Date.now()}.pdf`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("images")
    .upload(fileName, cv_file, {
      contentType: "application/pdf",
      upsert: true
    });

  if (uploadError) {
    console.error("CV Upload error:", uploadError);
    throw new Error("Failed to upload CV");
  }

  const { data: { publicUrl } } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  const { data: profile } = await supabase.from("profile").select("id").limit(1).maybeSingle();
  
  if (profile) {
    await supabase.from("profile").update({ cv_url: publicUrl }).eq("id", profile.id);
  } else {
    await supabase.from("profile").insert([{ cv_url: publicUrl }]);
  }

  console.log("CV updated successfully");
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
