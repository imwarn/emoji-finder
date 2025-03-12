import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ComboCreator from '../components/ComboCreator';
import { categories } from '../data/emojiCombos';
import { useEmoji } from '../hooks/useEmoji';

function CombosPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [filteredCombos, setFilteredCombos] = useState([]);
  const [showCreator, setShowCreator] = useState(false);
  const creatorRef = useRef(null);
  
  const { 
    favoritesCombos, 
    handleComboClick, 
    toggleFavorite, 
    isComboFavorite, 
    getAllCombos,
    saveCustomCombo
  } = useEmoji();
  
  // 同步URL参数和选中的分类
  useEffect(() => {
    if (category && categories.some(c => c.id === category)) {
      setSelectedCategory(category);
    } else if (category && category !== 'all') {
      navigate('/combos', { replace: true });
    }
  }, [category, navigate]);
  
  // 当选中的分类变化时更新URL
  useEffect(() => {
    if (selectedCategory !== 'all' && (!category || category !== selectedCategory)) {
      navigate(`/combos/${selectedCategory}`);
    } else if (selectedCategory === 'all' && category) {
      navigate('/combos');
    }
  }, [selectedCategory, category, navigate]);
  
  // 过滤emoji组合
  useEffect(() => {
    let results = getAllCombos();
    
    // 按分类过滤
    if (selectedCategory !== 'all') {
      results = results.filter(combo => combo.category === selectedCategory);
    }
    
    // 按搜索词过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(combo => 
        combo.combo.toLowerCase().includes(term) || 
        combo.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredCombos(results);
  }, [searchTerm, selectedCategory, getAllCombos]);
  
  // 点击外部关闭创建器
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (creatorRef.current && !creatorRef.current.contains(event.target)) {
        setShowCreator(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSaveCustomCombo = (newCombo) => {
    saveCustomCombo(newCombo);
    setShowCreator(false);
  };
  
  const categoryName = selectedCategory !== 'all' 
    ? categories.find(c => c.id === selectedCategory)?.name 
    : '全部';
  
  const pageTitle = `Emoji组合 - ${categoryName}${searchTerm ? ` "${searchTerm}" 相关的` : ''}艺术表情组合`;
  const pageDescription = `探索${categoryName}${searchTerm ? `与 "${searchTerm}" 相关的` : ''}特色emoji组合。轻松复制酷炫的字符艺术到你的社交媒体和消息应用。`;
  
  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {searchTerm && <meta name="keywords" content={`emoji组合, ${searchTerm}, 表情符号, emoji艺术, 特殊符号`} />}
        <link rel="canonical" href={`https://你的域名.com/combos${selectedCategory !== 'all' ? `/${selectedCategory}` : ''}`} />
      </Helmet>
      
      <section className="search-container" aria-label="搜索">
        <label htmlFor="search-input" className="visually-hidden">搜索Emoji组合</label>
        <input
          id="search-input"
          type="text"
          placeholder="搜索emoji组合..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-controls="combos-results"
        />
      </section>
      
      <div className="combos-container" id="combos-results" aria-live="polite">
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
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-button ${selectedCategory === cat.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={selectedCategory === cat.id}
              aria-label={`查看${cat.name}`}
            >
              {cat.name}
            </button>
          ))}
        </nav>
        
        {favoritesCombos.length > 0 && selectedCategory === 'all' && (
          <section className="favorites-section">
            <h2>❤️ 我的收藏</h2>
            <div className="combos-list" role="list">
              {favoritesCombos.map(combo => (
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
                      className={`combo-action favorite ${isComboFavorite(combo.id) ? 'active' : ''}`} 
                      onClick={() => toggleFavorite(combo)}
                    >
                      {isComboFavorite(combo.id) ? '★' : '☆'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="combos-results">
          <h2>{categoryName} ({filteredCombos.length})</h2>
          
          {filteredCombos.length > 0 ? (
            <div className="combos-list" role="list">
              {filteredCombos.map(combo => (
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
                      className={`combo-action favorite ${isComboFavorite(combo.id) ? 'active' : ''}`} 
                      onClick={() => toggleFavorite(combo)}
                    >
                      {isComboFavorite(combo.id) ? '★' : '☆'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">
              没有找到匹配的emoji组合 😢
            </p>
          )}
        </section>
      </div>
      
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
    </Layout>
  );
}

export default CombosPage;