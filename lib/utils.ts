export function isValidYoutubeUrl(url: string): boolean {
  // Match both youtube.com and youtu.be URLs
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}/,
    /^https?:\/\/(www\.)?youtu\.be\/[a-zA-Z0-9_-]{11}/
  ];
  return patterns.some(pattern => pattern.test(url));
}

export function normalizeYoutubeUrl(url: string): string {
  try {
    // Handle youtu.be URLs
    if (url.includes('youtu.be')) {
      // Extract video ID from youtu.be URL
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    // Handle youtube.com URLs
    if (url.includes('youtube.com')) {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return url;
  } catch (error) {
    return url;
  }
}
  
  