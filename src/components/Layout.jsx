import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useEmoji } from '../hooks/useEmoji';
import { Helmet } from 'react-helmet-async';
import Toast from './Toast';

function Layout({ children, title, description }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const { copied } = useEmoji();
  const location = useLocation();
  
  return (
    <>
      <Helmet>
        <title>{title || 'Emoji Finder - 表情符号和组合查找工具'}</title>
        <meta name="description" content={description || '免费在线Emoji查找工具，提供数千种表情符号和艺术组合，支持搜索、分类浏览、一键复制和收藏功能。'} />
      </Helmet>
      
      <header>
        <h1>
          <Link to="/" className="logo-link">Emoji Finder</Link>
        </h1>
        <button onClick={toggleDarkMode} className="theme-toggle" aria-label="切换深色/浅色模式">
          {darkMode ? '🌞 亮色模式' : '🌙 暗色模式'}
        </button>
      </header>

      <nav className="main-nav" aria-label="主要导航">
        <Link to="/emoji" className={`nav-link ${location.pathname === '/emoji' ? 'active' : ''}`}>
          😀 单个Emoji
        </Link>
        <Link to="/combos" className={`nav-link ${location.pathname.includes('/combos') ? 'active' : ''}`}>
          ✨ Emoji组合
        </Link>
      </nav>
      
      <main>
        {children}
      </main>
      
      <footer>
        <p>点击emoji或组合即可复制 • 基于emoji-mart和emojicombos的创意</p>
        <nav aria-label="页脚导航" className="footer-links">
          <Link to="https://imwarn.com/">爱情的纹理</Link>
          <Link to="https://imwarn.com/">博客</Link>
          <Link to="https://imwarn.com/time/">当前时间</Link>
          <Link to="https://imwarn.com/poetry/">纹理诗社</Link>
        </nav>
      </footer>
      
      {copied && <Toast text={copied} />}
    </>
  );
}

export default Layout;