// This AuthLeftPanel is for Signup page 
import React from "react";
import { Sparkles, Zap, Shield, Globe, Star } from "lucide-react";

const AuthLeftPanel = ({ step }) => {
  const features = [
    {
      icon: Zap,
      text: "Lightning fast performance",
      color: "from-yellow-400 to-orange-400",
    },
    {
      icon: Shield,
      text: "Enterprise-grade security",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: Globe,
      text: "Global community access",
      color: "from-blue-400 to-indigo-400",
    },
    {
      icon: Star,
      text: "Premium features included",
      color: "from-purple-400 to-pink-400",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col justify-center space-y-8 text-white">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
            SOCIFY
          </span>
          <br />
          <span className="relative">
            <Sparkles className="absolute -top-20 -right-60 w-8 h-8 text-yellow-300 animate-pulse" />
          </span>
        </h1>

        <p className="text-xl text-gray-300 max-w-lg">
          Join thousands of creators and innovators who are shaping the future
          of social interaction.
        </p>
      </div>

      {/* Feature Points */}
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-4 group animate-slideInLeft"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div
              className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}
            >
              <feature.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg text-gray-200">{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Progress Step Indicator */}
      <div className="mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-300">
            Account Setup Progress
          </span>
          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Step {step} of 4
          </span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                s <= step
                  ? "bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50"
                  : "bg-white/10"
              }`}
            >
              {s === step && (
                <div className="relative">
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-ping" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthLeftPanel;
