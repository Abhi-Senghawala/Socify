import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  Github,
  Facebook,
  CheckCircle,
  ArrowRight,
  LogIn,
} from "lucide-react";

import Input from "../common/Input";
import Button from "../common/button";

const LoginForm = ({
  formData,
  errors,
  showPassword,
  loading,
  rememberMe,
  focusedField,
  showSuccess,
  setShowPassword,
  setRememberMe,
  setFocusedField,
  handleChange,
  handleSubmit,
  handleSocialLogin,
}) => {
  return (
    <div className="relative group mt-10">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-1000"></div>

      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 space-y-6">
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-3xl z-50 animate-fadeIn">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-bounceIn">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <p className="text-white font-medium mt-4 animate-slideUp">
                Login successful! Redirecting...
              </p>
            </div>
          </div>
        )}

        {/* Header Section*/}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-400 mt-2">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <Input
            type="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            icon={Mail}
            error={errors.email}
            label="Email address"
            floating={true}
            focused={focusedField === "email" || formData.email}
          />

          {/* Password Input */}
          <div>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              icon={Lock}
              error={errors.password}
              label="Password"
              floating={true}
              focused={focusedField === "password" || formData.password}
              rightIcon={showPassword ? EyeOff : Eye}
              onRightIconClick={() => setShowPassword(!showPassword)}
            />

            {/* Forgot Password Link */}
            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${
                  rememberMe
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 border-transparent shadow-lg shadow-purple-500/50"
                    : "border-white/30 bg-white/5 group-hover:border-white/50"
                }`}
              >
                {rememberMe && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <span className="text-sm text-gray-400">
                Remember me for 30 days
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
            className="relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          {/* Social Login */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              {
                provider: "google",
                icon: Chrome,
                color: "from-red-500 to-orange-500",
              },
              {
                provider: "github",
                icon: Github,
                color: "from-gray-700 to-gray-900",
              },
              {
                provider: "facebook",
                icon: Facebook,
                color: "from-blue-600 to-indigo-600",
              },
            ].map((social) => (
              <button
                key={social.provider}
                onClick={() => handleSocialLogin(social.provider)}
                className="relative group overflow-hidden p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />
                <social.icon className="w-5 h-5 text-white mx-auto group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:underline"
            >
              Create account
            </Link>
          </p>

          {errors.submit && (
            <p className="text-sm text-pink-400 text-center animate-shake">
              {errors.submit}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
