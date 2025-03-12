import { useState, useEffect, useRef } from 'react';
import ComboCreator from './components/ComboCreator';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { emojiCombos, categories } from './data/emojiCombos';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('emoji'); // 'emoji' or 'combos'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCombos, setFilteredCombos] = useState([]);
  const [recentEmojis, setRecentEmojis] = useState([]);
  const [favoritesCombos, setFavoritesCombos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(null);
  const [showCreator, setShowCreator] = useState(false);
  const [customCombos, setCustomCombos] = useState([]);
  const creatorRef = useRef(null);

  // 从localStorage加载数据
  useEffect(() => {
    const savedEmojis = localStorage.getItem('recentEmojis');
    if (savedEmojis) {
      setRecentEmojis(JSON.parse(savedEmojis));
    }

    const savedFavorites = localStorage.getItem('favoritesCombos');
    if (savedFavorites) {
      setFavoritesCombos(JSON.parse(savedFavorites));
    }

    // 检测系统颜色模式
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    const savedCustomCombos = localStorage.getItem('customCombos');
    if (savedCustomCombos) {
      setCustomCombos(JSON.parse(savedCustomCombos));
    }
  }, []);

  // 过滤emoji组合
  useEffect(() => {
    let results = [...emojiCombos, ...customCombos]; // 合并预设和自定义组合
    
    // 按分类过滤
    if (selectedCategory !== 'all') {
      results = results.filter(combo => combo.category === selectedCategory);
    }
    
    // 按搜索词过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(combo => 
        combo.combo.toLowerCase().includes(term) || 
        combo.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredCombos(results);
  }, [searchTerm, selectedCategory, customCombos]);

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

  const handleComboClick = (combo) => {
    // 复制组合到剪贴板
    navigator.clipboard.writeText(combo.combo);
    
    // 显示复制成功提示
    setCopied(combo.combo);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSaveCustomCombo = (newCombo) => {
    const updated = [...customCombos, newCombo];
    setCustomCombos(updated);
    localStorage.setItem('customCombos', JSON.stringify(updated));
  };

  // 点击外部关闭创建器
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (creatorRef.current && !creatorRef.current.contains(event.target)) {
        setShowCreator(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleFavorite = (combo) => {
    const exists = favoritesCombos.some(fav => fav.id === combo.id);
    
    let updated;
    if (exists) {
      updated = favoritesCombos.filter(fav => fav.id !== combo.id);
    } else {
      updated = [...favoritesCombos, combo];
    }
    
    setFavoritesCombos(updated);
    localStorage.setItem('favoritesCombos', JSON.stringify(updated));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const isComboFavorite = (id) => {
    return favoritesCombos.some(fav => fav.id === id);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <header>
        <h1>Emoji Finder</h1>
        <button onClick={toggleDarkMode} className="theme-toggle">
          {darkMode ? '🌞 亮色模式' : '🌙 暗色模式'}
        </button>
      </header>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'emoji' ? 'active' : ''}`}
          onClick={() => setActiveTab('emoji')}
        >
          😀 单个Emoji
        </button>
        <button 
          className={`tab ${activeTab === 'combos' ? 'active' : ''}`}
          onClick={() => setActiveTab('combos')}
        >
          ✨ Emoji组合
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder={activeTab === 'emoji' ? "搜索emoji..." : "搜索emoji组合..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {activeTab === 'emoji' ? (
        // Emoji选择器部分
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

          {recentEmojis.length > 0 && (
            <div className="recent-container">
              <h3>最近使用的Emoji</h3>
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
        </div>
      ) : (
        // Emoji组合部分
        <div className="combos-container">
          <div className="combos-header">
            <button className="create-combo-btn" onClick={() => setShowCreator(true)}>
              ✨ 创建新组合
            </button>
          </div>
          <div className="categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {favoritesCombos.length > 0 && selectedCategory === 'all' && (
            <div className="favorites-section">
              <h3>❤️ 我的收藏</h3>
              <div className="combos-list">
                {favoritesCombos.map(combo => (
                  <div key={combo.id} className="combo-item">
                    <div className="combo-text">{combo.combo}</div>
                    <div className="combo-actions">
                      <button 
                        className="combo-action copy" 
                        onClick={() => handleComboClick(combo)}
                      >
                        复制
                      </button>
                      <button 
                        className={`combo-action favorite ${isComboFavorite(combo.id) ? 'active' : ''}`} 
                        onClick={() => toggleFavorite(combo)}
                      >
                        {isComboFavorite(combo.id) ? '★' : '☆'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="combos-results">
            <h3>{categories.find(c => c.id === selectedCategory).name} ({filteredCombos.length})</h3>
            
            {filteredCombos.length > 0 ? (
              <div className="combos-list">
                {filteredCombos.map(combo => (
                  <div key={combo.id} className="combo-item">
                    <div className="combo-text">{combo.combo}</div>
                    <div className="combo-actions">
                      <button 
                        className="combo-action copy" 
                        onClick={() => handleComboClick(combo)}
                      >
                        复制
                      </button>
                      <button 
                        className={`combo-action favorite ${isComboFavorite(combo.id) ? 'active' : ''}`} 
                        onClick={() => toggleFavorite(combo)}
                      >
                        {isComboFavorite(combo.id) ? '★' : '☆'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                没有找到匹配的emoji组合 😢
              </div>
            )}
          </div>
        </div>
      )}

      {copied && (
        <div className="toast">
          <span>{copied.length > 10 ? copied.slice(0, 10) + '...' : copied}</span> 已复制到剪贴板
        </div>
      )}

      {showCreator && (
        <div className="creator-overlay">
          <div ref={creatorRef}>
            <ComboCreator 
              onSaveCombo={handleSaveCustomCombo} 
              onClose={() => setShowCreator(false)} 
            />
          </div>
        </div>
      )}

      <footer>
        <p>点击emoji或组合即可复制 • 基于emoji-mart和emojicombos.com的创意</p>
      </footer>
    </div>
  );
}

export default App;