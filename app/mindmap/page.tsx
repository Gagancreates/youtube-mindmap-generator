'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Markmap } from 'markmap-view';
import { Transformer } from 'markmap-lib';

function MindmapContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const markdownContent = searchParams.get('data');
  const svgRef = useRef<SVGSVGElement>(null);
  const markmapRef = useRef<Markmap | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !markdownContent || !svgRef.current) return;
    
    try {
      const transformer = new Transformer();
      const { root } = transformer.transform(markdownContent);
      
      if (markmapRef.current) {
        markmapRef.current.destroy();
      }

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
    } catch (error) {
      console.error('Error creating mindmap:', error);
    }

    return () => {
      if (markmapRef.current) {
        markmapRef.current.destroy();
      }
    };
  }, [markdownContent, isMounted]);

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

  if (!isMounted) {
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

export default function MindmapPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MindmapContent />
    </Suspense>
  );
} 