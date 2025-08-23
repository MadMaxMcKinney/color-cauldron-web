'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/Container'
import BrewInput from '@/components/BrewInput'
import PaletteCard from '@/components/PaletteCard'
import { Palette } from '@/types'

export default function BrewPage() {
  const [isFetchingPalette, setIsFetchingPalette] = useState(false)
  const [brewInput, setBrewInput] = useState('')
  const [palettes, setPalettes] = useState<Palette[]>([])
  const palettesRef = useRef<HTMLElement>(null)

  const brew = async () => {
    if (brewInput.length === 0) return
    
    setIsFetchingPalette(true)
    
    try {
      const res = await fetch(`/api/brew?prompt=${encodeURIComponent(brewInput)}`)
      const newPalette = await res.json()
      
      if (res.ok) {
        setPalettes(prev => [newPalette, ...prev])
      } else {
        console.error('Failed to generate palette:', newPalette.error)
      }
    } catch (error) {
      console.error('Error brewing palette:', error)
    } finally {
      setIsFetchingPalette(false)
    }
  }

  // Handle input length limit
  const handleInputChange = (value: string) => {
    if (value.length <= 100) {
      setBrewInput(value)
    }
  }

  // Scroll to palettes when first palette appears
  useEffect(() => {
    if (palettesRef.current && palettes.length === 1) {
      palettesRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [palettes.length])

  return (
    <div className={`animate-fade-in flex flex-1 transition-all duration-700 ${palettes.length === 0 ? 'items-center' : 'items-start pt-10'}`}>
      <Container size="small">
        <div className="my-10">
          {/* Info */}
          <AnimatePresence>
            {palettes.length === 0 && (
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-serif text-3xl font-bold">Brew a palette</p>
                <p className="mt-4 w-full max-w-[550px] text-base text-zinc-600 md:text-lg">
                  Describe the theme of your colors, vibes, or use cases.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prompt */}
          <div className="mt-10">
            <div className="flex flex-col gap-2">
              <BrewInput
                value={brewInput}
                onChange={handleInputChange}
                loading={isFetchingPalette}
                onSubmit={brew}
              />
              <div className="flex w-full items-center justify-end gap-2">
                {brewInput.length > 80 && (
                  <span className="text-sm font-medium text-zinc-500">
                    {brewInput.length}/100
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Palettes */}
          <AnimatePresence>
            {palettes.length > 0 && (
              <motion.section
                ref={palettesRef}
                className="mt-12 mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex flex-col gap-8">
                  <AnimatePresence>
                    {palettes.map((palette, index) => (
                      <motion.div
                        key={palette.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <PaletteCard 
                          palette={palette} 
                          freshlyCreated={index === 0} 
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  )
}