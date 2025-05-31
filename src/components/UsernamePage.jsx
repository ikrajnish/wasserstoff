import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UsernamePage = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      localStorage.setItem('username', name)
      navigate('/editor')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f4ff]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Collaborative Editor</h1>
        <p className="text-gray-500 mb-6">
          Enter your name to start collaborating with others in real-time
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
          />
          <button
            type="submit"
            className="w-full bg-gray-500 text-white font-semibold py-3 rounded-md hover:bg-gray-600 transition"
          >
            Join Editor
          </button>
        </form>
      </div>
    </div>
  )
}

export default UsernamePage
