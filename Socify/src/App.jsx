import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FeedProvider } from "./context/FeedContext";
import { SocketProvider } from "./context/SocketContext";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Messenger from "./pages/Messenger/Messenger";
import Search from "./pages/Search/Search";
import Settings from "./pages/Settings/Settings";
import Notifications from "./pages/Notifications/Notifications";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/*"
              element={
                <FeedProvider>
                  <SocketProvider>
                    {" "}
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/profile/:username" element={<Profile />} />
                      <Route path="/messenger" element={<Messenger />} />
                      <Route
                        path="/messenger/:chatId"
                        element={<Messenger />}
                      />
                      <Route
                        path="/notifications"
                        element={<Notifications />}
                      />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/reels" element={<Home />} />
                      <Route path="/create" element={<Home />} />
                    </Routes>
                  </SocketProvider>
                </FeedProvider>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
