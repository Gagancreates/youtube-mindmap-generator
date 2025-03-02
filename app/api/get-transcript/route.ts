import { NextResponse } from 'next/server'
import { YoutubeTranscript } from 'youtube-transcript' // Fix import

export async function POST(request: Request) {
  try {
    const { youtubeUrl } = await request.json()

    const videoId = new URL(youtubeUrl).searchParams.get("v")
    if (!videoId) return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 })

    const transcript = await YoutubeTranscript.fetchTranscript(videoId)
    
    return NextResponse.json({ transcript: transcript.map((t: { text: string }) => t.text).join(" ") })
  } 
  // 
  catch (error: any) {
    console.error("Error fetching transcript:", error); // Log the error for debugging
    return NextResponse.json({ error: "Failed to fetch transcript" }, { status: 500 });
  }
  
}
