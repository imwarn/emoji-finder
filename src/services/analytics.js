import ReactGA from 'react-ga4';

// 您的GA4测量ID
const MEASUREMENT_ID = 'G-1G3V05SGXY';

// 是否启用调试模式
const isDev = import.meta.env.MODE === 'development';

/**
 * 初始化Google Analytics
 */
export const initGA = () => {
  try {
    ReactGA.initialize(MEASUREMENT_ID, {
      testMode: isDev,
      debug_mode: isDev
    });
    console.log('GA initialized successfully');
  } catch (error) {
    console.error('Error initializing GA:', error);
  }
};

/**
 * 发送页面浏览事件
 * @param {string} path - 页面路径
 * @param {string} title - 页面标题
 */
export const sendPageView = (path, title) => {
  try {
    if (!path) return;
    ReactGA.send({ 
      hitType: 'pageview', 
      page: path,
      title: title || document.title
    });
    console.log(`Page view sent: ${path}`);
  } catch (error) {
    console.error('Error sending page view:', error);
  }
};

/**
 * 发送事件到GA
 * @param {string} category - 事件类别
 * @param {string} action - 事件动作
 * @param {Object} params - 附加参数
 */
export const sendEvent = (category, action, params = {}) => {
  try {
    ReactGA.event({
      category,
      action,
      ...params
    });
    console.log(`Event sent: ${category} - ${action}`);
  } catch (error) {
    console.error('Error sending event:', error);
  }
};

/**
 * 跟踪表情选择事件
 * @param {Object} emoji - 选择的表情对象
 */
export const trackEmojiSelect = (emoji) => {
  if (!emoji) return;
  
  sendEvent('Emoji', 'select', {
    emoji_id: emoji.id,
    emoji_name: emoji.name,
    emoji_native: emoji.native,
  });
};

/**
 * 跟踪搜索事件
 * @param {string} term - 搜索关键词
 * @param {string} category - 搜索类别 (emoji/combo)
 * @param {number} resultCount - 结果数量
 */
export const trackSearch = (term, category, resultCount) => {
  if (!term) return;
  
  sendEvent('Search', 'query', {
    search_term: term,
    search_category: category,
    search_results: resultCount
  });
};

/**
 * 跟踪语言切换事件
 * @param {string} fromLang - 原始语言
 * @param {string} toLang - 目标语言
 */
export const trackLanguageSwitch = (fromLang, toLang) => {
  sendEvent('Language', 'switch', {
    from_language: fromLang,
    to_language: toLang
  });
};

/**
 * 跟踪主题切换事件
 * @param {string} theme - 切换后的主题 (light/dark)
 */
export const trackThemeSwitch = (theme) => {
  sendEvent('Theme', 'switch', {
    theme: theme
  });
};

export default {
  initGA,
  sendPageView,
  sendEvent,
  trackEmojiSelect,
  trackSearch,
  trackLanguageSwitch,
  trackThemeSwitch
};