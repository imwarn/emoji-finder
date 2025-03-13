/**
 * 根据当前语言和区域选择适合的图片
 * @param {string} section - 图片所在区域，例如'hero', 'features'等
 * @param {string} language - 当前语言代码
 * @returns {string} 图片路径
 */
export function getCulturalImage(section, language) {
  // 基础URL指向public目录下的images文件夹
  const baseUrl = '/images';
  
  // 根据区域和语言选择合适的图片
  switch(section) {
    case 'hero':
      if (language === 'zh') return `${baseUrl}/hero-zh.webp`;
      // if (language === 'ja') return `${baseUrl}/hero-ja.webp`;
      // if (language === 'ko') return `${baseUrl}/hero-ko.webp`;
      // 默认英文图片
      return `${baseUrl}/hero-en.webp`;
      
    case 'features':
      if (language === 'zh') return `${baseUrl}/features-zh.webp`;
      // if (language === 'ja') return `${baseUrl}/features-ja.webp`;
      // if (language === 'ko') return `${baseUrl}/features-ko.webp`;
      // 默认英文图片
      return `${baseUrl}/features-en.webp`;
      
    case 'cta':
      if (language === 'zh') return `${baseUrl}/cta-zh.webp`; 
      // 默认英文图片
      return `${baseUrl}/cta-en.webp`;
      
    default:
      return `${baseUrl}/default-${language || 'en'}.webp`;
  }
}