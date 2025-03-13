import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';

function LanguageSwitcher() {
  const { currentLanguage, languages, changeLanguage } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // 获取当前语言信息
  const currentLangObj = languages.find(lang => lang.code === currentLanguage) || languages[0];
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button 
        className="language-current"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        <span className="language-flag">{currentLangObj.flag}</span>
        <span className="language-name">{currentLangObj.name}</span>
        <span className="dropdown-arrow">▼</span>
      </button>
      
      {dropdownOpen && (
        <ul className="language-dropdown" role="menu">
          {languages.map(lang => (
            <li key={lang.code} role="menuitem">
              <button 
                className={`language-option ${lang.code === currentLanguage ? 'active' : ''}`}
                onClick={() => {
                  changeLanguage(lang.code);
                  setDropdownOpen(false);
                }}
              >
                <span className="language-flag">{lang.flag}</span>
                <span className="language-name">{lang.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;