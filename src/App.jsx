import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UsernamePage from './components/UsernamePage'
import Editor from './components/Editor'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsernamePage />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  )
}

export default App
