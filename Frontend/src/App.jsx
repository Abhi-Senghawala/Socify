import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter import
import { useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FeedProvider } from "./context/FeedContext";
import { SocketProvider } from "./context/SocketContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Messenger from "./pages/Messenger/Messenger";
import Search from "./pages/Search/Search";
import Settings from "./pages/Settings/Settings";
import Notifications from "./pages/Notifications/Notifications";
import Create from "./pages/Create/Create";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Reels from "./pages/Reels/Reels";

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
    <div className="text-white text-xl">Loading...</div>
  </div>
);

// Protected Layout component to avoid repetition
const ProtectedLayout = ({ children }) => (
  <ProtectedRoute>
    <FeedProvider>
      <SocketProvider>{children}</SocketProvider>
    </FeedProvider>
  </ProtectedRoute>
);

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedLayout>
            <Home />
          </ProtectedLayout>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedLayout>
            <Search />
          </ProtectedLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedLayout>
            <Profile />
          </ProtectedLayout>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <ProtectedLayout>
            <Profile />
          </ProtectedLayout>
        }
      />
      <Route
        path="/messenger"
        element={
          <ProtectedLayout>
            <Messenger />
          </ProtectedLayout>
        }
      />
      <Route
        path="/messenger/:chatId"
        element={
          <ProtectedLayout>
            <Messenger />
          </ProtectedLayout>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedLayout>
            <Notifications />
          </ProtectedLayout>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedLayout>
            <Create />
          </ProtectedLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedLayout>
            <Settings />
          </ProtectedLayout>
        }
      />
      <Route
        path="/reels"
        element={
          <ProtectedLayout>
            <Reels />
          </ProtectedLayout>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
