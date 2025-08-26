import { supabase } from "@/lib/supabase"
import type { Challenge } from "./types"

export async function fetchChallenges(): Promise<Challenge[]> {
  const { data, error } = await supabase.from("challenges").select("*")
  if (error) throw error

  return (data ?? []).map((c: Challenge) => ({
    id: c.id,
    title: c.title,
    difficulty: c.difficulty,
    description: c.description,
    technologies: c.technologies,
    estimatedTime: c.estimatedTime,
    participants: c.participants,
    thumbnail_url: c.thumbnail_url
      ? supabase.storage
          .from("challenge-images")
          .getPublicUrl(c.thumbnail_url).data.publicUrl
      : "/src/assets/images/default.jpg",
  }))
}
