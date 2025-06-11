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
import { FaEye, FaEyeSlash, FaGoogle, FaUser, FaEnvelope, FaLock, FaComments, FaPaperPlane } from "react-icons/fa";

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 600,
    margin: "1rem auto",
    padding: "1.5rem",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
    "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)"
    },
    [theme.breakpoints.down('sm')]: {
        padding: "1rem",
        margin: "0.5rem",
        maxWidth: "90%",
        borderRadius: "12px",
    }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: "1.2rem",
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.8)",
        "& fieldset": {
            borderColor: "rgba(0, 0, 0, 0.15)",
        },
        "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
            borderWidth: "2px",
        },
    },
    "& input": {
        padding: "12px 14px",
        paddingLeft: "40px",
        fontSize: "0.95rem"
    },
    "& .MuiInputLabel-root": {
        transform: "translate(40px, 12px) scale(1)",
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
    },
    "& .MuiInputAdornment-positionEnd": {
        position: "absolute",
        left: "auto",
        right: "12px"
    },
    [theme.breakpoints.down('sm')]: {
        marginBottom: "1rem",
        "& input": {
            padding: "10px 12px",
            paddingLeft: "36px",
            fontSize: "0.9rem"
        },
        "& .MuiInputLabel-root": {
            transform: "translate(36px, 10px) scale(1)",
            fontSize: "0.9rem",
            "&.Mui-focused": {
                transform: "translate(12px, -8px) scale(0.75)",
            },
            "&.MuiFormLabel-filled": {
                transform: "translate(12px, -8px) scale(0.75)",
            }
        }
    }
}));

