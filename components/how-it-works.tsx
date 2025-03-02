import { Link, Youtube, FileText, Download } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Link className="h-8 w-8 text-red-400" />,
      title: "Paste a YouTube link",
      description: "Start by copying and pasting any YouTube video URL",
    },
    {
      icon: <Youtube className="h-8 w-8 text-red-400" />,
      title: "AI extracts & summarizes",
      description: "Our AI analyzes the video and extracts key points",
    },
    {
      icon: <FileText className="h-8 w-8 text-red-400" />,
      title: "Generate mindmap",
      description: "Visualize the content as an interactive mindmap",
    },
    {
      icon: <Download className="h-8 w-8 text-red-400" />,
      title: "Download as Image/PDF",
      description: "Save and share your mindmap in multiple formats",
    },
  ]

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center text-center hover:bg-white/10 transition-all"
          >
            <div className="bg-gray-800/50 p-4 rounded-full mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-400 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

