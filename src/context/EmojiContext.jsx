import { createContext, useState, useEffect } from 'react';
import { emojiCombos } from '../data/emojiCombos';
import { trackEmojiSelect } from '../services/analytics';


// 创建上下文
export const EmojiContext = createContext();

/**
 * EmojiProvider组件
 * 管理所有与emoji和emoji组合相关的状态和操作
 */
export function EmojiProvider({ children }) {
  // 状态定义
  const [recentEmojis, setRecentEmojis] = useState([]);
  const [favoritesCombos, setFavoritesCombos] = useState([]);
  const [customCombos, setCustomCombos] = useState([]);
  const [copied, setCopied] = useState(null);
  
  // 从localStorage初始化数据
  useEffect(() => {
    try {
      const loadData = (key, setter) => {
        const savedData = localStorage.getItem(key);
        if (savedData) {
          setter(JSON.parse(savedData));
        }
      };
      
      loadData('recentEmojis', setRecentEmojis);
      loadData('favoritesCombos', setFavoritesCombos);
      loadData('customCombos', setCustomCombos);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);
  
  /**
   * 处理选择emoji事件
   * @param {Object} emoji - emoji对象
   */
  const handleEmojiSelect = (emoji) => {
    // 复制emoji到剪贴板
    navigator.clipboard.writeText(emoji.native)
      .catch(err => console.error('复制失败:', err));
    
    // 更新"最近使用"列表
    const updated = [emoji, ...recentEmojis.filter(e => e.id !== emoji.id)].slice(0, 20);
    setRecentEmojis(updated);
    localStorage.setItem('recentEmojis', JSON.stringify(updated));
    trackEmojiSelect(emoji);
    // 显示复制成功提示
    showCopiedToast(emoji.native);
  };
  
  /**
   * 处理复制emoji组合事件
   * @param {Object} combo - 组合对象
   */
  const handleComboClick = (combo) => {
    // 复制组合到剪贴板
    navigator.clipboard.writeText(combo.combo)
      .catch(err => console.error('复制失败:', err));
    trackEmojiSelect(combo);
    // 显示复制成功提示
    showCopiedToast(combo.combo);
  };
  
  /**
   * 切换emoji组合收藏状态
   * @param {Object} combo - 组合对象
   */
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
  
  /**
   * 检查组合是否已收藏
   * @param {number|string} id - 组合ID
   * @returns {boolean} 是否收藏
   */
  const isComboFavorite = (id) => {
    return favoritesCombos.some(fav => fav.id === id);
  };
  
  /**
   * 保存自定义emoji组合
   * @param {Object} newCombo - 新创建的组合对象
   */
  const saveCustomCombo = (newCombo) => {
    const updated = [...customCombos, newCombo];
    setCustomCombos(updated);
    localStorage.setItem('customCombos', JSON.stringify(updated));
  };
  
  /**
   * 显示复制成功提示
   * @param {string} text - 已复制的文本
   */
  const showCopiedToast = (text) => {
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };
  
  /**
   * 获取所有emoji组合（预设+自定义）
   * @returns {Array} 所有emoji组合
   */
  const getAllCombos = () => {
    return [...emojiCombos, ...customCombos];
  };
  
  // 创建上下文值对象
  const contextValue = { 
    recentEmojis, 
    favoritesCombos, 
    customCombos,
    copied,
    handleEmojiSelect, 
    handleComboClick, 
    toggleFavorite, 
    isComboFavorite,
    saveCustomCombo,
    getAllCombos
  };
  
  return (
    <EmojiContext.Provider value={contextValue}>
      {children}
    </EmojiContext.Provider>
  );
}