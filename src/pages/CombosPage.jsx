import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Layout from "../components/Layout";
import ComboCreator from "../components/ComboCreator";
import { categories } from "../data/emojiCombos";
import { useEmoji } from "../hooks/useEmoji";

function CombosPage() {
  const { t } = useTranslation();

  const { category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [filteredCombos, setFilteredCombos] = useState([]);
  const [showCreator, setShowCreator] = useState(false);
  const creatorRef = useRef(null);

  const {
    favoritesCombos,
    handleComboClick,
    toggleFavorite,
    isComboFavorite,
    getAllCombos,
    saveCustomCombo,
  } = useEmoji();

  // 同步URL参数和选中的分类
  useEffect(() => {
    if (category && categories.some((c) => c.id === category)) {
      setSelectedCategory(category);
    } else if (category && category !== "all") {
      navigate("/combos", { replace: true });
    }
  }, [category, navigate]);

  // 当选中的分类变化时更新URL
  useEffect(() => {
    if (
      selectedCategory !== "all" &&
      (!category || category !== selectedCategory)
    ) {
      navigate(`/combos/${selectedCategory}`);
    } else if (selectedCategory === "all" && category) {
      navigate("/combos");
    }
  }, [selectedCategory, category, navigate]);

  // 过滤emoji组合
  useEffect(() => {
    let results = getAllCombos();

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
  }, [searchTerm, selectedCategory, getAllCombos]);

  // 点击外部关闭创建器
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (creatorRef.current && !creatorRef.current.contains(event.target)) {
        setShowCreator(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSaveCustomCombo = (newCombo) => {
    saveCustomCombo(newCombo);
    setShowCreator(false);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? t(category.nameKey) : t("combos.categories.all");
  };

  const categoryName = getCategoryName(selectedCategory);

  const pageTitle =
    t("combos.title") +
    ` - ${categoryName}${searchTerm ? ` "${searchTerm}" ` : ""}`;
  const pageDescription = `${t("app.description")} ${categoryName}${
    searchTerm ? ` "${searchTerm}" ` : ""
  }.`;
  const pageKeywords = searchTerm
    ? `${searchTerm}, ${t("combos.keywords")}`
    : `${t("combos.keywords")}`;
  const pageLink = `https://emoji.imwarn.com/combos${
    selectedCategory !== "all" ? `/${selectedCategory}` : ""
  }`;
  return (
    <Layout title={pageTitle} description={pageDescription} keywords={pageKeywords} link={pageLink}>

      <section className="search-container" aria-label={t("search.label")}>
        <label htmlFor="search-input" className="visually-hidden">
          {t("search.label")}
        </label>
        <input
          id="search-input"
          type="text"
          placeholder={t("search.placeholder.combos")}
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
          >
            {t("combos.create")}
          </button>
        </div>

        <nav className="categories" aria-label={t("combos.categories.label")}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-button ${
                selectedCategory === cat.id ? "selected" : ""
              }`}
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={selectedCategory === cat.id}
              aria-label={`${t("combos.categories.view")}${cat.name}`}
            >
              {t(cat.nameKey)}
            </button>
          ))}
        </nav>

        {favoritesCombos.length > 0 && selectedCategory === "all" && (
          <section className="favorites-section">
            <h2>{t("combos.favorites")}</h2>
            <div className="combos-list" role="list">
              {favoritesCombos.map((combo) => (
                <div key={combo.id} className="combo-item">
                  <div className="combo-text">{combo.combo}</div>
                  <div className="combo-actions">
                    <button
                      className="combo-action copy"
                      onClick={() => handleComboClick(combo)}
                    >
                      {t("combos.copy")}
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
            {categoryName} ({filteredCombos.length})
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
                      {t("combos.copy")}
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
            <p className="no-results">{t("combos.noResults")}</p>
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
