interface MindmapDisplayProps {
  markdownContent: string;
}

export default function MindmapDisplay({ markdownContent }: MindmapDisplayProps) {
  const handleDownload = () => {
    if (markdownContent) {
      // Create a blob from the markdown content
      const blob = new Blob([markdownContent], { type: 'text/markdown' });
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mindmap.md';
      
      // Append to body, click, and remove
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Clean up the URL
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Mindmap</button>
      <pre>{markdownContent}</pre>
    </div>
  );
} 