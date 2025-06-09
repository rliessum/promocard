Project Setup GuideTo get your project ready for deployment on a service like Netlify, follow these steps.1. Create the Project StructureFirst, create the following folders and files on your computer. Your project should look exactly like this:promo-card-generator/
├── dist/
│   └── index.html
├── src/
│   └── input.css
├── package.json
└── tailwind.config.js
2. Add the File ContentCopy and paste the code below into the corresponding empty files you just created.📄 package.jsonThis file manages your project's dependencies and defines the build script.{
  "name": "promo-card-generator",
  "version": "1.0.0",
  "description": "A tool to generate promotional cards for artists.",
  "main": "index.html",
  "scripts": {
    "build:css": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify"
  },
  "keywords": [
    "promo",
    "card",
    "generator",
    "tailwind"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "tailwindcss": "^3.4.1"
  }
}
📄 tailwind.config.jsThe configuration file for Tailwind CSS.module.exports = {
  content: [
    './dist/**/*.{html,js}',
  ],
  theme: {
    extend: {
        fontFamily: {
            inter: ['Inter', 'sans-serif'],
        },
    },
  },
  plugins: [],
}
📄 src/input.cssThe source CSS file where Tailwind's directives are placed.@tailwind base;
@tailwind components;
@tailwind utilities;

