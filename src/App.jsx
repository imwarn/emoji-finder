import { useState, useEffect } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentEmojis, setRecentEmojis] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(null);

  // 从localStorage加载最近使用的emoji
  useEffect(() => {
    const saved = localStorage.getItem('recentEmojis');
    if (saved) {
      setRecentEmojis(JSON.parse(saved));
    }
  }, []);

  // 检测系统颜色模式
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const handleEmojiSelect = (emoji) => {
    // 复制emoji到剪贴板
    navigator.clipboard.writeText(emoji.native);
    
    // 更新"最近使用"列表
    const updated = [emoji, ...recentEmojis.filter(e => e.id !== emoji.id)].slice(0, 20);
    setRecentEmojis(updated);
    localStorage.setItem('recentEmojis', JSON.stringify(updated));
    
    // 显示复制成功提示
    setCopied(emoji.native);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <header>
        <h1>Emoji Finder</h1>
        <button onClick={toggleDarkMode} className="theme-toggle">
          {darkMode ? '🌞 亮色模式' : '🌙 暗色模式'}
        </button>
      </header>

      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="搜索emoji..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="emoji-container">
          <Picker 
            data={data} 
            onEmojiSelect={handleEmojiSelect} 
            searchTerm={searchTerm}
            theme={darkMode ? 'dark' : 'light'}
            previewPosition="none"
            skinTonePosition="none"
            navPosition="bottom"
          />
        </div>

        {recentEmojis.length > 0 && (
          <div className="recent-container">
            <h3>最近使用</h3>
            <div className="recent-emojis">
              {recentEmojis.map(emoji => (
                <button 
                  key={emoji.id} 
                  onClick={() => handleEmojiSelect(emoji)}
                  className="emoji-button"
                >
                  {emoji.native}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {copied && (
        <div className="toast">
          <span>{copied}</span> 已复制到剪贴板
        </div>
      )}

      <footer>
        <p>点击emoji即可复制 • 使用emoji-mart构建</p>
      </footer>
    </div>
  );
}

export default App;