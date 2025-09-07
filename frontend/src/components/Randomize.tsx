import React, { useState } from 'react'
import { suggestions } from '../data/visitSuggestionData'
import { Dice5, Heart } from 'lucide-react'
import { motion } from "framer-motion"
import type { Suggestion } from '../types'




export default function Randomize() {
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Suggestion | null>(null)
  const [favorites, setFavorites] = useState<Suggestion[]>([])
  const [filter, setFilter] = useState<"All" | "Eat" | "Drink" | "Hangout">("All")
  const [nearbyOnly, setNearbyOnly] = useState(false)

  const handleRandomize = () => {
    setLoading(true)
    setSelected(null)

    setTimeout(() => {
      let options = filter === "All"
        ? suggestions
        : suggestions.filter(s => s.category === filter)

      if (nearbyOnly) {
        options = options.filter(s => s.location.includes("Nairobi"))
      }

      const random = options[Math.floor(Math.random() * options.length)]
      setSelected(random)
      setLoading(false)
    }, 2000)
  }


  const toggleFavorite = (place: Suggestion) => {
    if (favorites.includes(place)) {
      setFavorites(favorites.filter(f => f !== place))
    } else {
      setFavorites([...favorites, place])
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-6'
      style={{ backgroundImage: "url('/pics/bg-image.jpg')"}}
    >
      <h1 className='text-4xl font-extrabold mb-6 text-white drop-shadow-md'>Where Should I Go?</h1>

      <div className='flex gap-3 mb-4'>
        {["All", "Eat", "Drink", "Hangout"].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              filter === cat ? "bg-blue-600 text-white" : "bg-white/70 hover:bg-white"
            }`}
          >
            {cat}

          </button>
        ))}
      </div>

        <label className='flex items-center gap-2 mb-6 text-white'>
          <input type="checkbox"
          checked={nearbyOnly}
          onChange={e => setNearbyOnly(e.target.checked)}
          className='w-4 h-4'
          />
          📍 Nearby Only
        </label>

        <button
        onClick={handleRandomize}
        className='flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700'
        >
          <motion.div
          animate={loading ? { rotate: 360 } : { rotate : 0 }}
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
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-bold'>{selected.name}</h2>
            <button
            onClick={() => toggleFavorite(selected)}
            className={`p-2 rounded-full ${
              favorites.includes(selected) ? "text-red-500" : "text-gray-400"
            }`}
            >
              <Heart className='w-5 h-5' />
            </button>
          </div>
          
          <p className='mt-1'>{selected.category}</p>
          <p className='mt-2 text-gray-600'>{selected.description}</p>
          <p className='mt-3 flex items-center gap-2 text-gray-800'>📍 {selected.location}</p>
          <p className='mt-2 text-yellow-500'>
            {"⭐".repeat(Math.round(selected.rating))}{" "}
            <span className='text-gray-500 text-sm'>({selected.rating})</span>
          </p>
          <iframe
          src={selected.mapUrl}
          className='mt-4 w-full h-40 rounded-lg'
          loading='lazy'
          ></iframe>
          <button
          onClick={handleRandomize}
          className='mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200'
          >Spin Again</button>
        </motion.div>
      )}
      
    </div>
  )
}
