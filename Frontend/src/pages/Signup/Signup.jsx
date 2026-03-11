import React from "react";

import { useAuth } from "../../components/auth/useAuth";
import AnimatedBackground from "../../components/auth/AnimatedBackground";
import AuthLeftPanel from "../../components/auth/AuthLeftPanel";
import AuthForm from "../../components/auth/AuthForm";

const Signup = () => {
  const auth = useAuth();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 w-full max-w-7xl mx-auto">
          <AuthLeftPanel step={auth.step} />

          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <AuthForm {...auth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