const SocialButton = styled(Button)(({ theme }) => ({
    marginBottom: "1rem",
    padding: "10px 18px",
    borderRadius: "12px",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "all 0.3s ease",
    background: "rgba(255, 255, 255, 0.8)",
    color: "#1f2937",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    "&:hover": {
        background: "rgba(255, 255, 255, 0.95)",
        transform: "translateY(-2px)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.12)"
    },
    "& .MuiButton-startIcon": {
        marginRight: "10px",
    },
    [theme.breakpoints.down('sm')]: {
        padding: "8px 16px",
        fontSize: "0.9rem"
    }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(45deg, #4a6cf7 0%, #6a8cff 100%)",
    color: "#ffffff",
    fontWeight: 600,
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: "1rem",
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(74, 108, 247, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 20px rgba(74, 108, 247, 0.4)",
        background: "linear-gradient(45deg, #3a5af5 0%, #5a7cff 100%)"
    },
    "&:disabled": {
        background: "rgba(229, 231, 235, 0.7)",
        boxShadow: "none",
        transform: "none"
    },
    [theme.breakpoints.down('sm')]: {
        padding: "10px 20px",
        fontSize: "0.9rem"
    }
}));

const FeatureItem = ({ icon, text }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1.2 }}>
        <Box sx={{
            background: "linear-gradient(45deg, #4a6cf7 0%, #6a8cff 100%)",
            borderRadius: "50%",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px",
            color: "white"
        }}>
            {icon}
        </Box>
        <Typography variant="body2" sx={{ color: "#4b5563", fontWeight: 500, fontSize: { xs: "0.85rem", md: "0.95rem" } }}>
            {text}
        </Typography>
    </Box>
);

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
                    message: "Inscription réussie! Vous pouvez maintenant discuter",
                    severity: "success"
                });
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: "Une erreur est survenue lors de la création du compte",
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
            maxWidth={false}
            disableGutters
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                overflow: { xs: "auto", md: "hidden" },
                overflowX: "hidden",
                padding: { xs: "1rem", md: "0" },
                "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "url(https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=2000&q=80) center/cover no-repeat",
                    opacity: 0.1,
                    zIndex: 0
                }
            }}
        >
            <Box sx={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "1400px",
                minHeight: { xs: "auto", md: "100vh" },
                display: "flex",
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: "center",
                py: { xs: 2, md: 0 }
            }}>
                <Grid container
                    spacing={2}
                    sx={{
                        alignItems: { xs: "stretch", md: "center" },
                        justifyContent: "center",
                        flexDirection: { xs: "column", md: "row" },
                    }}
                >
                    <Grid item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            alignItems: { xs: "flex-start", md: "center" },
                            justifyContent: "center",
                            padding: { xs: "0.5rem", md: "0" },
                            minHeight: { xs: "auto", md: "100%" }
                        }}
                    >
                        <Fade in timeout={1000}>
                            <Box sx={{
                                textAlign: { xs: "center", md: "left" },
                                color: "white",
                                p: { xs: 1.5, md: 3 },
                                width: "100%",
                                maxWidth: "500px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: { xs: "flex-start", md: "center" }
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                    justifyContent: { xs: "center", md: "flex-start" }
                                }}>
                                    <Box sx={{
                                        background: "rgba(255, 255, 255, 0.2)",
                                        backdropFilter: "blur(10px)",
                                        borderRadius: "12px",
                                        width: 48,
                                        height: 48,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginRight: "10px",
                                        color: "white",
                                        fontSize: "1.5rem"
                                    }}>
                                        <FaComments />
                                    </Box>
                                    <Typography variant="h5" sx={{
                                        fontWeight: 800,
                                        color: "white",
                                        textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                    }}>
                                        e-Tafa
                                    </Typography>
                                </Box>

                                <Typography variant="h3" sx={{
                                    fontWeight: 800,
                                    mb: 1.5,
                                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                                    lineHeight: 1.2,
                                    color: "white",
                                    textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                }}>
                                    Discutez instantanément avec le monde entier
                                </Typography>
                                <Typography variant="body1" sx={{
                                    color: "rgba(255, 255, 255, 0.9)",
                                    mb: 2,
                                    fontWeight: 400,
                                    fontSize: { xs: "0.85rem", md: "1rem" }
                                }}>
                                    Rejoignez notre communauté de messagerie en temps réel avec traduction automatique.
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    <FeatureItem
                                        icon={<FaPaperPlane />}
                                        text="Messages instantanés avec traduction en temps réel"
                                    />
                                    <FeatureItem
                                        icon={<FaUser />}
                                        text="Communiquez avec des personnes du monde entier"
                                    />
                                    <FeatureItem
                                        icon={<FaLock />}
                                        text="Conversations sécurisées et chiffrées"
                                    />
                                </Box>

                                <Box sx={{
                                    flexGrow: 1,
                                    backgroundImage: "url(https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    minHeight: { xs: "150px", md: "200px" },
                                    width: "100%",
                                    borderRadius: "16px",
                                    boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
                                    transition: "transform 0.4s ease",
                                    "&:hover": {
                                        transform: { md: "scale(1.02)" }
                                    }
                                }} />
                            </Box>
                        </Fade>
                    </Grid>
                    <Grid item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            alignItems: { xs: "flex-start", md: "center" },
                            justifyContent: "center",
                            padding: { xs: "0.5rem", md: "0" }
                        }}
                    >
                        <Fade in timeout={1200}>
                            <StyledCard sx={{
                                width: "100%",
                                maxWidth: { xs: "100%", md: "500px" },
                            }}>
                                <CardContent sx={{ p: { xs: 1.5, md: 3 } }}>
                                    <Typography variant="h5" align="center" gutterBottom sx={{
                                        fontWeight: 700,
                                        color: "#1f2937",
                                        mb: 2,
                                        fontSize: { xs: "1.3rem", md: "1.8rem" },
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px"
                                    }}>
                                        <FaComments style={{ color: "#4a6cf7" }} />
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
                                                            color: "#4a6cf7"
                                                        },
                                                        transform: { xs: "scale(0.9)", md: "scale(1)" }
                                                    }}
                                                />
                                            }
                                            label={
                                                <Typography variant="body2" sx={{ color: "#4b5563", fontSize: { xs: "0.85rem", md: "0.9rem" } }}>
                                                    J'accepte les <Box component="span" sx={{ color: "#4a6cf7", fontWeight: 600, cursor: "pointer" }}>conditions d'utilisation</Box>
                                                </Typography>
                                            }
                                            sx={{ mb: 1.5 }}
                                        />

                                        <SubmitButton
                                            fullWidth
                                            type="submit"
                                            disabled={!isFormValid() || loading}
                                        >
                                            {loading ? (
                                                <CircularProgress size={20} color="inherit" />
                                            ) : (
                                                "Commencer à discuter"
                                            )}
                                        </SubmitButton>

                                        <Box sx={{ display: "flex", alignItems: "center", my: 1.5 }}>
                                            <Divider sx={{ flexGrow: 1, borderColor: "#e2e8f0" }} />
                                            <Typography variant="body2" sx={{ px: 2, color: "#64748b", fontWeight: 500, fontSize: { xs: "0.85rem", md: "0.9rem" } }}>
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

                                        <Typography variant="body2" align="center" sx={{ mt: 1.5, color: "#64748b", fontSize: { xs: "0.85rem", md: "0.9rem" } }}>
                                            Vous avez déjà un compte ?
                                            <Box component="span" sx={{ color: "#4a6cf7", fontWeight: 600, ml: 1, cursor: "pointer" }}>
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
                            maxWidth: { xs: "85vw", md: "500px" },
                            borderRadius: "10px",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                            bgcolor: snackbar.severity === 'success' ? '#ecfed7' : '#fee2e7',
                            fontSize: { xs: "0.85rem", md: "0.9rem" }
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