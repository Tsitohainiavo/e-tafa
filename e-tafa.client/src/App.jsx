import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Identification from './components/Identification.jsx';
import ChatPage from './components/ChatPage.jsx';

function App() {
    return (
        <Router>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw'
            }}>
                <Routes>
                    <Route path='/' element={<Identification />} />
                    <Route path='/ChatPage' element={<ChatPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;