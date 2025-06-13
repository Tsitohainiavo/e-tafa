/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    AppBar, Toolbar, IconButton, TextField,
    List, ListItem, ListItemAvatar, Avatar,
    ListItemText, Divider, Badge, Box,
    Button, Select, MenuItem, InputAdornment,
    Paper, useMediaQuery, ThemeProvider, createTheme, Typography
} from '@mui/material';
import {
    Search, Send, Language, ArrowBack,
    Circle as CircleOnline, CheckCircle,
    Chat, People, Call, Settings,
    MoreVert, EmojiEmotions, AttachFile
} from '@mui/icons-material';

// WhatsApp-inspired theme
const theme = createTheme({
    palette: {
        primary: { main: '#128C7E' }, // WhatsApp green
        secondary: { main: '#25D366' }, // WhatsApp secondary green
        background: {
            default: '#F0F2F5', // Light background
            paper: '#FFFFFF' // Cards background
        },
        text: {
            primary: '#3B4A54',
            secondary: '#667781'
        }
    },
    shape: { borderRadius: 8 },
    typography: {
        fontFamily: '"Segoe UI", "Helvetica Neue", sans-serif',
        body1: { fontSize: '0.95rem' },
        body2: { fontSize: '0.85rem', color: '#667781' }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F0F2F5',
                    color: '#000000',
                    boxShadow: 'none'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: 'none',
                    borderRight: '1px solid #E0E0E0'
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#F5F5F5'
                    }
                }
            }
        }
    }
});

