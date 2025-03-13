import { createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trackLanguageSwitch } from '../services/analytics';

// 创建上下文
export const LanguageContext = createContext();

/**
 * 语言提供者组件
 * 管理应用的语言状态和切换
 */
export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [languages] = useState([
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ]);
  
  // 切换语言功能
  const changeLanguage = async (lng) => {
    try {
      const prevLang = i18n.language;
      // 使用i18next API切换语言 - 等待操作完成
      await i18n.changeLanguage(lng);
      console.log(`语言已切换到: ${lng}`);
      
      // 更新状态和HTML语言标签
      setCurrentLanguage(lng);
      document.documentElement.lang = lng;
      
      // 保存用户语言偏好到localStorage
      localStorage.setItem('emoji-finder-language', lng);

      // 跟踪语言切换事件
      trackLanguageSwitch(prevLang, lng);
    } catch (error) {
      console.error('切换语言时出错:', error);
    }
  };
  
  // 从i18n实例监听语言变化
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      console.log(`i18next检测到语言变化: ${lng}`);
      setCurrentLanguage(lng);
      document.documentElement.lang = lng;
    };

    // 注册语言变化事件监听
    i18n.on('languageChanged', handleLanguageChanged);
    
    // 清理函数
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);
  
  // 从localStorage恢复已保存的语言偏好
  useEffect(() => {
    const savedLanguage = localStorage.getItem('emoji-finder-language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      changeLanguage(savedLanguage);
    }
  }, []);
  
  return (
    <LanguageContext.Provider value={{ currentLanguage, languages, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}