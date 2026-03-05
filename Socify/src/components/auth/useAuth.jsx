import { useState, useEffect } from "react";

export const useAuth = () => {
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [step, setStep] = useState(1);

  // Form Validation Steps
  useEffect(() => {
    if (formData.name && formData.name.length >= 2) setStep(2);
    else setStep(1);

    if (formData.email && /\S+@\S+\.\S+/.test(formData.email)) setStep(3);
    else if (formData.name && formData.name.length >= 2) setStep(2);

    if (formData.password && formData.password.length >= 8) setStep(4);
    else if (formData.email && /\S+@\S+\.\S+/.test(formData.email)) setStep(3);
  }, [formData]);

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
      newErrors.name = "Username is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Username must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase and number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form Submitted:", formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
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
    // Implement social signup logic
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
      "from-red-500 to-red-400",
      "from-orange-500 to-orange-400",
      "from-yellow-500 to-yellow-400",
      "from-green-500 to-green-400",
      "from-emerald-500 to-teal-400",
    ];

    return {
      strength,
      strengthLabels,
      strengthColors,
    };
  };

  return {
    formData,
    errors,
    showPassword,
    showConfirmPassword,
    loading,
    agreeTerms,
    showSuccess,
    focusedField,
    step,
    setShowPassword,
    setShowConfirmPassword,
    setAgreeTerms,
    setFocusedField,
    handleChange,
    handleSubmit,
    handleSocialSignup,
    passwordStrength: passwordStrength(),
  };
};
