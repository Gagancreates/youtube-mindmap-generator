import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { normalizeYoutubeUrl } from '../../lib/utils';

const HeroSection: React.FC = () => {
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [markmap, setMarkmap] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const transcript = await fetchTranscript(youtubeUrl);

      const mindmapRes = await fetch('/api/generate-markmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcript })
      });

      const mindmapData = await mindmapRes.json();
      if (mindmapData.error) throw new Error(mindmapData.error);

      setMarkmap(mindmapData.markmap);
      const encodedMarkmap = encodeURIComponent(mindmapData.markmap);
      router.push(`/mindmap?data=${encodedMarkmap}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setLoading(false);
    }
  };

  async function fetchTranscript(url: string): Promise<string> {
    const normalizedUrl = normalizeYoutubeUrl(url);
    const response = await fetch('/api/get-transcript', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ youtubeUrl: normalizedUrl })
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data.transcript;
  }

  return (
    <div>
      {/* Render your form here */}
    </div>
  );
};

export default HeroSection; 