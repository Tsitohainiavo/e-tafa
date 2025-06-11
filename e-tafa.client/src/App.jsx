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
    styled,
    Grid,
    Divider,
    Fade
} from "@mui/material";
import { FaEye, FaEyeSlash, FaGoogle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 600,
    margin: "1rem auto",
    padding: "2rem",
    background: "#ffffff",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    borderRadius: "20px",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
    "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)"
    },
    [theme.breakpoints.down('sm')]: {
        padding: "1.5rem",
        margin: "0.5rem",
        maxWidth: "100%",
    }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: "1.5rem",
    "& .MuiOutlinedInput-root": {
        borderRadius: "14px",
        background: "#f8fafc",
        "& fieldset": {
            borderColor: "#e2e8f0",
        },
        "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
        },
        "&.Mui-focuse System: d fieldset": {
            borderColor: theme.palette.primary.main,
        borderWidth: "2px26px",
    },
    "& input": {
        padding: "14px 14px",
        paddingLeft: "40px",
        fontSize: "1rem"
    },
},
    "& .MuiInputLabel-root": {
    transform: "translate(40px, 14px) scale(1)",
    color: "#64748b",
    "&.Mui-focused": {
        transform: "translate(14px, -9px) scale(0.75)",
        color: theme.palette.primary.main,
    },
    "&.MuiFormLabel-filled": {
        transform: "translate(14px, -9px) scale(0.75)",
    }
},
    "& .MuiInputAdornment-root": {
    position: "absolute",
    left: "12px"
}
}));

