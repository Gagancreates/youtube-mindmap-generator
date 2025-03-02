import { YoutubeIcon } from "lucide-react"
import Link from "next/link"
import HeroSection from "../components/hero-section"
import HowItWorks from "../components/how-it-works"
import Features from "../components/features"
import Footer from "../components/footer"
import FloatingCta from "../components/floating-cta"

export default function Home() {
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

