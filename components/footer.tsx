import Link from "next/link"
import { Heart, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800/50 py-6 border-t border-gray-700/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-gray-400 text-sm flex items-center">
            Built with <Heart className="h-4 w-4 text-red-500 mx-1" /> for fast learning | No data is stored
          </p>

          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
          </div>

          <Link
            href="https://github.com/Gagancreates"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm">@Gagancreates</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

