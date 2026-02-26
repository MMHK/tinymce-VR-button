# TinyMCE VR Button Plugin

TinyMCE 4 插件，用於插入 720yun.com VR 360° 全景鏈接。

## ✨ Features

- 🎮 工具欄 VR 按鈕
- 🔗 支持 720yun.com 鏈接
- 📱 響應式：Desktop 彈窗 / Mobile 新窗口
- ✏️ 雙擊編輯 VR 鏈接

## 🚀 快速開始

### CDN 直接使用

通過 jsDelivr CDN 直接使用，無需下載：

**編輯器配置（TinyMCE）**：
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.0.26/tinymce.min.js"></script>

<textarea id="editor"></textarea>

<script>
tinymce.init({
    selector: '#editor',
    plugins: 'vrbutton',
    toolbar: 'vrbutton',
    external_plugins: {
        'vrbutton': 'https://cdn.jsdelivr.net/gh/MMHK/tinymce-VR-button/docs/plugin.min.js'
    }
    // 無需 content_css，CSS 已打包在 plugin.min.js 中
});
</script>
```

**前端展示頁面**（重要！當你在其他頁面**展示** TinyMCE 保存的內容時）：
```html
<!-- Runtime JS（已包含 CSS，處理點擊事件、顯示彈窗） -->
<script src="https://cdn.jsdelivr.net/gh/MMHK/tinymce-VR-button/docs/vr-runtime.min.js"></script>

<!-- TinyMCE 保存的 HTML 內容 -->
<div class="content">
    <span class="vr-360-container" data-vr-url="https://720yun.com/t/xxxxx">...</span>
</div>
```

### 本地打包

如需本地使用：

```bash
yarn install
yarn build
```

打包後檔案在 `docs/`：
- `plugin.min.js` - TinyMCE 插件（**已包含 CSS，編輯器只需此檔案**）
- `vr-runtime.min.js` - 前端 runtime（**已包含 CSS**）
- `vr-button.css` - 單獨樣式文件（可選，如需自定義樣式）

⚠️ **必須引入的文件**：

| 使用場景 | 需要的文件 | CDN 地址 |
|----------|-----------|----------|
| **TinyMCE 編輯器** | `plugin.min.js` **（已包含 CSS）** | `https://cdn.jsdelivr.net/gh/MMHK/tinymce-VR-button/docs/plugin.min.js` |
| **前端展示頁面** | `vr-runtime.min.js` **（已包含 CSS）** | `https://cdn.jsdelivr.net/gh/MMHK/tinymce-VR-button/docs/vr-runtime.min.js` |

## 📦 npm 安裝（可選）

如果你更喜歡使用 npm：

```bash
npm install github:MMHK/tinymce-VR-button
```

```javascript
// TinyMCE 編輯器頁面
// plugin.min.js 已包含 CSS，只需引入 JS
import 'tinymce-vr-button/docs/plugin.min.js';

tinymce.init({
    selector: '#editor',
    plugins: 'vrbutton',
    toolbar: 'vrbutton'
    // 無需 content_css
});
```

```javascript
// 前端展示頁面（顯示 TinyMCE 內容）
// vr-runtime 已包含 CSS，只需引入 JS
import 'tinymce-vr-button/docs/vr-runtime.min.js';
```

> 💡 **推薦**：直接使用 CDN 方式更簡單，無需安裝任何依賴。

## 📁 項目結構

```
tinymce-vr-button/
├── src/
│   ├── plugin.js         # TinyMCE 插件源碼
│   ├── vr-runtime.js     # 前端展示 runtime
│   └── vr-button.css     # 樣式源碼
├── docs/                 # 打包輸出（CDN 可用）
│   ├── plugin.min.js     # TinyMCE 插件（JS + CSS）
│   ├── vr-runtime.min.js # 前端 runtime（JS + CSS）
│   └── vr-button.css     # 單獨樣式（可選，供自定義）
├── package.json
├── rspack.config.js
└── DEVELOPMENT.md
```

## 🛠️ 開發

```bash
yarn dev      # 開發服務器 http://localhost:3030
yarn build    # 生產打包
yarn clean    # 清理 dist
```

詳見 [DEVELOPMENT.md](DEVELOPMENT.md)

## 🔧 技術規格

- **TinyMCE**: 4.0.26+
- **URL 格式**: `https://720yun.com/t/{id}`
- **Desktop 彈窗**: 800×600px iframe

## 📄 License

Apache License 2.0 © MMHK
