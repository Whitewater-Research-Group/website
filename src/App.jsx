import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home/Home';
import EventsPage from './pages/events/Events';
import ConferencePage from './pages/conference/Conference';
import About from './pages/about/About';
import ContactPage from './pages/contact/Contact';
import PersonalizedInvitation from './components/Invitation';
import AcademicProfile from './components/researchers/eddie';
import StakeholderMeeting from './components/meeting/Join';
import './App.css';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/conference" element={<ConferencePage />} />
        <Route path="/sft2024" element={<ConferencePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/letter" element={<PersonalizedInvitation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/researchers/eddie" element={<AcademicProfile />} />
        <Route path="/sft2024/join" element={<StakeholderMeeting />} />
      </Routes>
    </Router>
  )
}

export default App