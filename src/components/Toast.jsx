function Toast({ text }) {
  const displayText = text.length > 10 ? text.slice(0, 10) + '...' : text;
  
  return (
    <div className="toast">
      <span>{displayText}</span> 已复制到剪贴板
    </div>
  );
}

export default Toast;