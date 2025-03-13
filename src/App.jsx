import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { EmojiProvider } from './context/EmojiContext';
import { LanguageProvider } from './context/LanguageContext';
import HomePage from './pages/HomePage';
import EmojiPage from './pages/EmojiPage';
import CombosPage from './pages/CombosPage';
import './App.css';

// 简单的加载组件
const Loading = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <EmojiProvider>
          {/* Suspense用于处理翻译加载 */}
          <Suspense fallback={<Loading />}>
            <LanguageProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/emoji" element={<EmojiPage />} />
                  <Route path="/combos" element={<CombosPage />} />
                  <Route path="/combos/:category" element={<CombosPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Router>
            </LanguageProvider>
          </Suspense>
        </EmojiProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;