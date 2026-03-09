// App.jsx - Add Profile route
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FeedProvider } from './context/FeedContext';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <FeedProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/search" element={<Home />} />
                <Route path="/reels" element={<Home />} />
                <Route path="/notifications" element={<Home />} />
                <Route path="/create" element={<Home />} />
                <Route path="/settings" element={<Home />} />
              </Routes>
            </FeedProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;