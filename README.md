# Promo Card Generator

A tool to generate promotional cards for artists using Tailwind CSS.

## Development

### Available Scripts

- **`npm run dev`** - Start development server with live reloading and CSS watching
  - Runs the app at http://localhost:3000
  - Automatically rebuilds CSS when you make changes to `src/input.css`
  - Live reloads the browser when files change

- **`npm run build`** - Build for production (minified CSS)
- **`npm run build:css`** - Build CSS only (minified)
- **`npm run watch:css`** - Watch CSS files for changes (development)
- **`npm run serve`** - Serve the dist folder on port 3000

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
├── package.json
└── tailwind.config.js
```

### Deployment

The `dist` folder is ready to be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

For Netlify:
1. Run `npm run build` to ensure CSS is built
2. Drag and drop the `dist` folder to Netlify's deployment area

### Features

- Artist name customization
- Tagline editing
- Image upload
- Background color picker
- Text color toggle (white/black)
- Aspect ratio selection (Square, Portrait, Landscape)
- High-quality PNG download functionality
# promocard
