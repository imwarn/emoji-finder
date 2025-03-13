import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/Layout';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useEmoji } from '../hooks/useEmoji';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import RecentEmojis from '../components/RecentEmojis';
// 导入本地化数据，但只使用需要的函数
import { getLocalizedEmojiKeywords } from '../data/emojiLocalization';

function EmojiPage() {
  // 只解构需要的t函数，不解构未使用的i18n
  const { t } = useTranslation(); 
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 1200
  );
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [emojiI18n, setEmojiI18n] = useState(null);
  
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
  
  // 加载emoji-mart国际化数据
  useEffect(() => {
    async function loadEmojiI18n() {
      try {
        // 将应用语言映射到emoji-mart语言
        const emojiMartLangMap = {
          'en': 'en',
          'zh': 'zh',
          'ja': 'ja',
          'ko': 'ko',
          'es': 'es',
        };
        
        const langCode = emojiMartLangMap[currentLanguage] || 'en';
        
        try {
          // 动态导入emoji-mart语言文件
          const response = await fetch(`/locales/emoji-mart/${langCode}.json`);
          if (response.ok) {
            const i18nData = await response.json();
            setEmojiI18n(i18nData);
            console.log(`已加载emoji-mart ${langCode}语言数据`);
          } else {
            // 如果找不到特定语言，回退到英语
            const fallbackResponse = await fetch(`/locales/emoji-mart/en.json`);
            const fallbackData = await fallbackResponse.json();
            setEmojiI18n(fallbackData);
            console.log(`无法加载emoji-mart ${langCode}语言数据，回退到英语`);
          }
        } catch (error) {
          console.error('加载emoji-mart国际化数据失败:', error);
          // 使用内联默认值（英语）
          setEmojiI18n({
            search: 'Search',
            notfound: 'No Emoji Found',
            categories: {
              search: 'Search Results',
              recent: 'Frequently Used',
              people: 'Smileys & People',
              nature: 'Animals & Nature',
              foods: 'Food & Drink',
              activity: 'Activity',
              places: 'Travel & Places',
              objects: 'Objects',
              symbols: 'Symbols',
              flags: 'Flags',
              custom: 'Custom',
            }
          });
        }
      } catch (error) {
        console.error('处理emoji-mart国际化数据时出错:', error);
      }
    }
    
    loadEmojiI18n();
  }, [currentLanguage]);
  
  // 计算emoji-mart的每行表情数量
  const getPerLine = () => {
    if (window.innerWidth >= 1400) return 10;
    if (window.innerWidth >= 1200) return 9;
    if (window.innerWidth >= 992) return 8;
    if (window.innerWidth >= 768) return 7;
    return 6;
  };
  
  // 根据当前语言获取emoji的本地化名称 - 在组件内实现而不是导入
  const getLocalizedEmojiName = (emoji) => {
    // 尝试从emoji-mart数据中获取当前语言的名称
    if (!emoji) return '';
    
    // 如果emoji有针对当前语言的本地化名称，则使用它
    if (emoji.localized && emoji.localized[currentLanguage]) {
      return emoji.localized[currentLanguage];
    }
    
    // 回退到英语名称
    return emoji.name || '';
  };
  
  // 当搜索词变化时，过滤表情符号
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setIsSearching(false);
      setFilteredEmojis([]);
      return;
    }
    
    setIsSearching(true);
    
    // 使用延迟防抖动处理搜索
    const timeoutId = setTimeout(async () => {
      try {
        // 获取emoji数据
        const emojis = data.emojis || {};
        
        // 多语言搜索，根据当前语言过滤emoji
        const filtered = Object.keys(emojis)
          .filter(key => {
            const emoji = emojis[key];
            
            // 基本搜索条件：名称、关键词和短代码
            const basicMatch = 
              emoji.name?.toLowerCase().includes(term) ||
              (emoji.keywords && emoji.keywords.some(k => k.toLowerCase().includes(term))) ||
              (emoji.shortcodes && emoji.shortcodes.some(s => s.toLowerCase().includes(term)));
            
            // 查找本地化匹配
            let localizedMatch = false;
            
            // 检查emoji是否有本地化数据
            if (emoji.localized && emoji.localized[currentLanguage]) {
              // 检查本地化名称
              localizedMatch = emoji.localized[currentLanguage].toLowerCase().includes(term);
            }
            
            // 检查emoji是否有本地化关键词
            const localizedKeywords = getLocalizedEmojiKeywords(key, currentLanguage);
            if (localizedKeywords.length > 0) {
              localizedMatch = localizedMatch || localizedKeywords.some(
                k => k.toLowerCase().includes(term)
              );
            }
            
            // 如果基本匹配或本地化匹配，则包含此emoji
            return basicMatch || localizedMatch;
          })
          .map(key => ({ 
            ...emojis[key],
            id: key
          }));
        
        setFilteredEmojis(filtered);
      } catch (error) {
        console.error('搜索表情符号时出错:', error);
        setFilteredEmojis([]);
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, currentLanguage]);
  
  // 创建自定义Picker Props
  const pickerProps = useMemo(() => ({
    data,
    onEmojiSelect: handleEmojiSelect,
    theme: darkMode ? 'dark' : 'light',
    previewPosition: "none",
    skinTonePosition: "none",
    navPosition: "bottom",
    perLine: getPerLine(),
    emojiSize: isLargeScreen ? 28 : 24,
    searchPosition: "none", // 隐藏内置搜索框
    i18n: emojiI18n, // 传递国际化数据给emoji-mart
    locale: currentLanguage // 设置emoji-mart的语言
  }), [darkMode, isLargeScreen, handleEmojiSelect, emojiI18n, currentLanguage]);
  
  const pageTitle = t('emoji.title') + (searchTerm ? ` - "${searchTerm}"` : '');
  const pageDescription = t('app.description');
  const pageKeywords = searchTerm ? `emoji, ${searchTerm}, ${t('seo.emoji.keywords')}` : t('app.keywords');
  const pageLink = `https://emoji.imwarn.com/emoji`;
  return (
    <Layout title={pageTitle} description={pageDescription} keywords={pageKeywords} link={pageLink}>
      
      <section className="search-container" aria-label={t('search.label')}>
        <label htmlFor="search-input" className="visually-hidden">{t('search.label')}</label>
        <input
          id="search-input"
          type="text"
          placeholder={t('search.placeholder.emoji')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-controls="emoji-results"
        />
      </section>
      
      <div className={isLargeScreen ? "emoji-page-layout" : ""} id="emoji-results" aria-live="polite">
        <div className="emoji-picker-wrapper">
          <h2 className="visually-hidden">{t('emoji.picker')}</h2>
          <div className="emoji-picker-container">
            {isSearching && filteredEmojis.length > 0 ? (
              <div className="custom-emoji-results">
                <h3>{t('search.results', { count: filteredEmojis.length })}</h3>
                <div 
                  className="emoji-grid" 
                  role="grid" 
                  aria-label={t('search.results', { count: filteredEmojis.length })}
                >
                  {filteredEmojis.map(emoji => {
                    // 获取本地化的emoji名称用于title
                    const localizedName = getLocalizedEmojiName(emoji);
                    return (
                      <button
                        key={emoji.id}
                        className="emoji-item"
                        onClick={() => handleEmojiSelect({ 
                          id: emoji.id, 
                          native: emoji.skins[0].native,
                          name: emoji.name
                        })}
                        title={localizedName}
                        aria-label={localizedName}
                        role="gridcell"
                      >
                        {emoji.skins[0].native}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : isSearching && filteredEmojis.length === 0 ? (
              <div className="no-emoji-results" role="status" aria-live="polite">
                <p>{t('emoji.noResults')}</p>
                {/* 修复不存在的翻译键 - 使用已存在的键或添加新键 */}
                <p className="search-suggestion">{t('emoji.noResults')}</p>
              </div>
            ) : (
              <Picker {...pickerProps} />
            )}
          </div>
        </div>
        
        {isLargeScreen && <RecentEmojis />}
      </div>
      
      {!isLargeScreen && <RecentEmojis />}
    </Layout>
  );
}

export default EmojiPage;