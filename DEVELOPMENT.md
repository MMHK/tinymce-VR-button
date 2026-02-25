# Development Guide

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

## 📁 Project Structure

```
tinymce-VR-button/
├── src/                      # Source files
│   ├── plugin.js            # Main TinyMCE plugin
│   ├── demo.js              # Demo page entry
│   └── vr-button.css        # Plugin styles
├── public/                   # Static assets
│   └── index.html           # Demo HTML template
├── dist/                     # Build output (generated)
├── package.json             # Dependencies & scripts
├── rspack.config.js         # Rspack configuration
├── .yarnrc.yml              # Yarn v4 configuration
└── README.md                # Documentation
```

## 🛠️ Development Workflow

### 1. Development Mode

```bash
yarn dev
```

- Starts dev server at `http://localhost:3000`
- Hot module replacement enabled
- Source maps enabled

### 2. Build for Production

```bash
yarn build
```

- Outputs to `dist/` directory
- Minified files: `plugin.min.js`, `demo.min.js`
- Source maps included

### 3. Clean Build

```bash
yarn clean
```

## 📦 Dependencies

### Production
- **tinymce**: ^4.0.26 (peer dependency)

### Development
- **@rspack/cli**: Build tool
- **@rspack/core**: Core rspack
- **@rspack/dev-server**: Dev server
- **css-loader**: CSS processing
- **style-loader**: Inject CSS in dev
- **html-webpack-plugin**: HTML generation

## 🔧 Configuration

### Rspack Config (`rspack.config.js`)

- **Entry**: `plugin.js` (standalone), `demo.js` (demo page)
- **Output**: `dist/`
- **Dev Server**: Port 3000
- **CSS**: Injected in dev, extracted in production

### TinyMCE Integration

```javascript
tinymce.init({
    selector: '#editor',
    plugins: ['vrbutton'],
    toolbar: 'vrbutton',
    external_plugins: {
        'vrbutton': '/plugin.js'  // Path to built plugin
    },
    content_css: '/vr-button.css'  // Path to styles
});
```

## 🎯 Features

### Plugin Features
- ✅ Toolbar button (VR icon)
- ✅ Dialog for URL input
- ✅ URL validation (720yun.com format)
- ✅ Visual placeholder in editor
- ✅ Double-click to edit
- ✅ Context menu support
- ✅ Desktop: Inline iframe overlay (800x600)
- ✅ Mobile: Opens in new tab

### Development Features
- ✅ Hot reload
- ✅ Source maps
- ✅ Modern build system (Rspack)
- ✅ CSS injection
- ✅ Asset optimization

## 📝 Code Style

- ES5 syntax for TinyMCE 4 compatibility
- JSDoc comments
- Consistent indentation (4 spaces)
- Semantic naming

## 🐛 Debugging

### Browser DevTools
1. Open `http://localhost:3000`
2. Open DevTools → Sources
3. Navigate to `webpack://` → `./src/`

### Common Issues

**Issue**: Plugin not loading
- Check console for errors
- Verify `external_plugins` path
- Ensure TinyMCE is loaded before plugin

**Issue**: Styles not applied
- Check `content_css` path
- Verify CSS is loaded in network tab

## 🔌 API Reference

### Plugin Methods

```javascript
// Add to TinyMCE
editor.addButton('vrbutton', {...});
editor.addMenuItem('vrbutton', {...});

// Dialog
editor.windowManager.open({...});

// Insert content
editor.insertContent(html);
```

### Helper Functions

- `isMobile()` - Detect mobile device
- `isValid720yunUrl(url)` - Validate URL format
- `showInlineVR(url)` - Show desktop overlay
- `openVRView(url)` - Open based on device

## 📚 Resources

- [TinyMCE 4 Docs](https://www.tiny.cloud/docs-4x/)
- [Rspack Docs](https://rspack.dev/)
- [720yun.com](https://720yun.com/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file
