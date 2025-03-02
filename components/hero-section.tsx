"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { isValidYoutubeUrl, normalizeYoutubeUrl } from "../lib/utils"
import MarkmapViewer from "./MarkmapViewer"
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [markmap, setMarkmap] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const normalizedUrl = normalizeYoutubeUrl(youtubeUrl)

    if (!youtubeUrl.trim()) {
      setError("Please enter a YouTube URL")
      setLoading(false)
      return
    }

    if (!isValidYoutubeUrl(normalizedUrl)) {
      setError("Please enter a valid YouTube URL")
      setLoading(false)
      return
    }

    try {
      const transcriptRes = await fetch('/api/get-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl: normalizedUrl })
      })
      
      const transcriptData = await transcriptRes.json()
      if (transcriptData.error) throw new Error(transcriptData.error)

      const mindmapRes = await fetch('/api/generate-markmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcriptData.transcript })
      })
      
      const mindmapData = await mindmapRes.json()
      if (mindmapData.error) throw new Error(mindmapData.error)

      setMarkmap(mindmapData.markmap)

      // Redirect to mindmap page with the data
      const encodedMarkmap = encodeURIComponent(mindmapData.markmap)
      router.push(`/mindmap?data=${encodedMarkmap}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <section id="try-now" className="py-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
        Turn YouTube Videos into Summaries & Mindmaps in Seconds!
      </h1>

      <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
        Enter a YouTube link, get an instant summary, and visualize the key ideas as an interactive mindmap.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl backdrop-blur-sm bg-white/10 p-2 rounded-xl shadow-lg border border-white/20"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Paste YouTube video link here..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Summary & Mindmap"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </form>

      <div className="mt-8 flex justify-center">
        <div className="inline-block rounded-lg bg-gray-800/50 px-3 py-1 text-sm text-gray-400">
          No sign-up required • Instant results
        </div>
      </div>

      {markmap && <MarkmapViewer markmap={markmap} />}
    </section>
  )
}

