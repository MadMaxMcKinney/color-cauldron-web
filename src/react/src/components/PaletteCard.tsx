'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Palette, PaletteColor } from '@/types'
import { getContrastColorFromHex } from '@/lib/utils'

interface PaletteCardProps {
  palette: Palette
  freshlyCreated?: boolean
  size?: 'small' | 'default'
}

const sizeClasses = {
  small: 'h-[70px]',
  default: 'h-[120px]'
}

const iconCopySizeClasses = {
  small: 'h-8 w-8 text-base',
  default: 'h-10 w-10 text-xl'
}

export default function PaletteCard({ 
  palette, 
  freshlyCreated = false, 
  size = 'default' 
}: PaletteCardProps) {
  const colorsContainerRef = useRef<HTMLDivElement>(null)
  const paletteContainerRef = useRef<HTMLDivElement>(null)

  const copyColor = async (color: PaletteColor) => {
    try {
      await navigator.clipboard.writeText(color.hex)
      toast.success(`Copied ${color.hex}`, {
        icon: '🎨',
        style: {
          background: color.hex,
          color: getContrastColorFromHex(color.hex),
        }
      })
    } catch (err) {
      toast.error('Failed to copy color')
    }
  }

  return (
    <motion.div
      ref={paletteContainerRef}
      className="shadow-elevated flex w-full flex-col overflow-hidden rounded-[13px] border-2 border-white"
      initial={freshlyCreated ? { scale: 0.9, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div 
        ref={colorsContainerRef}
        className={`flex ${sizeClasses[size]} w-full flex-row overflow-hidden`}
      >
        {palette.colors.map((color, index) => (
          <motion.button
            key={color.hex}
            className="group flex h-full w-full items-center justify-center transition-all hover:z-10 hover:scale-110 hover:shadow-lg active:scale-105"
            style={{ 
              backgroundColor: color.hex,
              '--shadow-color': color.hex 
            } as React.CSSProperties}
            onClick={() => copyColor(color)}
            initial={freshlyCreated ? { opacity: 0, scale: 0.9, borderRadius: 300 } : false}
            animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
            transition={{ duration: 0.4, delay: freshlyCreated ? 1 + (index * 0.1) : 0 }}
            title={`${color.name} ${color.hex}`}
          >
            <span className={`flex ${iconCopySizeClasses[size]} items-center justify-center rounded-full bg-white opacity-0 transition-all group-hover:opacity-100 group-active:opacity-100`}>
              <i className="fa-regular fa-copy" />
            </span>
          </motion.button>
        ))}
      </div>
      <div className="bg-white flex justify-between">
        <div className="px-4 py-3">
          <p className="text-lg leading-tight font-medium text-zinc-500">{palette.name}</p>
        </div>
        <div className="flex">
          <button 
            className="flex h-full items-center justify-center px-4 text-zinc-500 transition-colors hover:text-zinc-700"
            title="Download palette"
          >
            <i className="fa-regular fa-download text-lg" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}