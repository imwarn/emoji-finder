import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useEmoji } from '../hooks/useEmoji';
import { useLanguage } from '../hooks/useLanguage';
import HomeStats from '../components/HomeStats';
import PopularCulturalEmojis from '../components/PopularCulturalEmojis';
import { getCulturalImage } from '../utils/imageUtils';

function HomePage() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { recentEmojis, handleEmojiSelect } = useEmoji();
  
  // 统计数据 - 实际项目中可能从API获取
  const statsData = {
    userCount: 10000,
    emojiCount: 1800,
    comboCount: 500,
    languageCount: 5
  };
  
  return (
    <Layout>
      <Helmet>
        <title>{t('app.title')} - {t('app.slogan')}</title>
        <meta name="description" content={t('app.description')} />
        <meta name="keywords" content={t('seo.home.keywords')} />
        <link rel="canonical" href={`https://你的域名.com/${currentLanguage}`} />
        
        {/* Open Graph 标签 */}
        <meta property="og:title" content={`${t('app.title')} - ${t('app.slogan')}`} />
        <meta property="og:description" content={t('app.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://你的域名.com/${currentLanguage}`} />
        <meta property="og:image" content="https://你的域名.com/og-image.jpg" />
        <meta property="og:locale" content={currentLanguage} />
      </Helmet>
      
      {/* 英雄区域 - 使用文化适应的图片 */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t('home.hero.title')}</h1>
          <p className="hero-subtitle">{t('home.hero.subtitle')}</p>
          <p className="hero-description">{t('home.hero.description')}</p>
          <div className="hero-ctas">
            <Link to="/emoji" className="primary-button">
              {t('home.hero.emojiButton')}
            </Link>
            <Link to="/combos" className="secondary-button">
              {t('home.hero.combosButton')}
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src={getCulturalImage('hero', currentLanguage)} 
            alt={t('home.hero.imageAlt')} 
            width="600" 
            height="400"
            loading="eager"
          />
        </div>
      </section>
      
      {/* 功能介绍 - 使用文化适应的图片 */}
      <section className="features-section">
        <h2>{t('home.features.title')}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3 className="feature-title">{t('home.features.search.title')}</h3>
            <p>{t('home.features.search.description')}</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3 className="feature-title">{t('home.features.combos.title')}</h3>
            <p>{t('home.features.combos.description')}</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3 className="feature-title">{t('home.features.favorites.title')}</h3>
            <p>{t('home.features.favorites.description')}</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3 className="feature-title">{t('home.features.copy.title')}</h3>
            <p>{t('home.features.copy.description')}</p>
          </div>
        </div>
        
        <div className="features-image">
          <img 
            src={getCulturalImage('features', currentLanguage)} 
            alt={t('home.features.imageAlt')}
            width="800" 
            height="450"
          />
        </div>
      </section>
      
      {/* 文化适应的流行表情区域 */}
      <PopularCulturalEmojis />
      
      {/* 最近使用的表情 */}
      {recentEmojis.length > 0 && (
        <section className="recent-section" aria-labelledby="recent-heading">
          <h2 id="recent-heading">{t('home.recent.title')}</h2>
          <div className="recent-grid">
            {recentEmojis.slice(0, 8).map(emoji => (
              <button 
                key={emoji.id} 
                onClick={() => handleEmojiSelect(emoji)} 
                className="emoji-button large"
                aria-label={emoji.name}
                title={emoji.name}
              >
                {emoji.native}
              </button>
            ))}
            <Link to="/emoji" className="see-all-link">{t('home.recent.seeAll')} →</Link>
          </div>
        </section>
      )}
      
      {/* 社区统计 - 使用HomeStats组件 */}
      <HomeStats stats={statsData} />
      
      {/* 社区调用 */}
      <section className="cta-section">
        <h2>{t('home.cta.title')}</h2>
        <p>{t('home.cta.description')}</p>
        <div className="cta-buttons">
          <Link to="/emoji" className="primary-button">{t('home.cta.startButton')}</Link>
          <a href="https://github.com/imwarn/emoji-finder" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="secondary-button"
          >
            {t('home.cta.contributeButton')}
          </a>
        </div>
        <div className="cta-image">
          <img 
            src={getCulturalImage('cta', currentLanguage)} 
            alt={t('home.cta.imageAlt')} 
            width="800" 
            height="480"
            loading="lazy"
          />
        </div>
      </section>
    </Layout>
  );
}

export default HomePage;