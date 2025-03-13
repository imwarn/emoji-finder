import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import { useEmoji } from '../hooks/useEmoji';

function PopularCulturalEmojis() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { handleEmojiSelect } = useEmoji();
  
  // 根据语言获取不同的流行表情
  const getPopularEmojisForCulture = (language) => {
    switch(language) {
      case 'zh':
        return [
          { id: 'grinning', native: '😊', name: '微笑' },
          { id: 'thumbs_up', native: '👍', name: '赞' },
          { id: 'pray', native: '🙏', name: '祈祷' },
          { id: 'joy', native: '😂', name: '笑哭' },
          { id: 'tada', native: '🎉', name: '庆祝' },
          { id: 'muscle', native: '💪', name: '加油' }
        ];
      case 'ja':
        return [
          { id: 'bow', native: '🙇', name: 'お辞儀' },
          { id: 'sparkles', native: '✨', name: 'キラキラ' },
          { id: 'sweat_drops', native: '💦', name: '汗' },
          { id: 'laughing', native: '😆', name: '笑顔' },
          { id: 'bamboo', native: '🎍', name: '門松' },
          { id: 'rice_ball', native: '🍙', name: 'おにぎり' }
        ];
      case 'ko':
        return [
          { id: 'heart_eyes', native: '😍', name: '하트눈' },
          { id: 'ok_woman', native: '🙆', name: '좋아요' },
          { id: 'two_hearts', native: '💕', name: '하트' },
          { id: 'clap', native: '👏', name: '박수' },
          { id: 'raising_hand', native: '🙋‍♀️', name: '손들기' },
          { id: 'musical_note', native: '🎵', name: '음표' }
        ];
      default:
        return [
          { id: 'grinning', native: '😀', name: 'Grinning' },
          { id: 'thumbs_up', native: '👍', name: 'Thumbs Up' },
          { id: 'heart', native: '❤️', name: 'Heart' },
          { id: 'fire', native: '🔥', name: 'Fire' },
          { id: '100', native: '💯', name: '100' },
          { id: 'raised_hands', native: '🙌', name: 'Raised Hands' }
        ];
    }
  };
  
  const popularEmojis = getPopularEmojisForCulture(currentLanguage);
  
  return (
    <section className="popular-emoji-section">
      <h2>{t('home.popular.title')}</h2>
      <p>{t('home.popular.description')}</p>
      <div className="popular-emoji-grid">
        {popularEmojis.map(emoji => (
          <button 
            key={emoji.id} 
            onClick={() => handleEmojiSelect(emoji)} 
            className="emoji-button large"
            aria-label={emoji.name}
            title={emoji.name}
          >
            {emoji.native}
          </button>
        ))}
      </div>
    </section>
  );
}

export default PopularCulturalEmojis;