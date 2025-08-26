import { useEffect, useState } from "react"
import { fetchChallenges } from "./api"
import { supabase } from "@/lib/supabase"
import type { Challenge } from "./types"

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [savedChallenges, setSavedChallenges] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchChallenges()
        setChallenges(data)
        setSavedChallenges(data.filter((c: any) => c.isSaved).map(c => c.id))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function toggleSave(id: number) {
    const isCurrentlySaved = savedChallenges.includes(id)
    setSavedChallenges(prev =>
      isCurrentlySaved ? prev.filter(cid => cid !== id) : [...prev, id]
    )

    try {
      const { error } = await supabase
        .from("challenges")
        .update({ is_saved: !isCurrentlySaved })
        .eq("id", id)
        .select()

      if (error) throw error
    } catch (err) {
      console.error(err)
    }
  }

  return { challenges, savedChallenges, loading, toggleSave }
}
