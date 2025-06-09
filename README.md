# 🎨 Promo Card Generator v2.0

A modern, feature-rich tool to generate professional promotional cards for artists using Tailwind CSS. Create stunning promo cards with advanced customization options and export them in multiple formats.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Preview**: See changes instantly as you type
- **Custom Branding**: Editable brand name (YourBrand)
- **Image Upload**: Drag & drop or click to upload artist photos
- **Background Colors**: Color picker + 12 beautiful presets
- **Responsive Design**: Works on desktop, tablet, and mobile

### 🎨 Advanced Controls
- **Font Size Sliders**: Independent control for artist name, tagline, and brand
- **Color Presets**: 12 carefully chosen color combinations
- **Social Media Sizes**: One-click resize for Instagram, Twitter, Facebook
- **Export Formats**: PNG, JPG, WEBP with quality settings
- **Auto-Save**: Your settings are automatically saved

### ⚡ User Experience
- **Toast Notifications**: Beautiful success/error messages
- **Keyboard Shortcuts**: `Ctrl+D` to download, `Escape` to clear focus
- **Reset Button**: Quickly return to default settings
- **Loading States**: Visual feedback during image generation
- **Smooth Animations**: Polished interactions throughout

## 🚀 Quick Start

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd promocard-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to http://localhost:3000
   - Start creating your promo cards!

## 🛠️ Development

- **`npm run dev`** - Start development server with live reloading and CSS watching
  - Runs the app at http://localhost:3000
  - Automatically rebuilds CSS when you make changes to `src/input.css`
  - Live reloads the browser when files change

- **`npm run build`** - Build for production (minified CSS)
- **`npm run build:css`** - Build CSS only (minified)
- **`npm run watch:css`** - Watch CSS files for changes (development)
- **`npm run serve`** - Serve the dist folder on port 3000

#### Netlify Scripts
- **`npm run netlify:dev`** - Start Netlify development server with Functions support
- **`npm run netlify:build`** - Build for Netlify deployment
- **`npm run netlify:deploy`** - Deploy preview to Netlify
- **`npm run netlify:deploy:prod`** - Deploy to production on Netlify

### Getting Started

1. Clone/download the project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open your browser to http://localhost:3000

### Project Structure

```
promo-card-generator/
├── dist/               # Built files (ready for deployment)
│   ├── index.html
│   └── output.css
├── src/
│   └── input.css       # Source CSS with Tailwind directives
├── netlify.toml        # Netlify configuration
├── deploy.sh           # Deployment script
├── package.json
└── tailwind.config.js
```

## Deployment

### Netlify Deployment (Recommended)

#### Method 1: Git-based Deployment (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically build and deploy using the `netlify.toml` configuration

#### Method 2: CLI Deployment
1. Install Netlify CLI globally (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```
2. Login to Netlify:
   ```bash
   netlify login
   ```
3. Deploy preview:
   ```bash
   npm run netlify:deploy
   ```
4. Deploy to production:
   ```bash
   npm run netlify:deploy:prod
   ```

#### Method 3: Manual Deployment
1. Build the project:
   ```bash
   npm run build
   ```
2. Drag and drop the `dist` folder to Netlify's deployment area

#### Method 4: Using the deployment script
```bash
# Deploy preview
./deploy.sh

# Deploy to production
./deploy.sh prod
```

### Other Hosting Services

The `dist` folder is ready to be deployed to any static hosting service like Vercel, GitHub Pages, or any web server.

## 🎯 Usage Guide

### Creating Your First Card
1. **Add Artist Info**: Enter the artist name and tagline
2. **Upload Image**: Click to upload or drag & drop an artist photo
3. **Choose Colors**: Use the color picker or select from 12 presets
4. **Adjust Text**: Use sliders to perfect font sizes
5. **Export**: Choose your format and quality, then download

### Keyboard Shortcuts
- **`Ctrl+D`** (or `Cmd+D` on Mac): Quick download
- **`Escape`**: Clear focus from any input field

### Social Media Optimization
Use the quick resize buttons for optimal dimensions:
- **Instagram Square**: Perfect for feed posts
- **Instagram Story**: Vertical format for stories
- **Twitter**: Optimized for Twitter posts
- **Facebook**: Best dimensions for Facebook sharing

### Export Options
- **PNG**: Best for transparent backgrounds and highest quality
- **JPG**: Smaller file sizes, good for web sharing
- **WEBP**: Modern format with excellent compression

## 🔧 Advanced Configuration

### Customizing Colors
Edit the color presets in `dist/index.html` by modifying the color preset buttons:
```html
<button class="color-preset" data-color="#YOUR_COLOR"></button>
```

### Modifying Default Values
Change default settings by editing the reset function in the JavaScript section.

### Adding New Social Media Presets
Add new quick-resize buttons by following the existing pattern in the HTML and JavaScript.

## 🐛 Troubleshooting

### Common Issues
- **Download fails**: Refresh page and re-upload image
- **Settings not saving**: Clear browser cache
- **Image not loading**: Use common formats (JPG, PNG, WEBP)

### Browser Compatibility
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android
- Requires ES6+ support

## 📝 Changelog

### v2.0 (Current)
- ✅ 12 color presets
- ✅ Font size controls
- ✅ Multiple export formats
- ✅ Social media presets
- ✅ Auto-save functionality
- ✅ Toast notifications
- ✅ Keyboard shortcuts
- ✅ Reset button
- ✅ Enhanced animations

### v1.0
- Basic card generation
- Single format export
- Manual color picker
- Basic responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Tailwind CSS, html2canvas, and modern web technologies.**
