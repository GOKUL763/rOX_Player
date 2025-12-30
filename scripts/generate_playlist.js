// Usage: node scripts/generate_playlist.js
// Scans the project-level Audio/ folder and writes songs.json at project root
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const audioDir = path.join(root, 'Audio');
const outFile = path.join(root, 'songs.json');

const exts = new Set(['.mp3', '.wav', '.m4a', '.ogg', '.oga', '.opus']);

function main(){
  if (!fs.existsSync(audioDir)){
    console.error('No Audio directory found at', audioDir);
    fs.writeFileSync(outFile, '[]', 'utf8');
    console.log('Wrote empty songs.json');
    return;
  }

  const files = fs.readdirSync(audioDir).filter(f=> exts.has(path.extname(f).toLowerCase()));
  const songs = files.map(f=>({
    src: `Audio/${f}`,
    title: path.basename(f, path.extname(f)),
    artist: '',
    cover: null
  }));

  fs.writeFileSync(outFile, JSON.stringify(songs, null, 2), 'utf8');
  console.log(`Found ${songs.length} file(s). Wrote ${outFile}`);
}

main();