'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Markmap } from 'markmap-view';
import { Transformer } from 'markmap-lib';

export default function MindmapPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const markdownContent = searchParams.get('data');
  const svgRef = useRef<SVGSVGElement>(null);
  const markmapRef = useRef<Markmap | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!markdownContent || !svgRef.current) return;
    
    const transformer = new Transformer();
    const { root } = transformer.transform(markdownContent);
    
    markmapRef.current = Markmap.create(svgRef.current, {
      color: (_) => 'black',
      paddingX: 16,
      style: (id) => `
        ${id} {
          background-color: white;
        }
        ${id} text {
          fill: #333;
          font-family: Roboto, sans-serif;
          font-size: 14px;
        }
        ${id} path {
          stroke: #666;
        }
      `
    }, root);

    return () => {
      if (markmapRef.current) {
        markmapRef.current.destroy();
      }
    };
  }, [markdownContent]);

  const handleDownload = () => {
    const svg = svgRef.current;
    if (!svg) return;

    try {
      // Get SVG content
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg);
      
      // Create a Blob from the SVG string
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.download = 'mindmap.svg';
      link.href = url;
      link.click();
      
      // Cleanup
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading SVG:', error);
    }
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between mb-4">
          <button 
            onClick={() => router.back()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back
          </button>
          <button 
            onClick={handleDownload} 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download SVG
          </button>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-auto">
          <svg
            ref={svgRef}
            style={{ minWidth: '100%', minHeight: 'calc(100vh - 120px)' }}
          />
        </div>
      </div>
    </div>
  );
} 