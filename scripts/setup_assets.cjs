const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'projects');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const uploadsDir = 'C:/Users/Ameena Sherin/.gemini/antigravity/brain/da85485e-393e-469c-8b6e-db14e97a6502/.user_uploaded';

const mappings = [
  { src: 'media_1790533142064.png', dest: 'project-ktu.png' },
  { src: 'media_1790533182352.jpg', dest: 'project-chatbot.jpg' },
  { src: 'media_1790533184687.jpg', dest: 'project-calculator.jpg' }
];

for (const m of mappings) {
  const srcPath = path.join(uploadsDir, m.src);
  const destPath = path.join(targetDir, m.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${m.src} -> ${m.dest} (${fs.statSync(destPath).size} bytes)`);
  } else {
    console.warn(`File not found: ${srcPath}`);
  }
}
