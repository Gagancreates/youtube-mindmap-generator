import { useEffect, useRef } from 'react'
import { Transformer } from 'markmap-lib'
import { Markmap } from 'markmap-view'
import domtoimage from 'dom-to-image'

export default function MarkmapViewer({ markmap }: { markmap: string }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (ref.current) {
      const transformer = new Transformer()
      const { root } = transformer.transform(markmap)
      Markmap.create(ref.current, {}, root)
    }
  }, [markmap])

  const downloadImage = () => {
    if (ref.current) {
      domtoimage.toPng(ref.current).then((dataUrl) => {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = 'mindmap.png'
        link.click()
      })
    }
  }

  return (
    <div>
      <svg ref={ref} className="w-full h-96" />
      <button onClick={downloadImage} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Download Image</button>
    </div>
  )
}
