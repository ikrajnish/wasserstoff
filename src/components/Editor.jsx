import React, { useEffect, useRef, useState } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { useNavigate } from 'react-router-dom'

const Editor = () => {
  const editorRef = useRef(null)
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const savedUsername = localStorage.getItem('username') || 'Anonymous'
    setUsername(savedUsername)

    const doc = new Y.Doc()
    const provider = new WebsocketProvider('wss://demos.yjs.dev', 'realtime-editor-room', doc)
    const yText = doc.getText('shared-text')

    yText.observe(() => {
      if (editorRef.current && editorRef.current.innerHTML !== yText.toString()) {
        editorRef.current.innerHTML = yText.toString()
      }
    })

    const handleInput = () => {
      if (editorRef.current) {
        const content = editorRef.current.innerHTML
        if (content !== yText.toString()) {
          yText.delete(0, yText.length)
          yText.insert(0, content)
        }
      }
    }

    if (editorRef.current) {
      editorRef.current.addEventListener('input', handleInput)
    }

    return () => {
      provider.destroy()
      doc.destroy()
      if (editorRef.current) {
        editorRef.current.removeEventListener('input', handleInput)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('username')
    navigate('/')
  }

  const formatText = (command) => {
    document.execCommand(command, false, null)
    editorRef.current?.focus()
  }

  const formatColor = (color) => {
    document.execCommand('foreColor', false, color)
    editorRef.current?.focus()
  }

  const formatHighlight = (color) => {
    document.execCommand('hiliteColor', false, color)
    editorRef.current?.focus()
  }

  const formatFontSize = (size) => {
    document.execCommand('fontSize', false, size)
    editorRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Collaborative Editor</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm bg-blue-600 text-white rounded-full px-3 py-1 font-medium">
            {username}
          </div>
          <span className="text-sm text-gray-600 hidden sm:inline">You're editing</span>
          <button
            onClick={handleLogout}
            className="bg-white border border-gray-300 rounded-md px-4 py-1 text-sm hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Editor Card */}
      <div className="w-full max-w-5xl bg-white rounded-xl shadow p-4">
        {/* Toolbar */}
        <div className="border-b pb-2 mb-4 flex flex-wrap items-center gap-2">
          <button onClick={() => formatText('bold')} className="w-8 h-8 font-bold text-gray-700 border rounded hover:bg-gray-100">B</button>
          <button onClick={() => formatText('italic')} className="w-8 h-8 italic text-gray-700 border rounded hover:bg-gray-100">I</button>
          <button onClick={() => formatText('underline')} className="w-8 h-8 underline text-gray-700 border rounded hover:bg-gray-100">U</button>
          <button onClick={() => formatText('insertUnorderedList')} className="w-8 h-8 text-gray-700 border rounded hover:bg-gray-100">•</button>
          <button onClick={() => formatText('insertOrderedList')} className="w-8 h-8 text-gray-700 border rounded hover:bg-gray-100">1.</button>

          {/* Text Color */}
          <label className="text-sm ml-2">Color:
            <input
              type="color"
              onChange={(e) => formatColor(e.target.value)}
              className="ml-1 w-6 h-6 border rounded cursor-pointer"
            />
          </label>

          {/* Highlight Color */}
          <label className="text-sm ml-2">Highlight:
            <input
              type="color"
              onChange={(e) => formatHighlight(e.target.value)}
              className="ml-1 w-6 h-6 border rounded cursor-pointer"
            />
          </label>

          {/* Font Size */}
          <label className="text-sm ml-2">Font:
            <select
              onChange={(e) => formatFontSize(e.target.value)}
              className="ml-1 border rounded text-sm p-1"
              defaultValue="3"
            >
              <option value="1">10px</option>
              <option value="2">13px</option>
              <option value="3">16px</option>
              <option value="4">18px</option>
              <option value="5">24px</option>
              <option value="6">32px</option>
              <option value="7">48px</option>
            </select>
          </label>
        </div>

        {/* ContentEditable Editor */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="min-h-[250px] p-4 border border-gray-300 rounded-lg text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Welcome to the Collaborative Editor!<br /><br />
          Start typing to see real-time collaboration in action. Open this editor in multiple tabs or share with others to see live updates.
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-500">Changes are automatically saved and synced with other users.</p>
    </div>
  )
}

export default Editor
