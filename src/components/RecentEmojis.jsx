import { useEmoji } from '../hooks/useEmoji';

function RecentEmojis() {
  const { recentEmojis, handleEmojiSelect } = useEmoji();
  
  if (recentEmojis.length === 0) return null;
  
  return (
    <div className="recent-container">
      <h3>最近使用的Emoji</h3>
      <div className="recent-emojis">
        {recentEmojis.map(emoji => (
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
    </div>
  );
}

export default RecentEmojis;