import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const useAuthLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [serverError, setServerError] = useState("");
  const [showAccountAlert, setShowAccountAlert] = useState(false);

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
    if (serverError) {
      setServerError("");
      setShowAccountAlert(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError("");
    setShowAccountAlert(false);

    try {
      console.log("Attempting login with:", formData.email);

      const result = await login(formData.email, formData.password);

      if (result.success) {
        console.log("Login successful");
        setShowSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        console.log("Login failed:", result.error);

        // Handle specific error messages
        if (
          result.error?.toLowerCase().includes("account not found") ||
          result.error?.toLowerCase().includes("invalid email") ||
          result.error?.toLowerCase().includes("not registered")
        ) {
          setShowAccountAlert(true);
        } else if (result.error?.toLowerCase().includes("password")) {
          setServerError("Incorrect password. Please try again.");
        } else {
          setServerError(result.error || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Unexpected login error:", error);
      setServerError(
        "Unable to connect to server. Please check if backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    setServerError(`${provider} login coming soon!`);
  };

  return {
    formData,
    errors,
    showPassword,
    loading,
    rememberMe,
    showSuccess,
    focusedField,
    serverError,
    showAccountAlert,
    setShowPassword,
    setRememberMe,
    setFocusedField,
    handleChange,
    handleSubmit,
    handleSocialLogin,
  };
};
