import React from "react";

import {
  Github,
  Twitter,
  Linkedin,
  Heart,
  Sparkles,
  Users,
  Globe,
  Shield,
  Zap,
  Camera,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router";

const About = () => {
    const navigate = useNavigate();
  const features = [
    {
      icon: <Camera className="w-6 h-6 text-purple-500" />,
      title: "Share Moments",
      description: "Share Your life's moments with stunning photos and videos",
    },

    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Connect Globally",
      description:
        "Connect with people from around the world who share your interests.",
    },

    {
      icon: <MessageCircle className="w-6 h-6 text-purple-500" />,
      title: "Real-time Chat",
      description: "Stay Connected with instant messaging and stories",
    },

    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: "Privacy First",
      description: "Your Data is Safe with our advanced privacy controls",
    },

    {
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      title: "Lighting Fast",
      description: "Optimized for speed and seamless user experience",
    },

    {
      icon: <Globe className="w-6 h-6 text-purple-500" />,
      title: "Global Community",
      description: "Join millions of users sharing their stories world wide",
    },
  ];

  const stats = [
    { label: "Active Users", value: "..." },
    { label: "Daily Posts", value: "..." },
    { label: "Countries", value: "..." },
    { label: "Stories Shared", value: "..." },
  ];

  const team = [
    {
      name: "Abhi Senghawala",
      role: "Founder & Developer",
      image: "#",
      social: {
        github: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
  ];
  
      const handleCreateAcc = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();

        navigate("/signup");
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Socify
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Where connections come alive. Share your story, discover new
              perspectives, and be part of a global community that celebrates
              every moment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Get Started
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover features that make Socify the perfect platform to express
            yourself and connect with others.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Our Story: From Dream to Reality
            </h2>
            <div className="space-y-4 text-xl font-semibold text-gray-300">
              <p>
                Socify was born from a simple idea: create a space where people
                can truly be themselves. Founded in 2026 by Abhi, our platform
                has grown into a vibrant community of creators, thinkers, and
                dreamers.
              </p>
              <p>
                We believe in the power of authentic connections. Every feature
                we build, every update we release, is designed to bring people
                closer together while celebrating what makes each of us unique.
              </p>
              <p>
                Today, millions of users across the globe call Socify their
                digital home. And we're just getting started.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Meet the Minds Behind Socify
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Passionate creators dedicated to building the best social experience
            for you.
          </p>
        </div>

        <div className="flex items-center justify-center max-w-3xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-7 text-center"
            >
              <img
                src="/Image/1.jpg"
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-500/30"
              />
              <h3 className="text-xl font-semibold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-purple-400 mb-4">{member.role}</p>
              <div className="flex justify-center gap-3">
                <a
                  href="http://github.com/Abhi-Senghawala"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abhi-senghawala"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-12 text-center">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative">
            <Heart className="w-12 h-12 text-white mx-auto mb-4 fill-white" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Sign up now and start sharing your story with the world.
            </p>
            <button onClick={handleCreateAcc} className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer">
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-500 text-sm">
          &copy; 2026 Socify. Crafted with{" "}
          <Heart size={14} className="inline text-pink-500 fill-pink-500" /> by
          Abhi
        </p>
      </div>
    </div>
  );
};

export default About;
