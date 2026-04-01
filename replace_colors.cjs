const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (file !== 'node_modules') {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.css')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const colorMap = {
  '#5D6B6B': '#21362e',
  '#5d6b6b': '#21362e',
  '#BDD7D8': '#b8ea27',
  '#bdd7d8': '#b8ea27',
  '#F7C8CA': '#b8ea27',
  '#f7c8ca': '#b8ea27',
  '#D6E5E5': '#f8fafc',
  '#d6e5e5': '#f8fafc',
  '#F1F7F7': '#ffffff',
  '#f1f7f7': '#ffffff',
  'rgba(93, 107, 107': 'rgba(33, 54, 46',
  'rgba(247, 200, 202': 'rgba(184, 234, 39',
};

const srcDir = path.join(__dirname, 'src');
const files = walkSync(srcDir);

let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    // Escape special characters in oldColor if needed (not strictly needed here but good practice)
    const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    newContent = newContent.replace(regex, newColor);
  }

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated colors in: ${file}`);
    changedFiles++;
  }
});

console.log(`\nReplacement complete! Modified ${changedFiles} files.`);
