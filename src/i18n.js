import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // 加载翻译文件的后端
  .use(Backend)
  // 检测用户语言
  .use(LanguageDetector)
  // 将i18n实例传递给react-i18next
  .use(initReactI18next)
  // 初始化i18next
  .init({
    fallbackLng: 'en', // 默认语言
    supportedLngs: ['en', 'zh', 'es', 'ja', 'ko'], // 支持的语言列表
    debug: import.meta.env.MODE === 'development', // 开发模式下启用调试
    
    interpolation: {
      escapeValue: false, // 不转义HTML (React已经处理了)
    },
    
    backend: {
      // 翻译文件路径
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // 检测语言的选项
    detection: {
      // 存储用户语言偏好的顺序
      order: ['localStorage', 'cookie', 'navigator'],
      // 在localStorage中使用的键名
      lookupLocalStorage: 'emoji-finder-language',
      // 缓存用户语言选择
      caches: ['localStorage'],
    },
    
    // 重要: 设置初始化完成后的回调，方便调试
    react: {
      useSuspense: true, // 默认为true，如果翻译尚未加载完成，则使用Suspense回退
    }
  })
  .then(() => {
    console.log('i18n 初始化完成, 当前语言:', i18n.language);
  })
  .catch(error => {
    console.error('i18n 初始化失败:', error);
  });

// 添加调试事件监听器
i18n.on('languageChanged', (lng) => {
  console.log(`语言已变更为: ${lng}`);
});

// 添加资源加载事件监听器
i18n.on('loaded', (loaded) => {
  console.log('i18n资源加载完成:', loaded);
});

export default i18n;