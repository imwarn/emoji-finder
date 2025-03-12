import { useContext } from 'react';
import { EmojiContext } from '../context/EmojiContext';

/**
 * 自定义Hook，用于访问EmojiContext
 * @returns {Object} EmojiContext的值
 */
export function useEmoji() {
  const context = useContext(EmojiContext);
  
  if (context === undefined) {
    throw new Error('useEmoji必须在EmojiProvider内部使用');
  }
  
  return context;
}