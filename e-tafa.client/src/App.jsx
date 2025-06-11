/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Snackbar,
    TextField,
    Typography,
    Alert,
    CircularProgress,
    styled
} from "@mui/material";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 450,
    margin: "2rem auto",
    padding: "2rem",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)"
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: "1rem",
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        "&:hover fieldset": {
            borderColor: "#3f51b5"
        }
    }
}));

const SocialButton = styled(Button)(({ theme }) => ({
    marginBottom: "1rem",
    width: "100%",
    padding: "0.75rem",
    borderRadius: "10px",
    textTransform: "none"
}));

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const validateUsername = (username) => {
        return username.length >= 3 && /^[a-zA-Z0-9]+$/.test(username);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
            case "username":
                newErrors.username = !validateUsername(value)
                    ? "Le nom d'utilisateur doit contenir au moins 3 caractères et ne peut contenir que des lettres et des chiffres"
                    : "";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).every((error) => !error) && termsAccepted) {
            setLoading(true);
            try {
                // Simulated API call
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setSnackbar({
                    open: true,
                    message: "Inscription réussie!",
                    severity: "success"
                });
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: "Une erreur est survenue",
                    severity: "error"
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const isFormValid = () => {
        return (
            validateUsername(formData.username) &&
            validateEmail(formData.email) &&
            validatePassword(formData.password) &&
            formData.password === formData.confirmPassword &&
            termsAccepted
        );
    };

    return (
        <Container
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                py: 4
            }}
        >
            <StyledCard>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Inscription
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <StyledTextField
                            fullWidth
                            label="Nom d'utilisateur"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            error={!!errors.username}
                            helperText={errors.username}
                        />

                        <StyledTextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />

                        <StyledTextField
                            fullWidth
                            label="Mot de passe"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <StyledTextField
                            fullWidth
                            label="Confirmer le mot de passe"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="J'accepte les conditions d'utilisation"
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!isFormValid() || loading}
                            sx={{
                                mt: 2,
                                mb: 2,
                                height: "48px",
                                borderRadius: "10px",
                                textTransform: "none"
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "S'inscrire"
                            )}
                        </Button>

                        <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
                            <Typography variant="body2" color="textSecondary">
                                Ou s'inscrire avec
                            </Typography>
                        </Box>

                        <SocialButton
                            variant="outlined"
                            startIcon={<FaGoogle />}
                            onClick={() => { }}
                        >
                            Google
                        </SocialButton>

                        <SocialButton
                            variant="outlined"
                            startIcon={<FaFacebook />}
                            onClick={() => { }}
                        >
                            Facebook
                        </SocialButton>
                    </form>
                </CardContent>
            </StyledCard>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default RegistrationForm;
