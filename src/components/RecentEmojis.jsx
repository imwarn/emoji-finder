import { useEmoji } from '../hooks/useEmoji';
import { useTranslation } from 'react-i18next';
function RecentEmojis() {
  const { t } = useTranslation();
  const { recentEmojis, handleEmojiSelect } = useEmoji();
  
  if (recentEmojis.length === 0) return null;
  
  return (
    <div className="recent-container">
      <h3>{t('home.recent.title')}</h3>
      <div className="recent-emojis">
        {recentEmojis.map(emoji => (
          <button 
            key={emoji.id} 
            onClick={() => handleEmojiSelect(emoji)}
            className="emoji-button"
            aria-label={`${t('common.copy')} ${emoji.name} ${t('common.emoji')}`}
          >
            {emoji.native}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentEmojis;