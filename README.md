# Emoji Finder - 表情符号和组合搜索工具

![Emoji Finder 预览](public/screenshots/desket.png)

Emoji Finder是一个强大的Web应用，帮助用户快速查找、复制和收藏单个emoji表情符号以及精美的emoji组合艺术。支持多种分类浏览、关键词搜索、创建自定义组合等功能，让您的聊天和社交媒体内容更加生动有趣！

## ✨ 功能特点

- 🔍 **强大搜索** - 快速查找任何emoji表情符号或艺术组合
- 🌈 **分类浏览** - 按类别轻松浏览所有emoji和组合
- 📋 **一键复制** - 即点即用，无需手动输入
- ⭐ **收藏功能** - 保存您喜爱的emoji组合，随时使用
- 🎨 **创建自定义组合** - 设计专属于您的emoji艺术组合
- 🌓 **深色/浅色模式** - 根据偏好切换显示模式
- 📱 **响应式设计** - 完美适配从手机到大屏显示器的各种设备
- 🚀 **SEO优化** - 针对搜索引擎优化，提高可发现性
- ⚡ **高性能** - 快速加载与流畅体验

## 🖥️ 在线演示

访问[https://emoji.imwarn.com](https://emoji.imwarn.com)体验在线版本！

## 🛠️ 技术栈

- **前端框架**: React 18
- **路由**: React Router v6
- **状态管理**: React Context API
- **构建工具**: Vite
- **Emoji数据**: emoji-mart
- **部署**: Cloudflare Pages

## 📦 快速开始

### 前置要求

- Node.js 18.x或更高版本
- npm 8.x或更高版本

### 安装步骤

1. 克隆仓库到本地：

```bash
git clone https://github.com/imwarn/emoji-finder.git
cd emoji-finder
```

2. 安装依赖（确保使用React 18版本）：

```bash
npm install
```

3. 启动开发服务器：

```bash
npm run dev
```

4. 打开浏览器访问：`http://localhost:5173`

## 📝 项目结构

```
emoji-finder/
├── public/                  # 静态资源
│   ├── favicon.svg          # 网站图标
│   ├── screenshots/         # 应用截图
│   ├── sitemap.xml          # 站点地图 
│   └── robots.txt           # 爬虫指南
├── src/
│   ├── components/          # 可复用组件
│   │   ├── ComboCreator.jsx # 组合创建器组件
│   │   ├── Layout.jsx       # 布局组件
│   │   ├── RecentEmojis.jsx # 最近使用组件
│   │   └── Toast.jsx        # 通知提示组件
│   ├── context/             # React Context
│   │   ├── EmojiContext.jsx # Emoji数据上下文
│   │   └── ThemeContext.jsx # 主题上下文
│   ├── data/                # 静态数据
│   │   └── emojiCombos.js   # emoji组合数据
│   ├── hooks/               # 自定义Hooks
│   │   ├── useEmoji.js      # Emoji数据Hook
│   │   └── useTheme.js      # 主题Hook
│   ├── pages/               # 页面组件
│   │   ├── HomePage.jsx     # 首页
│   │   ├── EmojiPage.jsx    # Emoji页面
│   │   └── CombosPage.jsx   # 组合页面
│   ├── styles/              # CSS样式
│   │   └── ComboCreator.css # 组合创建器样式
│   ├── App.css              # 主样式文件
│   ├── App.jsx              # 主应用组件
│   ├── main.jsx             # 应用入口点
│   └── index.css            # 全局样式
├── index.html               # HTML模板
├── vite.config.js           # Vite配置
├── package.json             # 项目依赖
└── README.md                # 项目文档
```

## 🚀 开发指南

### 环境变量

创建一个`.env`文件在项目根目录：

```
VITE_BASE_URL=http://localhost:5173
```

生产环境中请修改为您的正式域名。

### 添加新Emoji组合

编辑`src/data/emojiCombos.js`文件，按照现有格式添加新的组合：

```javascript
{
  id: 新的唯一ID,
  combo: "您的组合内容",
  category: "分类标识",
  tags: ["标签1", "标签2"]
}
```

### 添加新分类

在`src/data/emojiCombos.js`文件中的`categories`数组添加新分类：

```javascript
{ id: "分类标识", name: "分类显示名称" }
```

### 自定义主题

修改`src/App.css`中的CSS变量来自定义应用主题：

```css
:root {
  --primary-color: #你的主色调;
  --secondary-color: #你的辅助色调;
  /* 其他颜色变量 */
}
```

## 📊 SEO优化

本项目已实施以下SEO优化措施：

1. 动态页面标题和描述
2. 结构化数据标记(JSON-LD)
3. 规范链接标记
4. 语义化HTML结构
5. 站点地图和robots.txt
6. Open Graph和Twitter Card支持
7. 响应式设计适配各种设备

## 📤 部署指南

### 构建生产版本

```bash
npm run build
```

生成的文件位于`dist`目录，可部署到任何静态网站托管服务。

### Cloudflare Pages部署

1. Fork本仓库到您的GitHub账号

2. 在Cloudflare Dashboard中创建Pages项目

3. 连接您的GitHub仓库

4. 配置构建设置：
   - 构建命令: `npm run build`
   - 构建输出目录: `dist`
   - 框架预设: `Vite`
   - Node版本: `18`

5. 点击"保存并部署"

### 自定义域名

在Cloudflare Pages配置中添加自定义域名并更新DNS记录。确保更新`index.html`中的元标签以反映您的实际域名。

## 🔧 故障排除

### React 19兼容性问题

如果遇到与React 19相关的兼容性问题，需确保使用React 18版本：

```bash
npm uninstall react react-dom
npm install react@18.2.0 react-dom@18.2.0
```

并在package.json中添加以下内容以避免升级：

```json
"resolutions": {
  "react": "18.2.0",
  "react-dom": "18.2.0"
},
"overrides": {
  "react": "18.2.0",
  "react-dom": "18.2.0"
}
```

### emoji-mart加载问题

如果emoji-mart未正确加载，尝试以下解决方案：

```bash
npm install emoji-mart@latest @emoji-mart/data @emoji-mart/react
```

## 🌐 国际化支持

Emoji Finder支持多种语言，当前包括:

- 🇺🇸 English
- 🇨🇳 中文
- 🇪🇸 Español
- 🇯🇵 日本語
- 🇰🇷 한국어

### 添加新语言

1. 在`public/locales/`文件夹中创建新的语言文件夹(例如`fr/`)
2. 复制现有的`translation.json`并翻译内容
3. 在`src/context/LanguageContext.jsx`中的languages数组添加新语言

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出功能建议！请遵循以下步骤：

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 📜 许可证

本项目采用MIT许可证 - 详见[LICENSE](LICENSE)文件。

## 📧 联系方式

项目维护者 - [your-email@example.com](mailto:your-email@example.com)

---

**注意：** 在部署站点前，请替换所有URL、域名和图片路径为您实际使用的值，并确保添加适当的屏幕截图以增强文档的直观性。
