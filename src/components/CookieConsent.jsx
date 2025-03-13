import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // 检查用户是否已同意Cookie政策
    const consentGiven = localStorage.getItem('cookie-consent');
    if (!consentGiven) {
      // 如果尚未同意，显示提示
      setVisible(true);
    }
  }, []);
  
  const acceptCookies = () => {
    // 存储用户同意信息
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
    
    // 可以在这里添加GA4的完整初始化代码，或更新同意状态
  };
  
  const declineCookies = () => {
    // 记录用户拒绝情况，仍需存储基本信息以避免反复显示提示
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
    
    // 设置GA4为不收集个人数据或禁用跟踪
    // window['ga-disable-' + MEASUREMENT_ID] = true;
  };
  
  if (!visible) return null;
  
  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <h3>{t('privacy.cookieTitle')}</h3>
        <p>
          {t('privacy.cookieText')} 
          {/* <Link to="/privacy">{t('privacy.policyLink')}</Link> */}
        </p>
      </div>
      <div className="cookie-buttons">
        <button 
          className="cookie-button secondary"
          onClick={declineCookies}
        >
          {t('privacy.decline')}
        </button>
        <button 
          className="cookie-button primary"
          onClick={acceptCookies}
        >
          {t('privacy.accept')}
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;