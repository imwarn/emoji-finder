import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useEmoji } from '../hooks/useEmoji';

function HomePage() {
  const { recentEmojis, handleEmojiSelect } = useEmoji();
  
  return (
    <Layout>
      <Helmet>
        <title>Emoji Finder - 快速查找和复制表情符号和组合</title>
        <meta name="description" content="免费在线Emoji查找工具，提供数千种表情符号和艺术组合，支持搜索、分类浏览、一键复制和收藏功能，让聊天和社交媒体更加生动有趣。" />
        <link rel="canonical" href="https://你的域名.com" />
      </Helmet>
      
      <section className="hero-section">
        <div className="hero-content">
          <h2>找到完美的表情符号<br />让您的消息更生动有趣</h2>
          <p>简单搜索、快速复制、轻松收藏，为您的聊天添加创意和乐趣</p>
          <div className="hero-buttons">
            <Link to="/emoji" className="hero-btn primary">查找Emoji</Link>
            <Link to="/combos" className="hero-btn secondary">浏览Emoji组合</Link>
          </div>
        </div>
      </section>
      
      <section className="features-section">
        <h2>主要功能</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>快速搜索</h3>
            <p>轻松找到你需要的表情符号</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>创意组合</h3>
            <p>探索独特的emoji艺术组合</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>收藏夹</h3>
            <p>保存您喜爱的emoji和组合</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>一键复制</h3>
            <p>无需手动输入，快速复制使用</p>
          </div>
        </div>
      </section>
      
      {recentEmojis.length > 0 && (
        <section className="recent-section">
          <h2>您最近使用的Emoji</h2>
          <div className="recent-grid">
            {recentEmojis.slice(0, 8).map(emoji => (
              <button 
                key={emoji.id} 
                onClick={() => handleEmojiSelect(emoji)} // 现在handleEmojiSelect已定义
                className="emoji-button large"
              >
                {emoji.native}
              </button>
            ))}
            <Link to="/emoji" className="see-all-link">查看全部</Link>
          </div>
        </section>
      )}
    </Layout>
  );
}

export default HomePage;