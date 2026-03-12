// This is a Signup page AuthForm
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Chrome,
  Github,
  Facebook,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import Input from "../common/Input";
import Button from "../common/button";

const AuthForm = ({
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  loading,
  agreeTerms,
  focusedField,
  showSuccess,
  setShowPassword,
  setShowConfirmPassword,
  setAgreeTerms,
  setFocusedField,
  handleChange,
  handleSubmit,
  handleSocialSignup,
  passwordStrength,
}) => {
  const strengthData = passwordStrength;

  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    if (handleSubmit) {
      handleSubmit(e);
    }
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="relative group mt-5 mb-5">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-1000"></div>
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 space-y-6">
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-3xl z-50 animate-fadeIn">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-bounceIn">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <p className="text-white font-medium mt-4 animate-slideUp">
                Account created successfully!
              </p>
            </div>
          </div>
        )}

        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Get Started
          </h2>
          <p className="text-gray-400 mt-2">Create your account in seconds</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            onFocus={() => setFocusedField("username")}
            onBlur={() => setFocusedField(null)}
            icon={User}
            error={errors.username}
            label="Username"
            floating={true}
            focused={focusedField === "username" || formData.username}
          />
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
            {formData.password && (
              <div className="mt-2 animate-slideDown">
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full bg-gradient-to-r transition-all duration-500 transform origin-left ${
                        i < strengthData.strength
                          ? strengthData.strengthColors[
                              strengthData.strength - 1
                            ] + " scale-x-100"
                          : "bg-gray-200 dark:bg-gray-700 scale-x-95"
                      }`}
                    />
                  ))}
                </div>
                <p
                  className={`text-xs mt-1.5 font-medium transition-all duration-300 ${
                    strengthData.strength > 0
                      ? `text-${strengthData.strengthColors[strengthData.strength - 1].split(" ")[0].replace("from-", "")} opacity-100 translate-y-0`
                      : "text-gray-500 opacity-50"
                  }`}
                >
                  {strengthData.strength > 0
                    ? strengthData.strengthLabels[strengthData.strength - 1]
                    : "Enter password"}
                </p>
              </div>
            )}
          </div>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder=" "
            value={formData.confirmPassword}
            onChange={handleChange}
            onFocus={() => setFocusedField("confirmPassword")}
            onBlur={() => setFocusedField(null)}
            icon={Lock}
            error={errors.confirmPassword}
            label="Confirm password"
            floating={true}
            focused={
              focusedField === "confirmPassword" || formData.confirmPassword
            }
            rightIcon={showConfirmPassword ? EyeOff : Eye}
            onRightIconClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />

          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${
                  agreeTerms
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 border-transparent shadow-lg shadow-purple-500/50"
                    : "border-white/30 bg-white/5 group-hover:border-white/50"
                }`}
              >
                {agreeTerms && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <span className="text-sm text-gray-400">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:underline"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="text-sm text-pink-400 animate-shake">
                {errors.terms}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            onClick={handleSignin}
            fullWidth
            loading={loading}
            disabled={loading}
            className="relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Create Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:underline"
            >
              Login
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

export default AuthForm;
