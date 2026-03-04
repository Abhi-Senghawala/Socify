import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ FIXED
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