const ChatPage = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [message, setMessage] = useState('');
    const [language, setLanguage] = useState('fr');
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('chats');
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Simulated data
    const conversations = [
        { id: 1, name: "Alex Dubois", lastMsg: "Salut, tu as vu le document ?", time: "10:30", unread: 2, online: true },
        { id: 2, name: "Tech Team", lastMsg: "Meeting à 15h aujourd'hui", time: "09:15", unread: 0, online: false },
        { id: 3, name: "Sophie Martin", lastMsg: "Je t'envoie le lien 👍", time: "Hier", unread: 0, online: true },
        { id: 7, name: "Thomas Bernard", lastMsg: "Merci pour ton aide !", time: "06:45", unread: 3, online: false },
        { id: 8, name: "Marketing", lastMsg: "Nouvelle campagne lancée", time: "Hier", unread: 0, online: false }
    ];

    const users = [
        { id: 4, name: "Marie Laurent", online: true },
        { id: 5, name: "Jean Dupont", online: false },
        { id: 6, name: "Claire Lefevre", online: true }
    ];

    const messages = {
        1: [
            { id: 1, text: "Salut, tu as vu le document ?", sender: "them", time: "10:28", translated: "Hi, have you seen the document?" },
            { id: 2, text: "Oui je l'ai reçu, je te fais un retour ASAP", sender: "me", time: "10:30", translated: "Yes received, I'll give you feedback ASAP" },
            { id: 3, text: "Parfait merci !", sender: "them", time: "10:30", translated: "Perfect thanks!" }
        ],
        2: [
            { id: 1, text: "Meeting à 15h aujourd'hui", sender: "them", time: "09:15" }
        ],
        3: [
            { id: 1, text: "Voici le lien que tu m'as demandé: https://example.com", sender: "them", time: "11:20" }
        ]
    };

    // Search functionality
    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(search.toLowerCase()) ||
        conv.lastMsg.toLowerCase().includes(search.toLowerCase())
    );

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSend = () => {
        if (message.trim() !== '') {
            // Add message sending logic here
            setMessage('');
        }
    };

    // Sidebar icons component
    const SidebarIcons = () => (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 70,
            bgcolor: '#F0F2F5',
            py: 2,
            borderRight: '1px solid #E0E0E0'
        }}>
            <IconButton
                sx={{
                    mb: 3,
                    mt: 1,
                    backgroundColor: activeTab === 'chats' ? '#E0F0E7' : 'transparent',
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: activeTab === 'chats' ? '#E0F0E7' : '#E5E5E5'
                    }
                }}
                onClick={() => setActiveTab('chats')}
            >
                <Badge badgeContent={5} color="primary">
                    <Chat sx={{ color: activeTab === 'chats' ? '#128C7E' : '#54656F', fontSize: 26 }} />
                </Badge>
            </IconButton>

            <IconButton
                sx={{
                    mb: 3,
                    backgroundColor: activeTab === 'contacts' ? '#E0F0E7' : 'transparent',
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: activeTab === 'contacts' ? '#E0F0E7' : '#E5E5E5'
                    }
                }}
                onClick={() => setActiveTab('contacts')}
            >
                <People sx={{ color: activeTab === 'contacts' ? '#128C7E' : '#54656F', fontSize: 26 }} />
            </IconButton>

            <IconButton
                sx={{
                    mb: 3,
                    backgroundColor: activeTab === 'calls' ? '#E0F0E7' : 'transparent',
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: activeTab === 'calls' ? '#E0F0E7' : '#E5E5E5'
                    }
                }}
                onClick={() => setActiveTab('calls')}
            >
                <Call sx={{ color: activeTab === 'calls' ? '#128C7E' : '#54656F', fontSize: 26 }} />
            </IconButton>

            <IconButton
                sx={{
                    mb: 3,
                    backgroundColor: activeTab === 'settings' ? '#E0F0E7' : 'transparent',
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: activeTab === 'settings' ? '#E0F0E7' : '#E5E5E5'
                    }
                }}
                onClick={() => setActiveTab('settings')}
            >
                <Settings sx={{ color: activeTab === 'settings' ? '#128C7E' : '#54656F', fontSize: 26 }} />
            </IconButton>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', height: '100vh', width:'100vw', bgcolor: 'background.default' }}>
                {/* Sidebar Icons */}
                {!isMobile && <SidebarIcons />}

                {/* Sidebar - Conversation List */}
                <Paper sx={{
                    width: isMobile ? '100%' : '30%',
                    maxWidth: isMobile ? '100%' : 400,
                    display: activeChat && isMobile ? 'none' : 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid #E0E0E0'
                }}>
                    <AppBar position="static" elevation={0}>
                        <Toolbar sx={{
                            bgcolor: '#F0F2F5',
                            px: 2,
                            borderBottom: '1px solid #E0E0E0'
                        }}>
                            <Avatar
                                sx={{
                                    bgcolor: 'primary.main',
                                    mr: 2,
                                    width: 40,
                                    height: 40
                                }}
                                src="/profile.jpg"
                            />
                            <Typography variant="h6" sx={{
                                flexGrow: 1,
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                color: '#3B4A54'
                            }}>
                                E-Tafa
                            </Typography>
                            <IconButton>
                                <MoreVert sx={{ color: '#54656F' }} />
                            </IconButton>
                        </Toolbar>
                        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Rechercher une discussion ou un contact..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search sx={{ color: '#667781' }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        bgcolor: '#F0F2F5',
                                        borderRadius: '20px',
                                        height: 36,
                                        fontSize: '0.9rem'
                                    }
                                }}
                            />
                        </Box>
                    </AppBar>

                    <List sx={{
                        overflowY: 'auto',
                        flex: 1,
                        bgcolor: 'background.paper',
                        '&::-webkit-scrollbar': {
                            width: '6px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#C5C5C5',
                            borderRadius: '3px'
                        }
                    }}>
                        {filteredConversations.map((conv) => (
                            <ListItem
                                button
                                key={conv.id}
                                selected={activeChat === conv.id}
                                onClick={() => setActiveChat(conv.id)}
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                    borderBottom: '1px solid #F0F2F5'
                                }}
                            >
                                <ListItemAvatar>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={conv.online ? (
                                            <CircleOnline
                                                color="success"
                                                sx={{ width: 14, height: 14, border: '2px solid white' }}
                                            />
                                        ) : null}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: 'primary.main',
                                                width: 50,
                                                height: 50,
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            {conv.name[0]}
                                        </Avatar>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography sx={{
                                            fontWeight: 500,
                                            color: conv.unread > 0 ? '#000000' : '#3B4A54',
                                            fontSize: '1rem'
                                        }}>
                                            {conv.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography sx={{
                                            fontSize: '0.85rem',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: conv.unread > 0 ? '#000000' : '#667781'
                                        }}>
                                            {conv.lastMsg}
                                        </Typography>
                                    }
                                    sx={{ my: 0 }}
                                />
                                <Box sx={{
                                    textAlign: 'right',
                                    minWidth: 60,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end'
                                }}>
                                    <Typography variant="caption" sx={{
                                        color: '#667781',
                                        fontSize: '0.75rem'
                                    }}>
                                        {conv.time}
                                    </Typography>
                                    {conv.unread > 0 && (
                                        <Badge
                                            badgeContent={conv.unread}
                                            color="primary"
                                            sx={{
                                                mt: 0.5,
                                                '& .MuiBadge-badge': {
                                                    right: -5,
                                                    top: 2,
                                                    backgroundColor: '#25D366'
                                                }
                                            }}
                                        />
                                    )}
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Paper>

                {/* Main Chat Area */}
                {activeChat ? (
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: '#ECE5DD',
                        backgroundImage: 'url(https://www.transparenttextures.com/patterns/axiom-pattern.png)',
                        backgroundBlendMode: 'soft-light'
                    }}>
                        <AppBar position="static" elevation={0}>
                            <Toolbar sx={{
                                bgcolor: '#F0F2F5',
                                px: 2,
                                borderBottom: '1px solid #E0E0E0'
                            }}>
                                {isMobile && (
                                    <IconButton onClick={() => setActiveChat(null)} sx={{ mr: 1 }}>
                                        <ArrowBack sx={{ color: '#54656F' }} />
                                    </IconButton>
                                )}
                                <Avatar sx={{
                                    bgcolor: 'primary.main',
                                    mr: 2,
                                    width: 40,
                                    height: 40
                                }}>
                                    {conversations.find(c => c.id === activeChat)?.name[0] || users.find(u => u.id === activeChat)?.name[0]}
                                </Avatar>
                                <ListItemText
                                    primary={
                                        <Typography sx={{
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            color: '#3B4A54'
                                        }}>
                                            {conversations.find(c => c.id === activeChat)?.name || users.find(u => u.id === activeChat)?.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography sx={{
                                            fontSize: '0.8rem',
                                            color: '#667781'
                                        }}>
                                            {conversations.find(c => c.id === activeChat)?.online || users.find(u => u.id === activeChat)?.online ?
                                                "En ligne" : "Hors ligne"}
                                        </Typography>
                                    }
                                />
                                <IconButton sx={{ mr: 1 }}>
                                    <Call sx={{ color: '#54656F', fontSize: 22 }} />
                                </IconButton>
                                <IconButton sx={{ mr: 1 }}>
                                    <People sx={{ color: '#54656F', fontSize: 22 }} />
                                </IconButton>
                                <Select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    size="small"
                                    sx={{
                                        color: '#54656F',
                                        '.MuiSvgIcon-root': { color: '#54656F' },
                                        '& .MuiSelect-select': { py: 0.5, px: 1 },
                                        ml: 1
                                    }}
                                >
                                    <MenuItem value="fr">FR</MenuItem>
                                    <MenuItem value="en">EN</MenuItem>
                                    <MenuItem value="es">ES</MenuItem>
                                    <MenuItem value="de">DE</MenuItem>
                                </Select>
                            </Toolbar>
                        </AppBar>

                        {/* Messages */}
                        <Box sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            '&::-webkit-scrollbar': {
                                width: '6px'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#C5C5C5',
                                borderRadius: '3px'
                            }
                        }}>
                            {(messages[activeChat] || []).map((msg) => (
                                <Box
                                    key={msg.id}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                                        mb: 2,
                                        maxWidth: '85%',
                                        alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    <Paper sx={{
                                        p: '8px 12px',
                                        bgcolor: msg.sender === 'me' ? '#DCF8C6' : 'background.paper',
                                        color: 'text.primary',
                                        borderRadius: msg.sender === 'me' ?
                                            '7.5px 0 7.5px 7.5px' : '0 7.5px 7.5px 7.5px',
                                        boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                                        position: 'relative'
                                    }}>
                                        <Typography variant="body1" sx={{
                                            fontSize: '0.95rem',
                                            lineHeight: 1.4
                                        }}>
                                            {language !== 'fr' && msg.translated ? msg.translated : msg.text}
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            mt: 0.5,
                                            alignItems: 'center'
                                        }}>
                                            <Typography variant="caption" sx={{
                                                fontSize: '0.7rem',
                                                color: msg.sender === 'me' ? '#3B4A54' : '#667781'
                                            }}>
                                                {msg.time}
                                            </Typography>
                                            {msg.sender === 'me' && (
                                                <CheckCircle
                                                    fontSize="small"
                                                    sx={{
                                                        ml: 0.5,
                                                        color: '#3B4A54',
                                                        fontSize: '0.9rem'
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Paper>
                                </Box>
                            ))}
                        </Box>

                        {/* Message Input */}
                        <Paper sx={{
                            p: '8px 16px',
                            bgcolor: 'background.paper',
                            borderTop: '1px solid #E0E0E0',
                            borderRadius: 0
                        }}>
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                                bgcolor: '#F0F2F5',
                                borderRadius: 20,
                                px: 1.5,
                                py: 0.5
                            }}>
                                <IconButton size="small">
                                    <EmojiEmotions sx={{ color: '#54656F' }} />
                                </IconButton>
                                <IconButton size="small">
                                    <AttachFile sx={{
                                        color: '#54656F',
                                        transform: 'rotate(45deg)'
                                    }} />
                                </IconButton>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Écrire un message..."
                                    variant="standard"
                                    size="small"
                                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            fontSize: '0.95rem',
                                            py: 0.5
                                        }
                                    }}
                                />
                                <IconButton
                                    color="primary"
                                    onClick={handleSend}
                                    disabled={!message.trim()}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        '&:hover': { bgcolor: '#0C7D6F' },
                                        width: 36,
                                        height: 36
                                    }}
                                >
                                    <Send sx={{ fontSize: 20 }} />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Box>
                ) : (
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#F8F9FA',
                        borderLeft: '1px solid #E0E0E0'
                    }}>
                        <Box sx={{ textAlign: 'center', p: 4 }}>
                            <Box sx={{
                                width: 200,
                                height: 200,
                                borderRadius: '50%',
                                bgcolor: '#E0F0E7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3
                            }}>
                                <Chat sx={{
                                    color: '#128C7E',
                                    fontSize: 80,
                                    opacity: 0.3
                                }} />
                            </Box>
                            <Typography variant="h6" sx={{
                                color: '#3B4A54',
                                fontWeight: 300,
                                mb: 1
                            }}>
                                Bienvenue sur E-Tafa
                            </Typography>
                            <Typography variant="body1" sx={{
                                color: '#667781',
                                maxWidth: 400,
                                mb: 3
                            }}>
                                Sélectionnez une conversation pour commencer à discuter ou créez une nouvelle conversation
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: 'primary.main',
                                    borderRadius: 20,
                                    px: 4,
                                    py: 1,
                                    textTransform: 'none',
                                    '&:hover': {
                                        bgcolor: '#0C7D6F'
                                    }
                                }}
                            >
                                Démarrer une discussion
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default ChatPage;