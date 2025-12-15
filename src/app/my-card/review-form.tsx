"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

export function ReviewForm({
  onSubmit,
  onClose,
  isLoggedIn,
}: { onSubmit: (review: { rating: number; text: string }) => void; onClose: () => void; isLoggedIn: boolean }) {
  const [rating, setRating] = useState(0)
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ rating, text })
    setText("")
    setRating(0)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`
  animate-slide-down bg-gray-900 p-6 space-y-6 rounded 
  ${isLoggedIn ? "block" : "hidden"}`}
    >
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star className={`w-8 h-8 ${rating >= star ? "fill-amber-400 text-amber-400" : "text-gray-600"}`} />
          </button>
        ))}
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
        className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-400 min-h-[150px] text-lg resize-none rounded-lg"
        required
      />
      <div className="flex justify-end space-x-4">
        <Button variant="ghost" onClick={onClose} className="text-gray-300 hover:text-white hover:bg-gray-800">
          Cancel
        </Button>
        <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white px-8">
          Post Review
        </Button>
      </div>
    </form>
  )
}
