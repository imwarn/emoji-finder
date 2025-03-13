import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendPageView } from '../services/analytics';

/**
 * 路由跟踪组件，用于监听路由变化并发送页面浏览事件
 */
function RouteTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // 当路由变化时发送页面浏览事件
    sendPageView(location.pathname, document.title);
  }, [location]);
  
  return null; // 此组件不渲染任何内容
}

export default RouteTracker;