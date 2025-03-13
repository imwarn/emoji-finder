import { useTranslation } from 'react-i18next';

function HomeStats({ stats = {} }) {
  const { t, i18n } = useTranslation();
  
  // 默认统计数据（如果没有传入）
  const defaultStats = {
    userCount: 10000,
    emojiCount: 1000,
    comboCount: 500,
    languageCount: 2
  };
  
  // 合并默认值和传入的stats
  const finalStats = { ...defaultStats, ...stats };
  
  // 使用Intl.NumberFormat进行数字本地化
  const formatNumber = (number) => {
    return new Intl.NumberFormat(i18n.language).format(number);
  };
  
  return (
    <section className="stats-section container">
      <h2>{t('home.stats.title')}</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{formatNumber(finalStats.userCount)}+</span>
          <span className="stat-label">{t('home.stats.users')}</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatNumber(finalStats.emojiCount)}+</span>
          <span className="stat-label">{t('home.stats.emojis')}</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatNumber(finalStats.comboCount)}+</span>
          <span className="stat-label">{t('home.stats.combinations')}</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatNumber(finalStats.languageCount)}+</span>
          <span className="stat-label">{t('home.stats.languages', { count: finalStats.languageCount })}</span>
        </div>
      </div>
    </section>
  );
}

export default HomeStats;