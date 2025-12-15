"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export function EmailInviteForm({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email invitation
    console.log("Sending invite to:", email)
    setEmail("")
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="animate-slide-down">
      <div className="bg-gray-800 p-4 space-y-4 rounded-b-lg shadow-lg">
        <Input
          type="email"
          placeholder="Enter friend's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={onClose} className="text-gray-300 hover:text-white">
            Cancel
          </Button>
          <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
            <Send className="w-4 h-4 mr-2" />
            Send Invite
          </Button>
        </div>
      </div>
    </form>
  )
}
