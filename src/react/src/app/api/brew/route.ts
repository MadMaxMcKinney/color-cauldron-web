import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { PaletteColor, Palette } from '@/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const prompt = searchParams.get('prompt')
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (prompt.length > 100) {
      return NextResponse.json({ error: 'Prompt too long' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a color specialist. You help people find colors that will work well based on a prompt explaining how they will use the colors. You will respond only with an array of color objects, where each object has a field named hex for the hex value of the color, and another field named name for the name of the color. The name of the color should be thematically relevant to the prompts context if possible. You will always provide only 5 color objects. Reminder you should only respond with an array. Do not provide any other information.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'gpt-4o-mini'
    })

    let newPalette: Palette

    try {
      const paletteColors = JSON.parse(
        completion.choices[0].message.content!
      ) as PaletteColor[]
      
      if (paletteColors.length !== 5) {
        console.error(
          'Expected 5 colors, but received ' +
            paletteColors.length +
            '. Falling back to default colors.'
        )
        throw new Error('Invalid color count')
      }
      
      newPalette = {
        name: prompt,
        colors: paletteColors,
        id: Math.random().toString(36).substring(2),
        createdAt: new Date().toISOString()
      }
    } catch (e) {
      // Fallback palette
      newPalette = {
        name: prompt,
        colors: [
          { hex: '#FF6B6B', name: 'Coral' },
          { hex: '#4ECDC4', name: 'Turquoise' },
          { hex: '#45B7D1', name: 'Sky Blue' },
          { hex: '#96CEB4', name: 'Mint' },
          { hex: '#FFEAA7', name: 'Cream' }
        ],
        id: Math.random().toString(36).substring(2),
        createdAt: new Date().toISOString()
      }
    }

    return NextResponse.json(newPalette)
  } catch (error) {
    console.error('Error generating palette:', error)
    return NextResponse.json(
      { error: 'Failed to generate palette' },
      { status: 500 }
    )
  }
}