import React from "react";

import { useAuthLogin } from "../../components/auth/useAuthLogin";
import AnimatedBackground from "../../components/auth/AnimatedBackground";
import LoginLeftPanel from "../../components/auth/LoginLeftPanel";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  const auth = useAuthLogin();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 w-full max-w-7xl mx-auto">
          {/* Left Panel */}
          <LoginLeftPanel />

          {/* Right Panel - Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <LoginForm {...auth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
