import { CheckCircle } from "lucide-react"

export default function Features() {
  const features = [
    {
      title: "No sign-up required",
      description: "Start using the tool immediately without creating an account",
    },
    {
      title: "Fast & AI-powered",
      description: "Get results in seconds with our advanced AI technology",
    },
    {
      title: "Interactive mindmap",
      description: "Explore and reorganize ideas in an intuitive visual format",
    },
    {
      title: "Export as Image or PDF",
      description: "Save your mindmaps in multiple formats for easy sharing",
    },
  ]

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex gap-4 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
          >
            <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