const SocialButton = styled(Button)(({ theme }) => ({
    marginBottom: "1rem",
    padding: "12px 20px",
    borderRadius: "14px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "1.1rem",
    transition: "all 0.3s ease",
    background: "linear-gradient(45deg, #fff 0%, #f8fafc 100%)",
    color: "#1f2937",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    "&:hover": {
        background: "linear-gradient(45deg, #f1f5f9 0%, #e2e8f0 100%)",
        transform: "translateY(-2px)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.12)"
    },
    "& .MuiButton-startIcon": {
        marginRight: "12px",
    }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(45deg, #3b82f6 0%, #60a5fa 100%)",
    color: "#ffffff",
    fontWeight: 700,
    padding: "14px 28px",
    borderRadius: "14px",
    fontSize: "1.1rem",
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
        background: "linear-gradient(45deg, #2563eb 0%, #3b82f6 100%)"
    },
    "&:disabled": {
        background: "#e5e7eb",
        boxShadow: "none",
        transform: "none"
    }
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

    const handleGoogleSignIn = () => {
        console.log("Google Sign-In clicked");
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
                height: "100vh",
                maxWidth: "100%", // Toujours 100% de la largeur
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f1f5f9",
                overflow: "hidden",
                position: "relative",
                "&:before": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80) center/cover no-repeat",
                    opacity: 0.05,
                    zIndex: 0
                }
            }}
        >
            <Box sx={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
                <Grid container spacing={2} sx={{ height: "100%", alignItems: "center" }}>
                    <Grid item xs={12} md={6} sx={{ height: { xs: "auto", md: "100%" }, display: "flex", alignItems: "center" }}>
                        <Fade in timeout={1000}>
                            <Box sx={{
                                textAlign: { xs: "center", md: "left" },
                                color: "#1f2937",
                                p: { xs: 2, md: 3 },
                                width: "100%",
                                maxHeight: { xs: "auto", md: "80vh" }
                            }}>
                                <Typography variant="h2" sx={{
                                    fontWeight: 800,
                                    mb: 2,
                                    fontSize: { xs: "2rem", md: "3rem" },
                                    lineHeight: 1.2,
                                    background: "linear-gradient(45deg, #3b82f6 0%, #60a5fa 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}>
                                    Bienvenue dans notre communauté
                                </Typography>
                                <Typography variant="h6" sx={{
                                    color: "#4b5563",
                                    mb: 3,
                                    fontWeight: 400,
                                    fontSize: { xs: "0.9rem", md: "1.1rem" }
                                }}>
                                    Créez votre compte pour accéder à des fonctionnalités exclusives.
                                </Typography>
                                <Box sx={{
                                    backgroundImage: "url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: { xs: 150, md: 300 },
                                    width: "100%",
                                    maxWidth: { md: 400 },
                                    borderRadius: "20px",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                                    transition: "transform 0.4s ease",
                                    "&:hover": {
                                        transform: "scale(1.02)"
                                    }
                                }} />
                            </Box>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ height: { xs: "auto", md: "100%" }, display: "flex", alignItems: "center" }}>
                        <Fade in timeout={1200}>
                            <StyledCard sx={{ width: "100%", maxHeight: { xs: "auto", md: "80vh" }, overflow: "hidden" }}>
                                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                    <Typography variant="h4" align="center" gutterBottom sx={{
                                        fontWeight: 700,
                                        color: "#1f2937",
                                        mb: 3,
                                        fontSize: { xs: "1.5rem", md: "2rem" }
                                    }}>
                                        Créer un compte
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
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FaUser style={{ color: "#64748b" }} />
                                                    </InputAdornment>
                                                )
                                            }}
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
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FaEnvelope style={{ color: "#64748b" }} />
                                                    </InputAdornment>
                                                )
                                            }}
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
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FaLock style={{ color: "#64748b" }} />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            edge="end"
                                                            size="small"
                                                        >
                                                            {showPassword ? <FaEyeSlash style={{ color: "#64748b" }} /> : <FaEye style={{ color: "#64748b" }} />}
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
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FaLock style={{ color: "#64748b" }} />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            edge="end"
                                                            size="small"
                                                        >
                                                            {showConfirmPassword ? <FaEyeSlash style={{ color: "#64748b" }} /> : <FaEye style={{ color: "#64748b" }} />}
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
                                                    sx={{
                                                        '&.Mui-checked': {
                                                            color: "#3b82f6"
                                                        }
                                                    }}
                                                />
                                            }
                                            label={
                                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                                    J'accepte les <Box component="span" sx={{ color: "#3b82f6", fontWeight: 600, cursor: "pointer" }}>conditions d'utilisation</Box>
                                                </Typography>
                                            }
                                            sx={{ mb: 2 }}
                                        />

                                        <SubmitButton
                                            fullWidth
                                            type="submit"
                                            disabled={!isFormValid() || loading}
                                        >
                                            {loading ? (
                                                <CircularProgress size={24} color="inherit" />
                                            ) : (
                                                "S'inscrire"
                                            )}
                                        </SubmitButton>

                                        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                                            <Divider sx={{ flexGrow: 1, borderColor: "#e2e8f0" }} />
                                            <Typography variant="body2" sx={{ px: 3, color: "#64748b", fontWeight: 500 }}>
                                                Ou continuer avec
                                            </Typography>
                                            <Divider sx={{ flexGrow: 1, borderColor: "#e2e8f0" }} />
                                        </Box>

                                        <SocialButton
                                            startIcon={<FaGoogle />}
                                            fullWidth
                                            onClick={handleGoogleSignIn}
                                        >
                                            Se connecter avec Google
                                        </SocialButton>

                                        <Typography variant="body2" align="center" sx={{ mt: 2, color: "#64748b" }}>
                                            Vous avez déjà un compte ?
                                            <Box component="span" sx={{ color: "#3b82f6", fontWeight: 600, ml: 1, cursor: "pointer" }}>
                                                Se connecter
                                            </Box>
                                        </Typography>
                                    </form>
                                </CardContent>
                            </StyledCard>
                        </Fade>
                    </Grid>
                </Grid>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Fade in={snackbar.open} timeout={300}>
                    <Alert
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={snackbar.severity}
                        sx={{
                            width: "100%",
                            maxWidth: { xs: "90vw", md: "500px" },
                            borderRadius: "12px",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                            bgcolor: snackbar.severity === 'success' ? '#ecfed7' : '#fee2e7'
                        }}
                    >
                        {snackbar.message}
                    </Alert>
                </Fade>
            </Snackbar>
        </Container>
    );
};

export default RegistrationForm;