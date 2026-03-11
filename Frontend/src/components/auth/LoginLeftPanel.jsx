import React from "react";
import {
  Sparkles,
  Users,
  TrendingUp,
  MessageCircle,
  Heart,
} from "lucide-react";

const LoginLeftPanel = () => {
  const features = [
    {
      icon: Users,
      text: "Connect with millions of creators",
      color: "from-blue-400 to-indigo-400",
    },
    {
      icon: TrendingUp,
      text: "Grow your audience daily",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: MessageCircle,
      text: "Real-time conversations",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Heart,
      text: "Build meaningful relationships",
      color: "from-red-400 to-orange-400",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Content Creator",
      quote: "Best platform I've ever used! The community is amazing.",
    },
    {
      name: "Sarah Chen",
      role: "Digital Artist",
      quote: "Socify helped me grow my audience by 500% in just 3 months.",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col justify-center space-y-8 text-white mt-5">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
            Welcome Back
          </span>
          <br />
          <span className="relative">
            to Socify
            <Sparkles className="absolute top-0 -right-10 w-8 h-8 text-yellow-300 animate-pulse" />
          </span>
        </h1>

        <p className="text-xl text-gray-300 max-w-lg">
          Continue your journey with the world's most innovative social
          platform.
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

      {/* Testimonials */}
      <div className="mt-8 space-y-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <p className="text-gray-300 text-sm italic">
              "{testimonial.quote}"
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-sm font-bold">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-2 mb-5">
        {[
          { value: "10M+", label: "Active Users" },
          { value: "50K+", label: "Creators" },
          { value: "1M+", label: "Daily Posts" },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginLeftPanel;
