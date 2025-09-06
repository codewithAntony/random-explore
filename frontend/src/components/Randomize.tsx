import React, { useState } from 'react'
import { suggestions } from '../data/visitSuggestionData'
import { Dice5 } from 'lucide-react'
import { motion } from "framer-motion"
import type { Suggestion } from '../types'




export default function Randomize() {
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Suggestion | null>(null)

  const handleRandomize = () => {
    setLoading(true)
    setSelected(null)

    setTimeout(() => {
      const random = suggestions[Math.floor(Math.random() * suggestions.length)]
      setSelected(random)
      setLoading(false)
    }, 2000)
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6'>
      <h1 className='text-3xl font-bold mb-6'>Where Should I Go?</h1>

      <button
      onClick={handleRandomize}
      className='flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700'
      >
        <motion.div
          animate={loading ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: loading ? Infinity : 0, duration: 1 }}
        >
          <Dice5 className='w-6 h-6' />
        </motion.div>
          Randomize
      </button>

      {selected && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-8 w-full max-w-md p-6 rounded-2xl shadow-xl bg-white"
        >
          <h2 className='text-xl font-bold'>{selected.name}</h2>
          <p className='mt-1'>{selected.category}</p>
          <p className='mt-2 text-gray-600'>{selected.description}</p>
          <p className='mt-3 flex items-center gap-2 text-gray-800'>📍 {selected.location}</p>
          <button
          onClick={handleRandomize}
          className='mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200'
          >Spin Again</button>
        </motion.div>
      )}
      
    </div>
  )
}
