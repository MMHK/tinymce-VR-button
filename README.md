# TinyMCE VR Button Plugin

用于 TinyMCE 4.0.26 的 VR 360° 按钮插件，支持 720yun.com 平台。

## ✨ Features

- 🎮 **Toolbar Button**: VR icon in TinyMCE toolbar
- 🔗 **URL Input**: Dialog for entering 720yun VR links
- 📱 **Responsive Design**:
  - Desktop: Inline iframe overlay (800×600px)
  - Mobile: Opens in new window
- 🎨 **Modern UI**: Gradient styled VR button
- ✏️ **Editable**: Double-click or context menu to edit links
- 🔧 **Validation**: URL format checking

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/MMHK/tinymce-VR-button.git
cd tinymce-VR-button

# Install dependencies
yarn install

# Start development server
yarn dev
```

Open browser: `http://localhost:3000`

### Usage

1. Click the **VR** button in TinyMCE toolbar
2. Enter a 720yun URL: `https://720yun.com/t/xxxxx`
3. A VR 360° button appears in the editor
4. Click the button:
   - **Desktop**: Opens 800×600px inline iframe
   - **Mobile**: Opens in new tab

## 📦 Production Usage

### Option 1: Use Built Files

```bash
yarn build
```

Copy files from `dist/`:
- `plugin.min.js` - Plugin file
- `vr-button.css` - Styles

### Option 2: CDN (Example)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.0.26/tinymce.min.js"></script>
<script src="path/to/plugin.min.js"></script>
<link rel="stylesheet" href="path/to/vr-button.css">

<script>
tinymce.init({
    selector: '#editor',
    plugins: ['vrbutton'],
    toolbar: 'vrbutton',
    external_plugins: {
        'vrbutton': 'path/to/plugin.min.js'
    },
    content_css: 'path/to/vr-button.css'
});
</script>
```

## 📁 Project Structure

```
tinymce-VR-button/
├── src/                      # Source files
│   ├── plugin.js            # Main plugin source
│   ├── demo.js              # Demo page entry
│   └── vr-button.css        # Plugin styles
├── public/
│   └── index.html           # Demo template
├── dist/                     # Build output
│   ├── plugin.min.js
│   ├── demo.min.js
│   └── vr-button.css
├── package.json
├── rspack.config.js         # Rspack configuration
├── .yarnrc.yml              # Yarn v4 config
├── DEVELOPMENT.md           # Development guide
└── README.md                # This file
```

## 🛠️ Development

### Scripts

```bash
yarn install   # Install dependencies
yarn dev       # Start dev server (http://localhost:3000)
yarn build     # Build for production
yarn clean     # Clean dist folder
```

### Tech Stack

- **Build Tool**: [Rspack](https://rspack.dev/) - Rust-based webpack alternative
- **Package Manager**: [Yarn v4](https://yarnpkg.com/) - Modern package management
- **Dev Server**: Hot reload, source maps
- **TinyMCE**: Version 4.0.26

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed development guide.

## 🔧 Technical Specs

- **TinyMCE Version**: 4.0.26+
- **Browsers**: Chrome, Firefox, Safari, Edge, IE 11+
- **Mobile Breakpoint**: < 768px
- **Overlay Size**: 800×600px (desktop)
- **URL Format**: `https://720yun.com/t/{id}`

## 📋 Supported URL Formats

- ✅ `https://720yun.com/t/xxxxx`
- ✅ `http://720yun.com/t/xxxxx`

## 🤝 Contributing

Contributions welcome! Please read [DEVELOPMENT.md](DEVELOPMENT.md) for guidelines.

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

MIT License © MMHK

## 👤 Author

[MMHK](https://github.com/MMHK)

---

Built with ❤️ using [Rspack](https://rspack.dev/) + [Yarn v4](https://yarnpkg.com/)
