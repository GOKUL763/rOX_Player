// Usage: node scripts/remove_song.js "Pandala - My Dear Loveru.mp3"
// Deletes the specified file from Audio/ and regenerates songs.json
const fs = require('fs');
const path = require('path');
const child = require('child_process');

const root = path.join(__dirname, '..');
const audioDir = path.join(root, 'Audio');
const genScript = path.join(root, 'scripts', 'generate_playlist.js');

const filename = process.argv[2];
if (!filename){
  console.error('Usage: node scripts/remove_song.js "<filename>"');
  process.exit(1);
}

const filePath = path.join(audioDir, filename);
try{
  if (!fs.existsSync(filePath)){
    console.error('File not found:', filePath);
    process.exit(1);
  }
  fs.unlinkSync(filePath);
  console.log('Deleted:', filePath);

  if (fs.existsSync(genScript)){
    console.log('Regenerating songs.json...');
    child.execSync(`node "${genScript}"`, { cwd: root, stdio: 'inherit' });
    console.log('songs.json updated.');
  } else {
    console.warn('Generator script not found at', genScript, '— please run your playlist generator manually.');
  }
} catch (err){
  console.error('Error:', err.message || err);
  process.exit(1);
}