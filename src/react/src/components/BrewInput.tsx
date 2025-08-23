'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CauldronLoader from './CauldronLoader'

interface BrewInputProps {
  value: string
  onChange: (value: string) => void
  loading?: boolean
  onSubmit: () => void
}

export default function BrewInput({ 
  value, 
  onChange, 
  loading = false, 
  onSubmit 
}: BrewInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <form onSubmit={handleSubmit} className="sticky top-4">
      <div className={`shadow-elevated relative flex h-14 w-full overflow-auto rounded-[13px] border-2 border-white bg-zinc-100 transition-colors ${loading ? '' : 'hover:border-green-500'}`}>
        <div className={`absolute top-0 bottom-0 flex items-center justify-center bg-white transition-all duration-300 ${loading ? 'w-full' : 'w-10 md:w-16'}`}>
          <CauldronLoader loading={loading} />
        </div>
        <input 
          type="text" 
          name="prompt" 
          placeholder="Coffee shop for witches" 
          className="ml-10 w-full rounded-none bg-zinc-100 pl-4 focus:outline-none md:ml-16" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <AnimatePresence>
          {value.length > 0 && (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="group w-16 bg-transparent"
              onClick={handleClear}
            >
              <i className="fa-regular fa-x text-zinc-500 transition-opacity group-hover:opacity-60" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {value.length > 0 && (
            <motion.button
              type="submit"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center bg-[#3FF381] px-4 font-medium whitespace-nowrap transition-all hover:bg-[#6dffa2] focus:outline-offset-4 active:bg-green-300"
              disabled={loading}
            >
              Brew it!
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}