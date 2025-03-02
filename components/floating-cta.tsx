"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export default function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-4 bg-red-500 hover:bg-red-600 rounded-full shadow-lg transition-all z-50"
      aria-label="Try Now – Paste a YouTube Link!"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  )
}

