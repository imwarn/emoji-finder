import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initGA } from "./services/analytics";
import "./index.css";
import "./i18n"; // 导入i18n配置

// 初始化Google Analytics
initGA();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
