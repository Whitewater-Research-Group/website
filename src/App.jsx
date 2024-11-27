// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import EventsPage from './pages/events/Events'
import ConferencePage from './pages/conference/Conference'
import About from './pages/about/About';
import ContactPage from './pages/contact/Contact'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/conference' element={<ConferencePage />} />
        <Route path='/sft2024' element={<ConferencePage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='*' element={<ContactPage />} />
        
        
      </Routes>
    </Router>
  )
}

export default App
