import { useState } from "react";
import { useActionData } from "react-router";

export const useAuthLogin = () => {
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

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Login Form Submitted:", formData, "Remember Me:", rememberMe);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);

            // Here Make API call for Backend
            // Redirect to Home Page after successfully login
        } catch (error) {
            console.error("Login error:", error);
            setErrors({
                submit: "Invalid Email or Password, Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        // Implement Social Login API Logic
    };

    return {
        formData,
        errors,
        showPassword,
        loading,
        rememberMe,
        showSuccess,
        focusedField,
        setShowPassword,
        setRememberMe,
        setFocusedField,
        handleChange,
        handleSubmit,
        handleSocialLogin,
    };
};