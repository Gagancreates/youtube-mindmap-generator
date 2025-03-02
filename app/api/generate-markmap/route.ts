import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json()
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured')
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const prompt = `Create a detailed mind map in Markdown format for the following transcript. Use proper markdown syntax with # for main topics, ## for subtopics, and so on. The mind map should summarize the key points and concepts in a hierarchical structure.

    Transcript:
    ${transcript}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const markmap = response.text()

    return NextResponse.json({ markmap })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate mindmap' },
      { status: 500 }
    )
  }
}
