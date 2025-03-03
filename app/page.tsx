"use client";
import { YoutubeIcon } from "lucide-react"
import Link from "next/link"
import HeroSection from "../components/hero-section"
import HowItWorks from "../components/how-it-works"
import Features from "../components/features"
import Footer from "../components/footer"
import FloatingCta from "../components/floating-cta"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Home() {
  const router = useRouter()
  const [inputUrl, setInputUrl] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch transcript');
      }

      const data = await response.json();
      
      if (!data.transcript) {
        throw new Error('No transcript data received');
      }

      // Encode the transcript data for URL
      const encodedTranscript = encodeURIComponent(data.transcript);
      router.push(`/mindmap?data=${encodedTranscript}`);

    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch transcript');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <YoutubeIcon className="h-6 w-6 text-red-500" />
          <span className="font-bold text-xl">YT Mindmap</span>
        </div>
        <nav>
          <Link
            href="#try-now"
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-full text-sm font-medium transition-colors"
          >
            Try Now
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 pb-20">
        <HeroSection />
        <HowItWorks />
        <Features />
      </main>

      <Footer />
      <FloatingCta />
    </div>
  )
}

