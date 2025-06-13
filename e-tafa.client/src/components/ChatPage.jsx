/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    AppBar, Toolbar, IconButton, TextField,
    List, ListItem, ListItemAvatar, Avatar,
    ListItemText, Badge, Box, Button,
    Select, MenuItem, InputAdornment, Paper,
    useMediaQuery, ThemeProvider, createTheme,
    Typography, Drawer, useTheme, Divider
} from '@mui/material';
import {
    Search, Send, Language, ArrowBack,
    Circle as CircleOnline, CheckCircle,
    Chat, People, Call, Settings,
    MoreVert, EmojiEmotions, AttachFile,
    Menu as MenuIcon, Logout
} from '@mui/icons-material';

// WhatsApp-inspired theme
const theme = createTheme({
    palette: {
        primary: { main: '#128C7E' },
        secondary: { main: '#25D366' },
        background: {
            default: '#F0F2F5',
            paper: '#FFFFFF'
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
                    backgroundColor: '#F0F2F5', // Même couleur que le sidebar
                    color: '#3B4A54', // Texte foncé pour contraste
                    boxShadow: 'none',
                    borderBottom: '1px solid #E0E0E0' // Ligne de séparation
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: 'none'
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
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: '70px',
                    backgroundColor: '#F0F2F5',
                    borderRight: '1px solid #E0E0E0'
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
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(muiTheme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(muiTheme.breakpoints.up('md'));

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
            setMessage('');
        }
    };

    // Sidebar icons component
    const SidebarIcons = () => (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '16px',
            height: '100%'
        }}>
            <Box>
                {[
                    { tab: 'chats', icon: Chat, badge: 5 },
                    { tab: 'contacts', icon: People },
                    { tab: 'calls', icon: Call }
                ].map(({ tab, icon: Icon, badge }) => (
                    <IconButton
                        key={tab}
                        sx={{
                            marginBottom: '24px',
                            backgroundColor: activeTab === tab ? '#E0F0E7' : 'transparent',
                            borderRadius: '50%',
                            '&:hover': {
                                backgroundColor: activeTab === tab ? '#E0F0E7' : '#E5E5E5'
                            }
                        }}
                        onClick={() => {
                            setActiveTab(tab);
                            setDrawerOpen(false);
                        }}
                    >
                        {badge ? (
                            <Badge badgeContent={badge} color="primary">
                                <Icon sx={{ color: activeTab === tab ? '#128C7E' : '#54656F', fontSize: 26 }} />
                            </Badge>
                        ) : (
                            <Icon sx={{ color: activeTab === tab ? '#128C7E' : '#54656F', fontSize: 26 }} />
                        )}
                    </IconButton>
                ))}
            </Box>

            <Box sx={{ marginBottom: '16px' }}>
                <IconButton
                    sx={{
                        backgroundColor: activeTab === 'settings' ? '#E0F0E7' : 'transparent',
                        borderRadius: '50%',
                        '&:hover': {
                            backgroundColor: activeTab === 'settings' ? '#E0F0E7' : '#E5E5E5'
                        }
                    }}
                    onClick={() => {
                        setActiveTab('settings');
                        setDrawerOpen(false);
                    }}
                >
                    <Settings sx={{ color: activeTab === 'settings' ? '#128C7E' : '#54656F', fontSize: 26 }} />
                </IconButton>
            </Box>
        </Box>
    );

    // Render different content based on active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'contacts':
                return (
                    <List sx={{
                        overflowY: 'auto',
                        flex: 1,
                        backgroundColor: 'background.paper',
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#C5C5C5', borderRadius: '3px' }
                    }}>
                        {filteredUsers.map((user) => (
                            <ListItem
                                button
                                key={user.id}
                                onClick={() => setActiveChat(user.id)}
                                sx={{
                                    paddingTop: '8px',
                                    paddingBottom: '8px',
                                    paddingLeft: { xs: '8px', sm: '16px' },
                                    paddingRight: { xs: '8px', sm: '16px' },
                                    borderLeft: activeChat === user.id ? '3px solid #128C7E' : 'none',
                                    backgroundColor: activeChat === user.id ? '#F5F5F5' : 'inherit',
                                    paddingLeft: activeChat === user.id ? '13px' : '16px'
                                }}
                            >
                                <ListItemAvatar>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={user.online && (
                                            <CircleOnline sx={{
                                                width: { xs: '10px', sm: '12px' },
                                                height: { xs: '10px', sm: '12px' },
                                                border: '2px solid white'
                                            }} color="success" />
                                        )}
                                    >
                                        <Avatar sx={{
                                            backgroundColor: 'primary.main',
                                            width: { xs: '40px', sm: '45px' },
                                            height: { xs: '40px', sm: '45px' }
                                        }}>
                                            {user.name[0]}
                                        </Avatar>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography sx={{
                                            fontWeight: 500,
                                            fontSize: { xs: '0.9rem', sm: '0.95rem' },
                                            color: '#3B4A54',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {user.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography sx={{
                                            fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {user.online ? "En ligne" : "Hors ligne"}
                                        </Typography>
                                    }
                                    sx={{ margin: 0, paddingRight: '8px' }}
                                />
                            </ListItem>
                        ))}
                    </List>
                );

            case 'calls':
                return (
                    <List sx={{
                        overflowY: 'auto',
                        flex: 1,
                        backgroundColor: 'background.paper',
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#C5C5C5', borderRadius: '3px' }
                    }}>
                        {conversations.map((conv) => (
                            <ListItem
                                button
                                key={conv.id}
                                sx={{
                                    paddingTop: '8px',
                                    paddingBottom: '8px',
                                    paddingLeft: { xs: '8px', sm: '16px' },
                                    paddingRight: { xs: '8px', sm: '16px' }
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{
                                        backgroundColor: 'primary.main',
                                        width: { xs: '40px', sm: '45px' },
                                        height: { xs: '40px', sm: '45px' }
                                    }}>
                                        {conv.name[0]}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography sx={{
                                            fontWeight: 500,
                                            fontSize: { xs: '0.9rem', sm: '0.95rem' },
                                            color: '#3B4A54',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {conv.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography sx={{
                                            fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            Dernier appel: {conv.time}
                                        </Typography>
                                    }
                                    sx={{ margin: 0, paddingRight: '8px' }}
                                />
                                <Box sx={{
                                    minWidth: { xs: '40px', sm: '50px' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    flexShrink: 0
                                }}>
                                    <IconButton size="small" sx={{ color: '#128C7E' }}>
                                        <Call fontSize="small" />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                );

            case 'settings':
                return (
                    <Box sx={{
                        overflowY: 'auto',
                        flex: 1,
                        backgroundColor: 'background.paper',
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#C5C5C5', borderRadius: '3px' }
                    }}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Paramètres"
                                    primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                                />
                            </ListItem>
                            <Divider />

                            <ListItem button>
                                <ListItemText primary="Notifications" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Confidentialité" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Compte" />
                            </ListItem>
                            <Divider />

                            <ListItem button onClick={() => alert('Déconnexion effectuée')}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: '#f5f5f5' }}>
                                        <Logout sx={{ color: '#f44336' }} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Se déconnecter"
                                    primaryTypographyProps={{ color: '#f44336' }}
                                />
                            </ListItem>
                        </List>
                    </Box>
                );

            default: // 'chats'
                return (
                    <List sx={{
                        overflowY: 'auto',
                        flex: 1,
                        backgroundColor: 'background.paper',
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#C5C5C5', borderRadius: '3px' }
                    }}>
                        {filteredConversations.map((conv) => (
                            <ListItem
                                button
                                key={conv.id}
                                selected={activeChat === conv.id}
                                onClick={() => setActiveChat(conv.id)}
                                sx={{
                                    paddingTop: '8px',
                                    paddingBottom: '8px',
                                    paddingLeft: { xs: '8px', sm: '16px' },
                                    paddingRight: { xs: '8px', sm: '16px' },
                                    borderLeft: activeChat === conv.id ? '3px solid #128C7E' : 'none',
                                    backgroundColor: activeChat === conv.id ? '#F5F5F5' : 'inherit',
                                    paddingLeft: activeChat === conv.id ? '13px' : '16px'
                                }}
                            >
                                <ListItemAvatar>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={conv.online && (
                                            <CircleOnline sx={{
                                                width: { xs: '10px', sm: '12px' },
                                                height: { xs: '10px', sm: '12px' },
                                                border: '2px solid white'
                                            }} color="success" />
                                        )}
                                    >
                                        <Avatar sx={{
                                            backgroundColor: 'primary.main',
                                            width: { xs: '40px', sm: '45px' },
                                            height: { xs: '40px', sm: '45px' }
                                        }}>
                                            {conv.name[0]}
                                        </Avatar>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography sx={{
                                            fontWeight: 500,
                                            fontSize: { xs: '0.9rem', sm: '0.95rem' },
                                            color: conv.unread > 0 ? '#000000' : '#3B4A54',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {conv.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography sx={{
                                            fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {conv.lastMsg}
                                        </Typography>
                                    }
                                    sx={{ margin: 0, paddingRight: '8px' }}
                                />
                                <Box sx={{
                                    minWidth: { xs: '40px', sm: '50px' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    flexShrink: 0
                                }}>
                                    <Typography variant="caption" sx={{
                                        fontSize: { xs: '0.65rem', sm: '0.75rem' }
                                    }}>
                                        {conv.time}
                                    </Typography>
                                    {conv.unread > 0 && (
                                        <Badge
                                            badgeContent={conv.unread}
                                            sx={{
                                                marginTop: '4px',
                                                '& .MuiBadge-badge': { backgroundColor: '#25D366' }
                                            }}
                                        />
                                    )}
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                height: '100vh',
                width: '100%',
                backgroundColor: 'background.default',
                overflowX: 'hidden'
            }}>
                {/* Mobile Drawer for Sidebar */}
                {(isMobile || isTablet) && (
                    <Drawer
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        variant="temporary"
                    >
                        <SidebarIcons />
                    </Drawer>
                )}

                {/* Permanent Sidebar for Desktop */}
                {isLargeScreen && (
                    <Box sx={{
                        width: '70px',
                        flexShrink: 0,
                        backgroundColor: '#F0F2F5',
                        borderRight: '1px solid #E0E0E0'
                    }}>
                        <SidebarIcons />
                    </Box>
                )}

                {/* Conversation List */}
                <Paper sx={{
                    width: {
                        xs: activeChat ? '0' : '100%',
                        sm: activeChat ? '0' : '320px',
                        md: '360px'
                    },
                    display: {
                        xs: activeChat ? 'none' : 'flex',
                        sm: activeChat ? 'none' : 'flex',
                        md: 'flex'
                    },
                    flexDirection: 'column',
                    transition: 'width 0.3s',
                    overflow: 'hidden',
                    flexShrink: 0,
                    borderRight: isLargeScreen ? '1px solid #E0E0E0' : 'none'
                }}>
                    <AppBar position="static">
                        <Toolbar sx={{
                            paddingLeft: { xs: '8px', sm: '16px' },
                            paddingRight: { xs: '8px', sm: '16px' },
                            minHeight: { xs: '48px', sm: '56px' }
                        }}>
                            {(isMobile || isTablet) && (
                                <IconButton onClick={() => setDrawerOpen(true)} sx={{ marginRight: '8px', color: 'text.primary' }}>
                                    <MenuIcon />
                                </IconButton>
                            )}
                            <Avatar sx={{
                                backgroundColor: 'secondary.main',
                                marginRight: '16px',
                                width: { xs: '32px', sm: '36px' },
                                height: { xs: '32px', sm: '36px' }
                            }} src="/profile.jpg" />
                            <Typography variant="h6" sx={{
                                flexGrow: 1,
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                color: 'text.primary'
                            }}>
                                E-Tafa
                            </Typography>
                            <IconButton>
                                <MoreVert sx={{ color: 'text.primary' }} />
                            </IconButton>
                        </Toolbar>
                        <Box sx={{
                            padding: { xs: '8px', sm: '16px' },
                            backgroundColor: 'background.paper'
                        }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Rechercher..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search sx={{ color: '#667781' }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        backgroundColor: '#F0F2F5',
                                        borderRadius: '20px',
                                        height: '36px',
                                        fontSize: '0.9rem',
                                        paddingRight: '8px'
                                    }
                                }}
                            />
                        </Box>
                    </AppBar>

                    {renderTabContent()}
                </Paper>

                {/* Main Chat Area */}
                <Box sx={{
                    flex: 1,
                    display: {
                        xs: activeChat ? 'flex' : 'none',
                        sm: activeChat ? 'flex' : 'none',
                        md: 'flex'
                    },
                    flexDirection: 'column',
                    backgroundColor: '#ECE5DD',
                    backgroundImage: 'url(https://www.transparenttextures.com/patterns/axiom-pattern.png)',
                    backgroundBlendMode: 'soft-light',
                    width: {
                        xs: activeChat ? '100%' : '0',
                        sm: activeChat ? '100%' : '0',
                        md: '100%'
                    },
                    transition: 'width 0.3s',
                    overflowX: 'hidden'
                }}>
                    {activeChat ? (
                        <>
                            <AppBar position="static">
                                <Toolbar sx={{
                                    paddingLeft: { xs: '8px', sm: '16px' },
                                    paddingRight: { xs: '8px', sm: '16px' },
                                    minHeight: { xs: '48px', sm: '56px' }
                                }}>
                                    {(isMobile || isTablet) && (
                                        <IconButton onClick={() => setActiveChat(null)} sx={{ marginRight: '8px', color: 'text.primary' }}>
                                            <ArrowBack />
                                        </IconButton>
                                    )}
                                    <Avatar sx={{
                                        backgroundColor: 'secondary.main',
                                        marginRight: '16px',
                                        width: { xs: '32px', sm: '36px' },
                                        height: { xs: '32px', sm: '36px' }
                                    }}>
                                        {conversations.find(c => c.id === activeChat)?.name[0] || users.find(u => u.id === activeChat)?.name[0]}
                                    </Avatar>
                                    <ListItemText
                                        primary={
                                            <Typography sx={{
                                                fontWeight: 600,
                                                fontSize: { xs: '0.9rem', sm: '0.95rem' },
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                color: 'text.primary'
                                            }}>
                                                {conversations.find(c => c.id === activeChat)?.name || users.find(u => u.id === activeChat)?.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography sx={{
                                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                color: 'text.secondary'
                                            }}>
                                                {conversations.find(c => c.id === activeChat)?.online || users.find(u => u.id === activeChat)?.online ?
                                                    "En ligne" : "Hors ligne"}
                                            </Typography>
                                        }
                                        sx={{ flex: '1 1 auto', minWidth: 0 }}
                                    />
                                    <Box sx={{
                                        display: 'flex',
                                        gap: { xs: '4px', sm: '8px' },
                                        flexShrink: 0
                                    }}>
                                        <IconButton size="small">
                                            <People sx={{ color: 'text.primary', fontSize: { xs: '20px', sm: '22px' } }} />
                                        </IconButton>
                                        <Select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            size="small"
                                            sx={{
                                                color: 'text.primary',
                                                '.MuiSvgIcon-root': { color: 'text.primary' },
                                                '& .MuiSelect-select': {
                                                    paddingTop: '4px',
                                                    paddingBottom: '4px',
                                                    paddingLeft: '8px',
                                                    paddingRight: '24px',
                                                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                                                }
                                            }}
                                        >
                                            <MenuItem value="fr">FR</MenuItem>
                                            <MenuItem value="en">EN</MenuItem>
                                            <MenuItem value="es">ES</MenuItem>
                                            <MenuItem value="de">DE</MenuItem>
                                        </Select>
                                        <IconButton
                                            size="small"
                                            onClick={() => setSettingsOpen(true)}
                                        >
                                            <Settings sx={{ color: 'text.primary', fontSize: { xs: '20px', sm: '22px' } }} />
                                        </IconButton>
                                    </Box>
                                </Toolbar>
                            </AppBar>

                            {/* Messages */}
                            <Box sx={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: { xs: '8px', sm: '16px' },
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                '&::-webkit-scrollbar': { width: '6px' },
                                '&::-webkit-scrollbar-thumb': { backgroundColor: '#C5C5C5', borderRadius: '3px' },
                                overflowX: 'hidden'
                            }}>
                                {(messages[activeChat] || []).map((msg) => (
                                    <Box
                                        key={msg.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                                            marginBottom: '8px',
                                            maxWidth: { xs: '80%', sm: '70%' },
                                            width: 'fit-content'
                                        }}
                                    >
                                        <Paper sx={{
                                            padding: { xs: '6px 10px', sm: '8px 12px' },
                                            backgroundColor: msg.sender === 'me' ? '#DCF8C6' : 'background.paper',
                                            borderRadius: msg.sender === 'me' ? '7.5px 0 7.5px 7.5px' : '0 7.5px 7.5px 7.5px',
                                            boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                                            maxWidth: '100%',
                                            wordBreak: 'break-word'
                                        }}>
                                            <Typography sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                lineHeight: 1.4
                                            }}>
                                                {language !== 'fr' && msg.translated ? msg.translated : msg.text}
                                            </Typography>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                marginTop: '4px',
                                                alignItems: 'center'
                                            }}>
                                                <Typography variant="caption" sx={{
                                                    fontSize: { xs: '0.65rem', sm: '0.7rem' }
                                                }}>
                                                    {msg.time}
                                                </Typography>
                                                {msg.sender === 'me' && (
                                                    <CheckCircle sx={{
                                                        marginLeft: '4px',
                                                        color: '#3B4A54',
                                                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                                                    }} />
                                                )}
                                            </Box>
                                        </Paper>
                                    </Box>
                                ))}
                            </Box>

                            {/* Message Input */}
                            <Paper sx={{
                                padding: { xs: '8px', sm: '16px' },
                                backgroundColor: 'background.paper',
                                borderTop: '1px solid #E0E0E0',
                                overflowX: 'hidden'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    gap: { xs: '4px', sm: '8px' },
                                    alignItems: 'center',
                                    backgroundColor: '#F0F2F5',
                                    borderRadius: '20px',
                                    padding: { xs: '4px 8px', sm: '4px 8px' },
                                    maxWidth: '100%'
                                }}>
                                    <IconButton size="small">
                                        <EmojiEmotions sx={{ color: '#54656F', fontSize: { xs: '20px', sm: '22px' } }} />
                                    </IconButton>
                                    <IconButton size="small">
                                        <AttachFile sx={{
                                            color: '#54656F',
                                            transform: 'rotate(45deg)',
                                            fontSize: { xs: '20px', sm: '22px' }
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
                                        InputProps={{
                                            disableUnderline: true,
                                            sx: {
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                padding: '4px',
                                                paddingRight: '8px'
                                            }
                                        }}
                                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                                        sx={{ flex: '1 1 auto' }}
                                    />
                                    <IconButton
                                        color="primary"
                                        onClick={handleSend}
                                        disabled={!message.trim()}
                                        sx={{
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            '&:hover': { backgroundColor: '#0C7D6F' },
                                            width: { xs: '32px', sm: '36px' },
                                            height: { xs: '32px', sm: '36px' }
                                        }}
                                    >
                                        <Send sx={{ fontSize: { xs: '18px', sm: '20px' } }} />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </>
                    ) : (
                        <Box sx={{
                            flex: 1,
                            display: { xs: 'none', sm: 'none', md: 'flex' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            overflowX: 'hidden'
                        }}>
                            <Box sx={{
                                textAlign: 'center',
                                padding: { xs: '16px', sm: '32px' }
                            }}>
                                <Box sx={{
                                    width: { xs: '120px', sm: '150px', md: '200px' },
                                    height: { xs: '120px', sm: '150px', md: '200px' },
                                    borderRadius: '50%',
                                    backgroundColor: '#E0F0E7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginBottom: '24px'
                                }}>
                                    <Chat sx={{
                                        color: '#128C7E',
                                        fontSize: { xs: '50px', sm: '60px', md: '80px' },
                                        opacity: 0.3
                                    }} />
                                </Box>
                                <Typography variant="h6" sx={{
                                    color: '#3B4A54',
                                    fontWeight: 300,
                                    marginBottom: '8px',
                                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.5rem' }
                                }}>
                                    Bienvenue sur E-Tafa
                                </Typography>
                                <Typography variant="body1" sx={{
                                    color: '#667781',
                                    maxWidth: { xs: '300px', sm: '400px' },
                                    marginBottom: '24px',
                                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                                    marginLeft: 'auto',
                                    marginRight: 'auto'
                                }}>
                                    Sélectionnez une conversation pour commencer à discuter
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: '20px',
                                        paddingLeft: { xs: '24px', sm: '32px' },
                                        paddingRight: { xs: '24px', sm: '32px' },
                                        paddingTop: '8px',
                                        paddingBottom: '8px',
                                        textTransform: 'none',
                                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    Démarrer une discussion
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Settings Drawer */}
            <Drawer
                anchor="right"
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: isMobile ? '100%' : 320,
                        backgroundColor: 'background.paper'
                    }
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Paramètres
                    </Typography>

                    <List>
                        <ListItem button>
                            <ListItemText primary="Notifications" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Confidentialité" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Compte" />
                        </ListItem>
                        <Divider sx={{ my: 2 }} />

                        <ListItem button onClick={() => {
                            alert('Déconnexion effectuée');
                            setSettingsOpen(false);
                        }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#f5f5f5' }}>
                                    <Logout sx={{ color: '#f44336' }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Se déconnecter"
                                primaryTypographyProps={{ color: '#f44336' }}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </ThemeProvider>
    );
};

export default ChatPage;