import { useState } from 'react';
import '../styles/ComboCreator.css';

function ComboCreator({ onSaveCombo, onClose }) {
  const [customCombo, setCustomCombo] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [category, setCategory] = useState('custom');

  const categories = [
    { id: "custom", name: "自定义" },
    { id: "aesthetic", name: "美学风格" },
    { id: "love", name: "爱心组合" },
    { id: "space", name: "宇宙空间" },
    { id: "music", name: "音乐主题" },
    { id: "movie", name: "电影主题" },
    { id: "funny", name: "搞笑表情" },
  ];

  const specialChars = [
    "★", "☆", "✧", "✩", "✪", "✫", "✬", "✭", "✮", "✯",
    "♡", "♥", "❤", "🫶", "💕", "💖", "💓", "💗", "💘", "💝",
    "✿", "❀", "❁", "❃", "❋", "✾", "✽", "✼", "✻", "✺",
    "⋆", "⋆｡˚", "✦", "°✩", "˖⁺", "⊹", "୨୧", "✧˖°", "˚ ༘ ೀ⋆｡˚",
    "•", "◦", "◉", "◌", "◍", "◎", "●", "◐", "◑", "◒",
    "⌒", "｡", "°", "○", "◇", "◆", "□", "■", "△", "▲",
    "▽", "▼", "◁", "◀", "▷", "▶", "♤", "♠", "♧", "♣",
    "♢", "♦", "♔", "♕", "♚", "♛", "✰", "✴", "✳", "✶",
    "༄", "༅", "༆", "༊", "༺", "༻", "༼", "༽", "ლ", "ヾ",
    "⸝⸝", "⊹", "♪", "♫", "♬", "𓆉", "𓆏", "𓃠", "𓆙", "𓍊",
  ];

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddChar = (char) => {
    setCustomCombo(prev => prev + char);
  };

  const handleSave = () => {
    if (customCombo.trim()) {
      const newCombo = {
        id: Date.now(),
        combo: customCombo,
        category: category,
        tags: tags
      };
      onSaveCombo(newCombo);
      onClose();
    }
  };

  return (
    <div className="combo-creator">
      <h2>创建自定义Emoji组合</h2>
      
      <div className="creator-section">
        <label>你的Emoji组合:</label>
        <div className="combo-preview">
          {customCombo || "在这里显示你的组合"}
        </div>
        <textarea
          value={customCombo}
          onChange={(e) => setCustomCombo(e.target.value)}
          placeholder="在这里输入或粘贴你的emoji组合..."
          rows="3"
        />
      </div>
      
      <div className="creator-section">
        <label>特殊字符:</label>
        <div className="special-chars">
          {specialChars.map((char, index) => (
            <button 
              key={index} 
              onClick={() => handleAddChar(char)}
              className="char-button"
            >
              {char}
            </button>
          ))}
        </div>
      </div>
      
      <div className="creator-section">
        <label>分类:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="creator-section">
        <label>标签:</label>
        <div className="tags-input">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            placeholder="添加标签..."
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
          />
          <button onClick={addTag} className="add-tag-btn">添加</button>
        </div>
        
        <div className="tags-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
              <button onClick={() => removeTag(tag)} className="remove-tag">×</button>
            </span>
          ))}
        </div>
      </div>
      
      <div className="creator-actions">
        <button onClick={onClose} className="cancel-btn">取消</button>
        <button 
          onClick={handleSave} 
          className="save-btn"
          disabled={!customCombo.trim()}
        >
          保存组合
        </button>
      </div>
    </div>
  );
}

export default ComboCreator;