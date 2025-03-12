import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/Layout';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useEmoji } from '../hooks/useEmoji';  // 修改为hooks
import { useTheme } from '../hooks/useTheme';  // 添加引入useTheme
import RecentEmojis from '../components/RecentEmojis';

function EmojiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 1200
  );
  
  const { handleEmojiSelect } = useEmoji();
  const { darkMode } = useTheme();
  
  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1200);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 计算emoji-mart的每行表情数量，根据屏幕宽度调整
  const getPerLine = () => {
    if (window.innerWidth >= 1400) return 10;
    if (window.innerWidth >= 1200) return 9;
    if (window.innerWidth >= 992) return 8;
    if (window.innerWidth >= 768) return 7;
    return 6;
  };
  
  const pageTitle = `Emoji Finder - 查找和复制${searchTerm ? ` "${searchTerm}" 相关的` : ''}表情符号`;
  const pageDescription = `浏览、搜索和复制${searchTerm ? `关于 "${searchTerm}" 的` : ''}emoji表情符号。包含数千种emoji，一键复制使用。`;
  
  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {searchTerm && <meta name="keywords" content={`emoji, ${searchTerm}, 表情符号, emoji搜索`} />}
        <link rel="canonical" href="https://你的域名.com/emoji" />
      </Helmet>
      
      <section className="search-container" aria-label="搜索">
        <label htmlFor="search-input" className="visually-hidden">搜索Emoji</label>
        <input
          id="search-input"
          type="text"
          placeholder="搜索emoji..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-controls="emoji-results"
        />
      </section>
      
      <div className={isLargeScreen ? "emoji-page-layout" : ""} id="emoji-results" aria-live="polite">
        <div className="emoji-picker-wrapper">
          <h2 className="visually-hidden">Emoji选择器</h2>
          <div className="emoji-picker-container">
            <Picker 
              data={data} 
              onEmojiSelect={handleEmojiSelect} 
              searchTerm={searchTerm}
              theme={darkMode ? 'dark' : 'light'}  // 现在darkMode已定义
              previewPosition="none"
              skinTonePosition="none"
              navPosition="bottom"
              perLine={getPerLine()}
              emojiSize={isLargeScreen ? 28 : 24}
            />
          </div>
        </div>
        
        {isLargeScreen && <RecentEmojis />}
      </div>
      
      {!isLargeScreen && <RecentEmojis />}
    </Layout>
  );
}

export default EmojiPage;