.loader {
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
📄 dist/index.htmlYour main, user-facing HTML file.<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promo Card Generator</title>
    <link href="output.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
</head>
<body class="bg-gray-900 text-white flex flex-col lg:flex-row items-center lg:items-start justify-center min-h-screen p-4 sm:p-6 lg:p-8 font-inter">

    <div class="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        <!-- ===== CONTROLS PANEL ===== -->
        <div class="w-full lg:w-1/3 bg-gray-800 rounded-2xl p-6 shadow-2xl h-fit">
            <h1 class="text-2xl font-bold mb-2">Promo Card Generator</h1>
            <p class="text-gray-400 mb-6">Customize your card and download it.</p>

            <div class="space-y-5">
                <!-- Artist Name -->
                <div>
                    <label for="artistName" class="block text-sm font-medium text-gray-300 mb-2">Artist Name</label>
                    <input type="text" id="artistName" value="Your Name" class="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                </div>

                <!-- Tagline -->
                <div>
                    <label for="tagline" class="block text-sm font-medium text-gray-300 mb-2">Tagline / Subtext</label>
                    <input type="text" id="tagline" value="New Single Out Now" class="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                </div>

                <!-- Image Upload -->
                <div>
                    <label for="imageUpload" class="block text-sm font-medium text-gray-300 mb-2">Artist Image</label>
                    <input type="file" id="imageUpload" accept="image/*" class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition">
                </div>

                <!-- Background Color -->
                <div>
                    <label for="bgColor" class="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
                    <input type="color" id="bgColor" value="#1DB954" class="w-full h-12 p-1 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer">
                </div>
                 <!-- Text Color -->
                <div>
                    <label for="textColor" class="block text-sm font-medium text-gray-300 mb-2">Text Color</label>
                     <div class="flex items-center gap-4">
                        <button id="whiteTextBtn" class="w-full p-3 rounded-lg border-2 border-white bg-white"></button>
                        <button id="blackTextBtn" class="w-full p-3 rounded-lg border-2 border-gray-500 bg-black"></button>
                    </div>
                </div>

                <!-- Aspect Ratio -->
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
                    <div class="grid grid-cols-3 gap-3">
                        <button data-aspect="aspect-square" class="aspect-ratio-btn bg-gray-700 p-3 rounded-lg border-2 border-blue-500">Square</button>
                        <button data-aspect="aspect-[9/16]" class="aspect-ratio-btn bg-gray-700 p-3 rounded-lg border-2 border-transparent">Portrait</button>
                        <button data-aspect="aspect-[16/9]" class="aspect-ratio-btn bg-gray-700 p-3 rounded-lg border-2 border-transparent">Landscape</button>
                    </div>
                </div>

                 <!-- Download Button -->
                <button id="downloadBtn" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download Card
                </button>
            </div>
        </div>

        <!-- ===== PREVIEW PANEL ===== -->
        <div class="w-full lg:w-2/3 flex items-center justify-center p-6">
            <div id="cardPreviewWrapper" class="w-full max-w-lg">
                <div id="promoCard" class="aspect-square w-full rounded-2xl shadow-2xl p-8 sm:p-10 lg:p-12 flex flex-col justify-between transition-all duration-300" style="background-color: #1DB954;">
                    <!-- Top section: Image and Text -->
                    <div class="flex-grow flex flex-col items-center justify-center text-center">
                        <img id="previewImage" src="https://placehold.co/400x400/222/FFF?text=ARTIST" onerror="this.onerror=null; this.src='https://placehold.co/400x400/222/FFF?text=Error'" alt="Artist" class="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full object-cover mb-6 shadow-lg border-4 border-white">
                        <h2 id="previewArtistName" class="text-4xl sm:text-5xl font-black text-white" style="line-height: 1.1;">Your Name</h2>
                        <p id="previewTagline" class="text-lg sm:text-xl font-bold text-white opacity-90 mt-2">New Single Out Now</p>
                    </div>
                    <!-- Bottom section: Branding -->
                    <div class="text-center mt-6">
                        <p class="font-bold text-2xl text-white">YourBrand</p>
                    </div>
                </div>
            </div>
            <!-- Loading Indicator -->
            <div id="loadingIndicator" class="hidden items-center justify-center flex-col">
                <div class="loader"></div>
                <p class="mt-4 text-gray-300">Generating your image...</p>
            </div>
        </div>

    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Get all interactive elements
            const artistNameInput = document.getElementById('artistName');
            const taglineInput = document.getElementById('tagline');
            const imageUpload = document.getElementById('imageUpload');
            const bgColorInput = document.getElementById('bgColor');
            const whiteTextBtn = document.getElementById('whiteTextBtn');
            const blackTextBtn = document.getElementById('blackTextBtn');
            const aspectRatioBtns = document.querySelectorAll('.aspect-ratio-btn');
            const downloadBtn = document.getElementById('downloadBtn');

            // Get all preview elements
            const promoCard = document.getElementById('promoCard');
            const previewImage = document.getElementById('previewImage');
            const previewArtistName = document.getElementById('previewArtistName');
            const previewTagline = document.getElementById('previewTagline');
            const cardPreviewWrapper = document.getElementById('cardPreviewWrapper');
            const loadingIndicator = document.getElementById('loadingIndicator');
            
            // Text elements to be colored
            const textElements = [previewArtistName, previewTagline, promoCard.querySelector('.font-bold.text-2xl')];


            // --- EVENT LISTENERS ---

            // Update artist name
            artistNameInput.addEventListener('input', (e) => {
                previewArtistName.textContent = e.target.value;
            });

            // Update tagline
            taglineInput.addEventListener('input', (e) => {
                previewTagline.textContent = e.target.value;
            });

            // Update background color
            bgColorInput.addEventListener('input', (e) => {
                promoCard.style.backgroundColor = e.target.value;
            });

            // Update image
            imageUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        previewImage.src = event.target.result;
                    }
                    reader.readAsDataURL(file);
                }
            });

             // Change text color
            function setTextColor(color) {
                textElements.forEach(el => el.style.color = color);
                previewImage.style.borderColor = color;
                whiteTextBtn.classList.toggle('border-blue-500', color === 'white');
                whiteTextBtn.classList.toggle('border-gray-500', color !== 'white');
                blackTextBtn.classList.toggle('border-blue-500', color === 'black');
                blackTextBtn.classList.toggle('border-gray-500', color !== 'black');
            }

            whiteTextBtn.addEventListener('click', () => setTextColor('white'));
            blackTextBtn.addEventListener('click', () => setTextColor('black'));

            // Change aspect ratio
            aspectRatioBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active styles from all buttons
                    aspectRatioBtns.forEach(b => b.classList.remove('border-blue-500'));
                    // Add active style to clicked button
                    btn.classList.add('border-blue-500');

                    // Remove all aspect ratio classes from the card
                    promoCard.classList.remove('aspect-square', 'aspect-[9/16]', 'aspect-[16/9]');
                    // Add the selected aspect ratio
                    promoCard.classList.add(btn.dataset.aspect);
                });
            });


            // Download functionality
            downloadBtn.addEventListener('click', () => {
                // Show loader, hide card
                cardPreviewWrapper.style.display = 'none';
                loadingIndicator.style.display = 'flex';
                downloadBtn.disabled = true;
                downloadBtn.classList.add('opacity-50', 'cursor-not-allowed');

                // Use html2canvas to capture the promoCard element
                html2canvas(promoCard, { 
                    allowTaint: true, 
                    useCORS: true, 
                    scale: 2 // Increase scale for higher resolution
                }).then(canvas => {
                    // Create a link element
                    const link = document.createElement('a');
                    // Create a filename
                    const fileName = `promo-card-${artistNameInput.value.replace(/\s+/g, '-').toLowerCase()}.png`;
                    // Set the download attribute and href
                    link.download = fileName;
                    link.href = canvas.toDataURL('image/png');
                    // Trigger the download
                    link.click();

                     // Hide loader, show card again
                    cardPreviewWrapper.style.display = 'block';
                    loadingIndicator.style.display = 'none';
                    downloadBtn.disabled = false;
                    downloadBtn.classList.remove('opacity-50', 'cursor-not-allowed');

                }).catch(err => {
                    console.error("Oops, something went wrong!", err);
                    // Hide loader, show card again even if there's an error
                    cardPreviewWrapper.style.display = 'block';
                    loadingIndicator.style.display = 'none';
                    downloadBtn.disabled = false;
                    downloadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                });
            });

            // Set initial state
            setTextColor('white'); // Default to white text
        });
    </script>
</body>
</html>
3. Install and BuildFinally, open your terminal in the root of the promo-card-generator folder and run these two commands:Install dependencies:npm install
Build the CSS:npm run build:css
After running these commands, your dist folder is ready to be deployed. You can simply drag and drop it into Netlify's UI, or connect it to a Git repository for automated deployments.