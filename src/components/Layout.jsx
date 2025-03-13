import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { useEmoji } from "../hooks/useEmoji";
import Toast from "./Toast";
import LanguageSwitcher from "./LanguageSwitcher";
import { Helmet } from "react-helmet-async";

function Layout({ children, title, description, keywords, link }) {
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { copied } = useEmoji();
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>{title || t("seo.title")}</title>
        <meta
          name="description"
          content={description || t("app.description")}
        />
        <meta name="keywords" content={keywords || t("app.keywords")} />
        <link rel="canonical" href={link || t("app.link")} />
      </Helmet>

      <header className="container">
        <h1>
          <Link to="/" className="logo-link">
            {t("app.title")}
          </Link>
        </h1>

        <div className="header-controls">
          <LanguageSwitcher />
          <button
            onClick={toggleDarkMode}
            className="theme-toggle"
            aria-label={t("theme.toggle")}
          >
            {darkMode ? t("theme.light") : t("theme.dark")}
          </button>
        </div>
      </header>

      <nav className="main-nav container" aria-label={t("nav.label")}>
        <Link
          to="/emoji"
          className={`nav-link ${
            location.pathname === "/emoji" ? "active" : ""
          }`}
        >
          {t("nav.emoji")}
        </Link>
        <Link
          to="/combos"
          className={`nav-link ${
            location.pathname.includes("/combos") ? "active" : ""
          }`}
        >
          {t("nav.combos")}
        </Link>
      </nav>

      <main>{children}</main>

      <footer className="container">
        <p>{t("footer.copyInfo")}</p>
        <nav aria-label={t("footer.navLabel")} className="footer-links">
          <Link to="https://imwarn.com">{t("footer.author")}</Link>
          <Link to="https://blog.imwarn.com">{t("footer.blog")}</Link>
          <Link to="https://pdftool.imwarn.com/">{t("footer.pdf")}</Link>
          <Link to="https://imwarn.com/time">{t("footer.time")}</Link>
        </nav>
      </footer>

      {copied && <Toast text={copied} />}
    </>
  );
}

export default Layout;
