// 表情符号本地化数据
// 此文件提供多种语言的emoji名称和关键词
export const emojiLocalizations = {
  // 中文本地化
  zh: {
    // emoji ID: 中文名称
    grinning: {
      name: "咧嘴笑脸",
      keywords: ["笑脸", "高兴", "微笑", "开心", "快乐"]
    },
    smiley: {
      name: "微笑的脸，眼睛眯成一条缝",
      keywords: ["笑", "高兴", "微笑", "开心", "温暖"]
    },
    smile: {
      name: "带笑眼的微笑脸",
      keywords: ["笑脸", "眼睛", "微笑", "开心", "幸福"]
    },
    // 常用emoji的中文名称和关键词
    joy: {
      name: "喜极而泣的脸",
      keywords: ["笑哭", "眼泪", "笑", "开心", "高兴"]
    },
    heart_eyes: {
      name: "带爱心眼睛的笑脸",
      keywords: ["爱", "喜欢", "心形", "眼睛", "爱慕"]
    },
    kissing_heart: {
      name: "飞吻的脸",
      keywords: ["吻", "爱心", "亲吻", "送吻"]
    },
    // ... 其他常用emoji
  },
  
  // 西班牙语本地化
  es: {
    grinning: {
      name: "Cara sonriente",
      keywords: ["sonrisa", "feliz", "alegre"]
    },
    smiley: {
      name: "Cara sonriente con ojos cerrados",
      keywords: ["sonrisa", "feliz", "contento"]
    },
    // ... 更多西班牙语本地化
  },
  
  // 可以添加更多语言
};

/**
 * 获取指定语言的emoji本地化名称
 * @param {string} emojiId - emoji的ID
 * @param {string} langCode - 语言代码
 * @returns {string} - emoji的本地化名称，找不到时返回空字符串
 */
export function getLocalizedEmojiName(emojiId, langCode) {
  if (!emojiId || !langCode) return '';
  
  const langData = emojiLocalizations[langCode];
  if (!langData) return '';
  
  const emojiData = langData[emojiId];
  return emojiData?.name || '';
}

/**
 * 获取指定语言的emoji本地化关键词
 * @param {string} emojiId - emoji的ID
 * @param {string} langCode - 语言代码
 * @returns {string[]} - emoji的本地化关键词数组，找不到时返回空数组
 */
export function getLocalizedEmojiKeywords(emojiId, langCode) {
  if (!emojiId || !langCode) return [];
  
  const langData = emojiLocalizations[langCode];
  if (!langData) return [];
  
  const emojiData = langData[emojiId];
  return emojiData?.keywords || [];
}