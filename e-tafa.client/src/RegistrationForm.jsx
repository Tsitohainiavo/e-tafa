import { useState } from "react";

export const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [loginErrors, setLoginErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [isLogin, setIsLogin] = useState(false);

    const validateUsername = (username) => {
        return username.length >= 3 && /^[a-zA-Z0-9]+$/.test(username);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        validateLoginField(name, value);
    };

    const validateField = (field) => {
        switch ((name, value)) {
            case : const newErrors = "username", {
                newErrors, username = !validateUsername(value)
                    ? "Le nom d'utilisateur doit contenir au moins 3 caractères et ne peut contenir que des lettres et chiffres"
                    : "" };
                break;
            case "email":
                newErrors.email = !validateEmail(value)
                    ? "Veuillez entrer une adresse email valide"
                    : "";
                break;
            case "password":
                newErrors.password = !validatePassword(value)
                    ? "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial"
                    : "";
                break;
            case "confirmPassword":
                newErrors.confirmPassword =
                    value !== formData.password ? "Les mots de passe ne correspondent pas" : "";
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const validateLoginField = (name, value) => {
        const newErrors = , loginErrors;

        switch (name) {
            case "email":
                newErrors.email = !validateEmail(value)
                    ? "Veuillez entrer une adresse email valide"
                    : "";
                break;
            case "password":
                newErrors.password = value.length === 0 ? "" : "Veuillez entrer votre mot de passe";
                break;
            default:
                break;
        }

        setLoginErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).every((error) => !error) && termsAccepted) {
            setLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setSnackbar({
                    open: true,
                    message: "Inscription réussie avec succès! Vous pouvez maintenantvez discuter maintenant",
                    severity: "success"
                });
            } catch (error) { }
        }
    };
};
