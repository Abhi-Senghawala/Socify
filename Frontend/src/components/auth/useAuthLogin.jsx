import { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 

export const useAuthLogin = () => {
  const navigate = useNavigate(); 
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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
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

    try {
      console.log("Attempting login with:", formData);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data && response.data.token) {
        console.log("Login successful:", response.data);

        if (rememberMe) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
        }

        setShowSuccess(true);

        setTimeout(() => {
          navigate("/"); 
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          if (data.message === "Invalid credentials") {
            setServerError(
              "Account not found or invalid credentials. Please check your email and password.",
            );
          } else {
            setServerError(
              data.message || "Invalid credentials. Please try again.",
            );
          }
        } else if (status === 404) {
          setServerError("Account not found. Please register first.");
        } else {
          setServerError(data.message || "Login failed. Please try again.");
        }
      } else if (error.request) {
        setServerError("Network error. Please check your connection.");
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement Social Login API Logic
    // You can add similar error handling for social logins
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
    setShowPassword,
    setRememberMe,
    setFocusedField,
    handleChange,
    handleSubmit,
    handleSocialLogin,
  };
};
