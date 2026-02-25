# Development Guide

## 🚀 快速開始

```bash
yarn install
yarn dev      # http://localhost:3030
yarn build    # 打包到 dist/
yarn clean    # 清理 dist
```

## 📁 項目結構

```
src/
├── plugin.js        # 插件主程式
├── demo.js          # Demo 頁面
└── vr-button.css    # 樣式
```

## 🔧 開發配置

### Rspack

- **Entry**: `plugin.js`, `demo.js`
- **Output**: `dist/`
- **Dev Server**: Port 3030
- **Externals**: `tinymce`（不打包）

### TinyMCE 4 插件規範

- 使用 ES5 語法
- `tinymce.PluginManager.add('vrbutton', function(editor, url) { ... })`
- `url` 為插件目錄路徑，用於載入資源

## 🐛 調試

1. 打開 `http://localhost:3030`
2. DevTools → Sources → `webpack://` → `./src/`

### 常見問題

**Plugin 載入失敗**
- 檢查 `external_plugins` 路徑
- 確認 TinyMCE 先於插件載入

**樣式未生效**
- 檢查 `content_css` 路徑
- 確認 CSS 在 Network 面板已載入

## 📚 相關文檔

- [TinyMCE 4 Docs](https://www.tiny.cloud/docs-4x/)
- [Rspack Docs](https://rspack.dev/)

## 🤝 Contributing

1. Fork repository
2. `git checkout -b feature/amazing-feature`
3. `git commit -m 'Add amazing feature'`
4. `git push origin feature/amazing-feature`
5. Open Pull Request
