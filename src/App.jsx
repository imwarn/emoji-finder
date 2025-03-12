import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { EmojiProvider } from './context/EmojiContext';
import HomePage from './pages/HomePage';
import EmojiPage from './pages/EmojiPage';
import CombosPage from './pages/CombosPage';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <EmojiProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/emoji" element={<EmojiPage />} />
              <Route path="/combos" element={<CombosPage />} />
              <Route path="/combos/:category" element={<CombosPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </EmojiProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;