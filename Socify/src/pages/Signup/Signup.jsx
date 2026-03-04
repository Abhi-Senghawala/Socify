import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Github,
  Chrome,
  Facebook,
  Sparkles,
} from 'lucide-react';

import Input from '../../components/common/Input';
import Button from '../../components/common/button';
import SocialButton from '../../components/common/SocialButton';
import AuthLayout from '../../components/layout/AuthLayout';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "User-Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "User-Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is Invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password Required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase and number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password do not match";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form Submitted:", formData);

      // Here Make an API call for Backend
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        submit: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signup with ${provider}`);
    // Implementing Signup Logic Sometime later
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return null;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;

    const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
    const strengthColors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-emerald-500",
    ];

    return (
      <div className="mt-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-200 ${i < strength ? strengthColors[strength - 1] : "bg-gray-200 dark:bg-gray-700"}`}
            />
          ))}
        </div>
        <p
          className={`text-xs mt-1 font-medium ${strength > 0 ? `text-${strengthColors[strength - 1].replace("bg-", "")}` : "text-gray-500"}`}
        >
          {strength > 0 ? strengthLabels[strength - 1] : "Enter Password"}
        </p>
      </div>
    );
  };
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Socify today and connect with the world"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User-Name Input */}
        <Input
          type="text"
          name="name"
          placeholder="Enter Your User-Name"
          value={formData.name}
          onChange={handleChange}
          icon={User}
          error={errors.name}
          label="Full Name"
        />

        {/* Email Input */}
        <Input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
          icon={Mail}
          error={errors.email}
          label="Email Address"
        />

        {/* Password Input */}
        <div>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
            icon={Lock}
            error={errors.password}
            label="Password"
          />
          {passwordStrength()}
        </div>

        {/* Confirm Password Input */}
        <Input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Your Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          icon={Lock}
          error={errors.confirmPassword}
          label="Confirm Password"
        />

        {/* Password Visibility Toggles */}
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-600 dark:text-gray-400">
              Show Password
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showConfirmPassword}
              onChange={() => setShowConfirmPassword(!showConfirmPassword)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-600 dark:text-gray-400">
              Show Confirm Password
            </span>
          </label>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              I agree to the{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p className="text-sm text-red-500">{errors.terms}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Create Account
        </Button>

        {/* Social Signup */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg:white dark:bg-gray-800 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <SocialButton
            provider="google"
            icon={Chrome}
            onClick={() => handleSocialSignup("google")}
          />
          <SocialButton
            provider="github"
            icon={Github}
            onClick={() => handleSocialSignup("github")}
          />
          <SocialButton
            provider="facebook"
            icon={Facebook}
            onClick={() => handleSocialSignup("facebook")}
          />
        </div>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
        {errors.submit && (
          <p className="text-sm text-red-500 text-center">{errors.submit}</p>
        )}
      </form>
    </AuthLayout>
  );
};

export default Signup;