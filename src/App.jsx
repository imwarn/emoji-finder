import { useState, useEffect, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Helmet } from "react-helmet-async";
import { emojiCombos, categories } from "./data/emojiCombos";
import ComboCreator from "./components/ComboCreator";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("emoji");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredCombos, setFilteredCombos] = useState([]);
  const [recentEmojis, setRecentEmojis] = useState([]);
  const [favoritesCombos, setFavoritesCombos] = useState([]);
  const [customCombos, setCustomCombos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(null);
  const [showCreator, setShowCreator] = useState(false);
  const creatorRef = useRef(null);

  // 检测窗口大小
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 1200
  );

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 从localStorage加载数据
  useEffect(() => {
    const savedEmojis = localStorage.getItem("recentEmojis");
    if (savedEmojis) {
      setRecentEmojis(JSON.parse(savedEmojis));
    }

    const savedFavorites = localStorage.getItem("favoritesCombos");
    if (savedFavorites) {
      setFavoritesCombos(JSON.parse(savedFavorites));
    }

    const savedCustomCombos = localStorage.getItem("customCombos");
    if (savedCustomCombos) {
      setCustomCombos(JSON.parse(savedCustomCombos));
    }

    // 检测系统颜色模式
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  // 过滤emoji组合
  useEffect(() => {
    let results = [...emojiCombos, ...customCombos]; // 合并预设和自定义组合

    // 按分类过滤
    if (selectedCategory !== "all") {
      results = results.filter((combo) => combo.category === selectedCategory);
    }

    // 按搜索词过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (combo) =>
          combo.combo.toLowerCase().includes(term) ||
          combo.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    setFilteredCombos(results);
  }, [searchTerm, selectedCategory, customCombos]);

  const handleEmojiSelect = (emoji) => {
    // 复制emoji到剪贴板
    navigator.clipboard.writeText(emoji.native);

    // 更新"最近使用"列表
    const updated = [
      emoji,
      ...recentEmojis.filter((e) => e.id !== emoji.id),
    ].slice(0, 20);
    setRecentEmojis(updated);
    localStorage.setItem("recentEmojis", JSON.stringify(updated));

    // 显示复制成功提示
    setCopied(emoji.native);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleComboClick = (combo) => {
    // 复制组合到剪贴板
    navigator.clipboard.writeText(combo.combo);

    // 显示复制成功提示
    setCopied(combo.combo);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleFavorite = (combo) => {
    const exists = favoritesCombos.some((fav) => fav.id === combo.id);

    let updated;
    if (exists) {
      updated = favoritesCombos.filter((fav) => fav.id !== combo.id);
    } else {
      updated = [...favoritesCombos, combo];
    }

    setFavoritesCombos(updated);
    localStorage.setItem("favoritesCombos", JSON.stringify(updated));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const isComboFavorite = (id) => {
    return favoritesCombos.some((fav) => fav.id === id);
  };

  const handleSaveCustomCombo = (newCombo) => {
    const updated = [...customCombos, newCombo];
    setCustomCombos(updated);
    localStorage.setItem("customCombos", JSON.stringify(updated));
  };

  // 计算emoji-mart的每行表情数量，根据屏幕宽度调整
  const getPerLine = () => {
    if (window.innerWidth >= 1400) return 10;
    if (window.innerWidth >= 1200) return 9;
    if (window.innerWidth >= 992) return 8;
    if (window.innerWidth >= 768) return 7;
    return 6;
  };

  // 动态生成页面标题和描述
  const getPageTitle = () => {
    if (activeTab === "emoji") {
      return `Emoji Finder - 查找和复制${
        searchTerm ? ` "${searchTerm}" 相关的` : ""
      }表情符号`;
    }
    if (activeTab === "combos") {
      return `Emoji组合 - ${
        selectedCategory !== "all"
          ? categories.find((c) => c.id === selectedCategory).name
          : "全部"
      }${searchTerm ? ` "${searchTerm}" 相关的` : ""}艺术表情组合`;
    }
    return "Emoji Finder - 快速查找、复制和收藏Emoji表情和组合";
  };

  const getPageDescription = () => {
    if (activeTab === "emoji") {
      return `浏览、搜索和复制${
        searchTerm ? `关于 "${searchTerm}" 的` : ""
      }emoji表情符号。包含数千种emoji，一键复制使用。`;
    }
    if (activeTab === "combos") {
      return `探索${
        selectedCategory !== "all"
          ? categories.find((c) => c.id === selectedCategory).name
          : ""
      }${
        searchTerm ? `与 "${searchTerm}" 相关的` : ""
      }特色emoji组合。轻松复制酷炫的字符艺术到你的社交媒体和消息应用。`;
    }
    return "免费在线Emoji查找工具，提供数千种表情符号和艺术组合，支持搜索、分类浏览、一键复制和收藏功能，让聊天和社交媒体更加生动有趣。";
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        {searchTerm && (
          <meta
            name="keywords"
            content={`emoji, ${searchTerm}, 表情符号, emoji搜索, emoji组合`}
          />
        )}
        {activeTab === "combos" && (
          <link
            rel="canonical"
            href={`https://你的域名.com/combos${
              selectedCategory !== "all" ? `/${selectedCategory}` : ""
            }`}
          />
        )}
      </Helmet>

      <header>
        <h1>Emoji Finder - 表情符号和组合查找工具</h1>
        <button
          onClick={toggleDarkMode}
          className="theme-toggle"
          aria-label="切换深色/浅色模式"
        >
          {darkMode ? "🌞 亮色模式" : "🌙 暗色模式"}
        </button>
      </header>

      <nav className="tabs" aria-label="主要导航">
        <button
          className={`tab ${activeTab === "emoji" ? "active" : ""}`}
          onClick={() => setActiveTab("emoji")}
          aria-pressed={activeTab === "emoji"}
        >
          😀 单个Emoji
        </button>
        <button
          className={`tab ${activeTab === "combos" ? "active" : ""}`}
          onClick={() => setActiveTab("combos")}
          aria-pressed={activeTab === "combos"}
        >
          ✨ Emoji组合
        </button>
      </nav>

      <section className="search-container" aria-label="搜索">
        <label htmlFor="search-input" className="visually-hidden">
          搜索Emoji
        </label>
        <input
          id="search-input"
          type="text"
          placeholder={
            activeTab === "emoji" ? "搜索emoji..." : "搜索emoji组合..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-controls={
            activeTab === "emoji" ? "emoji-results" : "combos-results"
          }
        />
      </section>

      {activeTab === "emoji" ? (
        // Emoji选择器部分 - 响应式布局优化
        <main
          className={isLargeScreen ? "emoji-page-layout" : ""}
          id="emoji-results"
          aria-live="polite"
        >
          <article className="emoji-picker-wrapper">
            <h2 className="visually-hidden">Emoji选择器</h2>
            <div className="emoji-picker-container">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                searchTerm={searchTerm}
                theme={darkMode ? "dark" : "light"}
                previewPosition="none"
                skinTonePosition="none"
                navPosition="bottom"
                perLine={getPerLine()}
                emojiSize={isLargeScreen ? 28 : 24}
              />
            </div>
          </article>

          {recentEmojis.length > 0 && (
            <aside className="recent-container">
              <h2>最近使用的Emoji</h2>
              <div className="recent-emojis">
                {recentEmojis.map((emoji) => (
                  <button
                    key={emoji.id}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="emoji-button"
                    aria-label={`复制 ${emoji.name} 表情符号`}
                  >
                    {emoji.native}
                  </button>
                ))}
              </div>
            </aside>
          )}
        </main>
      ) : (
        // Emoji组合部分
        <main
          className="combos-container"
          id="combos-results"
          aria-live="polite"
        >
          <div className="combos-header">
            <button
              className="create-combo-btn"
              onClick={() => setShowCreator(true)}
              aria-label="创建新的Emoji组合"
            >
              ✨ 创建新组合
            </button>
          </div>

          <nav className="categories" aria-label="组合分类">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${
                  selectedCategory === category.id ? "selected" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={selectedCategory === category.id}
                aria-label={`查看${category.name}`}
              >
                {category.name}
              </button>
            ))}
          </nav>

          {favoritesCombos.length > 0 && selectedCategory === "all" && (
            <section className="favorites-section">
              <h2>❤️ 我的收藏</h2>
              <div className="combos-list" role="list">
                {favoritesCombos.map((combo) => (
                  <div key={combo.id} className="combo-item">
                    <div className="combo-text">{combo.combo}</div>
                    <div className="combo-actions">
                      <button
                        className="combo-action copy"
                        onClick={() => handleComboClick(combo)}
                      >
                        复制
                      </button>
                      <button
                        className={`combo-action favorite ${
                          isComboFavorite(combo.id) ? "active" : ""
                        }`}
                        onClick={() => toggleFavorite(combo)}
                      >
                        {isComboFavorite(combo.id) ? "★" : "☆"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="combos-results">
            <h2>
              {categories.find((c) => c.id === selectedCategory).name} (
              {filteredCombos.length})
            </h2>

            {filteredCombos.length > 0 ? (
              <div className="combos-list" role="list">
                {filteredCombos.map((combo) => (
                  <div key={combo.id} className="combo-item">
                    <div className="combo-text">{combo.combo}</div>
                    <div className="combo-actions">
                      <button
                        className="combo-action copy"
                        onClick={() => handleComboClick(combo)}
                      >
                        复制
                      </button>
                      <button
                        className={`combo-action favorite ${
                          isComboFavorite(combo.id) ? "active" : ""
                        }`}
                        onClick={() => toggleFavorite(combo)}
                      >
                        {isComboFavorite(combo.id) ? "★" : "☆"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">没有找到匹配的emoji组合 😢</p>
            )}
          </section>
        </main>
      )}

      {showCreator && (
        <div className="creator-overlay">
          <div ref={creatorRef}>
            <ComboCreator
              onSaveCombo={handleSaveCustomCombo}
              onClose={() => setShowCreator(false)}
            />
          </div>
        </div>
      )}

      {copied && (
        <div className="toast">
          <span>
            {copied.length > 10 ? copied.slice(0, 10) + "..." : copied}
          </span>{" "}
          已复制到剪贴板
        </div>
      )}

      <footer>
        <p>点击emoji或组合即可复制 • 基于emoji-mart和emojicombos的创意</p>
        <nav aria-label="页脚导航" className="footer-links">
          <a href="/about">关于我们</a>
          <a href="/privacy">隐私政策</a>
          <a href="/terms">使用条款</a>
          <a href="/contact">联系我们</a>
        </nav>
      </footer>
    </div>
  );
}

export default App;
